import { getExperience } from '../../services/data.service.js';
import { PageHeaderComponent } from '../shared/PageHeaderComponent.js';

export async function ExperienceTimelineComponent() {
  const experience = await getExperience();
  const items = experience
    .map(
      (item) => `
        <article class="timeline-card surface reveal">
          <div class="timeline-card__top">
            <div>
              <span class="eyebrow">${item.period}</span>
              <h2>${item.role}</h2>
              <p class="muted">${item.company} • ${item.location}</p>
            </div>
          </div>
          <p>${item.summary}</p>
          <ul class="detail-list">
            ${item.highlights.map((highlight) => `<li>${highlight}</li>`).join('')}
          </ul>
        </article>
      `
    )
    .join('');

  return `
    ${PageHeaderComponent({
      eyebrow: 'Experience',
      title: 'Recent roles where I shaped interfaces, systems, and team velocity.',
      description:
        'A snapshot of the environments where I have delivered product-facing engineering work with strong design alignment.',
    })}
    <section class="timeline">
      ${items}
    </section>
  `;
}
