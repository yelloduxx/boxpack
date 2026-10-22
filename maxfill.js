// Solver for the "max fill" problem: how many identical boxes fit into a container.
//
// All geometry is converted to an integer grid first (1/1000 of the input unit, reduced by
// the GCD of the item dimensions), so comparisons are exact and never suffer from
// floating-point drift (e.g. 0.1 + 0.2 > 0.3).
//
// Three complementary approaches are used and the best result wins:
//   1. Guillotine dynamic programming over raster points (3D) — exact for guillotine layouts.
//   2. Layered DP: 2D guillotine DP for a layer + 1D knapsack for stacking layers
//      (used when the full 3D DP would be too expensive).
//   3. Randomized block heuristic on maximal free spaces (GRASP, after Parreño et al., 2008),
//      which also finds non-guillotine layouts and scales to any item count.
// An upper bound (volume of the container reduced to reachable raster sizes) tells how far
// the result can be from the true optimum.

const SCALE = 1000;

const BUDGETS = {
  fast: { dp: 4e6, states: 5e5, grasp: 20 },
  balanced: { dp: 3e7, states: 2e6, grasp: 60 },
  deep: { dp: 1.5e8, states: 4e6, grasp: 250 },
};

function gcd(a, b) {
  while (b) [a, b] = [b, a % b];
  return a;
}

function toGrid(box, item) {
  const raw = [item.l, item.w, item.h].map((value) => Math.max(1, Math.round(value * SCALE)));
  const g = raw.reduce(gcd);
  return {
    unit: g / SCALE,
    dims: raw.map((value) => value / g),
    box: [box.l, box.w, box.h].map((value) => Math.floor(Math.round(value * SCALE) / g)),
  };
}

