import { getExperience } from '../../services/data.service.js';
import { PageHeaderComponent } from '../shared/PageHeaderComponent.js';
import { t, localize, localizeArray } from '../../services/i18n.service.js';

export async function ExperienceTimelineComponent() {
  const experience = await getExperience();
  const items = experience
    .map(
      (item) => `
        <article class="timeline-card surface reveal">
          <div class="timeline-card__top">
            <div>
              <span class="eyebrow">${item.period}</span>
              <h2>${localize(item.role)}</h2>
              <p class="muted">${item.company} • ${localize(item.location)}</p>
            </div>
          </div>
          <p>${localize(item.summary)}</p>
          <ul class="detail-list">
            ${localizeArray(item.highlights).map((highlight) => `<li>${highlight}</li>`).join('')}
          </ul>
        </article>
      `
    )
    .join('');

  return `
    ${PageHeaderComponent({
      eyebrow: t('experience.eyebrow'),
      title: t('experience.title'),
      description: t('experience.description'),
    })}
    <section class="timeline">
      ${items}
    </section>
  `;
}
