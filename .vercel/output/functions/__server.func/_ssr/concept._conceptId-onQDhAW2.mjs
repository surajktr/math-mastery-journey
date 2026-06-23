import { o as __toESM } from "../_runtime.mjs";
import { n as require_react, r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as getConcept } from "./data-4QvEhkiz.mjs";
import { _ as ArrowRight, u as House, v as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as BottomNav } from "./BottomNav-DGxyn_5j.mjs";
import { t as Route } from "./concept._conceptId-PzgsNMWB.mjs";
import { t as OwlMascot } from "./OwlMascot-BeISd_2X.mjs";
import { n as MathText, r as TriangleDiagram, t as FormulaCard } from "./TriangleDiagram-RDvglDmK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/concept._conceptId-onQDhAW2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ConceptPage() {
	const { conceptId } = Route.useParams();
	const data = getConcept(conceptId);
	useRouter();
	const nav = useNavigate();
	const [idx, setIdx] = (0, import_react.useState)(0);
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-10",
		children: "Not found"
	});
	const { concept } = data;
	const total = concept.formulas.length || 6;
	const formula = concept.formulas[idx];
	const isLast = idx === concept.formulas.length - 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen pb-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-md px-5 pt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 mb-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => nav({ to: "/" }),
							className: "size-11 rounded-full bg-card border border-border flex items-center justify-center shadow-soft",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "size-5 text-[oklch(0.55_0.22_295)]" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "flex-1 text-center text-xl font-extrabold",
							children: concept.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OwlMascot, { size: 48 })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex-1 flex gap-1.5",
						children: Array.from({ length: total }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-2 flex-1 rounded-full ${i <= idx ? "bg-[oklch(0.55_0.22_295)]" : "bg-muted"}` }, i))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-sm font-bold text-[oklch(0.55_0.22_295)]",
						children: [
							idx + 1,
							" of ",
							total
						]
					})]
				}),
				formula ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					formula.descriptionAbove && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-4 text-sm leading-relaxed whitespace-pre-wrap",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, { children: formula.descriptionAbove })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormulaCard, { formula }),
					formula.descriptionBelow && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 text-sm leading-relaxed whitespace-pre-wrap",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, { children: formula.descriptionBelow })
					}),
					formula.example && formula.example.trim() !== "" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 rounded-2xl border-2 border-[oklch(0.85_0.1_200)] bg-[oklch(0.97_0.02_200)] p-4 shadow-soft",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-extrabold text-[oklch(0.4_0.15_200)] mb-2 flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-base leading-none",
								children: "📝"
							}), " Example"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm leading-relaxed text-foreground/80 whitespace-pre-wrap",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, { children: formula.example })
						})]
					}),
					formula.mnemonic && formula.mnemonic.trim() !== "" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-center w-full mt-4 mb-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-[oklch(0.98_0.06_85)] border border-[oklch(0.9_0.1_85)] px-4 py-3 inline-block",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-sm font-bold text-[oklch(0.5_0.16_85)] flex items-center justify-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-base leading-none",
									children: "💡"
								}), " Memory Tip"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "italic mt-1 text-sm text-center",
								children: formula.mnemonic
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 text-sm leading-relaxed",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, { children: formula.explanation })
					}),
					data.chapter.id === "trigonometry" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed",
						children: "They are the foundation of trigonometry!"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "my-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleDiagram, {})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-center gap-3 mt-8",
						children: [idx > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => setIdx((i) => Math.max(0, i - 1)),
							className: "size-11 rounded-full bg-card border border-border shrink-0 flex items-center justify-center shadow-soft",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" })
						}), isLast ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => nav({
								to: "/quiz/$conceptId",
								params: { conceptId }
							}),
							className: "px-6 h-12 rounded-xl gradient-algebra text-white font-bold text-base shadow-card flex items-center justify-center gap-2 active:scale-[0.98]",
							children: ["Start Practice Questions ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setIdx((i) => Math.min(concept.formulas.length - 1, i + 1)),
							className: "px-6 h-12 rounded-xl bg-primary text-primary-foreground font-bold text-base shadow-card flex items-center justify-center gap-2 active:scale-[0.98]",
							children: ["Next ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
						})]
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-center text-muted-foreground py-10",
					children: "Formulas coming soon!"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {})]
	});
}
//#endregion
export { ConceptPage as component };
