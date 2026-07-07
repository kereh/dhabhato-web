"use client";

import { ArrowUp } from "lucide-react";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-secondary transition-colors duration-200 group cursor-pointer"
    >
      Kembali ke atas
      <ArrowUp
        className="h-3.5 w-3.5 group-hover:-translate-y-0.5 transition-transform"
        aria-hidden="true"
      />
    </button>
  );
}
