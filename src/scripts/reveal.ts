// Fade .reveal elements in once as they scroll into view.
// Content is visible by default: only elements still below the screen when the page loads are
// hidden here, so nothing stays hidden if this script never runs, and the first screen never
// flickers.
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduced && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.remove('is-waiting');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.1 },
  );

  const fold = window.innerHeight;
  document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
    if (el.getBoundingClientRect().top < fold) return;
    el.classList.add('is-waiting');
    io.observe(el);
  });
}
