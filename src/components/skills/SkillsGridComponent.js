import { getSkills } from '../../services/data.service.js';
import { PageHeaderComponent } from '../shared/PageHeaderComponent.js';
import { t, localize } from '../../services/i18n.service.js';

export async function SkillsGridComponent() {
  const skills = await getSkills();
  const cards = skills
    .map(
      (group) => `
        <article class="surface skill-card reveal">
          <h2>${localize(group.category)}</h2>
          <div class="tag-grid">
            ${group.items.map((item) => `<span class="tag">${item}</span>`).join('')}
          </div>
        </article>
      `
    )
    .join('');

  return `
    ${PageHeaderComponent({
      eyebrow: t('skills.eyebrow'),
      title: t('skills.title'),
      description: t('skills.description'),
    })}
    <section class="card-grid">
      ${cards}
    </section>
  `;
}
