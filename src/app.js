import { registerRouter } from './router/router.js';
import { getProfile } from './services/data.service.js';
import { initializeTheme } from './utils/theme.js';
import { qs } from './utils/dom.js';

function getInitials(fullName) {
  return fullName
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

function createAppShell(profile) {
  return `
    <div class="site-shell">
      <header class="site-header">
        <div class="container site-header__inner">
          <a class="brand" href="#/">${getInitials(profile.fullName)}</a>
          <nav class="site-nav" aria-label="Main navigation">
            <a href="#/" data-route="/">Home</a>
            <a href="#/about" data-route="/about">About</a>
            <a href="#/skills" data-route="/skills">Skills</a>
            <a href="#/experience" data-route="/experience">Experience</a>
            <a href="#/projects" data-route="/projects">Projects</a>
            <a href="#/education" data-route="/education">Education</a>
            <a href="#/contact" data-route="/contact">Contact</a>
          </nav>
          <button id="theme-toggle" class="theme-toggle" type="button"></button>
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

export async function bootstrapApp() {
  const profile = await getProfile();
  const app = qs('#app');
  document.title = `${profile.fullName} | ${profile.title}`;
  app.innerHTML = createAppShell(profile);

  const toggle = qs('#theme-toggle');
  const outlet = qs('#router-outlet');

  initializeTheme(toggle);
  registerRouter(outlet);
}
