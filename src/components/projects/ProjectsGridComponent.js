import { getProjects } from '../../services/data.service.js';
import { PageHeaderComponent } from '../shared/PageHeaderComponent.js';
import { t, localize } from '../../services/i18n.service.js';

export async function ProjectsGridComponent() {
  const projects = await getProjects();
  const cards = projects
    .map(
      (project) => `
        <article class="surface project-card reveal">
          <div class="project-card__meta">
            <span class="eyebrow">${localize(project.type)}</span>
            <span class="muted">${project.year}</span>
          </div>
          <h2>${localize(project.name)}</h2>
          <p>${localize(project.description)}</p>
          <div class="tag-grid tag-grid--compact">
            ${project.stack.map((item) => `<span class="tag">${item}</span>`).join('')}
          </div>
          <p class="project-card__impact">${localize(project.impact)}</p>
          <div class="project-card__links">
            ${project.links
              .map(
                (link) => `
                  <a href="${link.url}" class="text-link">
                    ${localize(link.label)}
                  </a>
                `
              )
              .join('')}
          </div>
        </article>
      `
    )
    .join('');

  return `
    ${PageHeaderComponent({
      eyebrow: t('projects.eyebrow'),
      title: t('projects.title'),
      description: t('projects.description'),
    })}
    <section class="card-grid card-grid--projects">
      ${cards}
    </section>
  `;
}
