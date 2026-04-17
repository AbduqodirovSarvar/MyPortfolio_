import { registerRouter, renderRoute } from './router/router.js';
import { getProfile } from './services/data.service.js';
import { initializeTheme } from './utils/theme.js';
import { qs } from './utils/dom.js';
import { initI18n, t, getCurrentLang, getSupportedLangs, setLang, onLangChange, localize } from './services/i18n.service.js';



function createLangSwitcher() {
  const langs = getSupportedLangs();
  const current = getCurrentLang();

  const buttons = langs
    .map(
      (lang) => `
        <button
          class="lang-btn${lang === current ? ' lang-btn--active' : ''}"
          data-lang="${lang}"
          type="button"
        >${lang.toUpperCase()}</button>
      `
    )
    .join('');

  return `<div class="lang-switcher">${buttons}</div>`;
}

function createAppShell(profile) {
  return `
    <div class="site-shell">
      <header class="site-header">
        <div class="container site-header__inner">
          <a class="brand" href="#/" style="width: auto; padding: 0 1rem; background: none; color: var(--text);">${localize(profile.fullName)}</a>
          <nav class="site-nav" aria-label="Main navigation">
            <a href="#/" data-route="/">${t('nav.home')}</a>
            <a href="#/about" data-route="/about">${t('nav.about')}</a>
            <a href="#/skills" data-route="/skills">${t('nav.skills')}</a>
            <a href="#/experience" data-route="/experience">${t('nav.experience')}</a>
            <a href="#/projects" data-route="/projects">${t('nav.projects')}</a>
            <a href="#/education" data-route="/education">${t('nav.education')}</a>
            <a href="#/contact" data-route="/contact">${t('nav.contact')}</a>
          </nav>
          <div class="header-controls">
            ${createLangSwitcher()}
            <button id="theme-toggle" class="theme-toggle" type="button"></button>
          </div>
        </div>
      </header>
      <div class="ambient ambient--one"></div>
      <div class="ambient ambient--two"></div>
      <div class="container">
        <div id="router-outlet"></div>
      </div>
    </div>
  `;
}

function bindLangSwitcher() {
  const buttons = document.querySelectorAll('.lang-btn');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      setLang(lang);
    });
  });
}

export async function bootstrapApp() {
  const profile = await getProfile();
  const app = qs('#app');
  document.title = `${localize(profile.fullName)} | ${localize(profile.title)}`;
  app.innerHTML = createAppShell(profile);

  const toggle = qs('#theme-toggle');
  const outlet = qs('#router-outlet');

  initializeTheme(toggle);
  bindLangSwitcher();
  registerRouter(outlet);
}

export async function reRenderApp() {
  const profile = await getProfile();
  const app = qs('#app');
  document.title = `${localize(profile.fullName)} | ${localize(profile.title)}`;
  app.innerHTML = createAppShell(profile);

  const toggle = qs('#theme-toggle');
  const outlet = qs('#router-outlet');

  initializeTheme(toggle);
  bindLangSwitcher();
  await renderRoute(outlet);
}

onLangChange(reRenderApp);
