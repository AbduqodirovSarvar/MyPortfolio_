import { EducationTimelineComponent } from '../components/education/EducationTimelineComponent.js';

export async function EducationPage() {
  return `
    <main class="page-shell">
      ${await EducationTimelineComponent()}
    </main>
  `;
}
