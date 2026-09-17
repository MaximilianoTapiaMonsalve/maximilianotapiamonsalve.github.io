## Proyecto

Portafolio personal 100 % estático con Astro 7, publicado en GitHub Pages (`https://maximilianotapiamonsalve.github.io`, sin `base`) mediante `.github/workflows/deploy.yml`.

- **Entorno:** Node 26 (`.node-version`) y pnpm (versión fijada en `packageManager`). Las integraciones oficiales se añaden con `pnpm astro add`.
- **Idiomas:** inglés por defecto en `/` y español en `/es/` (i18n nativo de Astro).
  - Todo texto visible va en `src/i18n/ui.ts`, con la misma clave en `en` y `es`.
  - Los enlaces internos se generan con `getRelativeLocaleUrl` de `astro:i18n`.
  - Las páginas de `src/pages/` y `src/pages/es/` solo pasan `lang` a componentes compartidos.
- **Estilos:** Less (`<style lang="less">` en `.astro` y `*.module.less` en React).
  - Lo que cambia con el tema claro/oscuro son variables CSS de `src/styles/global.less`.
  - Less solo aporta anidación, mixins y breakpoints: `@import (reference) '@/styles/mixins.less';`.
- **Interactividad:** componentes `.astro` con scripts propios por defecto. React solo en islas que lo necesiten (hoy, `ContactForm.tsx` con `client:visible`).
- **Contenido:** proyectos en `src/content/projects/<en|es>/<id>.md`, con el mismo `<id>` en ambos idiomas (esquema en `src/content.config.ts`).
- **Formulario:** Formspree con `@formspree/react`; el ID va en `src/config/site.ts`. No usar funciones de servidor ni Astro Actions (GitHub Pages solo sirve archivos estáticos).
- **Antes de cada commit:** `pnpm lint`, `pnpm format:check` y `pnpm build` (incluye `astro check`) deben terminar sin errores.

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
