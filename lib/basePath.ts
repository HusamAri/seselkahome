// Served from the root of the custom domain (seselkahome.com), so no prefix.
export const BASE_PATH = '';

// Kept so callers stay stable; now a no-op (root paths already resolve).
export function withBase(path: string): string {
  return path;
}
