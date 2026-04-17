import { getProjects } from '../../services/data.service.js';
import { PageHeaderComponent } from '../shared/PageHeaderComponent.js';

export async function ProjectsGridComponent() {
  const projects = await getProjects();
  const cards = projects
    .map(
      (project) => `
        <article class="surface project-card reveal">
          <div class="project-card__meta">
            <span class="eyebrow">${project.type}</span>
            <span class="muted">${project.year}</span>
          </div>
          <h2>${project.name}</h2>
          <p>${project.description}</p>
          <div class="tag-grid tag-grid--compact">
            ${project.stack.map((item) => `<span class="tag">${item}</span>`).join('')}
          </div>
          <p class="project-card__impact">${project.impact}</p>
          <div class="project-card__links">
            ${project.links
              .map(
                (link) => `
                  <a href="${link.url}" class="text-link">
                    ${link.label}
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
      eyebrow: 'Projects',
      title: 'Selected work focused on polish, performance, and practical product impact.',
      description:
        'A few representative builds that highlight my approach to frontend systems, user experience, and delivery quality.',
    })}
    <section class="card-grid card-grid--projects">
      ${cards}
    </section>
  `;
}
