import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const translations = {
  en: {
    title: "Box Packing Visualizer",
    "language.label": "Language",
    "hero.eyebrow": "Packing Optimizer",
    "hero.title": "Pack boxes inside boxes with confidence.",
    "hero.subtitle":
      "Enter sizes, generate multiple packing variants, and inspect the most efficient layout in 3D.",
    "hero.badge": "Browser-first • 3D preview",
    "sections.outerBox": "Outer Box",
    "sections.items": "Items",
    "sections.preview": "3D Preview",
    "sections.favorites": "Favorites",
    "sections.history": "History",
    "labels.length": "Length",
    "labels.width": "Width",
    "labels.height": "Height",
    "labels.name": "Name",
    "labels.qty": "Qty",
    "labels.allowRotations": "Allow rotations",
    "labels.allowRotationsAll": "Allow rotations for all items",
    "labels.showLayers": "Show layer planes",
    "labels.best": "Best",
    "labels.method": "Method",
    "labels.trial": "Run",
    "labels.units": "Units",
    "labels.quality": "Quality",
    "labels.qualityFast": "Fast",
    "labels.qualityBalanced": "Balanced",
    "labels.qualityDeep": "Deep",
    "labels.presetName": "Preset name",
    "labels.totalQty": "Total {count}",
    "labels.historyVariants": "Variants",
    "labels.historyMaxFill": "Max fill",
    "labels.maxCount": "Max {count}",
    "labels.package": "Package",
    "buttons.addItem": "Add item",
    "buttons.maxFill": "Max fill",
    "buttons.generate": "Generate variants",
    "buttons.savePreset": "Save preset",
    "buttons.loadPreset": "Load",
    "buttons.deletePreset": "Remove",
    "buttons.clearHistory": "Clear history",
    "messages.addItems": "Add items to generate packing variants.",
    "messages.noItems": "No items added yet.",
    "messages.noVariants":
      "No viable packing variants yet. Try smaller items or a bigger box.",
    "messages.maxFill": "Max fit: {count} items • Fill {fill}%.",
    "messages.maxFillNoFit": "Item does not fit inside the box.",
    "messages.noFavorites": "No saved presets yet.",
    "messages.noHistory": "No history yet.",
    "messages.presetDefault": "Preset {index}",
    "messages.generated": "Generated variants: {count}. Best fill: {fill}%.",
    "messages.variantTitle": "Variant {index}",
    "messages.variantStats": "Fill {fill}% • Density {density}% • Height {height}",
    "items.remove": "Remove",
    "items.defaultName": "Item {index}",
    "items.seedName": "Small box",
    "items.qty": "• {qty}x",
    "placeholders.itemName": "Small box",
    "placeholders.presetName": "My box",
    "methods.volumeCapacity": "Volume desc + capacity rotations",
    "methods.volumeFlat": "Volume desc + flat layers",
    "methods.maxSide": "Max side + capacity rotations",
    "methods.lengthFirst": "Length first + capacity rotations",
    "methods.widthFirst": "Width first + capacity rotations",
    "methods.heightFlat": "Height first + flat layers",
    "methods.volumeAsc": "Volume asc + capacity rotations",
    "methods.random": "Random order + capacity rotations",
    "methods.candidateCapacity": "Candidate positions + capacity rotations",
    "methods.candidateFlat": "Candidate positions + flat layers",
    "methods.candidateLength": "Candidate positions + length first",
    "methods.candidateMaxSide": "Candidate positions + max side first",
    "methods.spacesBestFit": "Maximal spaces + best fit",
    "methods.spacesLowHeight": "Maximal spaces + low height",
    "methods.spacesBalanced": "Maximal spaces + balanced gaps",
    "methods.maxFill": "Max fill (single item)",
  },
  ru: {
    title: "Визуализация упаковки коробок",
    "language.label": "Язык",
    "hero.eyebrow": "Оптимизатор упаковки",
    "hero.title": "Упакуйте коробки внутри коробок без потерь.",
    "hero.subtitle":
      "Введите размеры, получите несколько вариантов укладки и изучите самый эффективный вариант в 3D.",
    "hero.badge": "В браузере • 3D‑предпросмотр",
    "sections.outerBox": "Внешняя коробка",
    "sections.items": "Товары",
    "sections.preview": "3D‑просмотр",
    "sections.favorites": "Избранные параметры",
    "sections.history": "История измерений",
    "labels.length": "Длина",
    "labels.width": "Ширина",
    "labels.height": "Высота",
    "labels.name": "Название",
    "labels.qty": "Количество",
    "labels.allowRotations": "Разрешить повороты",
    "labels.allowRotationsAll": "Разрешить повороты для всех товаров",
    "labels.showLayers": "Показывать слои",
    "labels.best": "Лучший",
    "labels.method": "Метод",
    "labels.trial": "Прогон",
    "labels.units": "Единицы",
    "labels.quality": "Качество",
    "labels.qualityFast": "Быстро",
    "labels.qualityBalanced": "Сбалансировано",
    "labels.qualityDeep": "Глубоко",
    "labels.presetName": "Название набора",
    "labels.totalQty": "Всего {count}",
    "labels.historyVariants": "Варианты",
    "labels.historyMaxFill": "Макс. заполнение",
    "labels.maxCount": "Макс. {count}",
    "labels.package": "Упаковка",
    "buttons.addItem": "Добавить товар",
    "buttons.maxFill": "Макс. заполнение",
    "buttons.generate": "Сгенерировать варианты",
    "buttons.savePreset": "Сохранить набор",
    "buttons.loadPreset": "Загрузить",
    "buttons.deletePreset": "Удалить",
    "buttons.clearHistory": "Очистить историю",
    "messages.addItems": "Добавьте товары, чтобы создать варианты укладки.",
    "messages.noItems": "Пока нет добавленных товаров.",
    "messages.noVariants":
      "Нет подходящих вариантов. Попробуйте уменьшить товары или увеличить коробку.",
    "messages.maxFill": "Макс. кол-во: {count} шт. • Заполнение {fill}%.",
    "messages.maxFillNoFit": "Товар не помещается в коробку.",
    "messages.noFavorites": "Пока нет сохраненных наборов.",
    "messages.noHistory": "История пуста.",
    "messages.presetDefault": "Набор {index}",
    "messages.generated":
      "Сгенерировано вариантов: {count}. Лучшее заполнение: {fill}%.",
    "messages.variantTitle": "Вариант {index}",
    "messages.variantStats": "Заполнение {fill}% • Плотность {density}% • Высота {height}",
    "items.remove": "Удалить",
    "items.defaultName": "Товар {index}",
    "items.seedName": "Маленькая коробка",
    "items.qty": "• {qty} шт.",
    "placeholders.itemName": "Маленькая коробка",
    "placeholders.presetName": "Моя коробка",
    "methods.volumeCapacity": "Объем по убыванию + ориентация по вместимости",
    "methods.volumeFlat": "Объем по убыванию + плоские слои",
    "methods.maxSide": "Макс. сторона + ориентация по вместимости",
    "methods.lengthFirst": "Сначала длина + ориентация по вместимости",
    "methods.widthFirst": "Сначала ширина + ориентация по вместимости",
    "methods.heightFlat": "Сначала высота + плоские слои",
    "methods.volumeAsc": "Объем по возрастанию + ориентация по вместимости",
    "methods.random": "Случайная перестановка + ориентация по вместимости",
    "methods.candidateCapacity": "Кандидатные позиции + ориентация по вместимости",
    "methods.candidateFlat": "Кандидатные позиции + плоские слои",
    "methods.candidateLength": "Кандидатные позиции + сначала длина",
    "methods.candidateMaxSide": "Кандидатные позиции + макс. сторона",
    "methods.spacesBestFit": "Макс. свободные объемы + лучший фит",
    "methods.spacesLowHeight": "Макс. свободные объемы + низкая высота",
    "methods.spacesBalanced": "Макс. свободные объемы + баланс зазоров",
    "methods.maxFill": "Макс. заполнение (один товар)",
  },
  de: {
    title: "Karton‑Packvisualisierung",
    "language.label": "Sprache",
    "hero.eyebrow": "Pack‑Optimierer",
    "hero.title": "Packe Kartons in Kartons mit Sicherheit.",
    "hero.subtitle":
      "Maße eingeben, mehrere Packvarianten erzeugen und die effizienteste Anordnung in 3D prüfen.",
    "hero.badge": "Im Browser • 3D‑Vorschau",
    "sections.outerBox": "Außenkarton",
    "sections.items": "Artikel",
    "sections.preview": "3D‑Vorschau",
    "sections.favorites": "Favoriten",
    "sections.history": "Verlauf",
    "labels.length": "Länge",
    "labels.width": "Breite",
    "labels.height": "Höhe",
    "labels.name": "Name",
    "labels.qty": "Menge",
    "labels.allowRotations": "Drehungen erlauben",
    "labels.allowRotationsAll": "Drehungen für alle Artikel erlauben",
    "labels.showLayers": "Ebenen anzeigen",
    "labels.best": "Beste",
    "labels.method": "Methode",
    "labels.trial": "Durchlauf",
    "labels.units": "Einheiten",
    "labels.quality": "Qualität",
    "labels.qualityFast": "Schnell",
    "labels.qualityBalanced": "Ausgewogen",
    "labels.qualityDeep": "Intensiv",
    "labels.presetName": "Voreinstellungsname",
    "labels.totalQty": "Gesamt {count}",
    "labels.historyVariants": "Varianten",
    "labels.historyMaxFill": "Maximale Füllung",
    "labels.maxCount": "Max {count}",
    "labels.package": "Packung",
    "buttons.addItem": "Artikel hinzufügen",
    "buttons.maxFill": "Maximale Füllung",
    "buttons.generate": "Varianten erzeugen",
    "buttons.savePreset": "Voreinstellung speichern",
    "buttons.loadPreset": "Laden",
    "buttons.deletePreset": "Entfernen",
    "buttons.clearHistory": "Verlauf löschen",
    "messages.addItems": "Füge Artikel hinzu, um Packvarianten zu erzeugen.",
    "messages.noItems": "Noch keine Artikel hinzugefügt.",
    "messages.noVariants":
      "Noch keine geeigneten Varianten. Versuche kleinere Artikel oder einen größeren Karton.",
    "messages.maxFill": "Maximal: {count} Stück • Füllung {fill}%.",
    "messages.maxFillNoFit": "Artikel passt nicht in den Karton.",
    "messages.noFavorites": "Noch keine gespeicherten Voreinstellungen.",
    "messages.noHistory": "Noch kein Verlauf.",
    "messages.presetDefault": "Voreinstellung {index}",
    "messages.generated": "Varianten: {count}. Beste Füllung: {fill}%.",
    "messages.variantTitle": "Variante {index}",
    "messages.variantStats": "Füllung {fill}% • Dichte {density}% • Höhe {height}",
    "items.remove": "Entfernen",
    "items.defaultName": "Artikel {index}",
    "items.seedName": "Kleiner Karton",
    "items.qty": "• {qty}x",
    "placeholders.itemName": "Kleiner Karton",
    "placeholders.presetName": "Meine Kiste",
    "methods.volumeCapacity": "Volumen absteigend + Kapazitätsrotation",
    "methods.volumeFlat": "Volumen absteigend + flache Lagen",
    "methods.maxSide": "Größte Seite zuerst + Kapazitätsrotation",
    "methods.lengthFirst": "Länge zuerst + Kapazitätsrotation",
    "methods.widthFirst": "Breite zuerst + Kapazitätsrotation",
    "methods.heightFlat": "Höhe zuerst + flache Lagen",
    "methods.volumeAsc": "Volumen aufsteigend + Kapazitätsrotation",
    "methods.random": "Zufällige Reihenfolge + Kapazitätsrotation",
    "methods.candidateCapacity": "Kandidatenpositionen + Kapazitätsrotation",
    "methods.candidateFlat": "Kandidatenpositionen + flache Lagen",
    "methods.candidateLength": "Kandidatenpositionen + Länge zuerst",
    "methods.candidateMaxSide": "Kandidatenpositionen + größte Seite",
    "methods.spacesBestFit": "Maximale Freiräume + Best Fit",
    "methods.spacesLowHeight": "Maximale Freiräume + geringe Höhe",
    "methods.spacesBalanced": "Maximale Freiräume + ausgewogene Lücken",
    "methods.maxFill": "Maximale Füllung (ein Artikel)",
  },
  es: {
    title: "Visualizador de empaquetado",
    "language.label": "Idioma",
    "hero.eyebrow": "Optimizador de embalaje",
    "hero.title": "Empaca cajas dentro de cajas con confianza.",
    "hero.subtitle":
      "Ingresa medidas, genera varias variantes y revisa el diseño más eficiente en 3D.",
    "hero.badge": "En el navegador • Vista 3D",
    "sections.outerBox": "Caja externa",
    "sections.items": "Artículos",
    "sections.preview": "Vista 3D",
    "sections.favorites": "Favoritos",
    "sections.history": "Historial",
    "labels.length": "Largo",
    "labels.width": "Ancho",
    "labels.height": "Alto",
    "labels.name": "Nombre",
    "labels.qty": "Cant.",
    "labels.allowRotations": "Permitir rotaciones",
    "labels.allowRotationsAll": "Permitir rotaciones para todos los artículos",
    "labels.showLayers": "Mostrar capas",
    "labels.best": "Mejor",
    "labels.method": "Método",
    "labels.trial": "Ejecución",
    "labels.units": "Unidades",
    "labels.quality": "Calidad",
    "labels.qualityFast": "Rápido",
    "labels.qualityBalanced": "Equilibrado",
    "labels.qualityDeep": "Profundo",
    "labels.presetName": "Nombre del preset",
    "labels.totalQty": "Total {count}",
    "labels.historyVariants": "Variantes",
    "labels.historyMaxFill": "Llenado máximo",
    "labels.maxCount": "Máx. {count}",
    "labels.package": "Paquete",
    "buttons.addItem": "Agregar artículo",
    "buttons.maxFill": "Llenado máximo",
    "buttons.generate": "Generar variantes",
    "buttons.savePreset": "Guardar preset",
    "buttons.loadPreset": "Cargar",
    "buttons.deletePreset": "Quitar",
    "buttons.clearHistory": "Borrar historial",
    "messages.addItems": "Agrega artículos para generar variantes de empaquetado.",
    "messages.noItems": "Aún no hay artículos.",
    "messages.noVariants":
      "No hay variantes viables. Prueba con artículos más pequeños o una caja más grande.",
    "messages.maxFill": "Máximo: {count} unidades • Llenado {fill}%.",
    "messages.maxFillNoFit": "El artículo no cabe en la caja.",
    "messages.noFavorites": "Aún no hay presets guardados.",
    "messages.noHistory": "Sin historial aún.",
    "messages.presetDefault": "Preset {index}",
    "messages.generated": "Variantes: {count}. Mejor llenado: {fill}%.",
    "messages.variantTitle": "Variante {index}",
    "messages.variantStats": "Llenado {fill}% • Densidad {density}% • Altura {height}",
    "items.remove": "Quitar",
    "items.defaultName": "Artículo {index}",
    "items.seedName": "Caja pequeña",
    "items.qty": "• {qty}x",
    "placeholders.itemName": "Caja pequeña",
    "placeholders.presetName": "Mi caja",
    "methods.volumeCapacity": "Volumen descendente + rotación por capacidad",
    "methods.volumeFlat": "Volumen descendente + capas planas",
    "methods.maxSide": "Lado mayor primero + rotación por capacidad",
    "methods.lengthFirst": "Largo primero + rotación por capacidad",
    "methods.widthFirst": "Ancho primero + rotación por capacidad",
    "methods.heightFlat": "Alto primero + capas planas",
    "methods.volumeAsc": "Volumen ascendente + rotación por capacidad",
    "methods.random": "Orden aleatorio + rotación por capacidad",
    "methods.candidateCapacity": "Posiciones candidatas + rotación por capacidad",
    "methods.candidateFlat": "Posiciones candidatas + capas planas",
    "methods.candidateLength": "Posiciones candidatas + largo primero",
    "methods.candidateMaxSide": "Posiciones candidatas + lado mayor",
    "methods.spacesBestFit": "Espacios máximos + mejor ajuste",
    "methods.spacesLowHeight": "Espacios máximos + baja altura",
    "methods.spacesBalanced": "Espacios máximos + huecos equilibrados",
    "methods.maxFill": "Llenado máximo (un artículo)",
  },
  fr: {
    title: "Visualiseur de packing",
    "language.label": "Langue",
    "hero.eyebrow": "Optimiseur d'emballage",
    "hero.title": "Emballez des boîtes dans des boîtes en confiance.",
    "hero.subtitle":
      "Saisissez les dimensions, générez plusieurs variantes et inspectez la meilleure en 3D.",
    "hero.badge": "Navigateur • Aperçu 3D",
    "sections.outerBox": "Boîte externe",
    "sections.items": "Articles",
    "sections.preview": "Aperçu 3D",
    "sections.favorites": "Favoris",
    "sections.history": "Historique",
    "labels.length": "Longueur",
    "labels.width": "Largeur",
    "labels.height": "Hauteur",
    "labels.name": "Nom",
    "labels.qty": "Qté",
    "labels.allowRotations": "Autoriser les rotations",
    "labels.allowRotationsAll": "Autoriser les rotations pour tous les articles",
    "labels.showLayers": "Afficher les couches",
    "labels.best": "Meilleure",
    "labels.method": "Méthode",
    "labels.trial": "Essai",
    "labels.units": "Unités",
    "labels.quality": "Qualité",
    "labels.qualityFast": "Rapide",
    "labels.qualityBalanced": "Équilibré",
    "labels.qualityDeep": "Approfondi",
    "labels.presetName": "Nom du preset",
    "labels.totalQty": "Total {count}",
    "labels.historyVariants": "Variantes",
    "labels.historyMaxFill": "Remplissage max",
    "labels.maxCount": "Max {count}",
    "labels.package": "Colis",
    "buttons.addItem": "Ajouter un article",
    "buttons.maxFill": "Remplissage max",
    "buttons.generate": "Générer des variantes",
    "buttons.savePreset": "Enregistrer le preset",
    "buttons.loadPreset": "Charger",
    "buttons.deletePreset": "Retirer",
    "buttons.clearHistory": "Effacer l'historique",
    "messages.addItems": "Ajoutez des articles pour générer des variantes.",
    "messages.noItems": "Aucun article pour l'instant.",
    "messages.noVariants":
      "Aucune variante viable. Essayez des articles plus petits ou une boîte plus grande.",
    "messages.maxFill": "Maximum : {count} pièces • Remplissage {fill}%.",
    "messages.maxFillNoFit": "L'article ne tient pas dans la boîte.",
    "messages.noFavorites": "Aucun preset enregistré.",
    "messages.noHistory": "Aucun historique pour le moment.",
    "messages.presetDefault": "Preset {index}",
    "messages.generated": "Variantes : {count}. Meilleur remplissage : {fill}%.",
    "messages.variantTitle": "Variante {index}",
    "messages.variantStats": "Remplissage {fill}% • Densité {density}% • Hauteur {height}",
    "items.remove": "Retirer",
    "items.defaultName": "Article {index}",
    "items.seedName": "Petite boîte",
    "items.qty": "• {qty}x",
    "placeholders.itemName": "Petite boîte",
    "placeholders.presetName": "Ma boîte",
    "methods.volumeCapacity": "Volume décroissant + rotation capacité",
    "methods.volumeFlat": "Volume décroissant + couches plates",
    "methods.maxSide": "Plus grand côté d'abord + rotation capacité",
    "methods.lengthFirst": "Longueur d'abord + rotation capacité",
    "methods.widthFirst": "Largeur d'abord + rotation capacité",
    "methods.heightFlat": "Hauteur d'abord + couches plates",
    "methods.volumeAsc": "Volume croissant + rotation capacité",
    "methods.random": "Ordre aléatoire + rotation capacité",
    "methods.candidateCapacity": "Positions candidates + rotation capacité",
    "methods.candidateFlat": "Positions candidates + couches plates",
    "methods.candidateLength": "Positions candidates + longueur d'abord",
    "methods.candidateMaxSide": "Positions candidates + plus grand côté",
    "methods.spacesBestFit": "Espaces maximaux + meilleur ajustement",
    "methods.spacesLowHeight": "Espaces maximaux + faible hauteur",
    "methods.spacesBalanced": "Espaces maximaux + écarts équilibrés",
    "methods.maxFill": "Remplissage max (un article)",
  },
};

