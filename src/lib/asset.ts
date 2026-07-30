/**
 * Prefix a /public asset path with the deploy base path.
 *
 * On GitHub Pages the site is served from /spinwisely, and `next/image`
 * with `unoptimized` does not apply basePath to `src` automatically.
 */
export function asset(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
