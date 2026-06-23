import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { v as useNavigate, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as getConcept } from "./data-ksrgKvCn.mjs";
import { a as Sparkles, d as House, v as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as BottomNav } from "./BottomNav-DGxyn_5j.mjs";
import { t as Route } from "./concept._conceptId-Be2A7dN_.mjs";
import { t as OwlMascot } from "./OwlMascot-BeISd_2X.mjs";
import { n as TriangleDiagram, t as MathText } from "./TriangleDiagram-C3dZJ4bB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/concept._conceptId-BZ4Sjgj0.js
var import_jsx_runtime = require_jsx_runtime();
var cardColors = [
	{
		border: "border-l-[oklch(0.55_0.2_250)]",
		badge: "bg-[oklch(0.55_0.2_250)]",
		title: "text-[oklch(0.45_0.2_250)]",
		bg: "bg-[oklch(0.98_0.01_240)]"
	},
	{
		border: "border-l-[oklch(0.55_0.18_145)]",
		badge: "bg-[oklch(0.55_0.18_145)]",
		title: "text-[oklch(0.4_0.18_145)]",
		bg: "bg-[oklch(0.98_0.02_145)]"
	},
	{
		border: "border-l-[oklch(0.62_0.2_55)]",
		badge: "bg-[oklch(0.62_0.2_55)]",
		title: "text-[oklch(0.5_0.2_55)]",
		bg: "bg-[oklch(0.99_0.02_55)]"
	},
	{
		border: "border-l-[oklch(0.55_0.22_295)]",
		badge: "bg-[oklch(0.55_0.22_295)]",
		title: "text-[oklch(0.45_0.22_295)]",
		bg: "bg-[oklch(0.98_0.02_295)]"
	}
];
/**
* Parse the lhs string to extract sub-formulas.
* The lhs text often contains multiple sub-formulas separated by \n,
* each starting with "Sub-formula N:" or similar patterns.
*/
function parseSubFormulas(lhs, explanation) {
	const parts = lhs.split(/Sub-formula\s*\d+:\s*/gi).filter((p) => p.trim());
	if (parts.length > 1) {
		[...lhs.matchAll(/Sub-formula\s*\d+:\s*([^\n$]*?)(?:,|\n|$)/gi)];
		return parts.map((part, i) => {
			const lines = part.split("\n").filter((l) => l.trim());
			const firstLine = lines[0] || "";
			const dollarIdx = firstLine.indexOf("$");
			let title = "";
			let formula = "";
			let note = "";
			if (dollarIdx > 0) {
				title = firstLine.substring(0, dollarIdx).trim().replace(/[,:]$/, "").trim();
				formula = firstLine.substring(dollarIdx).trim();
			} else {
				title = firstLine.trim();
				formula = lines.length > 1 ? lines[1] : "";
			}
			const remainingLines = lines.slice(1);
			if (remainingLines.length > 0 && dollarIdx > 0) note = remainingLines.join("\n");
			else if (remainingLines.length > 1) note = remainingLines.slice(1).join("\n");
			if (title.toLowerCase().startsWith("note:")) title = title.substring(5).trim();
			return {
				title: title || `Sub-formula ${i + 1}`,
				formula,
				note
			};
		});
	}
	const lines = lhs.split("\n").filter((l) => l.trim());
	if (lines.length > 1) return lines.map((line, i) => {
		const dollarIdx = line.indexOf("$");
		if (dollarIdx > 0) {
			const title = line.substring(0, dollarIdx).trim().replace(/[,:]$/, "").trim();
			const formula = line.substring(dollarIdx).trim();
			return {
				title: title || `Formula ${i + 1}`,
				formula,
				note: ""
			};
		}
		if (line.includes("$")) return {
			title: `Formula ${i + 1}`,
			formula: line,
			note: ""
		};
		return {
			title: line,
			formula: "",
			note: ""
		};
	});
	return [{
		title: "",
		formula: lhs,
		note: ""
	}];
}
function ConceptPage() {
	const { conceptId } = Route.useParams();
	const data = getConcept(conceptId);
	useRouter();
	const nav = useNavigate();
	if (!data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-10",
		children: "Not found"
	});
	const { concept } = data;
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
							className: "flex-1 text-center text-lg font-extrabold",
							children: concept.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OwlMascot, { size: 48 })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-[oklch(0.25_0.08_250)] text-white px-4 py-3 mb-5 flex items-center gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-[oklch(0.8_0.18_85)]" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-bold text-sm flex-1",
							children: concept.subtitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-[oklch(0.8_0.18_85)]" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: concept.formulas.map((formula, fIdx) => {
						const subFormulas = parseSubFormulas(formula.expression.lhs, formula.explanation);
						if (subFormulas.length <= 1) {
							const color = cardColors[fIdx % cardColors.length];
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: `rounded-xl border border-border ${color.bg} ${color.border} border-l-4 p-4 shadow-soft`,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: `size-8 rounded-full ${color.badge} text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5`,
										children: fIdx + 1
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-1 min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: `font-bold text-sm ${color.title} mb-2`,
												children: formula.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "rounded-lg bg-white/70 border border-border/50 px-3 py-2 mb-2 overflow-x-auto",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "text-sm",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, { children: subFormulas[0].formula || formula.expression.lhs })
												})
											}),
											subFormulas[0].note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground leading-relaxed",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, { children: subFormulas[0].note })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground leading-relaxed mt-1",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, { children: formula.explanation })
											})
										]
									})]
								})
							}, formula.id);
						}
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "space-y-3",
							children: [subFormulas.map((sub, sIdx) => {
								const color = cardColors[(fIdx + sIdx) % cardColors.length];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: `rounded-xl border border-border ${color.bg} ${color.border} border-l-4 p-4 shadow-soft`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `size-8 rounded-full ${color.badge} text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5`,
											children: sIdx + 1
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex-1 min-w-0",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: `font-bold text-sm ${color.title} mb-2`,
													children: sub.title
												}),
												sub.formula && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "rounded-lg bg-white/70 border border-border/50 px-3 py-2 mb-2 overflow-x-auto",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "text-sm",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, { children: sub.formula })
													})
												}),
												sub.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground leading-relaxed",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, { children: sub.note })
												})
											]
										})]
									})
								}, `${formula.id}-${sIdx}`);
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground leading-relaxed px-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MathText, { children: formula.explanation })
							})]
						}, formula.id);
					})
				}),
				concept.formulas.some((f) => f.mnemonic && f.mnemonic.trim()) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-[oklch(0.98_0.06_85)] border border-dashed border-[oklch(0.85_0.12_85)] px-4 py-3 mt-5 flex items-start gap-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xl leading-none mt-0.5",
						children: "💡"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-bold text-sm text-[oklch(0.5_0.16_85)]",
						children: "Key Takeaway: "
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-foreground/80",
						children: concept.formulas.filter((f) => f.mnemonic && f.mnemonic.trim()).map((f) => f.mnemonic).join(" ")
					})] })]
				}),
				data.chapter.id === "trigonometry" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "my-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleDiagram, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-center mt-8",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => nav({
							to: "/quiz/$conceptId",
							params: { conceptId }
						}),
						className: "px-6 h-12 rounded-xl gradient-algebra text-white font-bold text-base shadow-card flex items-center justify-center gap-2 active:scale-[0.98]",
						children: ["Start Practice Questions ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {})]
	});
}
//#endregion
export { ConceptPage as component };
