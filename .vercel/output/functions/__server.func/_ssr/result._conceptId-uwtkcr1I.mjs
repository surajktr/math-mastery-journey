import { o as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as getConcept } from "./data-4QvEhkiz.mjs";
import { t as useStore } from "./store-uL3UMXi9.mjs";
import { _ as ArrowRight, d as Flame, i as Star, l as Lightbulb, p as Check } from "../_libs/lucide-react.mjs";
import { t as OwlMascot } from "./OwlMascot-BeISd_2X.mjs";
import { t as motion } from "../_libs/framer-motion.mjs";
import { t as Route } from "./result._conceptId-C7q5T8Dk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/result._conceptId-uwtkcr1I.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var trophy_default = "/assets/trophy-wZsZwls6.png";
function ResultPage() {
	const { conceptId } = Route.useParams();
	const { score = 0, total = 0, hints = 0, xp = 0 } = Route.useSearch();
	const data = getConcept(conceptId);
	useStore((s) => s.streak);
	const nav = useNavigate();
	const next = (0, import_react.useMemo)(() => {
		if (!data) return null;
		const all = data.chapter.concepts;
		return all[all.findIndex((c) => c.id === conceptId) + 1] ?? null;
	}, [data, conceptId]);
	const perfect = score === total && total > 0;
	const formulasCovered = data?.concept.formulas.length ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen relative overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Confetti, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-md px-5 pt-8 pb-12 relative",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-center text-2xl font-extrabold mb-2",
					children: ["Math", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-primary",
						children: "Dojo"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
					initial: {
						scale: 0,
						rotate: -10
					},
					animate: {
						scale: 1,
						rotate: 0
					},
					transition: {
						type: "spring",
						damping: 12
					},
					className: "relative flex items-end justify-center my-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: trophy_default,
						alt: "Trophy",
						className: "w-56 h-56 object-contain",
						width: 512,
						height: 512,
						loading: "lazy"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute -right-2 bottom-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OwlMascot, { size: 110 })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "text-center text-4xl font-extrabold mb-6",
					children: [
						score,
						" / ",
						total,
						" — ",
						perfect ? "Perfect!" : score >= total * .66 ? "Great job!" : "Keep practicing!"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-3 mb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							color: "oklch(0.96 0.06 145)",
							textColor: "oklch(0.45 0.18 145)",
							value: formulasCovered,
							label: "formulas\ncovered",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							color: "oklch(0.98 0.08 85)",
							textColor: "oklch(0.55 0.18 85)",
							value: hints,
							label: "hints\nused",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lightbulb, { className: "size-5" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							color: "oklch(0.96 0.05 295)",
							textColor: "oklch(0.5 0.22 295)",
							value: `+1`,
							label: "Streak",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-5" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-center text-2xl font-extrabold mb-5",
					children: [
						"You crushed ",
						data?.concept.title,
						"! 🎉"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-3",
					children: [next ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => nav({
							to: "/concept/$conceptId",
							params: { conceptId: next.id }
						}),
						className: "w-full h-14 rounded-2xl bg-primary text-primary-foreground font-extrabold text-lg shadow-card flex items-center justify-center gap-2 active:scale-[0.98]",
						children: ["Next Concept ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-5" })]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/chapter/$chapterId",
						params: { chapterId: data?.chapter.id ?? "" },
						className: "w-full h-14 rounded-2xl bg-primary text-primary-foreground font-extrabold text-lg shadow-card flex items-center justify-center gap-2 active:scale-[0.98]",
						children: "Back to Chapter"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => nav({
							to: "/quiz/$conceptId",
							params: { conceptId }
						}),
						className: "w-full h-14 rounded-2xl bg-card border-2 border-primary text-primary font-extrabold text-lg active:scale-[0.98]",
						children: "Review Mistakes"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "inline-flex items-center gap-2 rounded-full bg-[oklch(0.97_0.1_85)] border border-[oklch(0.88_0.14_85)] px-5 py-2.5 text-[oklch(0.45_0.16_85)] font-extrabold",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
								className: "size-5",
								fill: "oklch(0.78 0.18 85)"
							}),
							" +",
							xp,
							" XP"
						]
					})
				})
			]
		})]
	});
}
function Stat({ color, textColor, value, label, icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl p-4 text-center flex flex-col items-center gap-1",
		style: {
			backgroundColor: color,
			color: textColor
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "size-9 rounded-full bg-white/70 flex items-center justify-center",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-3xl font-extrabold",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-xs font-bold whitespace-pre-line leading-tight",
				children: label
			})
		]
	});
}
function Confetti() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "absolute inset-0 pointer-events-none",
		children: (0, import_react.useMemo)(() => Array.from({ length: 40 }).map((_, i) => ({
			id: i,
			left: Math.random() * 100,
			delay: Math.random() * .5,
			color: [
				"#FBBF24",
				"#34D399",
				"#60A5FA",
				"#F87171",
				"#A78BFA",
				"#FB923C"
			][i % 6]
		})), []).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
			initial: {
				y: -20,
				opacity: 0,
				rotate: 0
			},
			animate: {
				y: "110vh",
				opacity: [
					0,
					1,
					1,
					0
				],
				rotate: 360
			},
			transition: {
				duration: 4,
				delay: p.delay,
				repeat: Infinity,
				repeatDelay: 1.5
			},
			className: "absolute size-2.5 rounded-sm",
			style: {
				left: `${p.left}%`,
				backgroundColor: p.color
			}
		}, p.id))
	});
}
//#endregion
export { ResultPage as component };
