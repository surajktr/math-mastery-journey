import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { g as Link, v as useNavigate, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as Route } from "./chapter._chapterId-CANh58Sw.mjs";
import { n as getChapter } from "./data-ksrgKvCn.mjs";
import { t as useStore } from "./store-uL3UMXi9.mjs";
import { c as Lock, l as LockOpen, p as CircleCheck, s as Play, y as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as BottomNav } from "./BottomNav-DGxyn_5j.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chapter._chapterId-BQzCLF-z.js
var import_jsx_runtime = require_jsx_runtime();
function ChapterPage() {
	const { chapterId } = Route.useParams();
	const chapter = getChapter(chapterId);
	const router = useRouter();
	const nav = useNavigate();
	const progress = useStore((s) => s.progress);
	if (!chapter) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "p-10",
		children: "Not found"
	});
	const concepts = chapter.concepts;
	const doneCount = concepts.filter((c) => progress[c.id]?.completed).length;
	const total = chapter.totalConcepts;
	const pct = Math.round(doneCount / total * 100);
	const firstIncomplete = concepts.find((c) => !progress[c.id]?.completed);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen pb-40",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-md px-5 pt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center mb-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => router.history.back(),
							className: "size-11 rounded-full bg-card border border-border flex items-center justify-center shadow-soft",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-5 text-[oklch(0.55_0.22_295)]" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "flex-1 text-center text-2xl font-extrabold",
							children: chapter.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-11" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl p-6 text-white gradient-trig shadow-card mb-4 relative overflow-hidden",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-3xl font-extrabold mb-2",
							children: chapter.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-white/90 text-sm max-w-[60%]",
							children: chapter.tagline
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							viewBox: "0 0 160 120",
							className: "absolute -right-2 top-2 w-40 opacity-90",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
									x1: "20",
									y1: "60",
									x2: "150",
									y2: "60",
									stroke: "white",
									strokeOpacity: "0.7",
									strokeWidth: "1.5"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
									x1: "80",
									y1: "10",
									x2: "80",
									y2: "110",
									stroke: "white",
									strokeOpacity: "0.7",
									strokeWidth: "1.5"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M20 60 Q 50 10, 80 60 T 140 60",
									fill: "none",
									stroke: "oklch(0.85 0.15 350)",
									strokeWidth: "2.5"
								})
							]
						})
					]
				}),
				concepts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl bg-card border border-border p-4 mb-6 shadow-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-bold mb-2",
						children: [
							doneCount,
							" of ",
							total,
							" concepts done"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex-1 h-2.5 rounded-full bg-muted overflow-hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full",
								style: {
									width: `${pct}%`,
									background: "var(--trig)"
								}
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-bold text-[oklch(0.55_0.22_295)]",
							children: [pct, "%"]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-3xl font-extrabold mb-4",
					children: "Concepts"
				}),
				chapter.comingSoon || concepts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center text-muted-foreground py-10",
					children: "Content coming soon!"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-3",
					children: concepts.map((c, i) => {
						const done = progress[c.id]?.completed;
						const locked = !(i === 0 || progress[concepts[i - 1].id]?.completed) && !done;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							disabled: locked,
							onClick: () => {
								if (locked) return toast.error(`Complete Concept ${i} first to unlock this`);
								nav({
									to: "/concept/$conceptId",
									params: { conceptId: c.id }
								});
							},
							className: `w-full text-left rounded-2xl bg-card border border-border p-4 flex items-center gap-4 shadow-soft active:scale-[0.99] transition ${locked ? "opacity-70" : ""}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "size-14 rounded-2xl bg-[oklch(0.96_0.04_295)] flex items-center justify-center shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xl font-extrabold text-[oklch(0.55_0.22_295)]",
										children: c.order
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex-1 min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "font-extrabold text-lg",
											children: c.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-sm text-muted-foreground truncate",
											children: c.subtitle
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: `text-xs font-bold mt-1 flex items-center gap-1.5 ${c.difficulty === "Easy" ? "text-[oklch(0.55_0.18_145)]" : c.difficulty === "Medium" ? "text-[oklch(0.62_0.2_55)]" : "text-destructive"}`,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-current" }),
												" ",
												c.difficulty
											]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "shrink-0",
									children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-7 text-primary" }) : locked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-7 text-muted-foreground" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LockOpen, { className: "size-7 text-primary" })
								})
							]
						}, c.id);
					})
				}),
				firstIncomplete && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/concept/$conceptId",
					params: { conceptId: firstIncomplete.id },
					className: "mt-6 w-full h-16 rounded-2xl bg-primary text-primary-foreground font-extrabold text-lg shadow-card flex items-center justify-center gap-2 active:scale-[0.98] transition",
					children: [doneCount === 0 ? "Start from beginning" : `Continue — ${firstIncomplete.title}`, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {
						className: "size-5",
						fill: "currentColor"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {})]
	});
}
//#endregion
export { ChapterPage as component };
