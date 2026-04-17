import { getProfile } from '../../services/data.service.js';
import { PageHeaderComponent } from '../shared/PageHeaderComponent.js';
import { t, localize, localizeArray } from '../../services/i18n.service.js';

export async function AboutIntroComponent() {
  const profile = await getProfile();
  const details = localizeArray(profile.about.details).map((item) => `<li>${item}</li>`).join('');
  const languages = localizeArray(profile.about.languages).map((item) => `<span class="tag">${item}</span>`).join('');
  const certifications = profile.about.certifications.map((item) => `<li>${localize(item)}</li>`).join('');

  return `
    ${PageHeaderComponent({
      eyebrow: t('about.eyebrow'),
      title: t('about.title'),
      description: localize(profile.about.intro),
    })}
    <section class="content-grid content-grid--two">
      <article class="surface prose reveal">
        <h2>${t('about.howIWork')}</h2>
        <p>${localize(profile.about.intro)}</p>
        <ul class="detail-list">
          ${details}
        </ul>
        <h2 class="stacked-heading">${t('about.languages')}</h2>
        <div class="tag-grid">
          ${languages}
        </div>
      </article>
      <aside class="surface highlight-card reveal">
        <span class="eyebrow">${t('about.certEyebrow')}</span>
        <h3>${t('about.certTitle')}</h3>
        <ul class="detail-list">
          ${certifications}
        </ul>
      </aside>
    </section>
  `;
}
