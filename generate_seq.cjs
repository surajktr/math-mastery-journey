const fs = require('fs');

const raw = `Topic Name: Sequences and Series Basics
Concept / Formula 1: Definitions of Sequence, Progression, and Series
Explanation Above:
A sequence is an arrangement of numbers in a definite order according to a rule. A progression is a sequence whose terms follow a certain distinct mathematical pattern.
Main Formula:
\\text{Series: } S_n = a_1 + a_2 + a_3 + \\dots + a_n
Explanation Below:
It can be a finite series (countable terms) or an infinite series (endless terms). Understanding these terms is the foundation for AP and GP.
Concept / When to Use:
While SSC CGL rarely asks for direct definitions, understanding the terminology is crucial for interpreting word problems. Knowing whether a question asks for a "term in a progression" or the "sum of a series" determines your entire approach.
Question 1
Which of the following mathematical constructs specifically represents a "Finite Series" according to standard algebraic definitions?
A) $2, 4, 6, 8, 10, \\dots$
B) $1 + 3 + 5 + 7 + \\dots$
C) $5 + 10 + 15 + 20 + 25$
D) $1, 4, 9, 16, 25$
Step-by-step solution with full logic:
A series must be the sum of sequence terms.
A finite series must have a terminating end.
Option C represents a finite sum of exact terms.
**** C) $5 + 10 + 15 + 20 + 25$
Question 2
If a sequence is defined by the rule $a_n = n^2 + 1$, what is the sum of the finite series formed by its first 3 terms?
A) $14$
B) $17$
C) $20$
D) $23$
Step-by-step solution with full logic:
Identify the rule: $a_n = n^2 + 1$.
Calculate the first 3 terms of the progression:
$a_1 = 1^2 + 1 = 2$
$a_2 = 2^2 + 1 = 5$
$a_3 = 3^2 + 1 = 10$
Form the series: $2 + 5 + 10 = 17$.
**** B) $17$
Question 3
A sequence has terms that follow a certain pattern but goes on indefinitely. If we express the sum of all these terms, what is the correct terminology for this mathematical entity?
A) Infinite Progression
B) Infinite Series
C) Finite Sequence
D) Indefinite Sequence
Step-by-step solution with full logic:
The question states we are expressing the "sum of all these terms". Summation implies it is a "Series".
The sequence "goes on indefinitely", meaning it does not end.
Combining both facts, the entity is an Infinite Series.
**** B) Infinite Series
Question 4
What is the difference between a sequence and a series?
A) A sequence is numbers added, a series is numbers listed.
B) A sequence is numbers listed, a series is numbers added.
C) They are exactly the same thing.
D) A sequence is infinite, a series is finite.
Step-by-step solution with full logic:
A sequence is an ordered list of numbers.
A series is the sum of a list of numbers.
Therefore, option B is correct.
**** B) A sequence is numbers listed, a series is numbers added.
Topic Name: Arithmetic Progression (AP) - Nth Term
Concept / Formula 2: General Term Formulas of an AP
Explanation Above:
The Nth term from the beginning of an Arithmetic Progression is the first term plus the number of steps multiplied by the common difference.
Main Formula:
a_n = a + (n-1)d
Explanation Below:
Where $a$ = first term, $d$ = common difference. Also, the Nth term from the end is $l - (n-1)d$ where $l$ is the last term.
Concept / When to Use:
These are the foundational blocks of AP. Use the end-term formula directly instead of reversing the whole series.
Question 1
In an Arithmetic Progression, the first term is $7$ and the common difference is $-3$. What is the 15th term?
A) $35$
B) $-35$
C) $-38$
D) $-42$
Step-by-step solution with full logic:
Identify given values: $a = 7$, $d = -3$, $n = 15$.
Formula: $a_n = a + (n-1)d$.
Substitute: $a_{15} = 7 + (15-1)(-3) = 7 - 42 = -35$.
**** B) $-35$
Question 2
Which term of the AP $5, 9, 13, 17, \\dots$ is $81$?
A) $19^{th}$
B) $20^{th}$
C) $21^{st}$
D) $22^{nd}$
Step-by-step solution with full logic:
Given: $a = 5$, $d = 9 - 5 = 4$, $a_n = 81$.
Substitute: $81 = 5 + (n-1)4$.
Solve: $76 = 4(n-1) \\implies n-1 = 19 \\implies n = 20$.
**** B) $20^{th}$
Question 3
Find the 10th term from the end of the AP: $10, 15, 20, \\dots, 135$.
A) $85$
B) $90$
C) $95$
D) $100$
Step-by-step solution with full logic:
Given: AP is $10, 15, \\dots, 135$. Common diff $d = 5$. Last term $l = 135$.
Formula: Term from end $= l - (n-1)d$.
Substitute: $135 - (10-1)5 = 135 - 45 = 90$.
**** B) $90$
Question 4
The 4th term from the end of an AP is $22$. If the common difference is $-2$, what is the last term of the AP?
A) $16$
B) $14$
C) $28$
D) $30$
Step-by-step solution with full logic:
Given: Term from end $= 22$, $n = 4$, $d = -2$.
Formula: Term from end $= l - (n-1)d$.
Substitute: $22 = l - (4-1)(-2) \\implies 22 = l + 6 \\implies l = 16$.
**** A) $16$
Topic Name: Sum of First n Terms of an AP
Concept / Formula 3: Summation Formulas and Deductions
Explanation Above:
To find the sum of an Arithmetic Progression, you can average the first and last terms, then multiply by the total number of terms.
Main Formula:
S_n = \\frac{n}{2}[2a + (n-1)d] \\text{ OR } S_n = \\frac{n}{2}[a + l]
Explanation Below:
Number of terms $n = \\frac{l - a}{d} + 1$. Also, $a_n = S_n - S_{n-1}$.
Concept / When to Use:
Use these when asked to find the total sum of a series. The second formula is faster if you already know the last term $l$.
Question 1
Find the sum of all natural numbers between 100 and 200 which are divisible by 3.
A) $4950$
B) $5000$
C) $4851$
D) $4900$
Step-by-step solution with full logic:
First number $>100$ divisible by 3 is $102$. Last is $198$.
$n = \\frac{198-102}{3} + 1 = 33$.
Sum $S_{33} = \\frac{33}{2}[102 + 198] = \\frac{33}{2}[300] = 4950$.
**** A) $4950$
Question 2
How many terms of the AP $24, 21, 18, \\dots$ must be taken so that their sum is 78?
A) $4$ or $13$
B) $5$ or $12$
C) $4$ only
D) $13$ only
Step-by-step solution with full logic:
Given $a=24, d=-3, S_n=78$.
$78 = \\frac{n}{2}[48 + (n-1)(-3)] \\implies 156 = 51n - 3n^2$.
$n^2 - 17n + 52 = 0 \\implies (n-4)(n-13) = 0$.
**** A) $4$ or $13$
Question 3
The sum of the first $n$ terms of an AP is given by $S_n = 4n^2 - n$. What is the common difference of this AP?
A) $3$
B) $4$
C) $8$
D) $7$
Step-by-step solution with full logic:
Rule: If $S_n = An^2 + Bn$, the common difference $d = 2A$.
Here, $A = 4$.
Therefore, $d = 2(4) = 8$.
**** C) $8$
Question 4
The sum of first $n$ terms of a series is given by $S_n = 2n^2 + 3n$. Find the 10th term.
A) $41$
B) $43$
C) $38$
D) $45$
Step-by-step solution with full logic:
Formula: $a_n = S_n - S_{n-1}$.
$S_{10} = 2(100) + 30 = 230$.
$S_9 = 2(81) + 27 = 189$.
$a_{10} = 230 - 189 = 41$.
**** A) $41$
Topic Name: Geometric Progression (GP)
Concept / Formula 4: General Term of a GP
Explanation Above:
A sequence is a GP if the ratio of any term to its preceding term is constant (Common Ratio $r = \\frac{a_{n+1}}{a_n}$).
Main Formula:
a_n = ar^{n-1}
Explanation Below:
General format of GP sequence: $a, ar, ar^2, ar^3, \\dots, ar^{n-1}, \\dots$.
Concept / When to Use:
AP relies on addition; GP relies on multiplication. Use these formulas for population growth, compound interest structure problems, or any sequence scaling by a factor.
Question 1
Which of the following sequences represents a valid Geometric Progression?
A) $2, 4, 6, 8, \\dots$
B) $3, 9, 18, 36, \\dots$
C) $4, -8, 16, -32, \\dots$
D) $1, 4, 9, 16, \\dots$
Step-by-step solution with full logic:
A GP must have a constant ratio $r = \\frac{a_2}{a_1} = \\frac{a_3}{a_2}$.
Option C: $-8/4 = -2$, and $16/-8 = -2$. Ratio is constant.
**** C) $4, -8, 16, -32, \\dots$
Question 2
In a GP, the first term is $3$ and the common ratio is $2$. What is the 6th term?
A) $192$
B) $96$
C) $48$
D) $384$
Step-by-step solution with full logic:
Given $a = 3$, $r = 2$, $n = 6$.
Formula: $a_n = ar^{n-1}$.
Substitute: $a_6 = 3(2^{6-1}) = 3(32) = 96$.
**** B) $96$
Question 3
The 3rd term of a GP is $12$ and the 6th term is $96$. What is the first term $a$?
A) $2$
B) $3$
C) $4$
D) $6$
Step-by-step solution with full logic:
$ar^2 = 12$ and $ar^5 = 96$.
Divide them: $r^3 = 8 \\implies r = 2$.
Substitute: $a(2^2) = 12 \\implies 4a = 12 \\implies a = 3$.
**** B) $3$
Question 4
What is the common ratio of the GP $5, 15, 45, 135, \\dots$?
A) $2$
B) $3$
C) $4$
D) $5$
Step-by-step solution with full logic:
The common ratio $r = a_2 / a_1$.
$r = 15 / 5 = 3$.
**** B) $3$
Topic Name: Special Series Tricks
Concept / Formula 5: Telescoping Fractions
Explanation Above:
When fractions have consecutive products in the denominator (like $5 \\times 6, 6 \\times 7$), they can telescope and cancel out the middle terms.
Main Formula:
\\text{Sum} = \\frac{1}{d} \\left[ \\frac{1}{\\text{First}} - \\frac{1}{\\text{Last}} \\right]
Explanation Below:
Where $d$ is the common difference $b-a$, "First" is the first term of the first denominator, and "Last" is the last term of the last denominator.
Concept / When to Use:
Use this formula to jump straight to the answer without manual LCM calculations for series of the form $\\frac{1}{a \\times b} + \\frac{1}{b \\times c}$.
Question 1
Find the sum of the series: $\\frac{1}{3 \\times 5} + \\frac{1}{5 \\times 7} + \\dots + \\frac{1}{21 \\times 23}$.
A) $\\frac{20}{69}$
B) $\\frac{10}{69}$
C) $\\frac{2}{23}$
D) $\\frac{5}{69}$
Step-by-step solution with full logic:
Identify common difference $d = 5-3 = 2$.
First $= 3$, Last $= 23$.
$\\text{Sum} = \\frac{1}{2} \\left[ \\frac{1}{3} - \\frac{1}{23} \\right] = \\frac{1}{2} \\left[ \\frac{20}{69} \\right] = \\frac{10}{69}$.
**** B) $\\frac{10}{69}$
Question 2
What is the value of $\\frac{1}{2 \\times 5} + \\frac{1}{5 \\times 8} + \\dots + \\frac{1}{29 \\times 32}$?
A) $\\frac{5}{32}$
B) $\\frac{15}{64}$
C) $\\frac{15}{32}$
D) $\\frac{5}{64}$
Step-by-step solution with full logic:
Common difference $d = 5-2 = 3$.
First $= 2$, Last $= 32$.
$\\text{Sum} = \\frac{1}{3} \\left[ \\frac{1}{2} - \\frac{1}{32} \\right] = \\frac{1}{3} \\left[ \\frac{15}{32} \\right] = \\frac{5}{32}$.
**** A) $\\frac{5}{32}$
Question 3
Sum of: $\\frac{1}{1 \\times 2} + \\frac{1}{2 \\times 3} + \\dots + \\frac{1}{99 \\times 100}$
A) $\\frac{99}{100}$
B) $\\frac{1}{100}$
C) $\\frac{100}{99}$
D) $1$
Step-by-step solution with full logic:
$d = 2-1 = 1$. First $= 1$, Last $= 100$.
$\\text{Sum} = \\frac{1}{1} \\left[ \\frac{1}{1} - \\frac{1}{100} \\right] = \\frac{99}{100}$.
**** A) $\\frac{99}{100}$
Question 4
Evaluate $\\frac{1}{4 \\times 7} + \\frac{1}{7 \\times 10} + \\frac{1}{10 \\times 13}$
A) $\\frac{3}{52}$
B) $\\frac{9}{52}$
C) $\\frac{1}{52}$
D) $\\frac{3}{13}$
Step-by-step solution with full logic:
$d = 7-4 = 3$. First $= 4$, Last $= 13$.
$\\text{Sum} = \\frac{1}{3} \\left[ \\frac{1}{4} - \\frac{1}{13} \\right] = \\frac{1}{3} \\left[ \\frac{9}{52} \\right] = \\frac{3}{52}$.
**** A) $\\frac{3}{52}$
`;