const languageSelect = document.getElementById("language-select");
const supportedLangs = Object.keys(translations);
let currentLang = localStorage.getItem("lang") || navigator.language?.slice(0, 2) || "en";
if (!supportedLangs.includes(currentLang)) currentLang = "en";

function t(key, vars = {}) {
  const fallback = translations.en[key] || key;
  const template = translations[currentLang][key] || fallback;
  return template.replace(/\{(\w+)\}/g, (_, token) => vars[token] ?? `{${token}}`);
}

function applyTranslations() {
  document.documentElement.lang = currentLang;
  document.title = t("title");

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    el.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    el.setAttribute("placeholder", t(key));
  });

  if (languageSelect) languageSelect.value = currentLang;
}

const items = [];
let variants = [];
let selectedVariant = null;
let variantMode = "normal";
let generationToken = 0;

const boxInputs = {
  length: document.getElementById("box-length"),
  width: document.getElementById("box-width"),
  height: document.getElementById("box-height"),
};

const itemInputs = {
  name: document.getElementById("item-name"),
  qty: document.getElementById("item-qty"),
  length: document.getElementById("item-length"),
  width: document.getElementById("item-width"),
  height: document.getElementById("item-height"),
  rotatable: document.getElementById("item-rotatable"),
};

const itemsList = document.getElementById("items-list");
const variantsContainer = document.getElementById("variants");
const variantSummary = document.getElementById("variant-summary");
const bestChip = document.getElementById("best-chip");
const allowRotations = document.getElementById("allow-rotations");
const showLayers = document.getElementById("show-layers");
const maxFillButton = document.getElementById("max-fill");
const unitButtons = Array.from(document.querySelectorAll("[data-unit]"));
const qualityButtons = Array.from(document.querySelectorAll("[data-quality]"));
const favoritesList = document.getElementById("favorites-list");
const historyList = document.getElementById("history-list");
const presetNameInput = document.getElementById("preset-name");
const savePresetButton = document.getElementById("save-preset");
const clearHistoryButton = document.getElementById("clear-history");
let currentUnit = localStorage.getItem("unit") || "cm";
if (!["cm", "mm"].includes(currentUnit)) currentUnit = "cm";
let currentQuality = localStorage.getItem("quality") || "balanced";
if (!["fast", "balanced", "deep"].includes(currentQuality)) currentQuality = "balanced";

