import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check, Flame, Lightbulb, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { getConcept, chapters } from "@/lib/data";
import trophy from "@/assets/trophy.png";
import { OwlMascot } from "@/components/OwlMascot";
import { useStore } from "@/lib/store";

type Search = { score?: number; total?: number; hints?: number; xp?: number };

export const Route = createFileRoute("/result/$conceptId")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    score: Number(s.score) || 0,
    total: Number(s.total) || 0,
    hints: Number(s.hints) || 0,
    xp: Number(s.xp) || 0,
  }),
  component: ResultPage,
  notFoundComponent: () => <div className="p-10">Not found</div>,
  errorComponent: ({ error }) => <div className="p-10">{error.message}</div>,
});

function ResultPage() {
  const { conceptId } = Route.useParams();
  const { score = 0, total = 0, hints = 0, xp = 0 } = Route.useSearch();
  const data = getConcept(conceptId);
  const streak = useStore((s) => s.streak);
  const nav = useNavigate();

  const next = useMemo(() => {
    if (!data) return null;
    const all = data.chapter.concepts;
    const i = all.findIndex((c) => c.id === conceptId);
    return all[i + 1] ?? null;
  }, [data, conceptId]);

  const perfect = score === total && total > 0;
  const formulasCovered = data?.concept.formulas.length ?? 0;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Confetti />
      <div className="mx-auto max-w-md px-5 pt-8 pb-12 relative">
        <h1 className="text-center text-2xl font-extrabold mb-2">Math<span className="text-primary">Dojo</span></h1>

        <motion.div initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", damping: 12 }}
          className="relative flex items-end justify-center my-4">
          <img src={trophy} alt="Trophy" className="w-56 h-56 object-contain" width={512} height={512} loading="lazy" />
          <div className="absolute -right-2 bottom-4"><OwlMascot size={110} /></div>
        </motion.div>

        <h2 className="text-center text-4xl font-extrabold mb-6">
          {score} / {total} — {perfect ? "Perfect!" : score >= total * 0.66 ? "Great job!" : "Keep practicing!"}
        </h2>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <Stat color="oklch(0.96 0.06 145)" textColor="oklch(0.45 0.18 145)" value={formulasCovered} label={"formulas\ncovered"} icon={<Check className="size-5" />} />
          <Stat color="oklch(0.98 0.08 85)" textColor="oklch(0.55 0.18 85)" value={hints} label={"hints\nused"} icon={<Lightbulb className="size-5" />} />
          <Stat color="oklch(0.96 0.05 295)" textColor="oklch(0.5 0.22 295)" value={`+1`} label="Streak" icon={<Flame className="size-5" />} />
        </div>

        <p className="text-center text-2xl font-extrabold mb-5">You crushed {data?.concept.title}! 🎉</p>

        <div className="space-y-3">
          {next ? (
            <button onClick={() => nav({ to: "/concept/$conceptId", params: { conceptId: next.id } })}
              className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-extrabold text-lg shadow-card flex items-center justify-center gap-2 active:scale-[0.98]">
              Next Concept <ArrowRight className="size-5" />
            </button>
          ) : (
            <Link to="/chapter/$chapterId" params={{ chapterId: data?.chapter.id ?? "" }}
              className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-extrabold text-lg shadow-card flex items-center justify-center gap-2 active:scale-[0.98]">
              Back to Chapter
            </Link>
          )}
          <button onClick={() => nav({ to: "/quiz/$conceptId", params: { conceptId } })}
            className="w-full h-14 rounded-2xl bg-card border-2 border-primary text-primary font-extrabold text-lg active:scale-[0.98]">
            Review Mistakes
          </button>
        </div>

        <div className="mt-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.97_0.1_85)] border border-[oklch(0.88_0.14_85)] px-5 py-2.5 text-[oklch(0.45_0.16_85)] font-extrabold">
            <Star className="size-5" fill="oklch(0.78 0.18 85)" /> +{xp} XP
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ color, textColor, value, label, icon }: any) {
  return (
    <div className="rounded-2xl p-4 text-center flex flex-col items-center gap-1" style={{ backgroundColor: color, color: textColor }}>
      <div className="size-9 rounded-full bg-white/70 flex items-center justify-center">{icon}</div>
      <div className="text-3xl font-extrabold">{value}</div>
      <div className="text-xs font-bold whitespace-pre-line leading-tight">{label}</div>
    </div>
  );
}

function Confetti() {
  const pieces = useMemo(() => Array.from({ length: 40 }).map((_, i) => ({
    id: i, left: Math.random() * 100, delay: Math.random() * 0.5,
    color: ["#FBBF24","#34D399","#60A5FA","#F87171","#A78BFA","#FB923C"][i % 6],
  })), []);
  return (
    <div className="absolute inset-0 pointer-events-none">
      {pieces.map((p) => (
        <motion.div key={p.id} initial={{ y: -20, opacity: 0, rotate: 0 }} animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: 360 }}
          transition={{ duration: 4, delay: p.delay, repeat: Infinity, repeatDelay: 1.5 }}
          className="absolute size-2.5 rounded-sm" style={{ left: `${p.left}%`, backgroundColor: p.color }} />
      ))}
    </div>
  );
}
