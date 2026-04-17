import { HomeHeroComponent } from '../components/home/HomeHeroComponent.js';
import { HomeStatsComponent } from '../components/home/HomeStatsComponent.js';
import { ProjectsGridComponent } from '../components/projects/ProjectsGridComponent.js';
import { t } from '../services/i18n.service.js';

export async function HomePage() {
  const [hero, stats, projects] = await Promise.all([
    HomeHeroComponent(),
    HomeStatsComponent(),
    ProjectsGridComponent(),
  ]);

  return `
    <main class="page-shell page-shell--home">
      ${hero}
      ${stats}
      <section class="home-preview">
        <div class="section-heading reveal">
          <span class="eyebrow">${t('home.featuredEyebrow')}</span>
          <h2>${t('home.featuredTitle')}</h2>
        </div>
        ${projects.replace(/<header class="page-header reveal">[\s\S]*?<\/header>/, '')}
      </section>
    </main>
  `;
}
