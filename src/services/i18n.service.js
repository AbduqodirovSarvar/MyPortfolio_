const LANG_KEY = 'portfolio-lang';
const SUPPORTED_LANGS = ['en', 'uz', 'ru'];
const I18N_PATH = './src/data/i18n';

let translations = {};
let currentLang = 'en';
let onChangeCallback = null;
const translationCache = new Map();

function getInitialLang() {
  const stored = localStorage.getItem(LANG_KEY);

  if (stored && SUPPORTED_LANGS.includes(stored)) {
    return stored;
  }

  const browserLang = navigator.language?.slice(0, 2);

  if (SUPPORTED_LANGS.includes(browserLang)) {
    return browserLang;
  }

  return 'en';
}

async function loadTranslations(lang) {
  if (translationCache.has(lang)) {
    translations = translationCache.get(lang);
    return;
  }

  const response = await fetch(`${I18N_PATH}/${lang}.json`);

  if (!response.ok) {
    throw new Error(`Failed to load translations for "${lang}"`);
  }

  const data = await response.json();
  translationCache.set(lang, data);
  translations = data;
}

export function t(key) {
  return translations[key] ?? key;
}

export function getCurrentLang() {
  return currentLang;
}

export function getSupportedLangs() {
  return SUPPORTED_LANGS;
}

export function localize(value) {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'object' && value[currentLang] !== undefined) {
    return value[currentLang];
  }

  if (typeof value === 'object' && value.en !== undefined) {
    return value.en;
  }

  return String(value);
}

export function localizeArray(arr) {
  if (!Array.isArray(arr)) {
    return [];
  }

  return arr.map((item) => {
    if (typeof item === 'string') {
      return item;
    }

    return localize(item);
  });
}

export async function setLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang)) {
    return;
  }

  await loadTranslations(lang);
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);

  if (onChangeCallback) {
    await onChangeCallback();
  }
}

export function onLangChange(callback) {
  onChangeCallback = callback;
}

export async function initI18n() {
  const lang = getInitialLang();
  await loadTranslations(lang);
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
}
