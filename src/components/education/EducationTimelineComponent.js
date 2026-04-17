import { getEducation } from '../../services/data.service.js';
import { PageHeaderComponent } from '../shared/PageHeaderComponent.js';
import { t, localize } from '../../services/i18n.service.js';

export async function EducationTimelineComponent() {
  const education = await getEducation();
  const items = education
    .map(
      (item) => `
        <article class="surface education-card reveal">
          <span class="eyebrow">${item.period}</span>
          <h2>${localize(item.degree)}</h2>
          <p class="muted">${localize(item.institution)}</p>
          <p>${localize(item.details)}</p>
        </article>
      `
    )
    .join('');

  return `
    ${PageHeaderComponent({
      eyebrow: t('education.eyebrow'),
      title: t('education.title'),
      description: t('education.description'),
    })}
    <section class="card-grid">
      ${items}
    </section>
  `;
}
