/**
 * Datos del sitio que no dependen del idioma. Los textos traducibles están en
 * src/i18n/ui.ts. Los campos vacíos no se muestran.
 */
export const site = {
  name: 'Maximiliano Jesús Tapia Monsalve',
  /** Correo visible en la página de contacto. */
  email: 'm.tapiamonsalve98@gmail.com',
  /** Ciudad o país, visible en el footer y en contacto. */
  location: 'Santiago de Chile',
  /** Zona horaria en texto libre, p. ej. "UTC−3". */
  timezone: 'UTC-3',
  /** Ruta a un CV dentro de /public, p. ej. "/cv.pdf". */
  resumeUrl: '',
  /** Tecnologías principales que se muestran en la portada. */
  stack: ['Go', 'TypeScript', 'Flutter', 'Docker'],
  socials: [
    {
      label: 'GitHub',
      url: 'https://github.com/MaximilianoTapiaMonsalve',
    },
  ],
  /**
   * ID del formulario de Formspree: la parte final de https://formspree.io/f/<id>.
   * No es un secreto: el navegador lo necesita para enviar el formulario.
   * TODO: crear el formulario en Formspree y reemplazar este valor por su ID.
   * Mientras tanto el formulario se muestra, pero cualquier envío termina en error.
   */
  formspreeFormId: 'YOUR_FORM_ID',
};

/** Categorías para filtrar proyectos. Cada una necesita su texto `category.<id>` en ui.ts. */
export const projectCategories = ['web', 'backend', 'open-source'] as const;

export type ProjectCategory = (typeof projectCategories)[number];
