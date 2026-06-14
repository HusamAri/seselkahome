/**
 * Renders a schema.org JSON-LD block. Server component — the data is built at
 * build time from brand data (no user input), so dangerouslySetInnerHTML is safe.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
