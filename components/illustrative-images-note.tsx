// A small, unobtrusive disclaimer that sits above product grids while real
// manufacturer photos are pending. Once verified product photos are in place
// for every product, you can stop rendering this component (or update the
// copy to clarify which products still use placeholders).

export function IllustrativeImagesNote() {
  return (
    <div className="container-shell">
      <p className="text-xs leading-5 text-slate-500 italic">
        Images shown are illustrative until manufacturer photos are available.
      </p>
    </div>
  );
}