const STORAGE_KEYS = {
  settings: "packingSettings",
  favorites: "packingFavorites",
  history: "packingHistory",
};
const MAX_HISTORY = 20;
let favorites = [];
let history = [];
let lastAppliedItemSignature = "";
let draftDirty = false;
let lastBox = null;

if (languageSelect) {
  languageSelect.addEventListener("change", () => {
    currentLang = languageSelect.value;
    localStorage.setItem("lang", currentLang);
    applyTranslations();
    updateSeedNames();
    renderItems();
    renderVariants();
    renderScene();
    updateQualityToggleUI();
    renderFavorites();
    renderHistory();
  });
}

unitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextUnit = button.dataset.unit;
    if (nextUnit) {
      setUnit(nextUnit);
    }
  });
});

qualityButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const nextQuality = button.dataset.quality;
    if (nextQuality) {
      setQuality(nextQuality);
    }
  });
});

[itemInputs.name, itemInputs.qty, itemInputs.length, itemInputs.width, itemInputs.height].forEach(
  (input) => {
    input.addEventListener("input", () => {
      draftDirty = true;
      scheduleSave();
    });
  }
);
itemInputs.rotatable.addEventListener("change", () => {
  draftDirty = true;
  scheduleSave();
});

Object.values(boxInputs).forEach((input) => {
  input.addEventListener("input", () => {
    scheduleSave();
  });
});

function readNumber(input) {
  return Math.max(1, Number.parseFloat(input.value) || 0);
}

function roundValue(value) {
  return Math.round(value * 1000) / 1000;
}

function formatUnitValue(value) {
  const fixed = roundValue(value).toFixed(3);
  return fixed.replace(/\.?0+$/, "");
}

function scaleInputValue(input, factor) {
  const value = Number.parseFloat(input.value);
  if (Number.isNaN(value)) return;
  input.value = formatUnitValue(value * factor);
}

function scaleBox(box, factor) {
  box.l = roundValue(box.l * factor);
  box.w = roundValue(box.w * factor);
  box.h = roundValue(box.h * factor);
}

function scalePlacement(placement, factor) {
  placement.position.x = roundValue(placement.position.x * factor);
  placement.position.y = roundValue(placement.position.y * factor);
  placement.position.z = roundValue(placement.position.z * factor);
  placement.dims.l = roundValue(placement.dims.l * factor);
  placement.dims.w = roundValue(placement.dims.w * factor);
  placement.dims.h = roundValue(placement.dims.h * factor);
}

function scaleAllDimensions(factor) {
  Object.values(boxInputs).forEach((input) => scaleInputValue(input, factor));
  [itemInputs.length, itemInputs.width, itemInputs.height].forEach((input) =>
    scaleInputValue(input, factor)
  );

  items.forEach((item) => {
    item.l = roundValue(item.l * factor);
    item.w = roundValue(item.w * factor);
    item.h = roundValue(item.h * factor);
  });

  const scaledBoxes = new Set();
  if (lastBox) {
    scaleBox(lastBox, factor);
    scaledBoxes.add(lastBox);
  }

  variants.forEach((variant) => {
    if (variant.box && !scaledBoxes.has(variant.box)) {
      scaleBox(variant.box, factor);
      scaledBoxes.add(variant.box);
    }

    variant.heightUsed = roundValue(variant.heightUsed * factor);
    variant.layers = variant.layers.map((layer) => roundValue(layer * factor));
    variant.placements.forEach((placement) => scalePlacement(placement, factor));
  });
}

