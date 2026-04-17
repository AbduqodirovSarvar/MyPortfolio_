import { ProjectsGridComponent } from '../components/projects/ProjectsGridComponent.js';

export async function ProjectsPage() {
  return `
    <main class="page-shell">
      ${await ProjectsGridComponent()}
    </main>
  `;
}
