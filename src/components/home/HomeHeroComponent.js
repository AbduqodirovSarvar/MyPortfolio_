import { getProfile } from '../../services/data.service.js';

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
        <span class="eyebrow">Software Engineer Portfolio</span>
        <h1>${profile.fullName}</h1>
        <p class="hero__title">${profile.title}</p>
        <p class="hero__tagline">${profile.tagline}</p>
        <div class="hero__actions">
          <a class="button button--primary" href="#/projects">View Projects</a>
          <a class="button button--secondary" href="#/contact">Let's Talk</a>
        </div>
        <div class="chip-group">
          ${socials}
        </div>
      </div>
      <div class="hero__panel surface">
        <div class="hero__avatar">${profile.heroImage}</div>
        <div class="hero__meta">
          <p>${profile.location}</p>
          <strong>${profile.availability}</strong>
        </div>
      </div>
    </section>
  `;
}
