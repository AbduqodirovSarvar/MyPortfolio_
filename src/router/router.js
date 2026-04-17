import { HomePage } from '../pages/home.page.js';
import { AboutPage } from '../pages/about.page.js';
import { SkillsPage } from '../pages/skills.page.js';
import { ExperiencePage } from '../pages/experience.page.js';
import { ProjectsPage } from '../pages/projects.page.js';
import { EducationPage } from '../pages/education.page.js';
import { ContactPage } from '../pages/contact.page.js';
import { qsa } from '../utils/dom.js';
import { initRevealAnimations } from '../utils/animations.js';

const routes = {
  '/': HomePage,
  '/about': AboutPage,
  '/skills': SkillsPage,
  '/experience': ExperiencePage,
  '/projects': ProjectsPage,
  '/education': EducationPage,
  '/contact': ContactPage,
};

function getCurrentRoute() {
  const hash = window.location.hash || '#/';
  return hash.replace('#', '');
}

function getPageRenderer(path) {
  return routes[path] || HomePage;
}

export async function renderRoute(outlet) {
  const path = getCurrentRoute();
  const renderPage = getPageRenderer(path);

  outlet.innerHTML = `
    <section class="loading-state surface">
      <span class="loading-state__label">Loading experience...</span>
    </section>
  `;

  try {
    const content = await renderPage();
    outlet.innerHTML = content;
    updateActiveNavigation(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    initRevealAnimations();
  } catch (error) {
    outlet.innerHTML = `
      <section class="loading-state surface">
        <div class="page-header">
          <span class="page-header__eyebrow">Error</span>
          <h1>Something did not load as expected.</h1>
          <p>${error.message}</p>
        </div>
      </section>
    `;
  }
}

export function registerRouter(outlet) {
  window.addEventListener('hashchange', () => renderRoute(outlet));
  renderRoute(outlet);
}

function updateActiveNavigation(path) {
  qsa('[data-route]').forEach((link) => {
    const isActive = link.getAttribute('data-route') === path;
    link.classList.toggle('is-active', isActive);
  });
}
