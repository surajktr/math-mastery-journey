

export type Question = {
  id: string;
  text: string;
  options: string[];
  correctIndex: number;
  solution?: string;
  diagram?: { opp?: number; adj?: number; hyp?: number };
};
export type Formula = {
  id: string;
  name: string;
  descriptionAbove?: string;
  expression: { lhs: string; num: string; den: string; color: string };
  descriptionBelow?: string;
  explanation: string;
  example?: string;
  mnemonic: string;
  questions: Question[];
};
export type Concept = {
  id: string;
  chapterId: string;
  title: string;
  subtitle: string;
  difficulty: "Easy" | "Medium" | "Hard";
  order: number;
  formulas: Formula[];
};
export type Chapter = {
  id: string;
  title: string;
  tagline: string;
  color: "geometry" | "trig" | "algebra" | "stats";
  totalConcepts: number;
  comingSoon?: boolean;
  concepts: Concept[];
};

const chapterModules = import.meta.glob("../data/chapters/*.json", { eager: true });

export const chapters: Chapter[] = Object.values(chapterModules).map(
  (mod: any) => mod.default || mod
) as Chapter[];

export const getChapter = (id: string) => chapters.find((c) => c.id === id);
export const getConcept = (id: string) => {
  for (const ch of chapters) {
    const c = ch.concepts.find((c) => c.id === id);
    if (c) return { concept: c, chapter: ch };
  }
  return null;
};
export const allConcepts = () => chapters.flatMap((ch) => ch.concepts);