function updateUnitToggleUI() {
  unitButtons.forEach((button) => {
    const isActive = button.dataset.unit === currentUnit;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function updateQualityToggleUI() {
  qualityButtons.forEach((button) => {
    const isActive = button.dataset.quality === currentQuality;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function setUnit(nextUnit, { convert = true } = {}) {
  if (nextUnit === currentUnit) return;
  if (convert) {
    const factor = nextUnit === "mm" ? 10 : 0.1;
    scaleAllDimensions(factor);
  }
  currentUnit = nextUnit;
  localStorage.setItem("unit", currentUnit);
  updateUnitToggleUI();
  renderItems();
  renderVariants();
  renderScene();
  renderFavorites();
  renderHistory();
  saveSettingsToStorage();
}

function setQuality(nextQuality) {
  if (nextQuality === currentQuality) return;
  currentQuality = nextQuality;
  localStorage.setItem("quality", currentQuality);
  updateQualityToggleUI();
}

function getQualityTrialCount(baseTrials, { deepTrials = 100 } = {}) {
  if (baseTrials <= 1) return 1;
  if (currentQuality === "deep") return deepTrials;
  const multiplier = currentQuality === "fast" ? 0.6 : 1;
  return Math.max(1, Math.round(baseTrials * multiplier));
}

function unitFactor(unit) {
  return unit === "mm" ? 10 : 1;
}

function toCmValue(value, unit = currentUnit) {
  return roundValue(value / unitFactor(unit));
}

function fromCmValue(value, unit = currentUnit) {
  return roundValue(value * unitFactor(unit));
}

function setDimensionInputValue(input, value) {
  input.value = formatUnitValue(value);
}

function getSettingsSnapshot() {
  const unit = currentUnit;
  const box = {
    l: toCmValue(readNumber(boxInputs.length), unit),
    w: toCmValue(readNumber(boxInputs.width), unit),
    h: toCmValue(readNumber(boxInputs.height), unit),
  };
  const itemsSnapshot = items.map((item) => ({
    name: item.name,
    qty: item.qty,
    l: toCmValue(item.l, unit),
    w: toCmValue(item.w, unit),
    h: toCmValue(item.h, unit),
    rotatable: item.rotatable,
    isSeed: item.isSeed || false,
  }));
  const draft = {
    name: itemInputs.name.value.trim(),
    qty: Math.max(1, Number.parseInt(itemInputs.qty.value, 10) || 1),
    l: toCmValue(readNumber(itemInputs.length), unit),
    w: toCmValue(readNumber(itemInputs.width), unit),
    h: toCmValue(readNumber(itemInputs.height), unit),
    rotatable: itemInputs.rotatable.checked,
  };

  return {
    unit,
    box,
    items: itemsSnapshot,
    draft,
    allowRotations: allowRotations.checked,
    showLayers: showLayers.checked,
  };
}

function saveSettingsToStorage() {
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(getSettingsSnapshot()));
}

let saveTimer = null;
function scheduleSave() {
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    saveSettingsToStorage();
  }, 200);
}

function readStorage(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw);
  } catch (error) {
    return fallback;
  }
}

function loadFavorites() {
  favorites = readStorage(STORAGE_KEYS.favorites, []);
}

function saveFavorites() {
  localStorage.setItem(STORAGE_KEYS.favorites, JSON.stringify(favorites));
}

function loadHistory() {
  history = readStorage(STORAGE_KEYS.history, []);
}

function saveHistory() {
  localStorage.setItem(STORAGE_KEYS.history, JSON.stringify(history));
}

function applySettings(settings, { save = true } = {}) {
  if (!settings) return;
  generationToken += 1;
  const nextUnit = ["cm", "mm"].includes(settings.unit) ? settings.unit : "cm";
  currentUnit = nextUnit;
  localStorage.setItem("unit", currentUnit);
  updateUnitToggleUI();

  if (settings.box) {
    setDimensionInputValue(boxInputs.length, fromCmValue(settings.box.l, currentUnit));
    setDimensionInputValue(boxInputs.width, fromCmValue(settings.box.w, currentUnit));
    setDimensionInputValue(boxInputs.height, fromCmValue(settings.box.h, currentUnit));
    lastBox = {
      l: fromCmValue(settings.box.l, currentUnit),
      w: fromCmValue(settings.box.w, currentUnit),
      h: fromCmValue(settings.box.h, currentUnit),
    };
  }

  items.length = 0;
  (settings.items || []).forEach((item) => {
    items.push({
      id: crypto.randomUUID(),
      name: item.name,
      qty: Math.max(1, Number.parseInt(item.qty, 10) || 1),
      l: fromCmValue(item.l, currentUnit),
      w: fromCmValue(item.w, currentUnit),
      h: fromCmValue(item.h, currentUnit),
      rotatable: item.rotatable !== false,
      isSeed: item.isSeed || false,
    });
  });
  updateSeedNames();

  if (settings.draft) {
    itemInputs.name.value = settings.draft.name || "";
    itemInputs.qty.value = settings.draft.qty ?? 1;
    setDimensionInputValue(
      itemInputs.length,
      fromCmValue(settings.draft.l ?? 1, currentUnit)
    );
    setDimensionInputValue(
      itemInputs.width,
      fromCmValue(settings.draft.w ?? 1, currentUnit)
    );
    setDimensionInputValue(
      itemInputs.height,
      fromCmValue(settings.draft.h ?? 1, currentUnit)
    );
    itemInputs.rotatable.checked = settings.draft.rotatable !== false;
  }

  if (typeof settings.allowRotations === "boolean") {
    allowRotations.checked = settings.allowRotations;
  }
  if (typeof settings.showLayers === "boolean") {
    showLayers.checked = settings.showLayers;
  }

  variantMode = "normal";
  variants = [];
  selectedVariant = null;
  draftDirty = false;
  lastAppliedItemSignature = getItemInputSignature();
  renderItems();
  renderVariants();
  renderScene();
  if (save) {
    saveSettingsToStorage();
  }
}

function formatBoxSummary(box) {
  const l = formatUnitValue(fromCmValue(box.l, currentUnit));
  const w = formatUnitValue(fromCmValue(box.w, currentUnit));
  const h = formatUnitValue(fromCmValue(box.h, currentUnit));
  return `${l}×${w}×${h} ${currentUnit}`;
}

function formatItemSummary(item) {
  const l = formatUnitValue(fromCmValue(item.l, currentUnit));
  const w = formatUnitValue(fromCmValue(item.w, currentUnit));
  const h = formatUnitValue(fromCmValue(item.h, currentUnit));
  return `${l}×${w}×${h} ${currentUnit}`;
}

function getTotalQty(itemList) {
  return itemList.reduce((sum, item) => sum + (Number.parseInt(item.qty, 10) || 1), 0);
}

function createYieldState() {
  return { lastYield: performance.now(), steps: 0 };
}

async function maybeYield(state) {
  state.steps += 1;
  if (state.steps % 20 !== 0) return;
  if (performance.now() - state.lastYield < 12) return;
  state.lastYield = performance.now();
  await new Promise((resolve) => requestAnimationFrame(resolve));
}

function renderFavorites() {
  if (!favoritesList) return;
  favoritesList.innerHTML = "";
  if (!favorites.length) {
    favoritesList.innerHTML = `<p class="subtitle">${t("messages.noFavorites")}</p>`;
    return;
  }

  favorites.forEach((preset) => {
    const card = document.createElement("div");
    card.className = "list-card";
    const title = document.createElement("strong");
    title.textContent = preset.name;
    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = new Date(preset.createdAt).toLocaleString();
    const boxLine = document.createElement("div");
    if (preset.data?.box) {
      boxLine.textContent = `${t("sections.outerBox")}: ${formatBoxSummary(preset.data.box)}`;
    }
    const itemsLine = document.createElement("div");
    const totalQty = getTotalQty(preset.data?.items || []);
    const itemsCount = preset.data?.items?.length || 0;
    itemsLine.textContent = `${t("sections.items")}: ${itemsCount} • ${t(
      "labels.totalQty",
      { count: totalQty }
    )}`;

    const actions = document.createElement("div");
    actions.className = "list-actions";
    const loadButton = document.createElement("button");
    loadButton.className = "ghost";
    loadButton.textContent = t("buttons.loadPreset");
    loadButton.addEventListener("click", () => {
      applySettings(preset.data);
    });
    const deleteButton = document.createElement("button");
    deleteButton.className = "ghost";
    deleteButton.textContent = t("buttons.deletePreset");
    deleteButton.addEventListener("click", () => {
      favorites = favorites.filter((entry) => entry.id !== preset.id);
      saveFavorites();
      renderFavorites();
    });

    actions.appendChild(loadButton);
    actions.appendChild(deleteButton);

    card.appendChild(title);
    card.appendChild(meta);
    if (boxLine.textContent) {
      card.appendChild(boxLine);
    }
    card.appendChild(itemsLine);
    card.appendChild(actions);
    favoritesList.appendChild(card);
  });
}

function renderHistory() {
  if (!historyList) return;
  historyList.innerHTML = "";
  if (!history.length) {
    historyList.innerHTML = `<p class="subtitle">${t("messages.noHistory")}</p>`;
    return;
  }

  history.forEach((entry) => {
    const card = document.createElement("div");
    card.className = "list-card";
    const title = document.createElement("strong");
    title.textContent = t(
      entry.mode === "maxFill" ? "labels.historyMaxFill" : "labels.historyVariants"
    );
    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent = new Date(entry.createdAt).toLocaleString();
    const boxLine = document.createElement("div");
    if (entry.box) {
      boxLine.textContent = `${t("sections.outerBox")}: ${formatBoxSummary(entry.box)}`;
    }
    const itemsLine = document.createElement("div");
    const list = entry.items || [];
    const totalQty = getTotalQty(list);
    itemsLine.textContent = `${t("sections.items")}: ${list.length} • ${t("labels.totalQty", {
      count: totalQty,
    })}`;

    const extraLine = document.createElement("div");
    if (entry.mode === "maxFill" && entry.resultCount != null) {
      extraLine.textContent = `${t("labels.maxCount", { count: entry.resultCount })}`;
    }

    const packageLine = document.createElement("div");
    let packageItem = null;
    if (entry.mode === "maxFill" && entry.draft) {
      packageItem = entry.draft;
    } else if (list.length === 1) {
      packageItem = list[0];
    }
    if (packageItem) {
      const qtyValue = packageItem.qty ?? 1;
      packageLine.textContent = `${t("labels.package")}: ${formatItemSummary(
        packageItem
      )} • ${t("labels.qty")}: ${qtyValue}`;
    }

    const actions = document.createElement("div");
    actions.className = "list-actions";
    const loadButton = document.createElement("button");
    loadButton.className = "ghost";
    loadButton.textContent = t("buttons.loadPreset");
    loadButton.addEventListener("click", () => {
      applySettings(entry);
    });

    actions.appendChild(loadButton);

    card.appendChild(title);
    card.appendChild(meta);
    if (boxLine.textContent) {
      card.appendChild(boxLine);
    }
    card.appendChild(itemsLine);
    if (extraLine.textContent) {
      card.appendChild(extraLine);
    }
    if (packageLine.textContent) {
      card.appendChild(packageLine);
    }
    card.appendChild(actions);
    historyList.appendChild(card);
  });
}

function addHistoryEntry(entry) {
  history.unshift(entry);
  history = history.slice(0, MAX_HISTORY);
  saveHistory();
  renderHistory();
}

function getItemInputSignature() {
  return [
    itemInputs.name.value.trim(),
    itemInputs.qty.value,
    itemInputs.length.value,
    itemInputs.width.value,
    itemInputs.height.value,
    itemInputs.rotatable.checked ? "1" : "0",
  ].join("|");
}

function renderItems() {
  itemsList.innerHTML = "";
  if (!items.length) {
    itemsList.innerHTML = `<p class="subtitle">${t("messages.noItems")}</p>`;
    return;
  }

  items.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "item-card";
    const info = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = item.name;
    const qty = document.createElement("span");
    qty.textContent = t("items.qty", { qty: item.qty });
    info.appendChild(name);
    info.appendChild(document.createTextNode(" "));
    info.appendChild(qty);

    const dims = document.createElement("span");
    dims.textContent = `${formatUnitValue(item.l)}×${formatUnitValue(item.w)}×${formatUnitValue(
      item.h
    )}`;

    const remove = document.createElement("button");
    remove.textContent = t("items.remove");
    remove.className = "primary";
    remove.style.padding = "6px 10px";
    remove.addEventListener("click", () => {
      items.splice(index, 1);
      renderItems();
      saveSettingsToStorage();
      generateVariants();
    });

    card.appendChild(info);
    card.appendChild(dims);
    card.appendChild(remove);
    itemsList.appendChild(card);
  });
}