function getGridOrientations(dims, rotatable) {
  const [a, b, c] = dims;
  const all = rotatable
    ? [
        [a, b, c],
        [a, c, b],
        [b, a, c],
        [b, c, a],
        [c, a, b],
        [c, b, a],
      ]
    : [[a, b, c]];
  const seen = new Set();
  return all.filter((o) => {
    const key = o.join("|");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

// Raster points: every length <= limit that can be composed from the given item sides.
// In any packing, boxes can be pushed towards the origin until their coordinates are
// raster points, so it is enough to consider cuts and sizes at these points.
function buildRaster(limit, sides) {
  const reach = new Uint8Array(limit + 1);
  reach[0] = 1;
  for (let v = 0; v <= limit; v += 1) {
    if (!reach[v]) continue;
    for (const side of sides) {
      if (v + side <= limit) reach[v + side] = 1;
    }
  }
  const points = [];
  const floorIndex = new Int32Array(limit + 1);
  for (let v = 0; v <= limit; v += 1) {
    if (reach[v]) points.push(v);
    floorIndex[v] = points.length - 1;
  }
  return { points, floorIndex };
}

function axisSides(orientations, axis) {
  return [...new Set(orientations.map((o) => o[axis]))];
}

function upperBound(rasters, volume) {
  const [rx, ry, rz] = rasters.map((r) => r.points[r.points.length - 1]);
  return Math.floor((rx * ry * rz) / volume);
}

function bestBase(orientations, size) {
  let best = 0;
  let bestIndex = -1;
  orientations.forEach((o, index) => {
    const count =
      Math.floor(size[0] / o[0]) * Math.floor(size[1] / o[1]) * Math.floor(size[2] / o[2]);
    if (count > best) {
      best = count;
      bestIndex = index;
    }
  });
  return { count: best, index: bestIndex };
}

function fillBlock(out, o, origin, size) {
  const nx = Math.floor(size[0] / o[0]);
  const ny = Math.floor(size[1] / o[1]);
  const nz = Math.floor(size[2] / o[2]);
  for (let k = 0; k < nz; k += 1) {
    for (let j = 0; j < ny; j += 1) {
      for (let i = 0; i < nx; i += 1) {
        out.push({
          x: origin[0] + i * o[0],
          y: origin[1] + j * o[1],
          z: origin[2] + k * o[2],
          l: o[0],
          w: o[1],
          h: o[2],
        });
      }
    }
  }
}

// Guillotine DP over an n-dimensional raster grid (n = 2 or 3). `baseOf(size)` returns the
// best homogeneous block for a sub-box, splits are tried along every axis. Among layouts
// with the same count the one made of fewer blocks wins (Aljuhani & Papageorgiou's
// "complexity index"): large uniform regions instead of a patchwork of orientations.
function guillotineDp(rasters, baseOf) {
  const dimsCount = rasters.length;
  const n = rasters.map((r) => r.points.length);
  const stride = [];
  let total = 1;
  for (let axis = dimsCount - 1; axis >= 0; axis -= 1) {
    stride[axis] = total;
    total *= n[axis];
  }
  const value = new Int32Array(total);
  const blocks = new Int32Array(total);
  const choiceAxis = new Int8Array(total);
  const choiceArg = new Int32Array(total);
  const index = new Array(dimsCount).fill(0);
  const size = new Array(dimsCount).fill(0);

  for (let state = 0; state < total; state += 1) {
    let rest = state;
    for (let axis = 0; axis < dimsCount; axis += 1) {
      index[axis] = Math.floor(rest / stride[axis]);
      rest -= index[axis] * stride[axis];
      size[axis] = rasters[axis].points[index[axis]];
    }

    const base = baseOf(size);
    let best = base.count;
    let bestBlocks = base.count ? 1 : 0;
    let bestAxis = -1;
    let bestArg = base.index;

    for (let axis = 0; axis < dimsCount; axis += 1) {
      const points = rasters[axis].points;
      const floorIndex = rasters[axis].floorIndex;
      const full = size[axis];
      const offset = state - index[axis] * stride[axis];
      for (let a = 1; a < points.length && points[a] * 2 <= full; a += 1) {
        const first = offset + a * stride[axis];
        const second = offset + floorIndex[full - points[a]] * stride[axis];
        const candidate = value[first] + value[second];
        const candidateBlocks = blocks[first] + blocks[second];
        if (candidate > best || (candidate === best && candidateBlocks < bestBlocks)) {
          best = candidate;
          bestBlocks = candidateBlocks;
          bestAxis = axis;
          bestArg = a;
        }
      }
    }

    value[state] = best;
    blocks[state] = bestBlocks;
    choiceAxis[state] = bestAxis;
    choiceArg[state] = bestArg;
  }

  return { value, blocks, choiceAxis, choiceArg, stride, total };
}

// Reconstructs the 2D layout of a DP state as rectangles {x, y, o} in plane coordinates.
function reconstruct2d(dp, planeRasters, layerOrientations, planeAxes, state, origin, rects) {
  const stack = [{ state, origin }];
  while (stack.length) {
    const { state, origin } = stack.pop();
    if (!dp.value[state]) continue;
    const i0 = Math.floor(state / dp.stride[0]);
    const i1 = state - i0 * dp.stride[0];
    const index = [i0, i1];
    const size = [planeRasters[0].points[i0], planeRasters[1].points[i1]];
    const axis = dp.choiceAxis[state];
    if (axis < 0) {
      const o = layerOrientations[dp.choiceArg[state]];
      const sides = [o[planeAxes[0]], o[planeAxes[1]]];
      for (let a = 0; a + sides[0] <= size[0]; a += sides[0]) {
        for (let b = 0; b + sides[1] <= size[1]; b += sides[1]) {
          rects.push({ x: origin[0] + a, y: origin[1] + b, o });
        }
      }
      continue;
    }
    const a = dp.choiceArg[state];
    const cut = planeRasters[axis].points[a];
    const b = planeRasters[axis].floorIndex[size[axis] - cut];
    const base = state - index[axis] * dp.stride[axis];
    const secondOrigin = [...origin];
    secondOrigin[axis] += cut;
    stack.push({ state: base + a * dp.stride[axis], origin });
    stack.push({ state: base + b * dp.stride[axis], origin: secondOrigin });
  }
}

// First-order non-guillotine ("five-block" / pinwheel) partition of the whole layer, the
// building block of the recursive partitioning approach of Morabito & Morales (1998) and
// Birgin, Lobato & Morabito (2010): two vertical and two horizontal cuts give four corner
// rectangles arranged like a pinwheel around a centre, each solved by the guillotine DP.
// This finds the classic pallet patterns a pure guillotine search cannot reach.
function fiveBlockLayer(dp, planeRasters, budgetOps) {
  const [rx, ry] = planeRasters;
  const nx = rx.points.length;
  const ny = ry.points.length;
  const L = rx.points[nx - 1];
  const W = ry.points[ny - 1];
  const stateOf = (l, w) => rx.floorIndex[l] * dp.stride[0] + ry.floorIndex[w];
  let best = { count: dp.value[dp.total - 1], blocks: dp.blocks[dp.total - 1], cuts: null };
  if ((nx * nx * ny * ny) / 4 > budgetOps) return best;

  for (let i1 = 1; i1 < nx - 1; i1 += 1) {
    const x1 = rx.points[i1];
    for (let i2 = i1; i2 < nx - 1; i2 += 1) {
      const x2 = rx.points[i2];
      for (let j1 = 1; j1 < ny - 1; j1 += 1) {
        const y1 = ry.points[j1];
        const bottomRight = stateOf(L - x1, y1);
        for (let j2 = j1; j2 < ny - 1; j2 += 1) {
          const y2 = ry.points[j2];
          const parts = [
            stateOf(x1, y2), // bottom-left, tall
            bottomRight, // bottom-right, wide
            stateOf(L - x2, W - y1), // top-right, tall
            stateOf(x2, W - y2), // top-left, wide
            x2 > x1 && y2 > y1 ? stateOf(x2 - x1, y2 - y1) : -1, // centre
          ];
          let count = 0;
          let blocks = 0;
          parts.forEach((state) => {
            if (state < 0) return;
            count += dp.value[state];
            blocks += dp.blocks[state];
          });
          if (count > best.count || (count === best.count && blocks < best.blocks)) {
            best = { count, blocks, cuts: [x1, x2, y1, y2] };
          }
        }
      }
    }
  }
  return best;
}

function dpCost(rasters) {
  const n = rasters.map((r) => r.points.length);
  const states = n.reduce((acc, value) => acc * value, 1);
  const splits = n.reduce((acc, value) => acc + value, 0) / 2;
  return { states, ops: states * splits };
}

function solveDp3d(grid, orientations, rasters) {
  const dp = guillotineDp(rasters, (size) => bestBase(orientations, size));
  const top = dp.total - 1;
  const placements = [];
  const stack = [{ state: top, origin: [0, 0, 0] }];

  while (stack.length) {
    const { state, origin } = stack.pop();
    if (!dp.value[state]) continue;
    const index = [];
    let rest = state;
    for (let axis = 0; axis < 3; axis += 1) {
      index[axis] = Math.floor(rest / dp.stride[axis]);
      rest -= index[axis] * dp.stride[axis];
    }
    const size = index.map((i, axis) => rasters[axis].points[i]);
    const axis = dp.choiceAxis[state];
    if (axis < 0) {
      fillBlock(placements, orientations[dp.choiceArg[state]], origin, size);
      continue;
    }
    const a = dp.choiceArg[state];
    const cut = rasters[axis].points[a];
    const b = rasters[axis].floorIndex[size[axis] - cut];
    const offset = state - index[axis] * dp.stride[axis];
    const secondOrigin = [...origin];
    secondOrigin[axis] += cut;
    stack.push({ state: offset + a * dp.stride[axis], origin });
    stack.push({ state: offset + b * dp.stride[axis], origin: secondOrigin });
  }

  return placements;
}

// Layered packing, the way pallets and cartons are loaded in practice: every layer is a
// 2D pallet-loading pattern (guillotine DP + five-block partition), layers are stacked
// along `stackAxis`. Identical layers are preferred over a mix of layer types, and every
// second layer is rotated by 180° so asymmetric patterns interlock like brickwork.
// Items in a layer all have the same height, so each one rests fully on the layer below.
function solveLayered(grid, orientations, rasters, budget) {
  let best = null;

  for (let stackAxis = 0; stackAxis < 3; stackAxis += 1) {
    const planeAxes = [0, 1, 2].filter((axis) => axis !== stackAxis);
    const planeRasters = planeAxes.map((axis) => rasters[axis]);
    if (dpCost(planeRasters).ops > budget.dp || dpCost(planeRasters).states > budget.states) {
      continue;
    }
    const planeSize = planeAxes.map((axis) => grid.box[axis]);

    const thicknesses = axisSides(orientations, stackAxis);
    const layers = thicknesses.map((thickness) => {
      const layerOrientations = orientations.filter((o) => o[stackAxis] === thickness);
      const dp = guillotineDp(planeRasters, (size) => {
        let count = 0;
        let index = -1;
        layerOrientations.forEach((o, i) => {
          const c =
            Math.floor(size[0] / o[planeAxes[0]]) * Math.floor(size[1] / o[planeAxes[1]]);
          if (c > count) {
            count = c;
            index = i;
          }
        });
        return { count, index };
      });
      const fiveBlock = fiveBlockLayer(dp, planeRasters, budget.dp);
      return { thickness, layerOrientations, dp, fiveBlock, count: fiveBlock.count };
    });

    // Uniform stacking of the single best layer type.
    const height = grid.box[stackAxis];
    let uniform = { count: 0, layer: null };
    layers.forEach((layer) => {
      const count = Math.floor(height / layer.thickness) * layer.count;
      if (count > uniform.count) uniform = { count, layer };
    });

    // 1D knapsack over layer types, used only when it beats uniform stacking.
    const knap = new Int32Array(height + 1);
    const pick = new Int32Array(height + 1).fill(-1);
    for (let h = 1; h <= height; h += 1) {
      knap[h] = knap[h - 1];
      layers.forEach((layer, li) => {
        if (layer.thickness <= h && knap[h - layer.thickness] + layer.count > knap[h]) {
          knap[h] = knap[h - layer.thickness] + layer.count;
          pick[h] = li;
        }
      });
    }

    const stacked = [];
    if (knap[height] > uniform.count) {
      let h = height;
      while (h > 0) {
        if (pick[h] < 0) {
          h -= 1;
          continue;
        }
        stacked.push(layers[pick[h]]);
        h -= layers[pick[h]].thickness;
      }
      // Heaviest-packed layers go to the bottom; equal layers stay together.
      stacked.sort((a, b) => b.count - a.count || b.thickness - a.thickness);
    } else if (uniform.layer) {
      for (let i = 0; i < Math.floor(height / uniform.layer.thickness); i += 1) {
        stacked.push(uniform.layer);
      }
    }

    const total = stacked.reduce((sum, layer) => sum + layer.count, 0);
    if (!total || (best && total <= best.count)) continue;

    const placements = [];
    let offset = 0;
    stacked.forEach((layer, layerIndex) => {
      const rects = [];
      const { dp, fiveBlock, layerOrientations } = layer;
      const rx = planeRasters[0];
      const ry = planeRasters[1];
      const stateOf = (l, w) => rx.floorIndex[l] * dp.stride[0] + ry.floorIndex[w];
      const reconstruct = (state, origin) =>
        reconstruct2d(dp, planeRasters, layerOrientations, planeAxes, state, origin, rects);
      if (fiveBlock.cuts) {
        const [x1, x2, y1, y2] = fiveBlock.cuts;
        const L = rx.points[rx.points.length - 1];
        const W = ry.points[ry.points.length - 1];
        reconstruct(stateOf(x1, y2), [0, 0]);
        reconstruct(stateOf(L - x1, y1), [x1, 0]);
        reconstruct(stateOf(L - x2, W - y1), [x2, y1]);
        reconstruct(stateOf(x2, W - y2), [0, y2]);
        if (x2 > x1 && y2 > y1) reconstruct(stateOf(x2 - x1, y2 - y1), [x1, y1]);
      } else {
        reconstruct(dp.total - 1, [0, 0]);
      }

      const mirror = layerIndex % 2 === 1;
      rects.forEach(({ x, y, o }) => {
        const sides = [o[planeAxes[0]], o[planeAxes[1]]];
        const pos = [0, 0, 0];
        pos[planeAxes[0]] = mirror ? planeSize[0] - x - sides[0] : x;
        pos[planeAxes[1]] = mirror ? planeSize[1] - y - sides[1] : y;
        pos[stackAxis] = offset;
        placements.push({ x: pos[0], y: pos[1], z: pos[2], l: o[0], w: o[1], h: o[2] });
      });
      offset += layer.thickness;
    });

    best = { count: placements.length, placements };
  }

  return best ? best.placements : null;
}

// ---------- GRASP on maximal spaces with homogeneous blocks ----------

function fitsAny(space, orientations) {
  return orientations.some(
    (o) => o[0] <= space.X - space.x && o[1] <= space.Y - space.y && o[2] <= space.Z - space.z
  );
}

function contains(a, b) {
  return a.x <= b.x && a.y <= b.y && a.z <= b.z && a.X >= b.X && a.Y >= b.Y && a.Z >= b.Z;
}

function spaceKey(space, box) {
  // Distance from the space to the nearest container corner (Parreño's criterion);
  // the bottom (z) is always preferred so the load grows from the floor upwards.
  const dx = Math.min(space.x, box[0] - space.X);
  const dy = Math.min(space.y, box[1] - space.Y);
  const dz = space.z;
  return [dz, ...[dx, dy].sort((a, b) => a - b)];
}

function lexLess(a, b) {
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return a[i] < b[i];
  }
  return false;
}

function graspPack(grid, orientations, rng, alpha) {
  const box = grid.box;
  let spaces = [{ x: 0, y: 0, z: 0, X: box[0], Y: box[1], Z: box[2] }];
  const placements = [];

  while (spaces.length) {
    let spaceIndex = 0;
    let bestKey = null;
    spaces.forEach((space, index) => {
      const key = spaceKey(space, box);
      const volume = (space.X - space.x) * (space.Y - space.y) * (space.Z - space.z);
      key.push(-volume);
      if (!bestKey || lexLess(key, bestKey)) {
        bestKey = key;
        spaceIndex = index;
      }
    });
    const space = spaces[spaceIndex];
    const size = [space.X - space.x, space.Y - space.y, space.Z - space.z];

    const blocks = [];
    const seen = new Set();
    orientations.forEach((o) => {
      const n = [0, 1, 2].map((axis) => Math.floor(size[axis] / o[axis]));
      if (!n[0] || !n[1] || !n[2]) return;
      for (let mask = 0; mask < 8; mask += 1) {
        const counts = n.map((value, axis) => (mask & (1 << axis) ? 1 : value));
        const key = `${o.join("|")}|${counts.join("|")}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const dims = counts.map((c, axis) => c * o[axis]);
        const waste = size.reduce((acc, s, axis) => acc + (s - dims[axis]) / s, 0);
        blocks.push({ o, counts, dims, volume: counts[0] * counts[1] * counts[2], waste });
      }
    });

    if (!blocks.length) {
      spaces.splice(spaceIndex, 1);
      continue;
    }

    blocks.sort((a, b) => b.volume - a.volume || a.waste - b.waste);
    const limit = Math.max(1, Math.ceil(blocks.length * alpha));
    const block = blocks[Math.floor(rng() * limit)];

    // Anchor the block in the space corner closest to a container corner.
    const bx = space.x <= box[0] - space.X ? space.x : space.X - block.dims[0];
    const by = space.y <= box[1] - space.Y ? space.y : space.Y - block.dims[1];
    const bz = space.z;
    const placed = {
      x: bx,
      y: by,
      z: bz,
      X: bx + block.dims[0],
      Y: by + block.dims[1],
      Z: bz + block.dims[2],
    };

    for (let k = 0; k < block.counts[2]; k += 1) {
      for (let j = 0; j < block.counts[1]; j += 1) {
        for (let i = 0; i < block.counts[0]; i += 1) {
          placements.push({
            x: bx + i * block.o[0],
            y: by + j * block.o[1],
            z: bz + k * block.o[2],
            l: block.o[0],
            w: block.o[1],
            h: block.o[2],
          });
        }
      }
    }

    // Update maximal spaces: every space intersecting the block is replaced by
    // up to six sub-spaces that do not intersect it.
    const next = [];
    spaces.forEach((s) => {
      const intersects =
        s.x < placed.X && placed.x < s.X &&
        s.y < placed.Y && placed.y < s.Y &&
        s.z < placed.Z && placed.z < s.Z;
      if (!intersects) {
        next.push(s);
        return;
      }
      if (placed.x > s.x) next.push({ ...s, X: placed.x });
      if (placed.X < s.X) next.push({ ...s, x: placed.X });
      if (placed.y > s.y) next.push({ ...s, Y: placed.y });
      if (placed.Y < s.Y) next.push({ ...s, y: placed.Y });
      if (placed.z > s.z) next.push({ ...s, Z: placed.z });
      if (placed.Z < s.Z) next.push({ ...s, z: placed.Z });
    });

    const useful = next.filter((s) => fitsAny(s, orientations));
    spaces = useful.filter(
      (s, index) =>
        !useful.some(
          (other, otherIndex) =>
            otherIndex !== index &&
            contains(other, s) &&
            (!contains(s, other) || otherIndex < index)
        )
    );
  }

  return placements;
}

function createRng(seed) {
  let state = seed >>> 0;
  return () => {
    state += 0x6d2b79f5;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function toOutput(placements, unit) {
  return placements.map((p) => ({
    position: { x: p.x * unit, y: p.y * unit, z: p.z * unit },
    dims: { l: p.l * unit, w: p.w * unit, h: p.h * unit },
  }));
}

/**
 * Finds the maximum number of identical items that fit into the box.
 * @returns {{ upperBound: number, results: Array<{ method: string, count: number, placements: Array }> }}
 *   `results` are sorted best first; each placement has `position` and `dims` in input units.
 */
export async function solveMaxFill(box, item, { rotatable = true, quality = "balanced", seed = 1, shouldStop } = {}) {
  const budget = BUDGETS[quality] || BUDGETS.balanced;
  const grid = toGrid(box, item);
  const orientations = getGridOrientations(grid.dims, rotatable).filter((o) =>
    o.every((side, axis) => side <= grid.box[axis])
  );
  if (!orientations.length || grid.box.some((value) => value <= 0)) {
    return { upperBound: 0, results: [] };
  }

  const rasters = [0, 1, 2].map((axis) => buildRaster(grid.box[axis], axisSides(orientations, axis)));
  const volume = grid.dims[0] * grid.dims[1] * grid.dims[2];
  const bound = upperBound(rasters, volume);
  const results = [];
  const yieldToUi = () => new Promise((resolve) => setTimeout(resolve, 0));

  // Layered packing first: it is what people and palletizers actually build, and it is
  // stable by construction. The 3D guillotine DP and GRASP may find a few more items by
  // mixing orientations across the height; they are offered as alternative variants.
  const layered = solveLayered(grid, orientations, rasters, budget);
  if (layered) results.push({ method: "layers", placements: layered });
  await yieldToUi();

  const cost = dpCost(rasters);
  if (cost.ops <= budget.dp && cost.states <= budget.states) {
    results.push({ method: "guillotineDp", placements: solveDp3d(grid, orientations, rasters) });
  }
  await yieldToUi();

  const best = () => results.reduce((max, r) => Math.max(max, r.placements.length), 0);
  let graspBest = null;
  if (best() < bound) {
    const rng = createRng(seed);
    for (let trial = 0; trial < budget.grasp; trial += 1) {
      if (shouldStop?.()) return null;
      const alpha = trial === 0 ? 0 : 0.1 + 0.4 * rng();
      const placements = graspPack(grid, orientations, rng, alpha);
      if (!graspBest || placements.length > graspBest.length) graspBest = placements;
      if (graspBest.length >= bound) break;
      if (trial % 4 === 3) await yieldToUi();
    }
  }
  if (graspBest) results.push({ method: "grasp", placements: graspBest });

  // Most items first; on a tie the more regular (layered) layout wins.
  const rank = { layers: 0, guillotineDp: 1, grasp: 2 };
  const output = results
    .map((r) => ({ method: r.method, count: r.placements.length, placements: toOutput(r.placements, grid.unit) }))
    .sort((a, b) => b.count - a.count || rank[a.method] - rank[b.method]);
  return { upperBound: bound, results: output };
}
