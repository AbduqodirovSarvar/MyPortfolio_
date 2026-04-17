import { getProfile } from '../../services/data.service.js';
import { PageHeaderComponent } from '../shared/PageHeaderComponent.js';
import { t, localize } from '../../services/i18n.service.js';

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
      eyebrow: t('contact.eyebrow'),
      title: localize(profile.contact.headline),
      description: localize(profile.contact.description),
    })}
    <section class="content-grid content-grid--two">
      <article class="surface contact-card reveal">
        <h2>${t('contact.directTitle')}</h2>
        <div class="contact-stack">
          <a href="mailto:${profile.email}" class="text-link">${profile.email}</a>
          <a href="tel:${profile.phone.replace(/\s+/g, '')}" class="text-link">${profile.phone}</a>
          <a href="${profile.socials[0].url}" class="text-link" target="_blank" rel="noreferrer">${profile.socials[0].url}</a>
          <p>${localize(profile.location)}</p>
        </div>
        <a class="button button--primary" href="${localize(profile.contact.ctaUrl)}">${localize(profile.contact.ctaLabel)}</a>
      </article>
      <article class="surface contact-card reveal">
        <h2>${t('contact.elsewhereTitle')}</h2>
        <div class="contact-stack">
          ${socials}
        </div>
      </article>
    </section>
  `;
}
