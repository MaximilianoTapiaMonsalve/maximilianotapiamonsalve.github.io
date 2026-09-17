import { getCollection, type CollectionEntry } from 'astro:content';

import { projectCategories, type ProjectCategory } from '@/config/site';
import type { Lang } from '@/i18n/ui';

export type Project = CollectionEntry<'projects'>;

/** Proyectos de un idioma, del más reciente al más antiguo (y por `order` dentro del mismo año). */
export async function getProjects(lang: Lang): Promise<Project[]> {
  const projects = await getCollection('projects', ({ id }) =>
    id.startsWith(`${lang}/`),
  );

  return projects.sort(
    (a, b) => b.data.year - a.data.year || a.data.order - b.data.order,
  );
}

/** Enlace principal de un proyecto: la demo si existe, si no el repositorio. */
export function getProjectUrl(project: Project): string | undefined {
  return project.data.demo ?? project.data.repo;
}

/** Categorías que tienen al menos un proyecto, en el orden de `projectCategories`. */
export function getUsedCategories(projects: Project[]): ProjectCategory[] {
  return projectCategories.filter((category) =>
    projects.some((project) => project.data.categories.includes(category)),
  );
}

/** Rutas estáticas de /work/: la lista completa y una página por categoría con proyectos. */
export async function getWorkStaticPaths(lang: Lang) {
  const categories = getUsedCategories(await getProjects(lang));

  return [
    { params: { category: undefined } },
    ...categories.map((category) => ({ params: { category } })),
  ];
}
