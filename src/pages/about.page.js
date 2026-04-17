import { AboutIntroComponent } from '../components/about/AboutIntroComponent.js';

export async function AboutPage() {
  return `
    <main class="page-shell">
      ${await AboutIntroComponent()}
    </main>
  `;
}
