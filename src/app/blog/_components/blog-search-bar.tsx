"use client";

import { Search } from "lucide-react";

interface BlogSearchBarProps {
  onSearchChange?: (val: string) => void;
}

export function BlogSearchBar({ onSearchChange }: BlogSearchBarProps) {
  return (
    <div className="relative w-full md:w-80">
      <label htmlFor="search" className="sr-only">
        Cari berita
      </label>
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
        aria-hidden="true"
      />
      <input
        type="search"
        id="search"
        name="search"
        placeholder="Cari berita…"
        autoComplete="off"
        className="w-full pl-10 pr-4 py-2 rounded-full border border-border bg-card/50 text-sm text-foreground placeholder:text-muted-foreground/75 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1 focus:ring-offset-background transition-shadow"
        onChange={(e) => onSearchChange?.(e.target.value)}
      />
    </div>
  );
}
