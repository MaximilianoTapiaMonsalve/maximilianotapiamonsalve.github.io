export const languages = {
  en: 'English',
  es: 'Español',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

const en = {
  'site.title': 'Portfolio',
  'site.description': 'Personal portfolio: projects, experience and contact.',
  'nav.label': 'Main',
  'nav.projects': 'Projects',
  'nav.contact': 'Contact',
  'nav.skip': 'Skip to content',
  'lang.label': 'Language',
  'theme.dark': 'Dark theme',
  'hero.title': "Hi, I'm Your Name",
  'hero.subtitle':
    'A short introduction about what you do and what you are looking for.',
  'projects.title': 'Projects',
  'projects.empty': 'Projects coming soon.',
  'projects.repo': 'Code',
  'projects.demo': 'Live demo',
  'contact.title': 'Contact',
  'contact.intro': 'Have a project or an opportunity in mind? Write to me.',
  'contact.name': 'Name',
  'contact.email': 'Email',
  'contact.message': 'Message',
  'contact.submit': 'Send message',
  'contact.sending': 'Sending…',
  'contact.success': 'Thanks! Your message has been sent.',
  'contact.error': 'The message could not be sent. Please try again.',
  'notFound.title': 'Page not found',
  'notFound.back': 'Back to home',
} as const;

// Mismas claves que `en`: TypeScript avisa si falta o sobra alguna.
const es: Record<keyof typeof en, string> = {
  'site.title': 'Portafolio',
  'site.description': 'Portafolio personal: proyectos, experiencia y contacto.',
  'nav.label': 'Principal',
  'nav.projects': 'Proyectos',
  'nav.contact': 'Contacto',
  'nav.skip': 'Saltar al contenido',
  'lang.label': 'Idioma',
  'theme.dark': 'Tema oscuro',
  'hero.title': 'Hola, soy Tu Nombre',
  'hero.subtitle': 'Una breve presentación sobre lo que haces y lo que buscas.',
  'projects.title': 'Proyectos',
  'projects.empty': 'Pronto habrá proyectos.',
  'projects.repo': 'Código',
  'projects.demo': 'Demo en vivo',
  'contact.title': 'Contacto',
  'contact.intro': '¿Tienes un proyecto o una oportunidad en mente? Escríbeme.',
  'contact.name': 'Nombre',
  'contact.email': 'Correo electrónico',
  'contact.message': 'Mensaje',
  'contact.submit': 'Enviar mensaje',
  'contact.sending': 'Enviando…',
  'contact.success': '¡Gracias! Tu mensaje fue enviado.',
  'contact.error': 'No se pudo enviar el mensaje. Inténtalo de nuevo.',
  'notFound.title': 'Página no encontrada',
  'notFound.back': 'Volver al inicio',
};

export const ui = { en, es };

export type UiKey = keyof typeof en;
