import { sequencesChapter } from "./sequences-data";

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

export const chapters: Chapter[] = [
  {
    id: "geometry",
    title: "Geometry",
    tagline: "Shapes, angles, and space.",
    color: "geometry",
    totalConcepts: 8,
    comingSoon: true,
    concepts: [],
  },
  {
    id: "trigonometry",
    title: "Trigonometry",
    tagline: "Explore the relationships between angles and triangles.",
    color: "trig",
    totalConcepts: 6,
    concepts: [
      {
        id: "trig-c1",
        chapterId: "trigonometry",
        title: "Concept 1",
        subtitle: "Basic Ratios (sin, cos, tan)",
        difficulty: "Easy",
        order: 1,
        formulas: [
          {
            id: "trig-c1-f1",
            name: "sin θ",
            expression: { lhs: "sin θ", num: "Opposite", den: "Hypotenuse", color: "info" },
            explanation: "Ratio of the side opposite the angle to the hypotenuse.",
            mnemonic: "SOH — Sine = Opposite over Hypotenuse",
            questions: [
              { id: "q1", text: "If opposite = 3 and hypotenuse = 5, find sin θ.", options: ["0.6", "0.8", "1.67", "0.75"], correctIndex: 0, diagram: { opp: 3, hyp: 5 } },
              { id: "q2", text: "sin 30° = ?", options: ["0.5", "√3/2", "1", "1/√2"], correctIndex: 0 },
              { id: "q3", text: "If sin θ = 0.8 and hypotenuse = 10, find the opposite.", options: ["8", "6", "0.08", "80"], correctIndex: 0 },
            ],
          },
          {
            id: "trig-c1-f2",
            name: "cos θ",
            expression: { lhs: "cos θ", num: "Adjacent", den: "Hypotenuse", color: "success" },
            explanation: "Ratio of the side adjacent to the angle to the hypotenuse.",
            mnemonic: "CAH — Cosine = Adjacent over Hypotenuse",
            questions: [
              { id: "q1", text: "If adjacent = 4 and hypotenuse = 5, find cos θ.", options: ["0.8", "0.6", "1.25", "0.4"], correctIndex: 0, diagram: { adj: 4, hyp: 5 } },
              { id: "q2", text: "cos 60° = ?", options: ["0.5", "√3/2", "1", "0"], correctIndex: 0 },
              { id: "q3", text: "If cos θ = 0.6 and hypotenuse = 20, find the adjacent.", options: ["12", "8", "16", "10"], correctIndex: 0 },
            ],
          },
          {
            id: "trig-c1-f3",
            name: "tan θ",
            expression: { lhs: "tan θ", num: "Opposite", den: "Adjacent", color: "warning" },
            explanation: "Ratio of the side opposite the angle to the adjacent side.",
            mnemonic: "TOA — Tangent = Opposite over Adjacent",
            questions: [
              { id: "q1", text: "If opp = 3 and adj = 4, find tan θ.", options: ["0.75", "1.33", "0.6", "0.8"], correctIndex: 0, diagram: { opp: 3, adj: 4 } },
              { id: "q2", text: "tan 45° = ?", options: ["1", "0", "√3", "1/√3"], correctIndex: 0 },
              { id: "q3", text: "If tan θ = 1.5 and opp = 6, find adj.", options: ["4", "9", "3", "6"], correctIndex: 0 },
            ],
          },
        ],
      },
      {
        id: "trig-c2",
        chapterId: "trigonometry",
        title: "Concept 2",
        subtitle: "Pythagorean Identity",
        difficulty: "Medium",
        order: 2,
        formulas: [
          {
            id: "trig-c2-f1",
            name: "sin²θ + cos²θ = 1",
            expression: { lhs: "sin²θ + cos²θ", num: "", den: "1", color: "info" },
            explanation: "The fundamental identity tying sine and cosine together.",
            mnemonic: "The most important identity — always equals 1.",
            questions: [
              { id: "q1", text: "If sin θ = 0.6, find cos θ (acute).", options: ["0.8", "0.4", "0.6", "1"], correctIndex: 0 },
              { id: "q2", text: "If cos θ = 3/5, find sin θ (acute).", options: ["4/5", "2/5", "1/5", "3/4"], correctIndex: 0 },
              { id: "q3", text: "sin²30° + cos²30° = ?", options: ["1", "0.5", "2", "√3"], correctIndex: 0 },
            ],
          },
          {
            id: "trig-c2-f2",
            name: "1 + tan²θ = sec²θ",
            expression: { lhs: "1 + tan²θ", num: "", den: "sec²θ", color: "warning" },
            explanation: "Derived by dividing the Pythagorean identity by cos²θ.",
            mnemonic: "Add 1 to tan² — you get sec².",
            questions: [
              { id: "q1", text: "If tan θ = 1, find sec θ.", options: ["√2", "2", "1", "√3"], correctIndex: 0 },
              { id: "q2", text: "sec²θ − tan²θ = ?", options: ["1", "0", "2", "−1"], correctIndex: 0 },
              { id: "q3", text: "If tan θ = √3, find sec θ.", options: ["2", "√2", "√3", "3"], correctIndex: 0 },
            ],
          },
        ],
      },
      {
        id: "trig-c3",
        chapterId: "trigonometry",
        title: "Concept 3",
        subtitle: "Angle Values Table",
        difficulty: "Easy",
        order: 3,
        formulas: [],
      },
    ],
  },
  {
    id: "algebra",
    title: "Algebra",
    tagline: "Equations and variables.",
    color: "algebra",
    totalConcepts: 7,
    comingSoon: true,
    concepts: [],
  },
  {
    id: "statistics",
    title: "Statistics",
    tagline: "Data, mean, and variance.",
    color: "stats",
    totalConcepts: 5,
    comingSoon: true,
    concepts: [],
  },
  sequencesChapter,
];

export const getChapter = (id: string) => chapters.find((c) => c.id === id);
export const getConcept = (id: string) => {
  for (const ch of chapters) {
    const c = ch.concepts.find((c) => c.id === id);
    if (c) return { concept: c, chapter: ch };
  }
  return null;
};
export const allConcepts = () => chapters.flatMap((ch) => ch.concepts);
