import { ExperienceTimelineComponent } from '../components/experience/ExperienceTimelineComponent.js';

export async function ExperiencePage() {
  return `
    <main class="page-shell">
      ${await ExperienceTimelineComponent()}
    </main>
  `;
}
