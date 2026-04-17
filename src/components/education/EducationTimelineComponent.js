import { getEducation } from '../../services/data.service.js';
import { PageHeaderComponent } from '../shared/PageHeaderComponent.js';

export async function EducationTimelineComponent() {
  const education = await getEducation();
  const items = education
    .map(
      (item) => `
        <article class="surface education-card reveal">
          <span class="eyebrow">${item.period}</span>
          <h2>${item.degree}</h2>
          <p class="muted">${item.institution}</p>
          <p>${item.details}</p>
        </article>
      `
    )
    .join('');

  return `
    ${PageHeaderComponent({
      eyebrow: 'Education',
      title: 'Formal training supported by continuous learning and practical product work.',
      description:
        'I value fundamentals, but I also believe the best growth happens when study and shipping inform each other.',
    })}
    <section class="card-grid">
      ${items}
    </section>
  `;
}
