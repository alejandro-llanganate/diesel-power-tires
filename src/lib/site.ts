/** Prefijo de ruta en GitHub Pages (p. ej. `/diesel-power-tires`). Vacío en local. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Rutas a archivos en `public/` o rutas internas con basePath. */
export function assetPath(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}
