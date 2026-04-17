import { getProfile } from '../../services/data.service.js';
import { PageHeaderComponent } from '../shared/PageHeaderComponent.js';

export async function AboutIntroComponent() {
  const profile = await getProfile();
  const details = profile.about.details.map((item) => `<li>${item}</li>`).join('');
  const languages = profile.about.languages.map((item) => `<span class="tag">${item}</span>`).join('');
  const certifications = profile.about.certifications.map((item) => `<li>${item}</li>`).join('');

  return `
    ${PageHeaderComponent({
      eyebrow: 'About',
      title: 'Building thoughtful digital experiences with strong engineering foundations.',
      description: profile.about.intro,
    })}
    <section class="content-grid content-grid--two">
      <article class="surface prose reveal">
        <h2>How I work</h2>
        <p>${profile.about.intro}</p>
        <ul class="detail-list">
          ${details}
        </ul>
        <h2 class="stacked-heading">Languages</h2>
        <div class="tag-grid">
          ${languages}
        </div>
      </article>
      <aside class="surface highlight-card reveal">
        <span class="eyebrow">Certifications</span>
        <h3>Continuous learning alongside product delivery.</h3>
        <ul class="detail-list">
          ${certifications}
        </ul>
      </aside>
    </section>
  `;
}
