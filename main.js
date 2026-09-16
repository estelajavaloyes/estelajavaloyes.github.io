const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#nav');
toggle.addEventListener('click', () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded', String(open)); nav.classList.toggle('open', open); });
nav.addEventListener('click', e => {if(e.target.closest('a')) {nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');}});
document.addEventListener('keydown', e => {if(e.key==='Escape' && nav.classList.contains('open')) {nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.focus();}});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealGroups = [
  ['.hero-copy > *', 85],
  ['.vertical-flow > div', 65],
  ['.discipline-band > span', 70],
  ['.section-heading > *', 110],
  ['.project-grid > .project-card', 125],
  ['.biology-section > *', 130],
  ['.biology-section .pipeline > li', 70],
  ['.current-section > *', 130],
  ['.footer-top > *', 120],
  ['.footer-bottom > *', 65],
  ['.page-hero > *', 90],
  ['.case-meta > *', 80],
  ['.case-overview', 0],
  ['.case-nav', 0],
  ['.case-content > .case-section', 70],
  ['.next-project > *', 90],
  ['.split-section > *', 120],
  ['.experience-row', 70],
  ['.skills-grid > *', 85]
];

revealGroups.forEach(([selector, step]) => {
  document.querySelectorAll(selector).forEach((element, index) => {
    element.classList.add('reveal');
    element.style.setProperty('--reveal-delay', `${Math.min(index * step, 360)}ms`);
  });
});

document.querySelectorAll('.hero-aside, .research-image, .project-figure, .dudu-hero-brand').forEach(element => element.classList.add('reveal', 'reveal--right'));
document.querySelectorAll('.project-card').forEach((element, index) => element.classList.add(index % 2 ? 'reveal--right' : 'reveal--left'));

const revealElements = document.querySelectorAll('.reveal');
if (reducedMotion || !('IntersectionObserver' in window)) {
  revealElements.forEach(element => element.classList.add('in-view'));
} else {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -9% 0px' });
  revealElements.forEach(element => observer.observe(element));
}

if (!reducedMotion) {
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.prepend(progress);
  const panel = document.querySelector('.research-panel');
  let ticking = false;
  const updateScrollEffects = () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${maxScroll > 0 ? window.scrollY / maxScroll : 0})`;
    if (panel && window.innerWidth > 760) {
      const movement = Math.max(-14, Math.min(14, window.scrollY * -0.025));
      panel.style.setProperty('--panel-y', `${movement}px`);
    }
    ticking = false;
  };
  const requestScrollUpdate = () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  };
  updateScrollEffects();
  window.addEventListener('scroll', requestScrollUpdate, { passive: true });
  window.addEventListener('resize', requestScrollUpdate);
}
