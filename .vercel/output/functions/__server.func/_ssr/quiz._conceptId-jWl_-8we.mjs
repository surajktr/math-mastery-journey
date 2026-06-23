import { o as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as getConcept } from "./data-4QvEhkiz.mjs";
import { t as useStore } from "./store-uL3UMXi9.mjs";
import { l as Lightbulb, p as Check, t as X, u as House } from "../_libs/lucide-react.mjs";
import { t as OwlMascot } from "./OwlMascot-BeISd_2X.mjs";
import { n as MathText, r as TriangleDiagram, t as FormulaCard } from "./TriangleDiagram-D1lekt4N.mjs";
import { t as Route } from "./quiz._conceptId-DdRotbLt.mjs";
import { n as AnimatePresence, t as motion } from "../_libs/framer-motion.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/quiz._conceptId-jWl_-8we.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HintSheet({ open, onClose, formula }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: open && formula && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
		className: "fixed inset-0 z-50 flex items-end justify-center",
		initial: { backgroundColor: "rgba(0,0,0,0)" },
		animate: { backgroundColor: "rgba(0,0,0,0.5)" },
		exit: { backgroundColor: "rgba(0,0,0,0)" },
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
			className: "w-full max-w-md bg-card rounded-t-3xl p-6 pb-8",
			initial: { y: 400 },
			animate: { y: 0 },
			exit: { y: 400 },
			transition: {
				type: "spring",
				damping: 28,
				stiffness: 280
			},
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto h-1.5 w-12 rounded-full bg-muted mb-5" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-3 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "size-14 rounded-2xl bg-[oklch(0.97_0.08_85)] flex items-center justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, {
							className: "size-8 text-[oklch(0.7_0.18_85)]",
							fill: "oklch(0.85_0.16_85)"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-2xl font-extrabold",
						children: "Quick Hint"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-[oklch(0.98_0.03_85)] rounded-2xl p-4 mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormulaCard, {
						formula,
						compact: true
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-sm italic text-muted-foreground mb-6",
					children: formula.mnemonic
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: onClose,
					className: "w-full h-14 rounded-2xl bg-primary text-primary-foreground font-bold text-lg shadow-card active:scale-[0.98] transition",
					children: "Got it! Back to question"
				})
			]
		})
	}) });
}
function QuizPage() {
	const { conceptId } = Route.useParams();
	const data = getConcept(conceptId);
	useRouter();
	const nav = useNavigate();
	const markWrong = useStore((s) => s.markWrong);
	const completeConcept = useStore((s) => s.completeConcept);
	const flat = (0, import_react.useMemo)(() => {
		if (!data) return [];
		const arr = [];
		data.concept.formulas.forEach((f, fi) => f.questions.forEach((_, qi) => arr.push({
			formulaIdx: fi,
			questionIdx: qi
		})));
		return arr;
	}, [data]);
	const [pos, setPos] = (0, import_react.useState)(0);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [checked, setChecked] = (0, import_react.useState)(false);
	const [hintOpen, setHintOpen] = (0, import_react.useState)(false);
	const [hintsUsed, setHintsUsed] = (0, import_react.useState)(0);
	const [score, setScore] = (0, import_react.useState)(0);
	if (!data || flat.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-10",
		children: "No questions yet."
	});
	const cur = flat[pos];
	const formula = data.concept.formulas[cur.formulaIdx];
	const q = formula.questions[cur.questionIdx];
	const totalQ = formula.questions.length;
	const overallPct = Math.round((pos + (checked ? 1 : 0)) / flat.length * 100);
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
			nav({
				to: "/result/$conceptId",
				params: { conceptId },
				search: {
					score,
					total: flat.length,
					hints: hintsUsed,
					xp
				}
			});
			return;
		}
		setPos((p) => p + 1);
		setSelected(null);
		setChecked(false);
	};
	const stepN = totalQ;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen pb-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-md px-5 pt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 mb-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								if (confirm("Quit quiz? Progress for this concept will not be saved.")) nav({ to: "/" });
							},
							className: "size-11 rounded-full bg-card border border-border flex items-center justify-center shadow-soft",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "size-5 text-[oklch(0.62_0.2_55)]" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "flex-1 text-center text-2xl font-extrabold",
							children: ["Math", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-primary",
								children: "Dojo"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OwlMascot, { size: 48 })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-1.5 rounded-full bg-muted overflow-hidden mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-full bg-primary transition-all",
						style: { width: `${overallPct}%` }
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex items-center justify-center gap-2 mb-3",
					children: Array.from({ length: stepN }).map((_, i) => {
						const isDone = i < cur.questionIdx;
						const isCur = i === cur.questionIdx;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `size-9 rounded-full flex items-center justify-center font-extrabold text-sm ${isDone ? "bg-primary text-white" : isCur ? "bg-[oklch(0.74_0.17_60)] text-white" : "bg-card border-2 border-border text-muted-foreground"}`,
								children: isDone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-5" }) : i + 1
							}), i < stepN - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-0.5 w-10 ${i < cur.questionIdx ? "bg-primary" : "bg-border"}` })]
						}, i);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-center text-sm text-muted-foreground mb-4",
					children: [
						"Question ",
						cur.questionIdx + 1,
						" of ",
						totalQ,
						" — Formula: ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[oklch(0.62_0.2_55)] font-bold italic",
							children: formula.name
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						x: 30
					},
					animate: {
						opacity: 1,
						x: 0
					},
					className: "w-full rounded-2xl bg-card border border-border p-5 shadow-soft mb-5 overflow-x-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "w-full text-left font-bold text-sm leading-relaxed",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, { children: q.text })
					}), q.diagram && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleDiagram, {
							hyp: q.diagram.hyp,
							opp: q.diagram.opp,
							adj: q.diagram.adj
						})
					})]
				}, pos),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: q.options.map((opt, i) => {
						const isCorrect = checked && i === q.correctIndex;
						const isWrong = checked && i === selected && i !== q.correctIndex;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							disabled: checked,
							onClick: () => setSelected(i),
							className: `w-full rounded-2xl border-2 bg-card p-2.5 flex items-center gap-3 text-left transition-all shadow-soft ${isCorrect ? "border-primary bg-[oklch(0.96_0.08_145)]" : isWrong ? "border-destructive bg-[oklch(0.97_0.06_28)]" : selected === i && !checked ? "border-[oklch(0.62_0.2_55)] scale-[1.01]" : "border-border"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `size-8 rounded-full flex items-center justify-center font-extrabold text-sm shrink-0 ${isCorrect ? "bg-primary text-white" : isWrong ? "bg-destructive text-white" : "bg-[oklch(0.97_0.05_60)] text-[oklch(0.62_0.2_55)]"}`,
								children: isCorrect ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : isWrong ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }) : String.fromCharCode(65 + i)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium text-sm flex-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, { children: opt })
							})]
						}, i);
					})
				}),
				checked && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						opacity: 0,
						y: 10
					},
					animate: {
						opacity: 1,
						y: 0
					},
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: `text-center font-bold ${selected === q.correctIndex ? "text-primary" : "text-destructive"}`,
						children: selected === q.correctIndex ? "✓ Correct!" : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["✗ Not quite. Correct answer: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, { children: q.options[q.correctIndex] })] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 rounded-2xl border border-[oklch(0.85_0.08_145)] bg-[oklch(0.97_0.02_145)] p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-bold text-[oklch(0.4_0.15_145)] mb-2 flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "size-4" }), " Solution"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, { children: q.solution || formula.explanation })
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => {
								setHintOpen(true);
								setHintsUsed((h) => h + 1);
							},
							className: "inline-flex items-center gap-2 rounded-full bg-[oklch(0.95_0.12_85)] text-[oklch(0.4_0.16_85)] font-extrabold px-4 py-2.5 active:scale-95",
							children: ["Hint ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, {
								className: "size-4",
								fill: "oklch(0.82_0.16_85)"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-1" }),
						!checked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: check,
							disabled: selected == null,
							className: "h-12 px-6 rounded-2xl bg-primary text-primary-foreground font-extrabold shadow-card disabled:opacity-40",
							children: "Check"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: next,
							className: "h-12 px-6 rounded-2xl bg-primary text-primary-foreground font-extrabold shadow-card",
							children: "Next →"
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HintSheet, {
			open: hintOpen,
			onClose: () => setHintOpen(false),
			formula
		})]
	});
}
//#endregion
export { QuizPage as component };
