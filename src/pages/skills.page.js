import { SkillsGridComponent } from '../components/skills/SkillsGridComponent.js';

export async function SkillsPage() {
  return `
    <main class="page-shell">
      ${await SkillsGridComponent()}
    </main>
  `;
}
