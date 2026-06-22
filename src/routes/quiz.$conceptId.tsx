import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { ArrowLeft, Check, Lightbulb, X } from "lucide-react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { getConcept } from "@/lib/data";
import { useStore } from "@/lib/store";
import { OwlMascot } from "@/components/OwlMascot";
import { HintSheet } from "@/components/HintSheet";
import { TriangleDiagram } from "@/components/TriangleDiagram";
import { BottomNav } from "@/components/BottomNav";

export const Route = createFileRoute("/quiz/$conceptId")({
  component: QuizPage,
  notFoundComponent: () => <div className="p-10">Not found</div>,
  errorComponent: ({ error }) => <div className="p-10">{error.message}</div>,
});

type Flat = { formulaIdx: number; questionIdx: number };

function QuizPage() {
  const { conceptId } = Route.useParams();
  const data = getConcept(conceptId);
  const router = useRouter();
  const nav = useNavigate();
  const markWrong = useStore((s) => s.markWrong);
  const completeConcept = useStore((s) => s.completeConcept);

  const flat: Flat[] = useMemo(() => {
    if (!data) return [];
    const arr: Flat[] = [];
    data.concept.formulas.forEach((f, fi) => f.questions.forEach((_, qi) => arr.push({ formulaIdx: fi, questionIdx: qi })));
    return arr;
  }, [data]);

  const [pos, setPos] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [score, setScore] = useState(0);

  if (!data || flat.length === 0) return <div className="p-10">No questions yet.</div>;

  const cur = flat[pos];
  const formula = data.concept.formulas[cur.formulaIdx];
  const q = formula.questions[cur.questionIdx];
  const totalQ = formula.questions.length;
  const overallPct = Math.round(((pos + (checked ? 1 : 0)) / flat.length) * 100);

  const check = () => {
    if (selected == null) return;
    setChecked(true);
    if (selected === q.correctIndex) setScore((s) => s + 1);
    else markWrong(formula.id);
  };

  const next = () => {
    if (pos + 1 >= flat.length) {
      const xp = score * 10 + (score === flat.length ? 10 : 0) + (hintsUsed === 0 ? 10 : 0);
      completeConcept(conceptId, score, hintsUsed, xp);
      nav({ to: "/result/$conceptId", params: { conceptId }, search: { score, total: flat.length, hints: hintsUsed, xp } as any });
      return;
    }
    setPos((p) => p + 1);
    setSelected(null);
    setChecked(false);
  };

  // step indicator for current formula
  const stepN = totalQ;

  return (
    <div className="min-h-screen pb-32">
      <div className="mx-auto max-w-md px-5 pt-6">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => { if (confirm("Quit quiz? Progress for this concept will not be saved.")) router.history.back(); }}
            className="size-11 rounded-full bg-card border border-border flex items-center justify-center shadow-soft">
            <ArrowLeft className="size-5 text-[oklch(0.62_0.2_55)]" />
          </button>
          <h1 className="flex-1 text-center text-2xl font-extrabold">Math<span className="text-primary">Dojo</span></h1>
          <OwlMascot size={48} />
        </div>

        <div className="h-1.5 rounded-full bg-muted overflow-hidden mb-4">
          <div className="h-full bg-primary transition-all" style={{ width: `${overallPct}%` }} />
        </div>

        <div className="flex items-center justify-center gap-2 mb-3">
          {Array.from({ length: stepN }).map((_, i) => {
            const isDone = i < cur.questionIdx;
            const isCur = i === cur.questionIdx;
            return (
              <div key={i} className="flex items-center gap-2">
                <div className={`size-9 rounded-full flex items-center justify-center font-extrabold text-sm ${
                  isDone ? "bg-primary text-white" : isCur ? "bg-[oklch(0.74_0.17_60)] text-white" : "bg-card border-2 border-border text-muted-foreground"
                }`}>{isDone ? <Check className="size-5" /> : i + 1}</div>
                {i < stepN - 1 && <div className={`h-0.5 w-10 ${i < cur.questionIdx ? "bg-primary" : "bg-border"}`} />}
              </div>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground mb-4">
          Question {cur.questionIdx + 1} of {totalQ} — Formula: <span className="text-[oklch(0.62_0.2_55)] font-bold italic">{formula.name}</span>
        </p>

        <motion.div key={pos} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="rounded-2xl bg-card border border-border p-5 shadow-soft mb-5">
          <p className="text-center font-bold text-lg leading-relaxed">{q.text}</p>
          {q.diagram && (
            <div className="mt-3">
              <TriangleDiagram hyp={q.diagram.hyp} opp={q.diagram.opp} adj={q.diagram.adj} />
            </div>
          )}
        </motion.div>

        <div className="space-y-3">
          {q.options.map((opt, i) => {
            const isCorrect = checked && i === q.correctIndex;
            const isWrong = checked && i === selected && i !== q.correctIndex;
            const selectedState = selected === i && !checked;
            return (
              <button key={i} disabled={checked} onClick={() => setSelected(i)}
                className={`w-full rounded-2xl border-2 bg-card p-4 flex items-center gap-4 text-left transition-all shadow-soft ${
                  isCorrect ? "border-primary bg-[oklch(0.96_0.08_145)]"
                    : isWrong ? "border-destructive bg-[oklch(0.97_0.06_28)]"
                    : selectedState ? "border-[oklch(0.62_0.2_55)] scale-[1.01]"
                    : "border-border"
                }`}>
                <div className={`size-11 rounded-full flex items-center justify-center font-extrabold text-lg shrink-0 ${
                  isCorrect ? "bg-primary text-white" : isWrong ? "bg-destructive text-white" : "bg-[oklch(0.97_0.05_60)] text-[oklch(0.62_0.2_55)]"
                }`}>
                  {isCorrect ? <Check className="size-5" /> : isWrong ? <X className="size-5" /> : String.fromCharCode(65 + i)}
                </div>
                <span className="font-bold flex-1">{opt}</span>
              </button>
            );
          })}
        </div>

        {checked && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`mt-4 text-center font-bold ${selected === q.correctIndex ? "text-primary" : "text-destructive"}`}>
            {selected === q.correctIndex ? "✓ Correct!" : `✗ Not quite. Correct answer: ${q.options[q.correctIndex]}`}
          </motion.p>
        )}

        <div className="mt-5 flex items-center gap-3">
          <button onClick={() => { setHintOpen(true); setHintsUsed((h) => h + 1); }}
            className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.95_0.12_85)] text-[oklch(0.4_0.16_85)] font-extrabold px-4 py-2.5 active:scale-95">
            Hint <Lightbulb className="size-4" fill="oklch(0.82_0.16_85)" />
          </button>
          <div className="flex-1" />
          {!checked ? (
            <button onClick={check} disabled={selected == null}
              className="h-12 px-6 rounded-2xl bg-primary text-primary-foreground font-extrabold shadow-card disabled:opacity-40">Check</button>
          ) : (
            <button onClick={next} className="h-12 px-6 rounded-2xl bg-primary text-primary-foreground font-extrabold shadow-card">Next →</button>
          )}
        </div>
      </div>

      <HintSheet open={hintOpen} onClose={() => setHintOpen(false)} formula={formula} />
      <BottomNav />
    </div>
  );
}
