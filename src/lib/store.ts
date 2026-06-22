import { create } from "zustand";
import { persist } from "zustand/middleware";

type Progress = { completed: boolean; score: number; hintsUsed: number; completedAt?: string };

type State = {
  name: string;
  xp: number;
  streak: number;
  lastActiveDate: string | null;
  progress: Record<string, Progress>;
  heatmap: Record<string, number>;
  weakTopics: Record<string, number>;
  completeConcept: (conceptId: string, score: number, hintsUsed: number, xpEarned: number) => void;
  markWrong: (formulaId: string) => void;
};

const today = () => new Date().toISOString().slice(0, 10);

export const useStore = create<State>()(
  persist(
    (set, get) => ({
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
        if (last !== t) {
          const yest = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
          streak = last === yest ? streak + 1 : 1;
        }
        if (streak === 0) streak = 1;
        set((s) => ({
          xp: s.xp + xpEarned,
          streak,
          lastActiveDate: t,
          progress: { ...s.progress, [conceptId]: { completed: true, score, hintsUsed, completedAt: t } },
          heatmap: { ...s.heatmap, [t]: (s.heatmap[t] ?? 0) + xpEarned },
        }));
      },
      markWrong: (formulaId) =>
        set((s) => ({ weakTopics: { ...s.weakTopics, [formulaId]: (s.weakTopics[formulaId] ?? 0) + 1 } })),
    }),
    { name: "mathdojo_state" },
  ),
);
