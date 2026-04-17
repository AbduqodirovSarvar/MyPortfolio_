import { ContactCardComponent } from '../components/contact/ContactCardComponent.js';

export async function ContactPage() {
  return `
    <main class="page-shell">
      ${await ContactCardComponent()}
    </main>
  `;
}