function addItem({ skipGenerate = false } = {}) {
  const name =
    itemInputs.name.value.trim() || t("items.defaultName", { index: items.length + 1 });
  const qty = Math.max(1, Number.parseInt(itemInputs.qty.value, 10) || 1);
  const l = readNumber(itemInputs.length);
  const w = readNumber(itemInputs.width);
  const h = readNumber(itemInputs.height);
  const rotatable = itemInputs.rotatable.checked;

  items.push({ id: crypto.randomUUID(), name, qty, l, w, h, rotatable });
  itemInputs.name.value = "";
  lastAppliedItemSignature = getItemInputSignature();
  draftDirty = false;
  renderItems();
  saveSettingsToStorage();
  if (!skipGenerate) {
    generateVariants();
  }
}

function applyDraftItem() {
  if (!draftDirty) return;
  const qty = Math.max(1, Number.parseInt(itemInputs.qty.value, 10) || 1);
  const l = readNumber(itemInputs.length);
  const w = readNumber(itemInputs.width);
  const h = readNumber(itemInputs.height);
  const rotatable = itemInputs.rotatable.checked;
  const nameInput = itemInputs.name.value.trim();

  if (!nameInput && items.length) {
    const target = items[items.length - 1];
    target.qty = qty;
    target.l = l;
    target.w = w;
    target.h = h;
    target.rotatable = rotatable;
  } else {
    const name = nameInput || t("items.defaultName", { index: items.length + 1 });
    items.push({ id: crypto.randomUUID(), name, qty, l, w, h, rotatable });
    itemInputs.name.value = "";
  }

  lastAppliedItemSignature = getItemInputSignature();
  draftDirty = false;
  renderItems();
  saveSettingsToStorage();
}

function getDraftItemForMaxFill() {
  const name =
    itemInputs.name.value.trim() ||
    items[items.length - 1]?.name ||
    t("items.defaultName", { index: items.length + 1 });

  return {
    id: "max-fill-item",
    name,
    qty: 1,
    l: readNumber(itemInputs.length),
    w: readNumber(itemInputs.width),
    h: readNumber(itemInputs.height),
    rotatable: itemInputs.rotatable.checked,
  };
}

function expandItems() {
  const expanded = [];
  items.forEach((item) => {
    for (let i = 0; i < item.qty; i += 1) {
      expanded.push({
        id: `${item.id}-${i}`,
        name: item.name,
        l: item.l,
        w: item.w,
        h: item.h,
        rotatable: item.rotatable,
      });
    }
  });
  return expanded;
}

