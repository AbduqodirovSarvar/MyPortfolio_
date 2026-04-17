import { getProfile } from '../../services/data.service.js';

export async function HomeStatsComponent() {
  const profile = await getProfile();
  const statsMarkup = profile.stats
    .map(
      (stat) => `
        <article class="stat-card surface reveal">
          <strong>${stat.value}</strong>
          <span>${stat.label}</span>
        </article>
      `
    )
    .join('');

  return `
    <section class="stats-grid">
      ${statsMarkup}
    </section>
  `;
}
