// Path prefix for the GitHub Pages project site (served from /seselkahome/).
export const BASE_PATH = process.env.NODE_ENV === 'production' ? '/seselkahome' : '';

// next/image does NOT prefix raw src under static export, so prepend it for
// any absolute public path. No-op in dev and for remote/relative URLs.
export function withBase(path: string): string {
  return path.startsWith('/') ? `${BASE_PATH}${path}` : path;
}
