import { Trophy } from "lucide-react";
import schoolData from "@/data/data.json";

export function HomeAchievements() {
  const { achievements } = schoolData;
  const items = [...achievements, ...achievements];

  return (
    <section className="py-16 overflow-hidden border-y border-border/30 bg-muted/5">
      <div className="container mx-auto px-4 mb-10 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
          Prestasi Kami
        </span>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white mt-3">
          Raih Bersama, Berprestasi Bersama
        </h2>
      </div>

      <div className="relative mb-4">
        <div
          className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-background to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-background to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />
        <div className="flex animate-marquee gap-4 w-max">
          {items.map((item, i) => (
            <div
              key={`row1-${item.title}-${i}`}
              className="flex items-center gap-3 px-5 py-3 rounded-full border border-border/40 bg-card/30 backdrop-blur-sm shrink-0"
            >
              <Trophy
                className="h-4 w-4 text-secondary shrink-0"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-white whitespace-nowrap">
                {item.title}
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                {item.year}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-background to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-background to-transparent z-10 pointer-events-none"
          aria-hidden="true"
        />
        <div className="flex animate-marquee-reverse gap-4 w-max">
          {[...items].reverse().map((item, i) => (
            <div
              key={`row2-${item.title}-${i}`}
              className="flex items-center gap-3 px-5 py-3 rounded-full border border-border/40 bg-card/30 backdrop-blur-sm shrink-0"
            >
              <Trophy
                className="h-4 w-4 text-primary shrink-0"
                aria-hidden="true"
              />
              <span className="text-sm font-medium text-white whitespace-nowrap">
                {item.title}
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                {item.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
