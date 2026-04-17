import { getProfile } from '../../services/data.service.js';
import { PageHeaderComponent } from '../shared/PageHeaderComponent.js';

export async function ContactCardComponent() {
  const profile = await getProfile();
  const socials = profile.socials
    .map(
      (social) => `
        <a class="contact-link" href="${social.url}" target="_blank" rel="noreferrer">${social.label}</a>
      `
    )
    .join('');

  return `
    ${PageHeaderComponent({
      eyebrow: 'Contact',
      title: profile.contact.headline,
      description: profile.contact.description,
    })}
    <section class="content-grid content-grid--two">
      <article class="surface contact-card reveal">
        <h2>Direct contact</h2>
        <div class="contact-stack">
          <a href="mailto:${profile.email}" class="text-link">${profile.email}</a>
          <a href="tel:${profile.phone.replace(/\s+/g, '')}" class="text-link">${profile.phone}</a>
          <a href="${profile.socials[0].url}" class="text-link" target="_blank" rel="noreferrer">${profile.socials[0].url}</a>
          <p>${profile.location}</p>
        </div>
        <a class="button button--primary" href="${profile.contact.ctaUrl}">${profile.contact.ctaLabel}</a>
      </article>
      <article class="surface contact-card reveal">
        <h2>Elsewhere</h2>
        <div class="contact-stack">
          ${socials}
        </div>
      </article>
    </section>
  `;
}
