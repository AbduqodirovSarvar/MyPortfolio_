import { getSkills } from '../../services/data.service.js';
import { PageHeaderComponent } from '../shared/PageHeaderComponent.js';

export async function SkillsGridComponent() {
  const skills = await getSkills();
  const cards = skills
    .map(
      (group) => `
        <article class="surface skill-card reveal">
          <h2>${group.category}</h2>
          <div class="tag-grid">
            ${group.items.map((item) => `<span class="tag">${item}</span>`).join('')}
          </div>
        </article>
      `
    )
    .join('');

  return `
    ${PageHeaderComponent({
      eyebrow: 'Skills',
      title: 'A balanced blend of product sense, frontend craft, and scalable engineering.',
      description:
        'My toolkit is shaped by building production interfaces that need to look polished and stay maintainable over time.',
    })}
    <section class="card-grid">
      ${cards}
    </section>
  `;
}
