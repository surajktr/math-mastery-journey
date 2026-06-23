import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as chapters } from "./data-ksrgKvCn.mjs";
import { t as useStore } from "./store-uL3UMXi9.mjs";
import { f as Flame, v as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as BottomNav } from "./BottomNav-DGxyn_5j.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as OwlMascot } from "./OwlMascot-BeISd_2X.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Cy29JZhr.js
var import_jsx_runtime = require_jsx_runtime();
function StreakBadge({ streak }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "inline-flex items-center gap-2 rounded-full bg-[oklch(0.95_0.06_145)] px-4 py-2 text-[oklch(0.45_0.16_145)] font-bold",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, {
			className: "size-5",
			fill: "oklch(0.7_0.18_145)",
			stroke: "oklch(0.45_0.16_145)"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [streak, " day streak"] })]
	});
}
var iconFor = {
	geometry: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 64",
		className: "size-12 text-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			points: "32,8 56,56 8,56",
			fill: "none",
			stroke: "currentColor",
			strokeWidth: "3",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
			x1: "32",
			y1: "8",
			x2: "32",
			y2: "56",
			stroke: "currentColor",
			strokeWidth: "2",
			strokeDasharray: "3 3"
		})]
	}),
	trigonometry: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 64",
		className: "size-12 text-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M4 32 Q 16 8, 32 32 T 60 32",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "3",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "32",
				y1: "4",
				x2: "32",
				y2: "60",
				stroke: "currentColor",
				strokeWidth: "2"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
				x1: "4",
				y1: "32",
				x2: "60",
				y2: "32",
				stroke: "currentColor",
				strokeWidth: "2"
			})
		]
	}),
	algebra: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 64 64",
		className: "size-12 text-white",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
			x: "32",
			y: "44",
			fontSize: "40",
			fontWeight: "800",
			textAnchor: "middle",
			fill: "currentColor",
			children: "x²"
		})
	}),
	statistics: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 64",
		className: "size-12 text-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "10",
				y: "36",
				width: "10",
				height: "20",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "27",
				y: "24",
				width: "10",
				height: "32",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "44",
				y: "14",
				width: "10",
				height: "42",
				fill: "currentColor"
			})
		]
	})
};
function Home() {
	const { streak, progress } = useStore();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen pb-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-md px-5 pt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex justify-end mb-2",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StreakBadge, { streak })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col items-center gap-2 mb-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OwlMascot, { size: 140 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "text-4xl font-extrabold tracking-tight",
						children: ["Math", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-primary",
							children: "Dojo"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-3xl font-extrabold mb-5",
					children: "Pick a Chapter"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: chapters.map((ch) => {
						const done = ch.concepts.filter((c) => progress[c.id]?.completed).length;
						const total = ch.totalConcepts;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChapterCard, {
							chapter: ch,
							pct: ch.comingSoon ? [
								72,
								48,
								65,
								34
							][[
								"geometry",
								"trigonometry",
								"algebra",
								"statistics"
							].indexOf(ch.id)] ?? 0 : Math.round(done / total * 100)
						}, ch.id);
					})
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {})]
	});
}
function ChapterCard({ chapter, pct }) {
	const onClick = (e) => {
		if (chapter.comingSoon) {
			e.preventDefault();
			toast.info(`${chapter.title} — Coming soon!`);
		}
	};
	const gradient = `gradient-${chapter.color === "trig" ? "trig" : chapter.color === "geometry" ? "geometry" : chapter.color === "algebra" ? "algebra" : "stats"}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/chapter/$chapterId",
		params: { chapterId: chapter.id },
		onClick,
		className: `block ${gradient} rounded-2xl p-4 shadow-card active:scale-[0.98] transition`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "size-20 rounded-2xl bg-white/15 flex items-center justify-center shrink-0",
					children: iconFor[chapter.id]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex-1 min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-2xl font-extrabold text-white truncate",
						children: chapter.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 h-2.5 rounded-full bg-white/30 overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full bg-white rounded-full transition-all",
								style: { width: `${pct}%` }
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-white font-bold text-sm",
							children: [pct, "%"]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "size-11 rounded-full bg-white flex items-center justify-center shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
						className: "size-5",
						style: { color: `var(--${chapter.color === "trig" ? "trig" : chapter.color})` }
					})
				})
			]
		})
	});
}
//#endregion
export { Home as component };
