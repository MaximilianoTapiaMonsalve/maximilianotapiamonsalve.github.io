## Proyecto

Portafolio personal 100 % estático con Astro 7, publicado en GitHub Pages (`https://maximilianotapiamonsalve.github.io`, sin `base`) mediante `.github/workflows/deploy.yml`.

- **Entorno:** Node 26 (`.node-version`) y pnpm (versión fijada en `packageManager`). Las integraciones oficiales se añaden con `pnpm astro add`.
- **Idiomas:** inglés por defecto en `/` y español en `/es/` (i18n nativo de Astro).
  - Todo texto visible va en `src/i18n/ui.ts`, con la misma clave en `en` y `es`.
  - Los enlaces internos se generan con `getRelativeLocaleUrl` de `astro:i18n`.
  - Las páginas de `src/pages/` y `src/pages/es/` solo pasan `lang` a las composiciones de `src/components/pages/`. Los slugs son iguales en ambos idiomas (`/work/`, `/es/work/`).
- **Estilos:** Less (`<style lang="less">` en `.astro` y `*.module.less` en React).
  - Lo que cambia con el tema claro/oscuro son variables CSS de `src/styles/global.less`.
  - Less solo aporta anidación, mixins y breakpoints: `@import (reference) '@/styles/mixins.less';`.
- **Interactividad:** componentes `.astro` con scripts propios por defecto. React solo en islas que lo necesiten (hoy, `ContactForm.tsx` con `client:visible`).
- **Contenido:** esquemas en `src/content.config.ts`.
  - Proyectos en `src/content/projects/<en|es>/<id>.md`, con el mismo `<id>` en ambos idiomas. Las categorías se definen en `projectCategories` (`src/config/site.ts`) y cada una necesita su texto `category.<id>` en `ui.ts`; `/work/<categoría>/` se genera solo para las que tienen proyectos.
  - Página About en `src/content/about/<en|es>.md`: la biografía va en el cuerpo y la trayectoria y las herramientas en el frontmatter.
  - Los datos que no dependen del idioma (nombre, correo, redes, stack) están en `site` (`src/config/site.ts`).
- **Formulario:** Formspree con `@formspree/react`; el ID va en `site.formspreeFormId`. No usar funciones de servidor ni Astro Actions (GitHub Pages solo sirve archivos estáticos).
- **Antes de cada commit:** `pnpm lint`, `pnpm format:check` y `pnpm build` (incluye `astro check`) deben terminar sin errores.

## Sistema de diseño

Fondo de papel lino, tinta ciruela y un único acento baya. El marco es discreto: el peso visual lo llevan las capturas de los proyectos.

- **Tokens:** viven en `src/styles/global.less` como variables CSS, con valores para el tema claro (`:root`) y el oscuro (`:root[data-theme='dark']`).
  - Nunca uses colores, tamaños ni radios fijos en los componentes; usa `--color-*`, `--text-*`, `--space-1…11`, `--radius-*`, `--gutter` y `--page-max`.
  - `--color-decor` es solo decoración (flechas, iconos) y nunca se usa para texto.
  - Contraste mínimo: 4.5:1 para texto y 3:1 para bordes de campos y foco, en ambos temas. Si cambias un token, vuelve a comprobarlo.
- **Tipografía:** tres familias de la Fonts API de Astro (`astro.config.mjs`), autoalojadas al compilar:
  - `--font-display` (Newsreader) para títulos.
  - `--font-sans` (Public Sans) para interfaz y texto.
  - `--font-mono` (IBM Plex Mono) para metadatos.

  En Less, usa los mixins de rol de `mixins.less`: `.type-display()`, `.type-title()`, `.type-h2()`, `.type-project()`, `.type-lead()`, `.type-prose()`, `.type-body()`, `.type-meta()` y `.type-eyebrow()`.

- **Layout:** `.container()` y `.section()`, con las media queries `@mq-sm`, `@mq-md`, `@mq-lg`, `@hover-fine` (efectos solo con ratón) y `@motion-ok`. Con `prefers-reduced-motion` se desactivan transiciones y transformaciones.
- **Componentes:**
  - `src/components/ui/`: `Button` (primario, secundario, inverso), `Badge`, `ChipList`, `FilterPill`, `SectionHeader`, `ScreenshotPlaceholder`, `CtaPanel`, `InfoPanel` y `Timeline`.
  - `src/components/project/`: `ProjectRow` (lista con vista previa flotante solo en CSS) y `ProjectCard` (rejilla con captura).
  - `src/components/site/`: cabecera, footer, selector de idioma y tema.

  Reutilízalos antes de crear variantes nuevas.

- **Navegación:** transiciones de vista nativas entre documentos (`@view-transition` en `global.less`), sin `ClientRouter`. Los scripts de los componentes se ejecutan una vez por página.
- **Texto en plantillas:** en Astro 7 los saltos de línea entre expresiones no generan espacios. Cuando dos fragmentos de texto deban ir separados, usa `{' '}` o construye la cadena en el frontmatter.

## Development

When starting the dev server, use background mode:

```
pnpm astro dev --background
```

Manage the background server with `pnpm astro dev stop`, `pnpm astro dev status`, and `pnpm astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