function getOrientations(item, rotationsAllowed) {
  const dims = [
    [item.l, item.w, item.h],
    [item.l, item.h, item.w],
    [item.w, item.l, item.h],
    [item.w, item.h, item.l],
    [item.h, item.l, item.w],
    [item.h, item.w, item.l],
  ];
  if (!rotationsAllowed || !item.rotatable) {
    return [dims[0]];
  }
  const seen = new Set();
  return dims.filter(([l, w, h]) => {
    const key = `${l}-${w}-${h}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getOrientationCandidates(item, box, rotationsAllowed, policy = "capacity") {
  const orientations = getOrientations(item, rotationsAllowed).map((dims) => {
    const [l, w, h] = dims;
    const fitX = Math.floor(box.l / l);
    const fitY = Math.floor(box.w / w);
    const fitZ = Math.floor(box.h / h);
    const capacity = fitX * fitY * fitZ;
    const footprint = l * w;
    return { dims, capacity, footprint, height: h, l, w, h };
  });

  orientations.sort((a, b) => {
    const keysA = getOrientationSortKeys(a, policy);
    const keysB = getOrientationSortKeys(b, policy);
    for (let i = 0; i < keysA.length; i += 1) {
      if (keysA[i] !== keysB[i]) return keysA[i] - keysB[i];
    }
    return 0;
  });

  return orientations;
}

function getOrientationSortKeys(entry, policy) {
  switch (policy) {
    case "flat":
      return [entry.height, -entry.footprint, -entry.capacity];
    case "tall":
      return [-entry.height, -entry.footprint, -entry.capacity];
    case "length":
      return [-entry.l, -entry.w, -entry.h];
    case "width":
      return [-entry.w, -entry.l, -entry.h];
    case "height":
      return [-entry.h, -entry.l, -entry.w];
    default:
      return [-entry.capacity, -entry.footprint, entry.height];
  }
}

function tryPlace(state, dims, box) {
  const [l, w, h] = dims;
  const attempts = [
    { x: state.x, y: state.y, z: state.z, rowDepth: state.rowDepth, layerHeight: state.layerHeight, mode: "same" },
    { x: 0, y: state.y + state.rowDepth, z: state.z, rowDepth: 0, layerHeight: state.layerHeight, mode: "row" },
    { x: 0, y: 0, z: state.z + state.layerHeight, rowDepth: 0, layerHeight: 0, mode: "layer" },
  ];

  for (const attempt of attempts) {
    if (attempt.x + l <= box.l && attempt.y + w <= box.w && attempt.z + h <= box.h) {
      const nextRowDepth = Math.max(attempt.rowDepth, w);
      const nextLayerHeight = Math.max(attempt.layerHeight, h);
      return {
        position: { x: attempt.x, y: attempt.y, z: attempt.z },
        dims: { l, w, h },
        mode: attempt.mode,
        nextState: {
          x: attempt.x + l,
          y: attempt.y,
          z: attempt.z,
          rowDepth: nextRowDepth,
          layerHeight: nextLayerHeight,
        },
      };
    }
  }

  return null;
}

function choosePlacement(state, item, box, rotationsAllowed, orientationPolicy) {
  const orientations = getOrientationCandidates(item, box, rotationsAllowed, orientationPolicy);
  const candidates = orientations
    .map((candidate, pref) => {
      const placement = tryPlace(state, candidate.dims, box);
      if (!placement) return null;
      return { ...placement, pref };
    })
    .filter(Boolean)
    .map((candidate) => {
      const remainingX = box.l - (candidate.position.x + candidate.dims.l);
      const remainingY = box.w - (candidate.position.y + candidate.dims.w);
      const remainingZ = box.h - (candidate.position.z + candidate.dims.h);
      return {
        ...candidate,
        score: [
          candidate.pref,
          candidate.position.z,
          candidate.position.y,
          remainingX,
          remainingY,
          remainingZ,
        ],
      };
    });

  candidates.sort((a, b) => {
    for (let i = 0; i < a.score.length; i += 1) {
      if (a.score[i] !== b.score[i]) return a.score[i] - b.score[i];
    }
    return 0;
  });

  return candidates[0] || null;
}

function rangesOverlap(aStart, aSize, bStart, bSize) {
  return aStart < bStart + bSize && bStart < aStart + aSize;
}

function canPlaceAt(position, dims, placements, box) {
  if (
    position.x + dims.l > box.l ||
    position.y + dims.w > box.w ||
    position.z + dims.h > box.h
  ) {
    return false;
  }

  for (const placement of placements) {
    const overlapX = rangesOverlap(position.x, dims.l, placement.position.x, placement.dims.l);
    const overlapY = rangesOverlap(position.y, dims.w, placement.position.y, placement.dims.w);
    const overlapZ = rangesOverlap(position.z, dims.h, placement.position.z, placement.dims.h);
    if (overlapX && overlapY && overlapZ) {
      return false;
    }
  }

  return true;
}

function addCandidatePosition(positions, positionSet, position, box) {
  if (position.x >= box.l || position.y >= box.w || position.z >= box.h) return;
  const key = `${position.x}|${position.y}|${position.z}`;
  if (positionSet.has(key)) return;
  positionSet.add(key);
  positions.push(position);
}

function comparePositions(a, b) {
  if (a.z !== b.z) return a.z - b.z;
  if (a.y !== b.y) return a.y - b.y;
  return a.x - b.x;
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

function shuffleInPlace(array, rng) {
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function getPositionOrder(strategy) {
  const orders = {
    zyx: ["z", "y", "x"],
    zxy: ["z", "x", "y"],
    yxz: ["y", "x", "z"],
    xyz: ["x", "y", "z"],
  };
  return orders[strategy] || orders.zyx;
}

function getPositionComparator(strategy) {
  const order = getPositionOrder(strategy);
  return (a, b) => {
    for (const axis of order) {
      if (a[axis] !== b[axis]) return a[axis] - b[axis];
    }
    return 0;
  };
}

function getPositionScore(position, pref, strategy) {
  const order = getPositionOrder(strategy);
  return [...order.map((axis) => position[axis]), pref];
}

function compareScores(score, bestScore) {
  if (!bestScore) return -1;
  for (let i = 0; i < score.length; i += 1) {
    if (score[i] !== bestScore[i]) return score[i] < bestScore[i] ? -1 : 1;
  }
  return 0;
}

function isBetterScore(score, bestScore) {
  if (!bestScore) return true;
  for (let i = 0; i < score.length; i += 1) {
    if (score[i] !== bestScore[i]) return score[i] < bestScore[i];
  }
  return false;
}

function settlePlacements(placements) {
  const sorted = [...placements].sort((a, b) => a.position.z - b.position.z);
  const settled = [];

  sorted.forEach((placement) => {
    let supportZ = 0;
    settled.forEach((below) => {
      const overlapX = rangesOverlap(
        placement.position.x,
        placement.dims.l,
        below.position.x,
        below.dims.l
      );
      const overlapY = rangesOverlap(
        placement.position.y,
        placement.dims.w,
        below.position.y,
        below.dims.w
      );
      if (overlapX && overlapY) {
        supportZ = Math.max(supportZ, below.position.z + below.dims.h);
      }
    });
    placement.position.z = supportZ;
    settled.push(placement);
  });
}

function packItems(order, box, rotationsAllowed, orientationPolicy) {
  const state = { x: 0, y: 0, z: 0, rowDepth: 0, layerHeight: 0 };
  const placements = [];
  const layers = new Set([0]);

  for (const item of order) {
    const placement = choosePlacement(state, item, box, rotationsAllowed, orientationPolicy);
    if (!placement) {
      return { valid: false, placements: [], layers: [] };
    }

    if (placement.mode === "layer") {
      layers.add(placement.position.z);
    }

    placements.push({
      item,
      position: placement.position,
      dims: placement.dims,
    });

    state.x = placement.nextState.x;
    state.y = placement.nextState.y;
    state.z = placement.nextState.z;
    state.rowDepth = placement.nextState.rowDepth;
    state.layerHeight = placement.nextState.layerHeight;
  }

  settlePlacements(placements);

  const heightUsed = placements.reduce(
    (max, placement) => Math.max(max, placement.position.z + placement.dims.h),
    0
  );
  const settledLayers = Array.from(
    new Set(placements.map((placement) => placement.position.z))
  ).sort((a, b) => a - b);

  return {
    valid: true,
    placements,
    heightUsed,
    layers: settledLayers.length ? settledLayers : Array.from(layers).sort((a, b) => a - b),
  };
}

function packItemsCandidates(
  order,
  box,
  rotationsAllowed,
  orientationPolicy,
  {
    rng = Math.random,
    positionStrategy = "zyx",
    shuffleCandidates = false,
    randomTieBreak = false,
  } = {}
) {
  const placements = [];
  const candidates = [{ x: 0, y: 0, z: 0 }];
  const candidateSet = new Set(["0|0|0"]);
  const compare = getPositionComparator(positionStrategy);

  for (const item of order) {
    let placed = false;
    if (shuffleCandidates) {
      shuffleInPlace(candidates, rng);
    } else {
      candidates.sort(compare);
    }

    while (candidates.length) {
      const position = candidates.shift();
      const orientations = getOrientationCandidates(item, box, rotationsAllowed, orientationPolicy);
      let best = null;
      let bestScore = null;
      let bestList = [];

      orientations.forEach((candidate, pref) => {
        const dims = { l: candidate.dims[0], w: candidate.dims[1], h: candidate.dims[2] };
        if (!canPlaceAt(position, dims, placements, box)) return;

        const score = getPositionScore(position, pref, positionStrategy);
        const comparison = compareScores(score, bestScore);
        if (comparison < 0) {
          bestScore = score;
          bestList = [{ position, dims }];
        } else if (comparison === 0) {
          bestList.push({ position, dims });
        }
      });

      if (bestList.length) {
        best = randomTieBreak ? bestList[Math.floor(rng() * bestList.length)] : bestList[0];
        placements.push({
          item,
          position: { ...best.position },
          dims: best.dims,
        });

        addCandidatePosition(
          candidates,
          candidateSet,
          { x: best.position.x + best.dims.l, y: best.position.y, z: best.position.z },
          box
        );
        addCandidatePosition(
          candidates,
          candidateSet,
          { x: best.position.x, y: best.position.y + best.dims.w, z: best.position.z },
          box
        );
        addCandidatePosition(
          candidates,
          candidateSet,
          { x: best.position.x, y: best.position.y, z: best.position.z + best.dims.h },
          box
        );

        placed = true;
        break;
      }
    }

    if (!placed) {
      return { valid: false, placements: [], layers: [] };
    }
  }

  settlePlacements(placements);
  const heightUsed = placements.reduce(
    (max, placement) => Math.max(max, placement.position.z + placement.dims.h),
    0
  );
  const layers = Array.from(new Set(placements.map((placement) => placement.position.z))).sort(
    (a, b) => a - b
  );

  return { valid: true, placements, heightUsed, layers };
}

function compareScoreVectors(a, b) {
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] !== b[i]) return a[i] - b[i];
  }
  return 0;
}

function getSpaceScore(space, dims, policy, pref, tieBreaker) {
  const dx = space.l - dims.l;
  const dy = space.w - dims.w;
  const dz = space.h - dims.h;
  const waste = space.l * space.w * space.h - dims.l * dims.w * dims.h;
  const maxGap = Math.max(dx, dy, dz);
  const minGap = Math.min(dx, dy, dz);
  const top = space.z + dims.h;

  switch (policy) {
    case "height":
      return [top, waste, maxGap, space.z, space.y, space.x, pref, tieBreaker];
    case "tight":
      return [maxGap, minGap, waste, top, space.z, space.y, space.x, pref, tieBreaker];
    default:
      return [waste, maxGap, top, space.z, space.y, space.x, pref, tieBreaker];
  }
}

function splitSpace(space, dims) {
  const spaces = [];
  const remainingX = space.l - dims.l;
  const remainingY = space.w - dims.w;
  const remainingZ = space.h - dims.h;

  if (remainingX > 0) {
    spaces.push({
      x: space.x + dims.l,
      y: space.y,
      z: space.z,
      l: remainingX,
      w: space.w,
      h: space.h,
    });
  }

  if (remainingY > 0) {
    spaces.push({
      x: space.x,
      y: space.y + dims.w,
      z: space.z,
      l: dims.l,
      w: remainingY,
      h: space.h,
    });
  }

  if (remainingZ > 0) {
    spaces.push({
      x: space.x,
      y: space.y,
      z: space.z + dims.h,
      l: dims.l,
      w: dims.w,
      h: remainingZ,
    });
  }

  return spaces;
}

function spaceContains(container, space) {
  return (
    space.x >= container.x &&
    space.y >= container.y &&
    space.z >= container.z &&
    space.x + space.l <= container.x + container.l &&
    space.y + space.w <= container.y + container.w &&
    space.z + space.h <= container.z + container.h
  );
}

function pruneSpaces(spaces) {
  return spaces.filter((space, index) => {
    if (space.l <= 0 || space.w <= 0 || space.h <= 0) {
      return false;
    }

    for (let i = 0; i < spaces.length; i += 1) {
      if (i === index) continue;
      if (spaceContains(spaces[i], space)) return false;
    }

    return true;
  });
}

function packItemsSpaces(
  order,
  box,
  rotationsAllowed,
  orientationPolicy,
  { scorePolicy = "waste" } = {}
) {
  const placements = [];
  let spaces = [{ x: 0, y: 0, z: 0, l: box.l, w: box.w, h: box.h }];

  for (const item of order) {
    let best = null;
    let bestScore = null;

    spaces.forEach((space, spaceIndex) => {
      const orientations = getOrientationCandidates(item, space, rotationsAllowed, orientationPolicy);
      orientations.forEach((candidate, pref) => {
        const dims = { l: candidate.dims[0], w: candidate.dims[1], h: candidate.dims[2] };
        if (dims.l > space.l || dims.w > space.w || dims.h > space.h) return;
        const position = { x: space.x, y: space.y, z: space.z };
        if (!canPlaceAt(position, dims, placements, box)) return;

        const score = getSpaceScore(space, dims, scorePolicy, pref, spaceIndex);
        if (!bestScore || compareScoreVectors(score, bestScore) < 0) {
          bestScore = score;
          best = { space, spaceIndex, dims };
        }
      });
    });

    if (!best) {
      return { valid: false, placements: [], layers: [] };
    }

    placements.push({
      item,
      position: { x: best.space.x, y: best.space.y, z: best.space.z },
      dims: best.dims,
    });

    const nextSpaces = splitSpace(best.space, best.dims);
    spaces = spaces.filter((_, index) => index !== best.spaceIndex);
    spaces.push(...nextSpaces);
    spaces = pruneSpaces(spaces);
  }

  settlePlacements(placements);
  const heightUsed = placements.reduce(
    (max, placement) => Math.max(max, placement.position.z + placement.dims.h),
    0
  );
  const layers = Array.from(new Set(placements.map((placement) => placement.position.z))).sort(
    (a, b) => a - b
  );

  return { valid: true, placements, heightUsed, layers };
}

function packMaxIdenticalItems(
  item,
  box,
  rotationsAllowed,
  orientationPolicy,
  { scorePolicy = "waste", rng = Math.random, randomTieBreak = false } = {}
) {
  const placements = [];
  let spaces = [{ x: 0, y: 0, z: 0, l: box.l, w: box.w, h: box.h }];

  while (true) {
    let best = null;
    let bestScore = null;
    let bestCandidates = [];

    spaces.forEach((space, spaceIndex) => {
      const orientations = getOrientationCandidates(item, space, rotationsAllowed, orientationPolicy);
      orientations.forEach((candidate, pref) => {
        const dims = { l: candidate.dims[0], w: candidate.dims[1], h: candidate.dims[2] };
        if (dims.l > space.l || dims.w > space.w || dims.h > space.h) return;
        const position = { x: space.x, y: space.y, z: space.z };
        if (!canPlaceAt(position, dims, placements, box)) return;

        const tieBreaker = randomTieBreak ? rng() : spaceIndex;
        const score = getSpaceScore(space, dims, scorePolicy, pref, tieBreaker);
        if (!bestScore) {
          bestScore = score;
          bestCandidates = [{ space, spaceIndex, dims }];
          return;
        }
        const comparison = compareScoreVectors(score, bestScore);
        if (comparison < 0) {
          bestScore = score;
          bestCandidates = [{ space, spaceIndex, dims }];
        } else if (comparison === 0) {
          bestCandidates.push({ space, spaceIndex, dims });
        }
      });
    });

    if (bestCandidates.length) {
      best = randomTieBreak
        ? bestCandidates[Math.floor(rng() * bestCandidates.length)]
        : bestCandidates[0];
    }

    if (!best) break;

    placements.push({
      item,
      position: { x: best.space.x, y: best.space.y, z: best.space.z },
      dims: best.dims,
    });

    const nextSpaces = splitSpace(best.space, best.dims);
    spaces = spaces.filter((_, index) => index !== best.spaceIndex);
    spaces.push(...nextSpaces);
    spaces = pruneSpaces(spaces);
  }

  if (!placements.length) {
    return { valid: false, placements: [], layers: [] };
  }

  settlePlacements(placements);
  const heightUsed = placements.reduce(
    (max, placement) => Math.max(max, placement.position.z + placement.dims.h),
    0
  );
  const layers = Array.from(new Set(placements.map((placement) => placement.position.z))).sort(
    (a, b) => a - b
  );

  return { valid: true, placements, heightUsed, layers };
}

function scoreVariant(result, box, totalVolume) {
  const fill = totalVolume / (box.l * box.w * box.h);
  const extents = result.placements.reduce(
    (acc, placement) => ({
      x: Math.max(acc.x, placement.position.x + placement.dims.l),
      y: Math.max(acc.y, placement.position.y + placement.dims.w),
      z: Math.max(acc.z, placement.position.z + placement.dims.h),
    }),
    { x: 0, y: 0, z: 0 }
  );
  const envelopeVolume = extents.x * extents.y * extents.z;
  const compactness = envelopeVolume ? totalVolume / envelopeVolume : 0;
  const heightPenalty = result.heightUsed / box.h;
  const layerPenalty = result.layers.length * 0.015;
  const score = compactness - heightPenalty * 0.08 - layerPenalty;
  return { fill, compactness, score };
}

async function generateVariants({ recordHistory = false } = {}) {
  const runId = ++generationToken;
  const yieldState = createYieldState();
  const box = {
    l: readNumber(boxInputs.length),
    w: readNumber(boxInputs.width),
    h: readNumber(boxInputs.height),
  };
  lastBox = box;
  variantMode = "normal";

  const expanded = expandItems();
  if (!expanded.length) {
    variants = [];
    selectedVariant = null;
    renderVariants();
    renderScene();
    return;
  }

  const rotationsAllowed = allowRotations.checked;
  const totalVolume = expanded.reduce((sum, item) => sum + item.l * item.w * item.h, 0);
  const itemCount = expanded.length;

  function getTrialCount(method) {
    const baseTrials = method.trials ?? 1;
    if (baseTrials <= 1) return 1;
    if (currentQuality === "deep") return 100;
    const qualityTrials = getQualityTrialCount(baseTrials, { deepTrials: 100 });
    if (itemCount <= 20) return qualityTrials;
    if (itemCount <= 40) return Math.max(1, Math.round(qualityTrials * 0.6));
    return Math.max(1, Math.round(qualityTrials * 0.4));
  }

  const methods = [
    {
      id: "volumeCapacity",
      labelKey: "methods.volumeCapacity",
      orientation: "capacity",
      packer: "grid",
      trials: 1,
      order: (items) => [...items].sort((a, b) => b.l * b.w * b.h - a.l * a.w * a.h),
    },
    {
      id: "volumeFlat",
      labelKey: "methods.volumeFlat",
      orientation: "flat",
      packer: "grid",
      trials: 1,
      order: (items) => [...items].sort((a, b) => b.l * b.w * b.h - a.l * a.w * a.h),
    },
    {
      id: "maxSide",
      labelKey: "methods.maxSide",
      orientation: "capacity",
      packer: "grid",
      trials: 1,
      order: (items) => [...items].sort((a, b) => Math.max(b.l, b.w, b.h) - Math.max(a.l, a.w, a.h)),
    },
    {
      id: "lengthFirst",
      labelKey: "methods.lengthFirst",
      orientation: "capacity",
      packer: "grid",
      trials: 1,
      order: (items) => [...items].sort((a, b) => b.l - a.l),
    },
    {
      id: "widthFirst",
      labelKey: "methods.widthFirst",
      orientation: "capacity",
      packer: "grid",
      trials: 1,
      order: (items) => [...items].sort((a, b) => b.w - a.w),
    },
    {
      id: "heightFlat",
      labelKey: "methods.heightFlat",
      orientation: "flat",
      packer: "grid",
      trials: 1,
      order: (items) => [...items].sort((a, b) => b.h - a.h),
    },
    {
      id: "volumeAsc",
      labelKey: "methods.volumeAsc",
      orientation: "capacity",
      packer: "grid",
      trials: 1,
      order: (items) => [...items].sort((a, b) => a.l * a.w * a.h - b.l * b.w * b.h),
    },
    {
      id: "random",
      labelKey: "methods.random",
      orientation: "capacity",
      packer: "grid",
      trials: 12,
      keepBestOnly: true,
      order: (items, rng) => {
        const copy = [...items];
        shuffleInPlace(copy, rng);
        return copy;
      },
    },
    {
      id: "candidateCapacity",
      labelKey: "methods.candidateCapacity",
      orientation: "capacity",
      packer: "candidates",
      trials: 8,
      keepBestOnly: true,
      positionStrategy: "zyx",
      shuffleCandidates: true,
      randomTieBreak: true,
      order: (items) => [...items].sort((a, b) => b.l * b.w * b.h - a.l * a.w * a.h),
    },
    {
      id: "candidateFlat",
      labelKey: "methods.candidateFlat",
      orientation: "flat",
      packer: "candidates",
      trials: 6,
      keepBestOnly: true,
      positionStrategy: "zxy",
      shuffleCandidates: true,
      randomTieBreak: true,
      order: (items) => [...items].sort((a, b) => b.l * b.w * b.h - a.l * a.w * a.h),
    },
    {
      id: "candidateLength",
      labelKey: "methods.candidateLength",
      orientation: "length",
      packer: "candidates",
      trials: 6,
      keepBestOnly: true,
      positionStrategy: "yxz",
      shuffleCandidates: true,
      randomTieBreak: true,
      order: (items) => [...items].sort((a, b) => b.l - a.l),
    },
    {
      id: "candidateMaxSide",
      labelKey: "methods.candidateMaxSide",
      orientation: "capacity",
      packer: "candidates",
      trials: 6,
      keepBestOnly: true,
      positionStrategy: "xyz",
      shuffleCandidates: true,
      randomTieBreak: true,
      order: (items) => [...items].sort((a, b) => Math.max(b.l, b.w, b.h) - Math.max(a.l, a.w, a.h)),
    },
    {
      id: "spacesBestFit",
      labelKey: "methods.spacesBestFit",
      orientation: "capacity",
      packer: "spaces",
      trials: 1,
      scorePolicy: "waste",
      order: (items) => [...items].sort((a, b) => b.l * b.w * b.h - a.l * a.w * a.h),
    },
    {
      id: "spacesLowHeight",
      labelKey: "methods.spacesLowHeight",
      orientation: "flat",
      packer: "spaces",
      trials: 1,
      scorePolicy: "height",
      order: (items) => [...items].sort((a, b) => Math.max(b.l, b.w, b.h) - Math.max(a.l, a.w, a.h)),
    },
    {
      id: "spacesBalanced",
      labelKey: "methods.spacesBalanced",
      orientation: "capacity",
      packer: "spaces",
      trials: 10,
      keepBestOnly: true,
      scorePolicy: "tight",
      order: (items, rng) => {
        const copy = [...items];
        shuffleInPlace(copy, rng);
        return copy;
      },
    },
  ];

  const baseSeed = Math.floor(Math.random() * 1_000_000_000);
  const allVariants = [];

  for (let index = 0; index < methods.length; index += 1) {
    const method = methods[index];
    const trials = getTrialCount(method);
    let bestVariant = null;
    const collected = [];

    for (let trialIndex = 0; trialIndex < trials; trialIndex += 1) {
      if (runId !== generationToken) return;
      const rng = createRng(baseSeed + index * 101 + trialIndex * 17);
      const order = method.order(expanded, rng);
      const packed =
        method.packer === "candidates"
          ? packItemsCandidates(order, box, rotationsAllowed, method.orientation, {
              rng,
              positionStrategy: method.positionStrategy,
              shuffleCandidates: method.shuffleCandidates,
              randomTieBreak: method.randomTieBreak,
            })
          : method.packer === "spaces"
            ? packItemsSpaces(order, box, rotationsAllowed, method.orientation, {
                scorePolicy: method.scorePolicy,
              })
            : packItems(order, box, rotationsAllowed, method.orientation);
      if (packed.valid) {
        const scoring = scoreVariant(packed, box, totalVolume);
        const variant = {
          id: `variant-${index}-${trialIndex}`,
          methodLabelKey: method.labelKey,
          trial: trials > 1 ? trialIndex + 1 : null,
          placements: packed.placements,
          layers: packed.layers,
          fill: scoring.fill,
          compactness: scoring.compactness,
          score: scoring.score,
          heightUsed: packed.heightUsed,
          box,
        };
        if (method.keepBestOnly) {
          if (!bestVariant || variant.score > bestVariant.score) {
            bestVariant = variant;
          }
        } else {
          collected.push(variant);
        }
      }

      await maybeYield(yieldState);
    }

    if (method.keepBestOnly) {
      if (bestVariant) {
        allVariants.push(bestVariant);
      }
    } else {
      allVariants.push(...collected);
    }
  }

  variants = allVariants.sort((a, b) => b.score - a.score);

  if (runId !== generationToken) return;
  selectedVariant = variants[0] || null;
  renderVariants();
  renderScene();

  if (recordHistory && variants.length) {
    const snapshot = getSettingsSnapshot();
    addHistoryEntry({
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      mode: "variants",
      unit: snapshot.unit,
      box: snapshot.box,
      items: snapshot.items,
      draft: snapshot.draft,
      resultCount: getTotalQty(snapshot.items || []),
    });
  }
}

async function generateMaxFillVariant() {
  const runId = ++generationToken;
  const yieldState = createYieldState();
  const box = {
    l: readNumber(boxInputs.length),
    w: readNumber(boxInputs.width),
    h: readNumber(boxInputs.height),
  };
  lastBox = box;
  variantMode = "maxFill";

  const item = getDraftItemForMaxFill();
  const rotationsAllowed = allowRotations.checked;
  const itemVolume = item.l * item.w * item.h;

  const strategies = [
    { orientation: "capacity", scorePolicy: "waste" },
    { orientation: "capacity", scorePolicy: "tight" },
    { orientation: "flat", scorePolicy: "height" },
  ];

  const baseSeed = Math.floor(Math.random() * 1_000_000_000);
  const trials = getQualityTrialCount(12, { deepTrials: 100 });
  const maxFillVariants = [];

  for (let index = 0; index < strategies.length; index += 1) {
    const strategy = strategies[index];
    let best = null;

    for (let trialIndex = 0; trialIndex < trials; trialIndex += 1) {
      if (runId !== generationToken) return;
      const rng = createRng(baseSeed + index * 101 + trialIndex * 17);
      const packed = packMaxIdenticalItems(item, box, rotationsAllowed, strategy.orientation, {
        scorePolicy: strategy.scorePolicy,
        rng,
        randomTieBreak: trials > 1,
      });
      if (packed.valid) {
        const count = packed.placements.length;
        const scoring = scoreVariant(packed, box, itemVolume * count);
        const variant = {
          id: `max-fill-${index}-${trialIndex}`,
          methodLabelKey: "methods.maxFill",
          trial: strategies.length > 1 ? index + 1 : null,
          placements: packed.placements,
          layers: packed.layers,
          fill: scoring.fill,
          compactness: scoring.compactness,
          score: scoring.score,
          heightUsed: packed.heightUsed,
          count,
          box,
        };
        if (
          !best ||
          count > best.count ||
          (count === best.count && variant.score > best.score)
        ) {
          best = variant;
        }
      }

      await maybeYield(yieldState);
    }

    if (best) {
      maxFillVariants.push(best);
    }
  }

  variants = maxFillVariants.sort((a, b) => (b.count - a.count) || (b.score - a.score));

  if (runId !== generationToken) return;
  selectedVariant = variants[0] || null;
  renderVariants();
  renderScene();

  if (selectedVariant) {
    itemInputs.qty.value = selectedVariant.count;
    draftDirty = true;
    scheduleSave();
    const snapshot = getSettingsSnapshot();
    addHistoryEntry({
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      mode: "maxFill",
      unit: snapshot.unit,
      box: snapshot.box,
      items: snapshot.items,
      draft: snapshot.draft,
      resultCount: selectedVariant.count,
    });
  }
}

function renderVariants() {
  variantsContainer.innerHTML = "";
  if (!variants.length) {
    variantSummary.textContent =
      variantMode === "maxFill"
        ? t("messages.maxFillNoFit")
        : items.length
          ? t("messages.noVariants")
          : t("messages.addItems");
    bestChip.style.display = "none";
    return;
  }

  if (variantMode === "maxFill") {
    bestChip.style.display = variants.length > 1 ? "inline-flex" : "none";
    variantSummary.textContent = t("messages.maxFill", {
      count: selectedVariant?.count ?? variants[0].count,
      fill: ((selectedVariant ?? variants[0]).fill * 100).toFixed(1),
    });
  } else {
    bestChip.style.display = "inline-flex";
    variantSummary.textContent = t("messages.generated", {
      count: variants.length,
      fill: (variants[0].fill * 100).toFixed(1),
    });
  }

  variants.forEach((variant, index) => {
    const card = document.createElement("div");
    card.className = "variant-card";
    if (variant.id === selectedVariant?.id) {
      card.classList.add("active");
    }

    card.innerHTML = `
      <strong>${t("messages.variantTitle", { index: index + 1 })}</strong>
      <p class="subtitle">${t("labels.method")}: ${t(variant.methodLabelKey)}${variant.trial ? ` • ${t("labels.trial")} ${variant.trial}` : ""}</p>
      <p class="subtitle">${t("messages.variantStats", {
        fill: (variant.fill * 100).toFixed(1),
        density: (variant.compactness * 100).toFixed(1),
        height: variant.heightUsed.toFixed(1),
      })}</p>
    `;

    card.addEventListener("click", () => {
      selectedVariant = variant;
      renderVariants();
      renderScene();
    });

    variantsContainer.appendChild(card);
  });
}

// THREE.JS SETUP
const canvas = document.getElementById("scene");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(window.devicePixelRatio);

const scene = new THREE.Scene();
scene.background = null;

const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 2000);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);

const directional = new THREE.DirectionalLight(0xffffff, 0.8);
directional.position.set(40, 60, 20);
scene.add(directional);

const group = new THREE.Group();
scene.add(group);

function resize() {
  const { clientWidth, clientHeight } = canvas;
  renderer.setSize(clientWidth, clientHeight, false);
  camera.aspect = clientWidth / clientHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener("resize", resize);
resize();

function clearGroup() {
  while (group.children.length) {
    const child = group.children.pop();
    child.geometry?.dispose();
    if (child.material) {
      if (Array.isArray(child.material)) {
        child.material.forEach((material) => material.dispose());
      } else {
        child.material.dispose();
      }
    }
  }
}

function renderScene() {
  clearGroup();

  if (!selectedVariant) {
    if (lastBox) {
      const boxGeometry = new THREE.BoxGeometry(lastBox.l, lastBox.h, lastBox.w);
      const edges = new THREE.EdgesGeometry(boxGeometry);
      const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 0x1d1b16 })
      );
      group.add(line);
      const maxDim = Math.max(lastBox.l, lastBox.w, lastBox.h);
      camera.position.set(maxDim * 1.2, maxDim * 0.9, maxDim * 1.2);
      controls.target.set(0, 0, 0);
      controls.update();
      return;
    }

    camera.position.set(60, 40, 60);
    controls.target.set(0, 0, 0);
    return;
  }

  const { box } = selectedVariant;
  const boxGeometry = new THREE.BoxGeometry(box.l, box.h, box.w);
  const edges = new THREE.EdgesGeometry(boxGeometry);
  const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x1d1b16 }));
  group.add(line);

  const palette = [0xf1a65a, 0xe45d36, 0x9bb7a6, 0x5b7c99, 0xd9b08c, 0x8c6f56];

  selectedVariant.placements.forEach((placement, index) => {
    const { l, w, h } = placement.dims;
    const geometry = new THREE.BoxGeometry(l, h, w);
    const material = new THREE.MeshStandardMaterial({
      color: palette[index % palette.length],
      transparent: false,
      opacity: 1,
    });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.set(
      placement.position.x + l / 2 - box.l / 2,
      placement.position.z + h / 2 - box.h / 2,
      placement.position.y + w / 2 - box.w / 2
    );
    group.add(mesh);

    const itemEdges = new THREE.EdgesGeometry(geometry);
    const itemLine = new THREE.LineSegments(
      itemEdges,
      new THREE.LineBasicMaterial({ color: 0x1d1b16 })
    );
    itemLine.position.copy(mesh.position);
    group.add(itemLine);
  });

  if (showLayers.checked && selectedVariant.layers.length > 1) {
    selectedVariant.layers.forEach((layerZ) => {
      const planeGeometry = new THREE.PlaneGeometry(box.l, box.w);
      const planeMaterial = new THREE.MeshBasicMaterial({
        color: 0x1d1b16,
        transparent: true,
        opacity: 0.07,
        side: THREE.DoubleSide,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: 1,
        polygonOffsetUnits: 1,
      });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.rotation.x = Math.PI / 2;
      plane.position.set(0, layerZ - box.h / 2, 0);
      group.add(plane);
    });
  }

  const maxDim = Math.max(box.l, box.w, box.h);
  camera.position.set(maxDim * 1.2, maxDim * 0.9, maxDim * 1.2);
  controls.target.set(0, 0, 0);
  controls.update();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();

showLayers.addEventListener("change", renderScene);
showLayers.addEventListener("change", scheduleSave);
allowRotations.addEventListener("change", scheduleSave);

// EVENTS

document.getElementById("add-item").addEventListener("click", addItem);
document.getElementById("generate").addEventListener("click", () => {
  applyDraftItem();
  generateVariants({ recordHistory: true });
});
if (maxFillButton) {
  maxFillButton.addEventListener("click", () => {
    generateMaxFillVariant();
  });
}
if (savePresetButton) {
  savePresetButton.addEventListener("click", () => {
    const nameInput = presetNameInput?.value.trim();
    const name =
      nameInput ||
      t("messages.presetDefault", { index: favorites.length + 1 });
    const data = getSettingsSnapshot();
    favorites.unshift({
      id: crypto.randomUUID(),
      name,
      createdAt: Date.now(),
      data,
    });
    saveFavorites();
    renderFavorites();
    if (presetNameInput) presetNameInput.value = "";
  });
}
if (clearHistoryButton) {
  clearHistoryButton.addEventListener("click", () => {
    history = [];
    saveHistory();
    renderHistory();
  });
}

function seedDefaultItems() {
  if (items.length) return;
  items.push({
    id: crypto.randomUUID(),
    name: t("items.seedName"),
    qty: 4,
    l: 10,
    w: 8,
    h: 6,
    rotatable: true,
    isSeed: true,
  });
}

function updateSeedNames() {
  items.forEach((item) => {
    if (item.isSeed) {
      item.name = t("items.seedName");
    }
  });
}

function initializeUnits() {
  updateUnitToggleUI();
  if (currentUnit === "mm") {
    scaleAllDimensions(10);
  }
}

function initializeQuality() {
  updateQualityToggleUI();
  localStorage.setItem("quality", currentQuality);
}

applyTranslations();
loadFavorites();
loadHistory();
const savedSettings = readStorage(STORAGE_KEYS.settings, null);
if (savedSettings) {
  applySettings(savedSettings, { save: false });
} else {
  seedDefaultItems();
  initializeUnits();
  lastAppliedItemSignature = getItemInputSignature();
  renderItems();
  renderVariants();
  saveSettingsToStorage();
}
initializeQuality();
renderFavorites();
renderHistory();
