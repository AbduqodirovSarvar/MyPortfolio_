import { HomeHeroComponent } from '../components/home/HomeHeroComponent.js';
import { HomeStatsComponent } from '../components/home/HomeStatsComponent.js';
import { ProjectsGridComponent } from '../components/projects/ProjectsGridComponent.js';

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
          <span class="eyebrow">Featured Work</span>
          <h2>Recent projects with a product-minded engineering lens.</h2>
        </div>
        ${projects.replace(/<header class="page-header reveal">[\s\S]*?<\/header>/, '')}
      </section>
    </main>
  `;
}
