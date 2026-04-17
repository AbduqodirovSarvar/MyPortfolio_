import { getProfile } from '../../services/data.service.js';
import { t, localize } from '../../services/i18n.service.js';

export async function HomeHeroComponent() {
  const profile = await getProfile();
  const socials = profile.socials
    .map(
      (social) => `
        <a class="chip-link" href="${social.url}" target="_blank" rel="noreferrer">
          ${social.label}
        </a>
      `
    )
    .join('');

  return `
    <section class="hero reveal">
      <div class="hero__content">
        <span class="eyebrow">${t('hero.eyebrow')}</span>
        <h1>${localize(profile.fullName)}</h1>
        <p class="hero__title">${localize(profile.title)}</p>
        <p class="hero__tagline">${localize(profile.tagline)}</p>
        <div class="hero__actions">
          <a class="button button--primary" href="#/projects">${t('hero.viewProjects')}</a>
          <a class="button button--secondary" href="#/contact">${t('hero.letsTalk')}</a>
        </div>
        <div class="chip-group">
          ${socials}
        </div>
      </div>
      <div class="hero__panel surface">
        <div class="hero__avatar">
          ${
            profile.profileImage
              ? `<img src="${profile.profileImage}" alt="${localize(profile.fullName)}" class="hero__profile-img" />`
              : profile.heroImage
          }
        </div>
        <div class="hero__meta">
          <p>${localize(profile.location)}</p>
          <strong>${localize(profile.availability)}</strong>
        </div>
      </div>
    </section>
  `;
}
