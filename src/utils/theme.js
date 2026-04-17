import { t } from '../services/i18n.service.js';

const THEME_KEY = 'portfolio-theme';

export function getInitialTheme() {
  const storedTheme = localStorage.getItem(THEME_KEY);

  if (storedTheme) {
    return storedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(THEME_KEY, theme);
}

export function initializeTheme(toggleElement) {
  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);
  updateToggle(toggleElement, initialTheme);

  toggleElement?.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    updateToggle(toggleElement, nextTheme);
  });
}

function updateToggle(toggleElement, theme) {
  if (!toggleElement) {
    return;
  }

  const label = theme === 'dark' ? t('theme.light') : t('theme.dark');
  toggleElement.setAttribute('aria-label', label);
  toggleElement.innerHTML = `<span>${label}</span>`;
}
