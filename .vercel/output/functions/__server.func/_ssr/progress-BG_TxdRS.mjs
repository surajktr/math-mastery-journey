import { r as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as chapters } from "./data-4QvEhkiz.mjs";
import { t as useStore } from "./store-uL3UMXi9.mjs";
import { g as BookOpen, h as Calendar, n as TrendingUp, r as Target, s as Lock } from "../_libs/lucide-react.mjs";
import { t as BottomNav } from "./BottomNav-DGxyn_5j.mjs";
import { t as OwlMascot } from "./OwlMascot-BeISd_2X.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/progress-BG_TxdRS.js
var import_jsx_runtime = require_jsx_runtime();
function ProgressPage() {
	const { progress, heatmap, weakTopics } = useStore();
	const totalConcepts = chapters.reduce((a, c) => a + c.totalConcepts, 0);
	const doneConcepts = Object.values(progress).filter((p) => p.completed).length;
	const overallPct = Math.round(doneConcepts / totalConcepts * 100);
	const today = /* @__PURE__ */ new Date();
	const days = Array.from({ length: 30 }).map((_, i) => {
		const d = new Date(today);
		d.setDate(d.getDate() - (29 - i));
		const key = d.toISOString().slice(0, 10);
		return {
			key,
			active: (heatmap[key] ?? 0) > 0,
			isToday: i === 29
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen pb-32",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-md px-5 pt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-center gap-3 mb-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-extrabold",
						children: "My Progress"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OwlMascot, { size: 56 })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { className: "size-5" }),
					title: "Overall Progress"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-5 mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ring, { pct: overallPct }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xl font-extrabold",
						children: "Great job!"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Keep going and you'll master it all."
					})] })]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-5" }),
					title: "Subject-wise Breakdown"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 divide-y divide-border",
					children: chapters.map((ch) => {
						const done = ch.concepts.filter((c) => progress[c.id]?.completed).length;
						const total = ch.totalConcepts;
						const pct = done / total * 100;
						const color = `var(--${ch.color === "trig" ? "trig" : ch.color === "geometry" ? "geometry" : ch.color === "algebra" ? "algebra" : "stats"})`;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 py-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "size-12 rounded-2xl flex items-center justify-center shrink-0",
									style: { backgroundColor: `color-mix(in oklch, ${color} 15%, white)` },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-extrabold",
										style: { color },
										children: ch.title[0]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-extrabold",
										children: ch.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-2 rounded-full bg-muted overflow-hidden mt-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "h-full rounded-full",
											style: {
												width: `${pct}%`,
												backgroundColor: color
											}
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right shrink-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "font-extrabold text-sm",
										style: { color },
										children: [
											done,
											" / ",
											total
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "concepts"
									})]
								}),
								ch.comingSoon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-5 text-muted-foreground" })
							]
						}, ch.id);
					})
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-5" }),
							title: "Streak Calendar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted-foreground",
							children: "Last 30 days"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-10 gap-1.5 mt-4",
						children: days.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `aspect-square rounded-full ${d.active ? "bg-primary" : "bg-muted"} ${d.isToday ? "ring-2 ring-foreground/60" : ""}` }, d.key))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-center gap-6 mt-4 text-xs",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-3 rounded-full bg-primary" }), " Active day"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-3 rounded-full bg-muted" }), " No activity"]
						})]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeader, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-5" }),
						title: "Weak Topics"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground mb-3",
						children: "Focus on these to improve your score!"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: Object.keys(weakTopics).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "No weak topics yet — keep practicing!"
						}) : Object.entries(weakTopics).map(([fid]) => {
							for (const ch of chapters) for (const c of ch.concepts) {
								const f = c.formulas.find((f) => f.id === fid);
								if (f) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/concept/$conceptId",
									params: { conceptId: c.id },
									className: "inline-flex items-center gap-1.5 rounded-full bg-[oklch(0.97_0.06_28)] border border-[oklch(0.85_0.15_28)] text-destructive px-3 py-1.5 text-sm font-bold",
									children: f.name
								}, fid);
							}
							return null;
						})
					})
				] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {})]
	});
}
function Card({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-2xl bg-card border border-border p-5 mb-4 shadow-soft",
		children
	});
}
function SectionHeader({ icon, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2 text-[oklch(0.55_0.13_180)]",
		children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-lg font-extrabold",
			children: title
		})]
	});
}
function Ring({ pct }) {
	const r = 52, c = 2 * Math.PI * r;
	const off = c - pct / 100 * c;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 130 130",
		className: "w-32 h-32",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "65",
				cy: "65",
				r,
				fill: "none",
				stroke: "oklch(0.93 0.01 250)",
				strokeWidth: "12"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "65",
				cy: "65",
				r,
				fill: "none",
				stroke: "oklch(0.65 0.14 185)",
				strokeWidth: "12",
				strokeLinecap: "round",
				strokeDasharray: c,
				strokeDashoffset: off,
				transform: "rotate(-90 65 65)",
				style: { transition: "stroke-dashoffset 1s" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("text", {
				x: "65",
				y: "68",
				textAnchor: "middle",
				fontSize: "22",
				fontWeight: "800",
				fill: "oklch(0.2 0.02 260)",
				children: [pct, "%"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
				x: "65",
				y: "86",
				textAnchor: "middle",
				fontSize: "11",
				fill: "oklch(0.55 0.02 260)",
				children: "done"
			})
		]
	});
}
//#endregion
export { ProgressPage as component };
