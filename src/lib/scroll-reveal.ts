// Utilidad compartida de scroll-reveal: fade + translateY sutil, con stagger
// cuando varios elementos entran al viewport juntos (grids/listas). Se invoca
// desde el <script> de cualquier componente .astro vía el alias @/lib/scroll-reveal.
//
// - gsap y gsap/ScrollTrigger se cargan con import() dinámico, y solo si el
//   usuario no pidió `prefers-reduced-motion: reduce`. Así nadie que prefiera
//   movimiento reducido descarga la librería.
// - Varios componentes en la misma página pueden llamar a esta función con el
//   mismo selector genérico `[data-reveal]` (p. ej. SectionHeader, ProjectRow
//   y CtaPanel en HomePage.astro). Un WeakSet a nivel de módulo evita procesar
//   dos veces el mismo elemento; como el módulo es un singleton por página
//   (mismo import, misma URL resuelta), el estado se comparte solo.

export interface RevealOptions {
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
}

const DEFAULTS = {
  y: 24,
  duration: 0.64, // = --duration-slow (global.less)
  stagger: 0.08,
  start: 'top 85%',
};

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)'; // = --ease-reveal (global.less)

const processed = new WeakSet<Element>();

let gsapPromise: ReturnType<typeof loadGsap> | null = null;

async function loadGsap() {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ]);
  gsap.registerPlugin(ScrollTrigger);
  return { gsap, ScrollTrigger };
}

export async function initScrollReveal(
  selector: string,
  options: RevealOptions = {},
): Promise<void> {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(selector),
  ).filter((el) => !processed.has(el));
  if (elements.length === 0) return;
  elements.forEach((el) => processed.add(el));

  // Sin preferencia de movimiento reducido no se anima: el contenido ya
  // renderizó visible y se queda tal cual (nunca queda oculto ni a medio animar).
  if (!matchMedia('(prefers-reduced-motion: no-preference)').matches) return;

  const { y, duration, stagger, start } = { ...DEFAULTS, ...options };
  gsapPromise ??= loadGsap();
  const { gsap, ScrollTrigger } = await gsapPromise;

  gsap.set(elements, { opacity: 0, y });

  ScrollTrigger.batch(elements, {
    start,
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: EASE,
        overwrite: true,
      }),
  });
}
