//#region node_modules/.nitro/vite/services/ssr/assets/data-4QvEhkiz.js
var chapters = [
	{
		id: "geometry",
		title: "Geometry",
		tagline: "Shapes, angles, and space.",
		color: "geometry",
		totalConcepts: 8,
		comingSoon: true,
		concepts: []
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
						expression: {
							lhs: "sin θ",
							num: "Opposite",
							den: "Hypotenuse",
							color: "info"
						},
						explanation: "Ratio of the side opposite the angle to the hypotenuse.",
						mnemonic: "SOH — Sine = Opposite over Hypotenuse",
						questions: [
							{
								id: "q1",
								text: "If opposite = 3 and hypotenuse = 5, find sin θ.",
								options: [
									"0.6",
									"0.8",
									"1.67",
									"0.75"
								],
								correctIndex: 0,
								diagram: {
									opp: 3,
									hyp: 5
								}
							},
							{
								id: "q2",
								text: "sin 30° = ?",
								options: [
									"0.5",
									"√3/2",
									"1",
									"1/√2"
								],
								correctIndex: 0
							},
							{
								id: "q3",
								text: "If sin θ = 0.8 and hypotenuse = 10, find the opposite.",
								options: [
									"8",
									"6",
									"0.08",
									"80"
								],
								correctIndex: 0
							}
						]
					},
					{
						id: "trig-c1-f2",
						name: "cos θ",
						expression: {
							lhs: "cos θ",
							num: "Adjacent",
							den: "Hypotenuse",
							color: "success"
						},
						explanation: "Ratio of the side adjacent to the angle to the hypotenuse.",
						mnemonic: "CAH — Cosine = Adjacent over Hypotenuse",
						questions: [
							{
								id: "q1",
								text: "If adjacent = 4 and hypotenuse = 5, find cos θ.",
								options: [
									"0.8",
									"0.6",
									"1.25",
									"0.4"
								],
								correctIndex: 0,
								diagram: {
									adj: 4,
									hyp: 5
								}
							},
							{
								id: "q2",
								text: "cos 60° = ?",
								options: [
									"0.5",
									"√3/2",
									"1",
									"0"
								],
								correctIndex: 0
							},
							{
								id: "q3",
								text: "If cos θ = 0.6 and hypotenuse = 20, find the adjacent.",
								options: [
									"12",
									"8",
									"16",
									"10"
								],
								correctIndex: 0
							}
						]
					},
					{
						id: "trig-c1-f3",
						name: "tan θ",
						expression: {
							lhs: "tan θ",
							num: "Opposite",
							den: "Adjacent",
							color: "warning"
						},
						explanation: "Ratio of the side opposite the angle to the adjacent side.",
						mnemonic: "TOA — Tangent = Opposite over Adjacent",
						questions: [
							{
								id: "q1",
								text: "If opp = 3 and adj = 4, find tan θ.",
								options: [
									"0.75",
									"1.33",
									"0.6",
									"0.8"
								],
								correctIndex: 0,
								diagram: {
									opp: 3,
									adj: 4
								}
							},
							{
								id: "q2",
								text: "tan 45° = ?",
								options: [
									"1",
									"0",
									"√3",
									"1/√3"
								],
								correctIndex: 0
							},
							{
								id: "q3",
								text: "If tan θ = 1.5 and opp = 6, find adj.",
								options: [
									"4",
									"9",
									"3",
									"6"
								],
								correctIndex: 0
							}
						]
					}
				]
			},
			{
				id: "trig-c2",
				chapterId: "trigonometry",
				title: "Concept 2",
				subtitle: "Pythagorean Identity",
				difficulty: "Medium",
				order: 2,
				formulas: [{
					id: "trig-c2-f1",
					name: "sin²θ + cos²θ = 1",
					expression: {
						lhs: "sin²θ + cos²θ",
						num: "",
						den: "1",
						color: "info"
					},
					explanation: "The fundamental identity tying sine and cosine together.",
					mnemonic: "The most important identity — always equals 1.",
					questions: [
						{
							id: "q1",
							text: "If sin θ = 0.6, find cos θ (acute).",
							options: [
								"0.8",
								"0.4",
								"0.6",
								"1"
							],
							correctIndex: 0
						},
						{
							id: "q2",
							text: "If cos θ = 3/5, find sin θ (acute).",
							options: [
								"4/5",
								"2/5",
								"1/5",
								"3/4"
							],
							correctIndex: 0
						},
						{
							id: "q3",
							text: "sin²30° + cos²30° = ?",
							options: [
								"1",
								"0.5",
								"2",
								"√3"
							],
							correctIndex: 0
						}
					]
				}, {
					id: "trig-c2-f2",
					name: "1 + tan²θ = sec²θ",
					expression: {
						lhs: "1 + tan²θ",
						num: "",
						den: "sec²θ",
						color: "warning"
					},
					explanation: "Derived by dividing the Pythagorean identity by cos²θ.",
					mnemonic: "Add 1 to tan² — you get sec².",
					questions: [
						{
							id: "q1",
							text: "If tan θ = 1, find sec θ.",
							options: [
								"√2",
								"2",
								"1",
								"√3"
							],
							correctIndex: 0
						},
						{
							id: "q2",
							text: "sec²θ − tan²θ = ?",
							options: [
								"1",
								"0",
								"2",
								"−1"
							],
							correctIndex: 0
						},
						{
							id: "q3",
							text: "If tan θ = √3, find sec θ.",
							options: [
								"2",
								"√2",
								"√3",
								"3"
							],
							correctIndex: 0
						}
					]
				}]
			},
			{
				id: "trig-c3",
				chapterId: "trigonometry",
				title: "Concept 3",
				subtitle: "Angle Values Table",
				difficulty: "Easy",
				order: 3,
				formulas: []
			}
		]
	},
	{
		id: "algebra",
		title: "Algebra",
		tagline: "Equations and variables.",
		color: "algebra",
		totalConcepts: 7,
		comingSoon: true,
		concepts: []
	},
	{
		id: "statistics",
		title: "Statistics",
		tagline: "Data, mean, and variance.",
		color: "stats",
		totalConcepts: 5,
		comingSoon: true,
		concepts: []
	},
	{
		id: "sequences",
		title: "Sequences and Series",
		tagline: "Mastering AP, GP, and Special Series",
		color: "algebra",
		totalConcepts: 5,
		concepts: [
			{
				id: "seq-c1",
				chapterId: "sequences",
				title: "Concept 1",
				subtitle: "Definitions of Sequence, Progression, and Series",
				difficulty: "Medium",
				order: 1,
				formulas: [{
					id: "seq-c1-f1",
					name: "Sequence and Series",
					descriptionAbove: "A sequence is an arrangement of numbers in a definite order. A progression is a sequence whose terms follow a strict mathematical pattern.\n\nA series is the sum of the terms of a sequence:",
					expression: {
						lhs: "S_n = a_1 + a_2 + a_3 + \\dots + a_n",
						num: "",
						den: "",
						color: "info"
					},
					descriptionBelow: "A series can be finite (ends at n) or infinite (continues forever).",
					explanation: "While direct definitions are rarely tested, knowing the terminology is crucial for interpreting word problems accurately.",
					example: "Example: Sequence vs Series\nSequence: $1, 3, 5, 7$\nSeries: $1 + 3 + 5 + 7$",
					mnemonic: "",
					questions: [
						{
							id: "q1",
							text: "Which of the following constructs specifically represents a \"Finite Series\"?",
							options: [
								"$2, 4, 6, 8, 10, \\dots$",
								"$1 + 3 + 5 + 7 + \\dots$",
								"$5 + 10 + 15 + 20 + 25$",
								"$1, 4, 9, 16, 25$"
							],
							correctIndex: 2,
							solution: "A series is the sum of terms (eliminates A and D). A finite series must terminate (eliminates B). Therefore, C is correct."
						},
						{
							id: "q2",
							text: "If a sequence is defined by the rule $a_n = n^2 + 1$, what is the sum of the finite series formed by its first 3 terms?",
							options: [
								"$14$",
								"$17$",
								"$20$",
								"$23$"
							],
							correctIndex: 1,
							solution: "$a_1 = 2$, $a_2 = 5$, $a_3 = 10$. Sum $= 2 + 5 + 10 = 17$."
						},
						{
							id: "q3",
							text: "A sequence has terms that follow a pattern but goes on indefinitely. The sum of all these terms is called:",
							options: [
								"Infinite Progression",
								"Infinite Series",
								"Finite Sequence",
								"Indefinite Sequence"
							],
							correctIndex: 1,
							solution: "Summing terms makes it a series. Going on indefinitely makes it infinite."
						},
						{
							id: "q4",
							text: "What is the difference between a sequence and a series?",
							options: [
								"A sequence is numbers added, a series is numbers listed.",
								"A sequence is numbers listed, a series is numbers added.",
								"They are exactly the same thing.",
								"A sequence is infinite, a series is finite."
							],
							correctIndex: 1,
							solution: "Sequence = list (commas). Series = sum (plus signs)."
						}
					]
				}]
			},
			{
				id: "seq-c2",
				chapterId: "sequences",
				title: "Concept 2",
				subtitle: "Arithmetic Progression (AP) - Nth Term",
				difficulty: "Medium",
				order: 2,
				formulas: [{
					id: "seq-c2-f1",
					name: "General Term of an AP",
					descriptionAbove: "To find any specific term in an Arithmetic Progression from the beginning:",
					expression: {
						lhs: "a_n = a + (n-1)d",
						num: "",
						den: "",
						color: "success"
					},
					descriptionBelow: "Where $a$ is the first term, $d$ is the common difference, and $n$ is the position of the term.",
					explanation: "These are the foundational formulas of AP. Always identify your a, d, and n before solving.",
					example: "Example: Find the 5th term of $2, 5, 8, \\dots$\nGiven: $a = 2$, $d = 3$, $n = 5$\nFormula: $a_n = a + (n-1)d$\n$a_5 = 2 + (5-1)3$\n$a_5 = 2 + 12 = 14$",
					mnemonic: "",
					questions: [{
						id: "q1",
						text: "In an AP, the first term is $7$ and common difference is $-3$. What is the 15th term?",
						options: [
							"$35$",
							"$-35$",
							"$-38$",
							"$-42$"
						],
						correctIndex: 1,
						solution: "Given: $a = 7$, $d = -3$, $n = 15$\n$a_{15} = 7 + (14)(-3)$\n$a_{15} = 7 - 42$\n$a_{15} = -35$"
					}, {
						id: "q2",
						text: "Which term of the AP $5, 9, 13, 17, \\dots$ is $81$?",
						options: [
							"$19^{th}$",
							"$20^{th}$",
							"$21^{st}$",
							"$22^{nd}$"
						],
						correctIndex: 1,
						solution: "$81 = 5 + (n-1)4$\n$76 = 4(n-1)$\n$n-1 = 19$\n$n = 20$"
					}]
				}, {
					id: "seq-c2-f2",
					name: "Nth Term From the End",
					descriptionAbove: "To find the Nth term counting backwards from the end of an AP:",
					expression: {
						lhs: "a_n \\text{ (from end)} = l - (n-1)d",
						num: "",
						den: "",
						color: "info"
					},
					descriptionBelow: "Where $l$ is the last term, $d$ is the common difference, and $n$ is the position counting backwards.",
					explanation: "Use this directly instead of reversing the whole series. It saves significant time.",
					example: "Example: Find the 3rd term from the end of $2, 5, \\dots, 20$\nGiven: $l = 20$, $d = 3$, $n = 3$\nFormula: $a_n = l - (n-1)d$\n$a_3 = 20 - (3-1)3$\n$a_3 = 20 - 6 = 14$",
					mnemonic: "",
					questions: [{
						id: "q3",
						text: "Find the 10th term from the end of the AP: $10, 15, 20, \\dots, 135$.",
						options: [
							"$85$",
							"$90$",
							"$95$",
							"$100$"
						],
						correctIndex: 1,
						solution: "Formula: $a_n = l - (n-1)d$\n$a_{10} = 135 - (9)(5)$\n$a_{10} = 135 - 45$\n$a_{10} = 90$"
					}, {
						id: "q4",
						text: "The 4th term from the end of an AP is $22$. If the common difference is $-2$, what is the last term?",
						options: [
							"$16$",
							"$14$",
							"$28$",
							"$30$"
						],
						correctIndex: 0,
						solution: "$22 = l - (3)(-2)$\n$22 = l + 6$\n$l = 16$"
					}]
				}]
			},
			{
				id: "seq-c3",
				chapterId: "sequences",
				title: "Concept 3",
				subtitle: "Sum of First n Terms of an AP",
				difficulty: "Hard",
				order: 3,
				formulas: [{
					id: "seq-c3-f1",
					name: "Sum of an AP",
					descriptionAbove: "The total sum of the first $n$ terms of an AP can be calculated by multiplying half the number of terms by the sum of the first and last term:",
					expression: {
						lhs: "S_n = \\frac{n}{2}[a + l]",
						num: "",
						den: "",
						color: "warning"
					},
					descriptionBelow: "If the last term ($l$) is unknown, use the expanded form:\n$S_n = \\frac{n}{2}[2a + (n-1)d]$",
					explanation: "Use these formulas whenever asked to find the total sum. The first formula is much faster if you already know the last term.",
					example: "Example: Sum of first 100 positive integers ($1, 2, \\dots, 100$)\nGiven: $a = 1$, $l = 100$, $n = 100$\nFormula: $S_n = \\frac{n}{2}[a + l]$\n$S_{100} = \\frac{100}{2}(1 + 100)$\n$S_{100} = 50(101) = 5050$",
					mnemonic: "",
					questions: [
						{
							id: "q1",
							text: "Find the sum of all natural numbers between 100 and 200 which are divisible by 3.",
							options: [
								"$4950$",
								"$5000$",
								"$4851$",
								"$4900$"
							],
							correctIndex: 0,
							solution: "First $= 102$, Last $= 198$\n$n = \\frac{198-102}{3} + 1 = 33$\nSum $= \\frac{33}{2}(102 + 198)$\nSum $= 4950$"
						},
						{
							id: "q2",
							text: "How many terms of the AP $24, 21, 18, \\dots$ must be taken so that their sum is 78?",
							options: [
								"$4$ or $13$",
								"$5$ or $12$",
								"$4$ only",
								"$13$ only"
							],
							correctIndex: 0,
							solution: "$78 = \\frac{n}{2}[48 + (n-1)(-3)]$\n$156 = 51n - 3n^2$\n$n^2 - 17n + 52 = 0$\n$n = 4$ or $13$"
						},
						{
							id: "q3",
							text: "The sum of the first $n$ terms of an AP is $S_n = 4n^2 - n$. What is the common difference?",
							options: [
								"$3$",
								"$4$",
								"$8$",
								"$7$"
							],
							correctIndex: 2,
							solution: "If $S_n = An^2 + Bn$, then $d = 2A$\nHere, $A = 4$\n$d = 2(4) = 8$"
						},
						{
							id: "q4",
							text: "If $S_n = 2n^2 + 3n$, find the 10th term.",
							options: [
								"$41$",
								"$43$",
								"$38$",
								"$45$"
							],
							correctIndex: 0,
							solution: "$a_{10} = S_{10} - S_9$\n$S_{10} = 2(10^2) + 3(10) = 230$\n$S_9 = 2(9^2) + 3(9) = 189$\n$a_{10} = 230 - 189 = 41$"
						}
					]
				}]
			},
			{
				id: "seq-c4",
				chapterId: "sequences",
				title: "Concept 4",
				subtitle: "Geometric Progression (GP)",
				difficulty: "Medium",
				order: 4,
				formulas: [{
					id: "seq-c4-f1",
					name: "General Term of a GP",
					descriptionAbove: "A sequence is a GP if the ratio of any term to its preceding term is constant (Common Ratio $r$).",
					expression: {
						lhs: "a_n = a \\cdot r^{n-1}",
						num: "",
						den: "",
						color: "info"
					},
					descriptionBelow: "The general format of a GP sequence is:\n$a, ar, ar^2, ar^3, \\dots$",
					explanation: "AP relies on addition; GP relies on multiplication. Use GP for compounding values.",
					example: "Example: Find the 4th term of $2, 6, 18, \\dots$\nGiven: $a = 2$, $r = 3$, $n = 4$\nFormula: $a_n = a \\cdot r^{n-1}$\n$a_4 = 2 \\cdot 3^{4-1}$\n$a_4 = 2(27) = 54$",
					mnemonic: "",
					questions: [
						{
							id: "q1",
							text: "Which of the following sequences represents a valid Geometric Progression?",
							options: [
								"$2, 4, 6, 8, \\dots$",
								"$3, 9, 18, 36, \\dots$",
								"$4, -8, 16, -32, \\dots$",
								"$1, 4, 9, 16, \\dots$"
							],
							correctIndex: 2,
							solution: "Check constant ratio $r$:\n$-8/4 = -2$\n$16/-8 = -2$\nOption C is a GP."
						},
						{
							id: "q2",
							text: "In a GP, the first term is $3$ and the common ratio is $2$. What is the 6th term?",
							options: [
								"$192$",
								"$96$",
								"$48$",
								"$384$"
							],
							correctIndex: 1,
							solution: "$a_6 = a \\cdot r^5$\n$a_6 = 3 \\cdot (2^5)$\n$a_6 = 3(32)$\n$a_6 = 96$"
						},
						{
							id: "q3",
							text: "The 3rd term of a GP is $12$ and the 6th term is $96$. What is the first term $a$?",
							options: [
								"$2$",
								"$3$",
								"$4$",
								"$6$"
							],
							correctIndex: 1,
							solution: "Given: $ar^2 = 12$ and $ar^5 = 96$\nDivide the equations:\n$\\frac{ar^5}{ar^2} = \\frac{96}{12}$\n$r^3 = 8 \\implies r = 2$\nSubstitute $r=2$:\n$a(2^2) = 12 \\implies a(4) = 12 \\implies a = 3$"
						},
						{
							id: "q4",
							text: "What is the common ratio of the GP $5, 15, 45, 135, \\dots$?",
							options: [
								"$2$",
								"$3$",
								"$4$",
								"$5$"
							],
							correctIndex: 1,
							solution: "Ratio $r = \\frac{15}{5} = 3$"
						}
					]
				}]
			},
			{
				id: "seq-c5",
				chapterId: "sequences",
				title: "Concept 5",
				subtitle: "Telescoping Fractions Trick",
				difficulty: "Hard",
				order: 5,
				formulas: [{
					id: "seq-c5-f1",
					name: "Telescoping Series",
					descriptionAbove: "When fraction denominators are products of consecutive terms with a common difference $d$ (e.g. $5 \\times 6$, $6 \\times 7$), they cancel each other out.",
					expression: {
						lhs: "Sum = \\frac{1}{d} \\left[ \\frac{1}{\\text{First}} - \\frac{1}{\\text{Last}} \\right]",
						num: "",
						den: "",
						color: "success"
					},
					descriptionBelow: "Where \"First\" is the smallest factor of the first denominator, and \"Last\" is the largest factor of the last denominator.",
					explanation: "Use this to instantly evaluate long fraction sums without finding a common denominator.",
					example: "Example: Sum of $\\frac{1}{2\\times3} + \\frac{1}{3\\times4}$\nGiven: $d = 1$, First $= 2$, Last $= 4$\nFormula: Sum $= \\frac{1}{d} [\\frac{1}{\\text{First}} - \\frac{1}{\\text{Last}}]$\nSum $= \\frac{1}{1} [\\frac{1}{2} - \\frac{1}{4}] = \\frac{1}{4}$",
					mnemonic: "",
					questions: [
						{
							id: "q1",
							text: "Find the sum: $\\frac{1}{3 \\times 5} + \\frac{1}{5 \\times 7} + \\dots + \\frac{1}{21 \\times 23}$.",
							options: [
								"$\\frac{20}{69}$",
								"$\\frac{10}{69}$",
								"$\\frac{2}{23}$",
								"$\\frac{5}{69}$"
							],
							correctIndex: 1,
							solution: "$d = 2$\nSum $= \\frac{1}{2} [\\frac{1}{3} - \\frac{1}{23}]$\nSum $= \\frac{1}{2} [\\frac{20}{69}]$\nSum $= \\frac{10}{69}$"
						},
						{
							id: "q2",
							text: "Evaluate: $\\frac{1}{2 \\times 5} + \\frac{1}{5 \\times 8} + \\dots + \\frac{1}{29 \\times 32}$.",
							options: [
								"$\\frac{5}{32}$",
								"$\\frac{15}{64}$",
								"$\\frac{15}{32}$",
								"$\\frac{5}{64}$"
							],
							correctIndex: 0,
							solution: "$d = 3$\nSum $= \\frac{1}{3} [\\frac{1}{2} - \\frac{1}{32}]$\nSum $= \\frac{1}{3} [\\frac{15}{32}]$\nSum $= \\frac{5}{32}$"
						},
						{
							id: "q3",
							text: "Sum of: $\\frac{1}{1 \\times 2} + \\frac{1}{2 \\times 3} + \\dots + \\frac{1}{99 \\times 100}$",
							options: [
								"$\\frac{99}{100}$",
								"$\\frac{1}{100}$",
								"$\\frac{100}{99}$",
								"$1$"
							],
							correctIndex: 0,
							solution: "$d = 1$\nSum $= 1 [\\frac{1}{1} - \\frac{1}{100}]$\nSum $= \\frac{99}{100}$"
						},
						{
							id: "q4",
							text: "Evaluate $\\frac{1}{4 \\times 7} + \\frac{1}{7 \\times 10} + \\frac{1}{10 \\times 13}$",
							options: [
								"$\\frac{3}{52}$",
								"$\\frac{9}{52}$",
								"$\\frac{1}{52}$",
								"$\\frac{3}{13}$"
							],
							correctIndex: 0,
							solution: "$d = 3$\nSum $= \\frac{1}{3} [\\frac{1}{4} - \\frac{1}{13}]$\nSum $= \\frac{1}{3} [\\frac{9}{52}]$\nSum $= \\frac{3}{52}$"
						}
					]
				}]
			}
		]
	}
];
var getChapter = (id) => chapters.find((c) => c.id === id);
var getConcept = (id) => {
	for (const ch of chapters) {
		const c = ch.concepts.find((c) => c.id === id);
		if (c) return {
			concept: c,
			chapter: ch
		};
	}
	return null;
};
//#endregion
export { getChapter as n, getConcept as r, chapters as t };
