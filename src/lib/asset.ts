/**
 * Prefix a root-relative asset path with the deployment base path.
 *
 * Needed because next/image with `unoptimized: true` (static export) does not
 * prepend `basePath`/`assetPrefix` to local image `src`s. On GitHub Pages the
 * site is served from `/nachi-tekneka/`, so `/catalog/x.jpg` must become
 * `/nachi-tekneka/catalog/x.jpg`. Locally the base path is empty (no-op).
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string): string {
  if (!path.startsWith("/")) return path;
  if (BASE_PATH && path.startsWith(BASE_PATH + "/")) return path; // already prefixed
  return BASE_PATH + path;
}
