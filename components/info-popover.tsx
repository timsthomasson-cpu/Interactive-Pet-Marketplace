"use client";
import { useState, useRef, useEffect } from "react";

export function InfoPopover({ content, label = "More info" }: { content: string; label?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  if (!content) return null;

  return (
    <span ref={ref} className="relative inline-block align-middle">
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(o => !o); }}
        aria-label={label}
        aria-expanded={open}
        className="inline-flex items-center justify-center h-5 w-5 ml-1 rounded-full border border-slate-400 text-xs font-bold text-slate-600 hover:border-trust-500 hover:text-trust-700 transition cursor-pointer leading-none align-middle"
      >
        i
      </button>
      {open && (
        <span
          role="tooltip"
          className="absolute z-50 left-1/2 top-full mt-2 -translate-x-1/2 w-max max-w-xs rounded-lg bg-slate-900 px-3 py-2 text-xs font-normal text-white shadow-lg whitespace-normal"
          style={{ pointerEvents: "auto" }}
        >
          {content}
          <span className="absolute -top-1 left-1/2 -translate-x-1/2 h-2 w-2 rotate-45 bg-slate-900"></span>
        </span>
      )}
    </span>
  );
}
