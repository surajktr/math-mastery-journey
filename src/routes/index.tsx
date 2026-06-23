import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { chapters } from "@/lib/data";
import { useStore } from "@/lib/store";
import { OwlMascot } from "@/components/OwlMascot";
import { StreakBadge } from "@/components/StreakBadge";
import { BottomNav } from "@/components/BottomNav";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "MathDojo — Practice Math Daily" }, { name: "description", content: "Gamified math practice for Geometry, Trigonometry, Algebra & Statistics." }] }),
  component: Home,
});

const iconFor: Record<string, React.ReactNode> = {
  geometry: (<svg viewBox="0 0 64 64" className="size-12 text-white"><polygon points="32,8 56,56 8,56" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/><line x1="32" y1="8" x2="32" y2="56" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3"/></svg>),
  trigonometry: (<svg viewBox="0 0 64 64" className="size-12 text-white"><path d="M4 32 Q 16 8, 32 32 T 60 32" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/><line x1="32" y1="4" x2="32" y2="60" stroke="currentColor" strokeWidth="2"/><line x1="4" y1="32" x2="60" y2="32" stroke="currentColor" strokeWidth="2"/></svg>),
  algebra: (<svg viewBox="0 0 64 64" className="size-12 text-white"><text x="32" y="44" fontSize="40" fontWeight="800" textAnchor="middle" fill="currentColor">x²</text></svg>),
  statistics: (<svg viewBox="0 0 64 64" className="size-12 text-white"><rect x="10" y="36" width="10" height="20" fill="currentColor"/><rect x="27" y="24" width="10" height="32" fill="currentColor"/><rect x="44" y="14" width="10" height="42" fill="currentColor"/></svg>),
};

function Home() {
  const { streak, progress } = useStore();
  return (
    <div className="min-h-screen pb-32">
      <div className="mx-auto max-w-md px-5 pt-8">
        <div className="flex justify-end mb-2"><StreakBadge streak={streak} /></div>
        <div className="flex flex-col items-center gap-2 mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight mt-4">
            Math<span className="text-primary">Dojo</span>
          </h1>
        </div>
        <h2 className="text-2xl font-extrabold mb-4">Pick a Chapter</h2>
        <div className="space-y-3">
          {chapters.map((ch) => {
            const done = ch.concepts.filter((c) => progress[c.id]?.completed).length;
            const total = ch.totalConcepts;
            const pct = ch.comingSoon ? [72, 48, 65, 34][["geometry","trigonometry","algebra","statistics"].indexOf(ch.id)] ?? 0 : Math.round((done / total) * 100);
            return (
              <ChapterCard key={ch.id} chapter={ch} pct={pct} />
            );
          })}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}

function ChapterCard({ chapter, pct }: { chapter: typeof chapters[number]; pct: number }) {
  const onClick = (e: React.MouseEvent) => {
    if (chapter.comingSoon) {
      e.preventDefault();
      toast.info(`${chapter.title} — Coming soon!`);
    }
  };
  const gradient = `gradient-${chapter.color === "trig" ? "trig" : chapter.color === "geometry" ? "geometry" : chapter.color === "algebra" ? "algebra" : "stats"}`;
  return (
    <Link to="/chapter/$chapterId" params={{ chapterId: chapter.id }} onClick={onClick}
      className={`block ${gradient} rounded-2xl p-2 shadow-card active:scale-[0.98] transition`}>
      <div className="flex items-center gap-2">
        <div className="size-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
          <div className="scale-50 origin-center">{iconFor[chapter.id]}</div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-extrabold text-white truncate">{chapter.title}</h3>
          <div className="mt-1 flex items-center gap-1.5">
            <div className="flex-1 h-1 rounded-full bg-white/30 overflow-hidden">
              <div className="h-full bg-white rounded-full transition-all" style={{ width: `${pct}%` }} />
            </div>
            <span className="text-white font-bold text-[10px]">{pct}%</span>
          </div>
        </div>
        <div className="size-6 rounded-full bg-white flex items-center justify-center shrink-0">
          <ArrowRight className="size-3" style={{ color: `var(--${chapter.color === "trig" ? "trig" : chapter.color})` }} />
        </div>
      </div>
    </Link>
  );
}
