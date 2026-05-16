// Renders one or more JSON-LD schema objects as a single script tag.
//
// Usage:
//   <JsonLd schema={productSchema(product)} />
//   <JsonLd schema={[breadcrumbListSchema(...), faqPageSchema(...)]} />
//
// Passing an array embeds them as a JSON-LD "@graph" — a single script tag
// containing multiple linked schemas, which is the recommended pattern when
// a page has multiple schema types.
//
// Server component: no hooks, no client behavior. The schema renders into
// the static HTML for search engines and AI crawlers to read.

type SchemaObject = Record<string, unknown>;

export function JsonLd({ schema }: { schema: SchemaObject | SchemaObject[] }) {
  const payload = Array.isArray(schema)
    ? { "@context": "https://schema.org/", "@graph": schema.map(stripContext) }
    : schema;

  return (
    <script
      type="application/ld+json"
      // dangerouslySetInnerHTML is the standard pattern for JSON-LD in React.
      // The payload is built from typed data we control (no user input), so
      // there's no XSS surface here. We still strip </script> sequences as a
      // belt-and-suspenders measure in case product copy ever contains them.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload).replace(/<\/script/gi, "<\\/script")
      }}
    />
  );
}

// When schemas are combined under @graph, individual entries shouldn't
// repeat their @context — strip it from each child.
function stripContext(obj: SchemaObject): SchemaObject {
  if (!obj || typeof obj !== "object") return obj;
  const { "@context": _ctx, ...rest } = obj;
  return rest;
}
