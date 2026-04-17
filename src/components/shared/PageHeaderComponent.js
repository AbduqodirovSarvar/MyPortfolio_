export function PageHeaderComponent({ eyebrow, title, description }) {
  return `
    <header class="page-header reveal">
      <span class="page-header__eyebrow">${eyebrow}</span>
      <h1>${title}</h1>
      <p>${description}</p>
    </header>
  `;
}
