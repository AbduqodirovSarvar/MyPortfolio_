import { qsa } from './dom.js';

export function initRevealAnimations() {
  const elements = qsa('.reveal');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
    }
  );

  elements.forEach((element) => observer.observe(element));
}
