import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-uL3UMXi9.js
var today = () => (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
var useStore = create()(persist((set, get) => ({
	name: "Champ",
	xp: 0,
	streak: 0,
	lastActiveDate: null,
	progress: {},
	heatmap: {},
	weakTopics: {},
	completeConcept: (conceptId, score, hintsUsed, xpEarned) => {
		const t = today();
		const last = get().lastActiveDate;
		let streak = get().streak;
		if (last !== t) streak = last === (/* @__PURE__ */ new Date(Date.now() - 864e5)).toISOString().slice(0, 10) ? streak + 1 : 1;
		if (streak === 0) streak = 1;
		set((s) => ({
			xp: s.xp + xpEarned,
			streak,
			lastActiveDate: t,
			progress: {
				...s.progress,
				[conceptId]: {
					completed: true,
					score,
					hintsUsed,
					completedAt: t
				}
			},
			heatmap: {
				...s.heatmap,
				[t]: (s.heatmap[t] ?? 0) + xpEarned
			}
		}));
	},
	markWrong: (formulaId) => set((s) => ({ weakTopics: {
		...s.weakTopics,
		[formulaId]: (s.weakTopics[formulaId] ?? 0) + 1
	} }))
}), { name: "mathdojo_state" }));
//#endregion
export { useStore as t };
