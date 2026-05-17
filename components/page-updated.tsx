// Renders a small "Last updated" footer for content pages. Used on Questions,
// About, and the research pages. Helps AI search engines and quality raters
// see that the page is maintained.
//
// Update the date manually when you make a meaningful content edit to the page.
// (Not on every commit — only when the content itself changes in a way
// readers would care about.)
export function PageUpdated({ date }: { date: string }) {
  return (
    <p className="text-xs text-slate-500 sm:text-sm">
      Last updated: <time dateTime={date}>{date}</time>
    </p>
  );
}