const lines = raw.split('\n').map(l => l.trim()).filter(l => l.length > 0);
let chapter = {
  id: "sequences",
  title: "Sequences and Series",
  tagline: "Mastering AP, GP, and Special Series",
  color: "algebra",
  totalConcepts: 5,
  concepts: []
};

let currentConcept = null;
let currentFormula = null;
let currentQuestion = null;

let state = "NONE";

for(let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if(line.startsWith("Topic Name:")) {
    const subtitle = line.substring("Topic Name:".length).trim();
    const nextLine = lines[i+1];
    if (nextLine && nextLine.startsWith("Concept / Formula")) {
        const titleMatch = nextLine.match(/Concept \/ Formula \d+:\s*(.*)/);
        const title = titleMatch ? titleMatch[1] : "Concept";
        currentConcept = {
          id: `seq-c${chapter.concepts.length + 1}`,
          chapterId: "sequences",
          title: `Concept ${chapter.concepts.length + 1}`,
          subtitle: subtitle + " - " + title,
          difficulty: "Medium",
          order: chapter.concepts.length + 1,
          formulas: []
        };
        chapter.concepts.push(currentConcept);
        i++; // skip nextLine
    }
  } else if (line.startsWith("Explanation Above:")) {
    i++;
    let expAbove = [];
    while(i < lines.length && !lines[i].startsWith("Main Formula:")) {
        expAbove.push(lines[i]);
        i++;
    }
    
    currentFormula = {
      id: `${currentConcept.id}-f1`,
      name: currentConcept.subtitle.substring(0, 30) + (currentConcept.subtitle.length > 30 ? "..." : ""),
      descriptionAbove: expAbove.join('\n'),
      expression: { lhs: "", num: "", den: "", color: "info" },
      descriptionBelow: "",
      explanation: "",
      mnemonic: "",
      questions: []
    };
    currentConcept.formulas.push(currentFormula);
    
    if (i < lines.length && lines[i].startsWith("Main Formula:")) {
        i++;
        let formulaLines = [];
        while(i < lines.length && !lines[i].startsWith("Explanation Below:")) {
            formulaLines.push(lines[i]);
            i++;
        }
        currentFormula.expression.lhs = formulaLines.join('\n');
    }
    
    if (i < lines.length && lines[i].startsWith("Explanation Below:")) {
        i++;
        let expBelow = [];
        while(i < lines.length && !lines[i].startsWith("Concept / When to Use:")) {
            expBelow.push(lines[i]);
            i++;
        }
        currentFormula.descriptionBelow = expBelow.join('\n');
    }
    
    if (i < lines.length && lines[i].startsWith("Concept / When to Use:")) {
        i++;
        let explanationText = [];
        while(i < lines.length && !lines[i].startsWith("Question")) {
            explanationText.push(lines[i]);
            i++;
        }
        currentFormula.explanation = explanationText.join('\n');
        i--; // back up so next loop sees Question
    }
  } else if (line.startsWith("Question ")) {
    let qId = `q${currentFormula.questions.length + 1}`;
    i++;
    let text = [];
    while(i < lines.length && !/^[A-D]\)/.test(lines[i])) {
        text.push(lines[i]);
        i++;
    }
    currentQuestion = {
      id: qId,
      text: text.join('\n'),
      options: [],
      correctIndex: 0
    };
    currentFormula.questions.push(currentQuestion);
    
    for (let opt = 0; opt < 4; opt++) {
        if (i < lines.length && /^[A-D]\)/.test(lines[i])) {
            currentQuestion.options.push(lines[i].substring(3).trim());
            i++;
        }
    }
    
    if (i < lines.length && lines[i].startsWith("Step-by-step")) {
        i++;
        let sol = [];
        while(i < lines.length && !lines[i].startsWith("****")) {
            sol.push(lines[i]);
            i++;
        }
        currentQuestion.solution = sol.join('\n');
        
        if (i < lines.length && lines[i].startsWith("****")) {
            const ansChar = lines[i].match(/\*\*\*\* ([A-D])\)/);
            if (ansChar) {
                const char = ansChar[1];
                currentQuestion.correctIndex = char.charCodeAt(0) - 'A'.charCodeAt(0);
            }
        }
    }
  }
}

// Generate the TypeScript file content directly!
const tsContent = `// Auto-generated by generate_seq.cjs
import { Chapter } from "./data";

export const sequencesChapter: Chapter = ${JSON.stringify(chapter, null, 2)};
`;

// Let's replace any double-escaped slashes generated by JSON.stringify so KaTeX works properly.
const cleanedContent = tsContent.replace(/\\\\/g, '\\\\');

fs.writeFileSync('src/lib/sequences-data.ts', cleanedContent);
console.log("TypeScript file generated at src/lib/sequences-data.ts");
