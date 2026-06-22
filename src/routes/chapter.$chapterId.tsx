import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Lock, Unlock, Play, CheckCircle2 } from "lucide-react";
import { getChapter } from "@/lib/data";
import { useStore } from "@/lib/store";
import { BottomNav } from "@/components/BottomNav";
import { toast } from "sonner";

export const Route = createFileRoute("/chapter/$chapterId")({
  head: ({ params }) => ({ meta: [{ title: `${params.chapterId} — MathDojo` }] }),
  component: ChapterPage,
  notFoundComponent: () => <div className="p-10 text-center">Chapter not found</div>,
  errorComponent: ({ error }) => <div className="p-10 text-center">{error.message}</div>,
});

function ChapterPage() {
  const { chapterId } = Route.useParams();
  const chapter = getChapter(chapterId);
  const router = useRouter();
  const nav = useNavigate();
  const progress = useStore((s) => s.progress);
  if (!chapter) return <div className="p-10">Not found</div>;

  const concepts = chapter.concepts;
  const doneCount = concepts.filter((c) => progress[c.id]?.completed).length;
  const total = chapter.totalConcepts;
  const pct = Math.round((doneCount / total) * 100);
  const firstIncomplete = concepts.find((c) => !progress[c.id]?.completed);

  return (
    <div className="min-h-screen pb-40">
      <div className="mx-auto max-w-md px-5 pt-6">
        <div className="flex items-center mb-4">
          <button onClick={() => router.history.back()} className="size-11 rounded-full bg-card border border-border flex items-center justify-center shadow-soft">
            <ArrowLeft className="size-5 text-[oklch(0.55_0.22_295)]" />
          </button>
          <h1 className="flex-1 text-center text-2xl font-extrabold">{chapter.title}</h1>
          <div className="size-11" />
        </div>

        <div className="rounded-3xl p-6 text-white gradient-trig shadow-card mb-4 relative overflow-hidden">
          <h2 className="text-3xl font-extrabold mb-2">{chapter.title}</h2>
          <p className="text-white/90 text-sm max-w-[60%]">{chapter.tagline}</p>
          <svg viewBox="0 0 160 120" className="absolute -right-2 top-2 w-40 opacity-90">
            <line x1="20" y1="60" x2="150" y2="60" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" />
            <line x1="80" y1="10" x2="80" y2="110" stroke="white" strokeOpacity="0.7" strokeWidth="1.5" />
            <path d="M20 60 Q 50 10, 80 60 T 140 60" fill="none" stroke="oklch(0.85 0.15 350)" strokeWidth="2.5" />
          </svg>
        </div>

        {concepts.length > 0 && (
          <div className="rounded-2xl bg-card border border-border p-4 mb-6 shadow-soft">
            <p className="font-bold mb-2">{doneCount} of {total} concepts done</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "var(--trig)" }} />
              </div>
              <span className="font-bold text-[oklch(0.55_0.22_295)]">{pct}%</span>
            </div>
          </div>
        )}

        <h3 className="text-3xl font-extrabold mb-4">Concepts</h3>

        {chapter.comingSoon || concepts.length === 0 ? (
          <div className="text-center text-muted-foreground py-10">Content coming soon!</div>
        ) : (
          <div className="space-y-3">
            {concepts.map((c, i) => {
              const done = progress[c.id]?.completed;
              const prevDone = i === 0 || progress[concepts[i - 1].id]?.completed;
              const locked = !prevDone && !done;
              return (
                <button
                  key={c.id}
                  disabled={locked}
                  onClick={() => {
                    if (locked) return toast.error(`Complete Concept ${i} first to unlock this`);
                    nav({ to: "/concept/$conceptId", params: { conceptId: c.id } });
                  }}
                  className={`w-full text-left rounded-2xl bg-card border border-border p-4 flex items-center gap-4 shadow-soft active:scale-[0.99] transition ${locked ? "opacity-70" : ""}`}
                >
                  <div className="size-14 rounded-2xl bg-[oklch(0.96_0.04_295)] flex items-center justify-center shrink-0">
                    <span className="text-xl font-extrabold text-[oklch(0.55_0.22_295)]">{c.order}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-extrabold text-lg">{c.title}</h4>
                    <p className="text-sm text-muted-foreground truncate">{c.subtitle}</p>
                    <p className={`text-xs font-bold mt-1 flex items-center gap-1.5 ${c.difficulty === "Easy" ? "text-[oklch(0.55_0.18_145)]" : c.difficulty === "Medium" ? "text-[oklch(0.62_0.2_55)]" : "text-destructive"}`}>
                      <span className="size-2 rounded-full bg-current" /> {c.difficulty}
                    </p>
                  </div>
                  <div className="shrink-0">
                    {done ? <CheckCircle2 className="size-7 text-primary" />
                      : locked ? <Lock className="size-7 text-muted-foreground" />
                      : <Unlock className="size-7 text-primary" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {firstIncomplete && (
          <Link to="/concept/$conceptId" params={{ conceptId: firstIncomplete.id }}
            className="mt-6 w-full h-16 rounded-2xl bg-primary text-primary-foreground font-extrabold text-lg shadow-card flex items-center justify-center gap-2 active:scale-[0.98] transition">
            {doneCount === 0 ? "Start from beginning" : `Continue — ${firstIncomplete.title}`}
            <Play className="size-5" fill="currentColor" />
          </Link>
        )}
      </div>
      <BottomNav />
    </div>
  );
}
