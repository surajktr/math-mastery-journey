import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { Home, Check, Lightbulb, X } from "lucide-react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { getConcept } from "@/lib/data";
import { useStore } from "@/lib/store";
import { OwlMascot } from "@/components/OwlMascot";
import { HintSheet } from "@/components/HintSheet";
import { TriangleDiagram } from "@/components/TriangleDiagram";
import { MathText } from "@/components/MathText";

type Search = { f?: number; score?: number; hints?: number; xp?: number };

export const Route = createFileRoute("/quiz/$conceptId")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    f: Number(s.f) || 0,
    score: Number(s.score) || 0,
    hints: Number(s.hints) || 0,
    xp: Number(s.xp) || 0,
  }),
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

  const { f = 0, score: initialScore = 0, hints: initialHints = 0, xp: initialXp = 0 } = Route.useSearch();
  
  const flat: Flat[] = useMemo(() => {
    if (!data || !data.concept.formulas[f]) return [];
    return data.concept.formulas[f].questions.map((_, qi) => ({ formulaIdx: f, questionIdx: qi }));
  }, [data, f]);

  const [pos, setPos] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(initialHints);
  const [score, setScore] = useState(initialScore);

  if (!data || flat.length === 0) return <div className="p-10">No questions for this formula yet.</div>;

  const cur = flat[pos];
  const formula = data.concept.formulas[f];
  const q = formula.questions[cur.questionIdx];
  const totalQ = flat.length;
  const overallPct = Math.round(((pos + (checked ? 1 : 0)) / totalQ) * 100);

  const handleOptionSelect = (i: number) => {
    if (checked) return;
    setSelected(i);
    setChecked(true);
    if (i === q.correctIndex) setScore((s) => s + 1);
    else markWrong(formula.id);
  };

  const next = () => {
    if (pos + 1 >= flat.length) {
      // Finished this formula's questions
      const formulaScore = score - initialScore;
      const formulaHints = hintsUsed - initialHints;
      const formulaXp = formulaScore * 10 + (formulaScore === flat.length ? 10 : 0) + (formulaHints === 0 ? 10 : 0);
      const newXp = initialXp + formulaXp;
      
      const isLastFormula = f === data.concept.formulas.length - 1;
      
      if (isLastFormula) {
        completeConcept(conceptId, score, hintsUsed, newXp);
        
        // Count total questions across all formulas for the final result screen
        const totalQuestions = data.concept.formulas.reduce((sum, form) => sum + form.questions.length, 0);
        
        nav({ to: "/result/$conceptId", params: { conceptId }, search: { score, total: totalQuestions, hints: hintsUsed, xp: newXp } as any });
      } else {
        nav({ to: "/concept/$conceptId", params: { conceptId }, search: { f: f + 1, score, hints: hintsUsed, xp: newXp } as any });
      }
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
          <button onClick={() => { if (confirm("Quit quiz? Progress for this concept will not be saved.")) nav({ to: "/" }); }}
            className="size-11 rounded-full bg-card border border-border flex items-center justify-center shadow-soft">
            <Home className="size-5 text-[oklch(0.62_0.2_55)]" />
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

        <motion.div 
          key={pos} 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          drag={checked ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={(e, info) => {
            if (checked && info.offset.x < -50) {
              next();
            }
          }}
          className="w-full touch-pan-y"
        >
          <div className="w-full rounded-2xl bg-card border border-border p-5 shadow-soft mb-5 overflow-x-auto">
            <div className="w-full text-left font-bold text-sm leading-relaxed"><MathText>{q.text}</MathText></div>
            {q.diagram && (
              <div className="mt-3">
                <TriangleDiagram hyp={q.diagram.hyp} opp={q.diagram.opp} adj={q.diagram.adj} />
              </div>
            )}
          </div>

          <div className="space-y-3">
            {q.options.map((opt, i) => {
              const isCorrect = checked && i === q.correctIndex;
              const isWrong = checked && i === selected && i !== q.correctIndex;
              const selectedState = selected === i && !checked;
              return (
                <button key={i} disabled={checked} onClick={() => handleOptionSelect(i)}
                  className={`w-full rounded-2xl border-2 bg-card p-2.5 flex items-center gap-3 text-left transition-all shadow-soft ${
                    isCorrect ? "border-primary bg-[oklch(0.96_0.08_145)]"
                      : isWrong ? "border-destructive bg-[oklch(0.97_0.06_28)]"
                      : selectedState ? "border-[oklch(0.62_0.2_55)] scale-[1.01]"
                      : "border-border"
                  }`}>
                  <div className={`size-8 rounded-full flex items-center justify-center font-extrabold text-sm shrink-0 ${
                    isCorrect ? "bg-primary text-white" : isWrong ? "bg-destructive text-white" : "bg-[oklch(0.97_0.05_60)] text-[oklch(0.62_0.2_55)]"
                  }`}>
                    {isCorrect ? <Check className="size-4" /> : isWrong ? <X className="size-4" /> : String.fromCharCode(65 + i)}
                  </div>
                  <span className="font-medium text-sm flex-1"><MathText>{opt}</MathText></span>
                </button>
              );
            })}
          </div>

          {checked && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
              <p className={`text-center font-bold ${selected === q.correctIndex ? "text-primary" : "text-destructive"}`}>
                {selected === q.correctIndex ? "✓ Correct!" : <span>✗ Not quite. Correct answer: <MathText>{q.options[q.correctIndex]}</MathText></span>}
              </p>

              <div className="mt-3 rounded-2xl border border-[oklch(0.85_0.08_145)] bg-[oklch(0.97_0.02_145)] p-4">
                <p className="text-sm font-bold text-[oklch(0.4_0.15_145)] mb-2 flex items-center gap-1.5">
                  <Lightbulb className="size-4" /> Solution
                </p>
                <div className="text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap">
                  <MathText>{q.solution || formula.explanation}</MathText>
                </div>
              </div>
              
              <div className="mt-4 text-center text-sm font-bold text-muted-foreground animate-pulse flex items-center justify-center gap-2">
                 👈 Swipe left to continue
              </div>
            </motion.div>
          )}
        </motion.div>

        <div className="mt-5 flex items-center gap-3">
          <button onClick={() => { setHintOpen(true); setHintsUsed((h) => h + 1); }}
            className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.95_0.12_85)] text-[oklch(0.4_0.16_85)] font-extrabold px-4 py-2.5 active:scale-95">
            Hint <Lightbulb className="size-4" fill="oklch(0.82_0.16_85)" />
          </button>
          <div className="flex-1" />
          {checked && (
            <button onClick={next} className="h-12 px-6 rounded-2xl bg-primary text-primary-foreground font-extrabold shadow-card">Next →</button>
          )}
        </div>
      </div>

      <HintSheet open={hintOpen} onClose={() => setHintOpen(false)} formula={formula} />
    </div>
  );
}
