import { defaultLang, languages, ui, type Lang, type UiKey } from './ui';

export function getTranslations(lang: Lang) {
  return (key: UiKey): string => ui[lang][key];
}

/** Ruta sin el prefijo de idioma: "/es/projects/" → "projects". */
export function getRouteWithoutLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];

  if (first && first !== defaultLang && first in languages) {
    segments.shift();
  }

  return segments.join('/');
}
