// Navegación por anclas con GSAP ScrollToPlugin y scroll-spy con ScrollTrigger.
// Si gsap no carga, los anclas nativos siguen funcionando.

const MIN_DURATION = 0.5;
const MAX_DURATION = 1.1;
const SECONDS_PER_PX = 1 / 2500;

async function loadGsap() {
  const [{ gsap }, { ScrollTrigger }, { ScrollToPlugin }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
    import('gsap/ScrollToPlugin'),
  ]);
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  return { gsap, ScrollTrigger };
}

export async function initScrollNav(): Promise<void> {
  const sections = Array.from(
    document.querySelectorAll<HTMLElement>('[data-section]'),
  );
  if (sections.length === 0) return;
  const { gsap, ScrollTrigger } = await loadGsap();
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

  function scrollTo(y: number, hash: string) {
    const distance = Math.abs(y - window.scrollY);
    const duration = Math.min(
      MAX_DURATION,
      MIN_DURATION + distance * SECONDS_PER_PX,
    );
    if (reduceMotion.matches) {
      window.scrollTo(0, y);
    } else {
      gsap.to(window, {
        scrollTo: { y, autoKill: true },
        duration,
        ease: 'power2.inOut',
      });
    }
    history.pushState(null, '', location.pathname + location.search + hash);
  }

  document.addEventListener('click', (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }
    const link = (event.target as Element).closest<HTMLAnchorElement>(
      'a[href]',
    );
    if (!link || link.target || link.hasAttribute('download')) return;

    const url = new URL(link.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname) {
      return;
    }

    if (!url.hash) {
      if (url.search !== location.search) return;
      event.preventDefault();
      scrollTo(0, '');
      return;
    }
    const target = document.getElementById(
      decodeURIComponent(url.hash.slice(1)),
    );
    if (!target) return;

    event.preventDefault();
    scrollTo(target.getBoundingClientRect().top + window.scrollY, url.hash);
    target.focus({ preventScroll: true });
  });

  const links = Array.from(
    document.querySelectorAll<HTMLAnchorElement>('[data-section-link]'),
  );
  const triggers: ScrollTrigger[] = [];
  const updateCurrent = () => {
    const id = triggers.filter((trigger) => trigger.isActive).pop()
      ?.trigger?.id;
    links.forEach((link) => {
      if (link.dataset.sectionLink === id) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };
  sections.forEach((section) =>
    triggers.push(
      ScrollTrigger.create({
        trigger: section,
        start: 'top 40%',
        end: 'bottom 40%',
        onToggle: updateCurrent,
      }),
    ),
  );

  ScrollTrigger.addEventListener('refresh', updateCurrent);
  updateCurrent();

  // La altura de la página cambia con los filtros, las fuentes y las imágenes.
  let frame = 0;
  new ResizeObserver(() => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => ScrollTrigger.refresh());
  }).observe(document.body);
}
