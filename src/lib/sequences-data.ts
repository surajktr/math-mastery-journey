import { Chapter } from './data';

export const sequencesChapter: Chapter = {
  "id": "sequences",
  "title": "Sequences and Series",
  "tagline": "Mastering AP, GP, and Special Series",
  "color": "algebra",
  "totalConcepts": 13,
  "concepts": [
    {
      "id": "seq-c1",
      "chapterId": "sequences",
      "title": "Concept 1",
      "subtitle": "Sequences and Series Basics - Definitions of Sequence, Progression, and Series",
      "difficulty": "Medium",
      "order": 1,
      "formulas": [
        {
          "id": "seq-c1-f1",
          "name": "Sequences and Series Basics - ...",
          "expression": {
            "lhs": "Sequence: An arrangement of numbers in a definite order according to a rule.\nProgression: A sequence whose terms follow a certain distinct mathematical pattern.\nSeries: The sum of the terms of a sequence ($a_1 + a_2 + a_3 + \\dots$). It can be a finite series (countable terms) or an infinite series (endless terms).",
            "num": "",
            "den": "",
            "color": "info"
          },
          "explanation": "Key Terminology:\n• Sequence: Numbers arranged in a defined order.\n• Progression: A sequence following a strict mathematical pattern.\n• Series: The sum of terms in a sequence ($a_1 + a_2 + \\dots$).",
          "mnemonic": "",
          "questions": [
            {
              "id": "q1",
              "text": "Which of the following mathematical constructs specifically represents a \"Finite Series\" according to standard algebraic definitions?",
              "options": [
                "$2, 4, 6, 8, 10, \\dots$",
                "$1 + 3 + 5 + 7 + \\dots$",
                "$5 + 10 + 15 + 20 + 25$",
                "$1, 4, 9, 16, 25$"
              ],
              "correctIndex": 2,
              "solution": "A series must be the sum of sequence terms, eliminating options A and D (which are sequences separated by commas).\nA finite series must have a terminating end, meaning a countable number of terms.\nOption B is an infinite series because of the \"$\\dots$\" at the end.\nOption C represents a finite sum of exact terms."
            },
            {
              "id": "q2",
              "text": "If a sequence is defined by the rule $a_n = n^2 + 1$, what is the sum of the finite series formed by its first 3 terms?",
              "options": [
                "$14$",
                "$17$",
                "$20$",
                "$23$"
              ],
              "correctIndex": 1,
              "solution": "Identify the rule: $a_n = n^2 + 1$.\nCalculate the first 3 terms of the progression:\n$a_1 = 1^2 + 1 = 2$\n$a_2 = 2^2 + 1 = 5$\n$a_3 = 3^2 + 1 = 10$\nForm the series (sum of terms): $2 + 5 + 10$.\nCalculate the sum: $17$."
            },
            {
              "id": "q3",
              "text": "A sequence has terms that follow a certain pattern but goes on indefinitely. If we express the sum of all these terms, what is the correct terminology for this mathematical entity?",
              "options": [
                "Infinite Progression",
                "Infinite Series",
                "Finite Sequence",
                "Indefinite Sequence"
              ],
              "correctIndex": 1,
              "solution": "The question states we are expressing the \"sum of all these terms\". Summation implies it is a \"Series\".\nThe sequence \"goes on indefinitely\", meaning it does not end.\nCombining both facts, the entity is an Infinite Series."
            }
          ]
        }
      ]
    },
    {
      "id": "seq-c2",
      "chapterId": "sequences",
      "title": "Concept 2",
      "subtitle": "Special Series Tricks - Multiplier with Same Denominator",
      "difficulty": "Medium",
      "order": 2,
      "formulas": [
        {
          "id": "seq-c2-f1",
          "name": "Special Series Tricks - Multip...",
          "expression": {
            "lhs": "For a mixed fraction expression of the form $N \\frac{N - d}{N} \\times N$ (where $N$ consists of $k$ digits of $9$):\n$$\\text{Step 1: Write the multiplier } (N)$$\n$$\\text{Step 2: Attach as many zeroes as there are } 9\\text{'s in the first whole number.}$$\n$$\\text{Step 3: Subtract the difference } (d) \\text{ between the denominator and numerator.}$$",
            "num": "",
            "den": "",
            "color": "info"
          },
          "explanation": "Shortcut method to evaluate expressions of the form $N \\frac{N-d}{N} \\times N$ where $N$ consists of repeated 9s.\nAvoids long division and multiplication by converting fractions to decimal expansions.",
          "mnemonic": "",
          "questions": [
            {
              "id": "q1",
              "text": "Find the exact value of $999 \\frac{987}{999} \\times 999$.",
              "options": [
                "$998998$",
                "$998988$",
                "$999988$",
                "$998992$"
              ],
              "correctIndex": 1,
              "solution": "Identify the pattern: Multiplier is $999$. Whole number is $999$ (three $9$s). Denominator = Multiplier.\nStep 1: Base number = $999$.\nStep 2: Add three zeroes (since whole number is $999$) $\\rightarrow 999000$.\nStep 3: Find difference between Denom and Num: $999 - 987 = 12$.\nStep 4: Subtract difference: $999000 - 12 = 998988$."
            },
            {
              "id": "q2",
              "text": "Solve for the value of $99 \\frac{95}{99} \\times 99$.",
              "options": [
                "$9896$",
                "$9895$",
                "$9904$",
                "$9801$"
              ],
              "correctIndex": 0,
              "solution": "Multiplier is $99$. Whole number is $99$ (two $9$s).\nBase number with zeroes attached = $9900$.\nDifference between Denom and Num: $99 - 95 = 4$.\nFinal calculation: $9900 - 4 = 9896$."
            },
            {
              "id": "q3",
              "text": "Evaluate the expression: $9999 \\frac{9991}{9999} \\times 9999 + 8$.",
              "options": [
                "$99990000$",
                "$99989992$",
                "$99980000$",
                "$99999992$"
              ],
              "correctIndex": 0,
              "solution": "Apply the trick to the main term: $9999 \\frac{9991}{9999} \\times 9999$.\nMultiplier is $9999$. Whole number has four $9$s $\\rightarrow 99990000$.\nDifference = $9999 - 9991 = 8$.\nTerm value = $99990000 - 8$.\nThe full expression adds $8$ back: $(99990000 - 8) + 8 = 99990000$."
            }
          ]
        }
      ]
    },
    {
      "id": "seq-c3",
      "chapterId": "sequences",
      "title": "Concept 3",
      "subtitle": "Special Series - Telescoping Fractions - Two-Factor Denominator Telescoping Series",
      "difficulty": "Medium",
      "order": 3,
      "formulas": [
        {
          "id": "seq-c3-f1",
          "name": "Special Series - Telescoping F...",
          "expression": {
            "lhs": "For a series $\\frac{1}{a \\times b} + \\frac{1}{b \\times c} + \\dots + \\frac{1}{y \\times z}$ where $b-a = c-b = \\text{common difference } (d)$:\n$$\\text{Sum} = \\frac{1}{d} \\left[ \\frac{1}{\\text{First term of 1st den}} - \\frac{1}{\\text{Last term of last den}} \\right]$$",
            "num": "",
            "den": "",
            "color": "info"
          },
          "explanation": "Method for sum of fractions where denominators are products of terms in Arithmetic Progression.\nSuccessive terms subtract to cancel out intermediate elements (telescoping series).",
          "mnemonic": "",
          "questions": [
            {
              "id": "q1",
              "text": "Find the sum of the series: $\\frac{1}{3 \\times 5} + \\frac{1}{5 \\times 7} + \\frac{1}{7 \\times 9} + \\dots + \\frac{1}{21 \\times 23}$.",
              "options": [
                "$\\frac{20}{69}$",
                "$\\frac{10}{69}$",
                "$\\frac{2}{23}$",
                "$\\frac{5}{69}$"
              ],
              "correctIndex": 1,
              "solution": "Identify common difference $d$ between factors: $5-3 = 2$, $7-5 = 2$. So, $d = 2$.\nIdentify first term of first denominator: $3$.\nIdentify last term of last denominator: $23$.\nApply formula: $\\text{Sum} = \\frac{1}{2} \\left[ \\frac{1}{3} - \\frac{1}{23} \\right]$.\nCalculate: $\\frac{1}{2} \\left[ \\frac{23 - 3}{69} \\right] = \\frac{1}{2} \\left[ \\frac{20}{69} \\right] = \\frac{10}{69}$."
            },
            {
              "id": "q2",
              "text": "What is the value of $\\frac{1}{2 \\times 5} + \\frac{1}{5 \\times 8} + \\frac{1}{8 \\times 11} + \\dots + \\frac{1}{29 \\times 32}$?",
              "options": [
                "$\\frac{5}{32}$",
                "$\\frac{15}{64}$",
                "$\\frac{15}{32}$",
                "$\\frac{5}{64}$"
              ],
              "correctIndex": 0,
              "solution": "Common difference $d = 5-2 = 3$.\nFirst term of den $= 2$, Last term of den $= 32$.\nApply formula: $\\text{Sum} = \\frac{1}{3} \\left[ \\frac{1}{2} - \\frac{1}{32} \\right]$.\nCalculate bracket: $\\frac{16}{32} - \\frac{1}{32} = \\frac{15}{32}$.\nFinal calculation: $\\frac{1}{3} \\times \\frac{15}{32} = \\frac{5}{32}$."
            }
          ]
        },
        {
          "id": "seq-c3-f2",
          "name": "Special Series - Telescoping F...",
          "expression": {
            "lhs": "For a series $\\frac{1}{a \\times b \\times c} + \\frac{1}{b \\times c \\times d} + \\dots + \\frac{1}{x \\times y \\times z}$:\n$$\\text{Sum} = \\frac{1}{\\text{Diff of 1st \\& 3rd no. in den}} \\left[ \\frac{1}{\\text{1st two no. of den}} - \\frac{1}{\\text{Last two no. of den}} \\right]$$",
            "num": "",
            "den": "",
            "color": "info"
          },
          "explanation": "Method for sum of fractions where denominators are products of terms in Arithmetic Progression.\nSuccessive terms subtract to cancel out intermediate elements (telescoping series).",
          "mnemonic": "",
          "questions": [
            {
              "id": "q1",
              "text": "Find the sum of: $\\frac{1}{2 \\times 5 \\times 8} + \\frac{1}{5 \\times 8 \\times 11} + \\frac{1}{8 \\times 11 \\times 14} + \\frac{1}{11 \\times 14 \\times 17}$.",
              "options": [
                "$\\frac{19}{1190}$",
                "$\\frac{11}{1190}$",
                "$\\frac{17}{1190}$",
                "$\\frac{23}{1190}$"
              ],
              "correctIndex": 0,
              "solution": "Diff of 1st & 3rd no. in denom (e.g., in $2 \\times 5 \\times 8$, diff is $8 - 2 = 6$).\nIdentify 1st two numbers of first denom: $2 \\times 5 = 10$.\nIdentify last two numbers of last denom: $14 \\times 17 = 238$.\nFormula: $\\text{Sum} = \\frac{1}{6} \\left[ \\frac{1}{10} - \\frac{1}{238} \\right]$.\nLCM of $10$ and $238$. $10 = 2 \\times 5$, $238 = 2 \\times 119$. LCM $= 1190$.\nBracket: $\\frac{119 - 5}{1190} = \\frac{114}{1190}$.\nFinal sum: $\\frac{1}{6} \\times \\frac{114}{1190} = \\frac{19}{1190}$. Wait, let me recheck the options.\nLet's recalculate LCM of $10$ and $238$: $1190$. $\\frac{119}{1190} - \\frac{5}{1190} = \\frac{114}{1190}$. Then $\\frac{1}{6} \\times \\frac{114}{1190} = \\frac{19}{1190}$. My options list has $2720$ or $1360$. Let me adjust the options to ensure mathematical soundness perfectly. Option C will be $\\frac{19}{1190}$. Let's rewrite the correct option clearly. Let's trace it: $\\frac{19}{1190}$.\nLet me use an option block that fits:\nA) $\\frac{19}{1190}$\nB) $\\frac{11}{1190}$\nC) $\\frac{17}{1190}$\nD) $\\frac{23}{1190}$"
            },
            {
              "id": "q2",
              "text": "Evaluate: $\\frac{1}{1 \\times 3 \\times 5} + \\frac{1}{3 \\times 5 \\times 7} + \\frac{1}{5 \\times 7 \\times 9} + \\frac{1}{7 \\times 9 \\times 11}$.",
              "options": [
                "$\\frac{16}{99}$",
                "$\\frac{16}{297}$",
                "$\\frac{8}{99}$",
                "$\\frac{4}{99}$"
              ],
              "correctIndex": 2,
              "solution": "Diff of 1st & 3rd no. in denom: $5 - 1 = 4$.\n1st two numbers of 1st denom: $1 \\times 3 = 3$.\nLast two numbers of last denom: $9 \\times 11 = 99$.\nFormula: $\\text{Sum} = \\frac{1}{4} \\left[ \\frac{1}{3} - \\frac{1}{99} \\right]$.\nBracket calculation: $\\frac{33 - 1}{99} = \\frac{32}{99}$.\nFinal sum: $\\frac{1}{4} \\times \\frac{32}{99} = \\frac{8}{99}$."
            }
          ]
        }
      ]
    },
    {
      "id": "seq-c4",
      "chapterId": "sequences",
      "title": "Concept 4",
      "subtitle": "Repetitive Series Concepts - Sum of Repeated 9s and 1s",
      "difficulty": "Medium",
      "order": 4,
      "formulas": [
        {
          "id": "seq-c4-f1",
          "name": "Repetitive Series Concepts - S...",
          "expression": {
            "lhs": "Sub-formula 1: Sum of $n$ terms of $9 + 99 + 999 + \\dots = \\frac{10(10^n - 1) - 9n}{9}$\nSub-formula 2: Sum of $n$ terms of $1 + 11 + 111 + \\dots = \\frac{10(10^n - 1) - 9n}{81}$",
            "num": "",
            "den": "",
            "color": "info"
          },
          "explanation": "Telescoping method for fractions with three-factor denominators in Arithmetic Progression.\nSplits each term into a difference of two-factor fractions to cancel intermediate terms.",
          "mnemonic": "",
          "questions": [
            {
              "id": "q1",
              "text": "What is the sum of the first 5 terms of the series $9 + 99 + 999 + \\dots$?",
              "options": [
                "$111105$",
                "$111115$",
                "$111101$",
                "$111111$"
              ],
              "correctIndex": 0,
              "solution": "Apply Sub-formula 1: $S_n = \\frac{10(10^n - 1) - 9n}{9}$. Here $n = 5$.\nSubstitute $n$: $S_5 = \\frac{10(10^5 - 1) - 9(5)}{9}$.\nCalculate: $\\frac{10(99999) - 45}{9}$.\nSimplify: $\\frac{999990 - 45}{9} = \\frac{999945}{9}$.\nDivide: $111105$. (Alternatively, add manually to verify: $9 + 99 + 999 + 9999 + 99999 = 111105$)."
            },
            {
              "id": "q2",
              "text": "If the sum of $n$ terms of the series $9 + 99 + 999 + \\dots$ is given by $\\frac{10^{x+1} - yx - 10}{9}$, what are the values of $x$ and $y$?",
              "options": [
                "$x = n, y = 9$",
                "$x = 10, y = n$",
                "$x = n, y = 10$",
                "$x = 9, y = n$"
              ],
              "correctIndex": 0,
              "solution": "We know the standard formula is $\\frac{10(10^n - 1) - 9n}{9}$.\nExpand the standard formula: $\\frac{10^{n+1} - 10 - 9n}{9}$.\nCompare with the given expression: $\\frac{10^{x+1} - yx - 10}{9}$.\nBy comparing terms, $x+1 = n+1 \\implies x = n$.\nThe middle term is $-yx$ and in the formula it is $-9n$. Since $x=n$, then $y = 9$."
            },
            {
              "id": "q3",
              "text": "Find the sum of the first 4 terms of the series $1 + 11 + 111 + 1111$.",
              "options": [
                "$1234$",
                "$1230$",
                "$1236$",
                "$1240$"
              ],
              "correctIndex": 0,
              "solution": "Use Sub-formula 2: $S_n = \\frac{10(10^n - 1) - 9n}{81}$. Here $n = 4$.\n$S_4 = \\frac{10(10^4 - 1) - 9(4)}{81}$.\n$S_4 = \\frac{10(9999) - 36}{81} = \\frac{99990 - 36}{81}$.\n$S_4 = \\frac{99954}{81} = 1234$. (Manual verification: $1+11+111+1111 = 1234$)."
            },
            {
              "id": "q4",
              "text": "What is the sum of $n$ terms of the series $3 + 33 + 333 + \\dots$?",
              "options": [
                "$\\frac{10(10^n - 1) - 9n}{9}$",
                "$\\frac{10(10^n - 1) - 9n}{27}$",
                "$\\frac{10(10^n - 1) - 9n}{81}$",
                "$\\frac{30(10^n - 1) - 9n}{81}$"
              ],
              "correctIndex": 1,
              "solution": "The series is $3(1 + 11 + 111 + \\dots)$.\nWe know the sum of $(1 + 11 + 111 + \\dots)$ is $\\frac{10(10^n - 1) - 9n}{81}$.\nMultiply this result by $3$: $3 \\times \\left( \\frac{10(10^n - 1) - 9n}{81} \\right)$.\nSimplify: $\\frac{10(10^n - 1) - 9n}{27}$."
            }
          ]
        }
      ]
    },
    {
      "id": "seq-c5",
      "chapterId": "sequences",
      "title": "Concept 5",
      "subtitle": "Bar Based Concepts (Recurring Decimals) - Converting Recurring Decimals to Fractions",
      "difficulty": "Medium",
      "order": 5,
      "formulas": [
        {
          "id": "seq-c5-f1",
          "name": "Bar Based Concepts (Recurring ...",
          "expression": {
            "lhs": "Sub-formula 1: $0.\\bar{p} = \\frac{p}{9}$\nSub-formula 2: $0.\\overline{pq} = \\frac{pq}{99}$\nSub-formula 3: $0.p\\overline{qr} = \\frac{pqr - p}{990}$\nSub-formula 4: $0.\\overline{pqr} = \\frac{pqr}{999}$",
            "num": "",
            "den": "",
            "color": "info"
          },
          "explanation": "Formula for the sum of repetitive decimal series ($9+99+999+\\dots$ and $1+11+111+\\dots$).\nDerived by converting each term into a power of 10 minus 1.",
          "mnemonic": "",
          "questions": [
            {
              "id": "q1",
              "text": "Calculate the exact sum: $0.\\bar{4} + 0.\\overline{32}$.",
              "options": [
                "$\\frac{76}{99}$",
                "$\\frac{68}{99}$",
                "$\\frac{36}{99}$",
                "$\\frac{72}{99}$"
              ],
              "correctIndex": 0,
              "solution": "Convert $0.\\bar{4}$ to fraction using Sub-formula 1: $\\frac{4}{9}$.\nConvert $0.\\overline{32}$ to fraction using Sub-formula 2: $\\frac{32}{99}$.\nAdd fractions: $\\frac{4}{9} + \\frac{32}{99}$.\nFind LCM of $9$ and $99$ which is $99$.\nConvert: $\\frac{44}{99} + \\frac{32}{99} = \\frac{76}{99}$."
            },
            {
              "id": "q2",
              "text": "What is the difference between $0.\\overline{81}$ and $0.\\bar{2}$?",
              "options": [
                "$\\frac{59}{99}$",
                "$\\frac{61}{99}$",
                "$\\frac{19}{33}$",
                "$\\frac{20}{33}$"
              ],
              "correctIndex": 0,
              "solution": "$0.\\overline{81} = \\frac{81}{99}$.\n$0.\\bar{2} = \\frac{2}{9} = \\frac{22}{99}$.\nSubtract: $\\frac{81}{99} - \\frac{22}{99} = \\frac{59}{99}$."
            },
            {
              "id": "q3",
              "text": "Convert the recurring decimal $0.2\\overline{45}$ into its simplest fractional form.",
              "options": [
                "$\\frac{243}{990}$",
                "$\\frac{245}{990}$",
                "$\\frac{27}{110}$",
                "$\\frac{29}{110}$"
              ],
              "correctIndex": 2,
              "solution": "Use Sub-formula 3: $0.p\\overline{qr} = \\frac{pqr - p}{990}$.\nHere $p=2$, $q=4$, $r=5$.\nNumerator = $245 - 2 = 243$.\nDenominator = Two digits have bars (two $9$s), one doesn't (one $0$) $\\rightarrow 990$.\nFraction = $\\frac{243}{990}$.\nSimplify by dividing by $9$: $\\frac{27}{110}$."
            },
            {
              "id": "q4",
              "text": "Evaluate $0.\\overline{123} \\times 333$.",
              "options": [
                "$37$",
                "$41$",
                "$45$",
                "$123$"
              ],
              "correctIndex": 1,
              "solution": "Use Sub-formula 4: $0.\\overline{pqr} = \\frac{pqr}{999}$.\nHere $0.\\overline{123} = \\frac{123}{999}$.\nMultiply by $333$: $\\frac{123}{999} \\times 333$.\nSimplify $\\frac{333}{999} = \\frac{1}{3}$.\nFinal calculation: $123 \\times \\frac{1}{3} = 41$."
            }
          ]
        }
      ]
    },
    {
      "id": "seq-c6",
      "chapterId": "sequences",
      "title": "Concept 6",
      "subtitle": "Arithmetic Progression (AP) - Nth Term - General Term Formulas of an AP",
      "difficulty": "Medium",
      "order": 6,
      "formulas": [
        {
          "id": "seq-c6-f1",
          "name": "Arithmetic Progression (AP) - ...",
          "expression": {
            "lhs": "Sub-formula 1: Nth term from the beginning, $a_n = a + (n-1)d$ (where $a$ = first term, $d$ = common difference).\nSub-formula 2: Nth term from the end $= l - (n-1)d$ (where $l$ = last term).\nSub-formula 3: Note: $a_1 + a_n = a_k + a_{n-k+1}$ (Sum of terms equidistant from beginning and end is constant and equal to sum of first and last term).",
            "num": "",
            "den": "",
            "color": "info"
          },
          "explanation": "Rule to convert recurring decimals to rational fractions:\n• Numerator: The full number minus the non-recurring digits.\n• Denominator: As many 9s as recurring digits, followed by as many 0s as non-recurring digits after the decimal point.",
          "mnemonic": "",
          "questions": [
            {
              "id": "q1",
              "text": "In an Arithmetic Progression, the first term is $7$ and the common difference is $-3$. What is the 15th term?",
              "options": [
                "$35$",
                "$-35$",
                "$-38$",
                "$-42$"
              ],
              "correctIndex": 1,
              "solution": "Identify given values: $a = 7$, $d = -3$, $n = 15$.\nFormula: $a_n = a + (n-1)d$.\nSubstitute: $a_{15} = 7 + (15-1)(-3)$.\nCalculate: $a_{15} = 7 + 14(-3) = 7 - 42 = -35$."
            },
            {
              "id": "q2",
              "text": "Which term of the AP $5, 9, 13, 17, \\dots$ is $81$?",
              "options": [
                "$19^{th}$",
                "$20^{th}$",
                "$21^{st}$",
                "$22^{nd}$"
              ],
              "correctIndex": 1,
              "solution": "Given: $a = 5$, $d = 9 - 5 = 4$, $a_n = 81$.\nFormula: $a_n = a + (n-1)d$.\nSubstitute: $81 = 5 + (n-1)4$.\nSolve: $76 = 4(n-1) \\implies n-1 = 19 \\implies n = 20$."
            },
            {
              "id": "q3",
              "text": "Find the 10th term from the end of the AP: $10, 15, 20, \\dots, 135$.",
              "options": [
                "$85$",
                "$90$",
                "$95$",
                "$100$"
              ],
              "correctIndex": 1,
              "solution": "Given: AP is $10, 15, \\dots, 135$. Common diff $d = 15 - 10 = 5$. Last term $l = 135$.\nWe need 10th term from the end, so $n = 10$.\nFormula: Term from end $= l - (n-1)d$.\nSubstitute: $135 - (10-1)5$.\nCalculate: $135 - (9 \\times 5) = 135 - 45 = 90$."
            },
            {
              "id": "q4",
              "text": "The 4th term from the end of an AP is $22$. If the common difference is $-2$, what is the last term of the AP?",
              "options": [
                "$16$",
                "$14$",
                "$28$",
                "$30$"
              ],
              "correctIndex": 0,
              "solution": "Given: Term from end $= 22$, $n = 4$, $d = -2$. Let last term be $l$.\nFormula: Term from end $= l - (n-1)d$.\nSubstitute: $22 = l - (4-1)(-2)$.\nSolve: $22 = l - 3(-2) \\implies 22 = l + 6$.\nResult: $l = 16$."
            },
            {
              "id": "q5",
              "text": "In an AP of 50 terms, the sum of the first and last term is $120$. What is the sum of the 15th term from the beginning and the 15th term from the end?",
              "options": [
                "$60$",
                "$120$",
                "$240$",
                "Cannot be determined"
              ],
              "correctIndex": 1,
              "solution": "Note the property: $a_k (\\text{from start}) + a_k (\\text{from end}) = a + l$.\nWe are given $a + l = 120$.\nWe need the sum of $15^{th}$ from start and $15^{th}$ from end.\nAccording to the property, this is exactly equal to $a + l$.\nTherefore, the sum is $120$."
            },
            {
              "id": "q6",
              "text": "For a finite AP having 21 terms, $a_3 + a_{19} = 64$. Find the value of $a_{11}$.",
              "options": [
                "$32$",
                "$64$",
                "$16$",
                "$48$"
              ],
              "correctIndex": 0,
              "solution": "Property: $a_k + a_{n-k+1} = a_1 + a_n$.\nHere $n=21$. Notice that $k=3 \\implies n-k+1 = 21-3+1 = 19$. Thus $a_3$ and $a_{19}$ are equidistant from the ends.\nTheir sum $a_3 + a_{19} = 64$.\nThe middle term of 21 terms is the $\\frac{21+1}{2}^{th}$ term = $11^{th}$ term ($a_{11}$).\nThe middle term added to itself is also equidistant: $a_{11} + a_{11} = a_3 + a_{19}$.\n$2a_{11} = 64 \\implies a_{11} = 32$."
            }
          ]
        }
      ]
    },
    {
      "id": "seq-c7",
      "chapterId": "sequences",
      "title": "Concept 7",
      "subtitle": "Properties of Arithmetic Progression - Operations on AP, Linear Expression, and AP Test",
      "difficulty": "Medium",
      "order": 7,
      "formulas": [
        {
          "id": "seq-c7-f1",
          "name": "Properties of Arithmetic Progr...",
          "expression": {
            "lhs": "Sub-formula 1: If a constant $k$ is added/subtracted to each term of an AP, the new sequence is an AP with the same $d$. If multiplied/divided by a non-zero $k$, the new AP has common difference $kd$ or $\\frac{d}{k}$.\nSub-formula 2: If $a, b, c$ (or $a_{n-1}, a_n, a_{n+1}$) are consecutive terms in AP, then $2b = a + c$ (or $2a_n = a_{n-1} + a_{n+1}$).\nSub-formula 3: If the $n^{th}$ term of a sequence is a linear expression in $n$ (i.e., $An + B$), it forms an AP where the common difference $d = A$.",
            "num": "",
            "den": "",
            "color": "info"
          },
          "explanation": "Foundational formulas for Arithmetic Progressions:\n• $a_n = a + (n-1)d$ (term from start)\n• $a'_n = l - (n-1)d$ (term from end)\n• $a_1 + a_n = a_k + a_{n-k+1}$ (equidistant terms sum is constant)",
          "mnemonic": "",
          "questions": [
            {
              "id": "q1",
              "text": "An AP has a common difference of $8$. If every term of this AP is multiplied by $3$ and then $5$ is subtracted from each term, what will be the common difference of the newly formed sequence?",
              "options": [
                "$24$",
                "$19$",
                "$8$",
                "$3$"
              ],
              "correctIndex": 0,
              "solution": "Original common difference $d = 8$.\nOperation 1: Multiply by $3$. The new common difference becomes $d \\times 3 = 8 \\times 3 = 24$.\nOperation 2: Subtract $5$. Adding or subtracting a constant does NOT change the common difference of an AP.\nTherefore, the common difference remains $24$."
            },
            {
              "id": "q2",
              "text": "The terms of an AP with common difference $d$ are divided by $-2$. The new common difference is $7$. What is the value of $d$?",
              "options": [
                "$14$",
                "$-14$",
                "$-3.5$",
                "$3.5$"
              ],
              "correctIndex": 1,
              "solution": "Rule: When an AP is divided by $k$, the new common diff is $\\frac{d}{k}$.\nHere, $k = -2$ and new common difference $= 7$.\nEquation: $\\frac{d}{-2} = 7$.\nSolve: $d = 7 \\times (-2) = -14$."
            },
            {
              "id": "q3",
              "text": "If $3x - 1, 5x + 2$, and $9x - 4$ are three consecutive terms of an Arithmetic Progression, find the value of $x$.",
              "options": [
                "$4.5$",
                "$4$",
                "$5$",
                "$2$"
              ],
              "correctIndex": 0,
              "solution": "Condition for 3 terms $a, b, c$ in AP is $2b = a + c$.\nHere, $a = 3x - 1$, $b = 5x + 2$, $c = 9x - 4$.\nSubstitute: $2(5x + 2) = (3x - 1) + (9x - 4)$.\nExpand: $10x + 4 = 12x - 5$.\nSolve: $4 + 5 = 12x - 10x \\implies 9 = 2x \\implies x = 4.5$.\nWait, let me re-evaluate my options, $4.5$ is not listed. Let me recalculate.\n$2(5x+2) = 10x+4$.\n$(3x-1) + (9x-4) = 12x-5$.\n$10x+4 = 12x-5 \\implies 9 = 2x \\implies x = 4.5$.\nLet's adjust the question to match an integer option perfectly. Let $c = 8x - 5$.\nThen $a+c = 11x - 6$.\n$2b = 10x + 4$.\n$10x + 4 = 11x - 6 \\implies x = 10$.\nLet me keep the original math but change the correct option to $4.5$ or adjust options. Let's adjust options.\nA) $4.5$\nB) $4$\nC) $5$\nD) $2$"
            },
            {
              "id": "q4",
              "text": "If $\\log(2), \\log(2^x - 1),$ and $\\log(2^x + 3)$ are in AP, what is the value of $x$?",
              "options": [
                "$\\log_2(5)$",
                "$2$",
                "$\\log_2(3)$",
                "$3$"
              ],
              "correctIndex": 0,
              "solution": "If in AP, $2 \\log(2^x - 1) = \\log(2) + \\log(2^x + 3)$.\nUse log properties: $\\log((2^x - 1)^2) = \\log(2(2^x + 3))$.\nDrop logs: $(2^x - 1)^2 = 2(2^x + 3)$. Let $2^x = y$.\n$(y - 1)^2 = 2(y + 3) \\implies y^2 - 2y + 1 = 2y + 6$.\n$y^2 - 4y - 5 = 0 \\implies (y - 5)(y + 1) = 0$.\n$y = 5$ or $y = -1$. Since $2^x$ must be positive, $y = 5$.\n$2^x = 5 \\implies x = \\log_2(5)$."
            },
            {
              "id": "q5",
              "text": "The $n^{th}$ term of a sequence is given by the expression $T_n = -7n + 12$. What is the common difference of this progression?",
              "options": [
                "$12$",
                "$-7$",
                "$5$",
                "$-5$"
              ],
              "correctIndex": 1,
              "solution": "Recognize the form: $T_n = An + B$. This is a linear expression in $n$.\nThe property states that the coefficient of $n$ (which is $A$) is exactly the common difference $d$.\nHere, $A = -7$. Therefore, $d = -7$.\n(Verification: $T_1 = 5, T_2 = -2$. $d = -2 - 5 = -7$)."
            },
            {
              "id": "q6",
              "text": "If the $n^{th}$ term of an AP is $5n - 3$, what is the sum of the first two terms?",
              "options": [
                "$5$",
                "$2$",
                "$7$",
                "$9$"
              ],
              "correctIndex": 3,
              "solution": "$T_n = 5n - 3$.\nFind 1st term ($n=1$): $T_1 = 5(1) - 3 = 2$.\nFind 2nd term ($n=2$): $T_2 = 5(2) - 3 = 7$. (Notice common diff is $5$).\nSum of first two terms = $2 + 7 = 9$."
            }
          ]
        }
      ]
    },
    {
      "id": "seq-c8",
      "chapterId": "sequences",
      "title": "Concept 8",
      "subtitle": "Selection of Terms in AP - Selecting Unknown Terms in AP",
      "difficulty": "Medium",
      "order": 8,
      "formulas": [
        {
          "id": "seq-c8-f1",
          "name": "Selection of Terms in AP - Sel...",
          "expression": {
            "lhs": "3 terms: Take as $(a - d), a, (a + d)$. Common diff = $d$.\n4 terms: Take as $(a - 3d), (a - d), (a + d), (a + 3d)$. Common diff = $2d$.\n5 terms: Take as $(a - 2d), (a - d), a, (a + d), (a + 2d)$. Common diff = $d$.",
            "num": "",
            "den": "",
            "color": "info"
          },
          "explanation": "Properties of Arithmetic Progressions:\n• Adding/subtracting $k$ preserves common difference $d$.\n• Multiplying/dividing by $k$ scales common difference to $kd$ or $\\frac{d}{k}$.\n• Three terms in AP satisfy $2b = a + c$.\n• A linear $n$-th term $An + B$ has common difference $d = A$.",
          "mnemonic": "",
          "questions": [
            {
              "id": "q1",
              "text": "The sum of three numbers in an AP is $27$ and their product is $504$. What is the smallest of these three numbers?",
              "options": [
                "$4$",
                "$7$",
                "$9$",
                "$14$"
              ],
              "correctIndex": 0,
              "solution": "Let the 3 terms be $(a-d), a, (a+d)$.\nSum = $(a-d) + a + (a+d) = 3a$.\n$3a = 27 \\implies a = 9$.\nProduct = $(a-d)(a)(a+d) = a(a^2 - d^2) = 504$.\nSubstitute $a=9$: $9(81 - d^2) = 504$.\n$81 - d^2 = 56 \\implies d^2 = 25 \\implies d = \\pm 5$.\nIf $d=5$, terms are $4, 9, 14$. Smallest is $4$. (If $d=-5$, terms are $14, 9, 4$, smallest is still $4$)."
            },
            {
              "id": "q2",
              "text": "The sum of three angles of a triangle are in AP. If the smallest angle is $40^\\circ$, what is the largest angle?",
              "options": [
                "$60^\\circ$",
                "$80^\\circ$",
                "$100^\\circ$",
                "$120^\\circ$"
              ],
              "correctIndex": 1,
              "solution": "Let angles be $(a-d), a, (a+d)$.\nSum of angles in a triangle is $180^\\circ$. So, $3a = 180 \\implies a = 60^\\circ$.\nThe smallest angle is given as $40^\\circ$. Assuming $d > 0$, $(a-d) = 40$.\n$60 - d = 40 \\implies d = 20^\\circ$.\nLargest angle = $a+d = 60 + 20 = 80^\\circ$."
            },
            {
              "id": "q3",
              "text": "The sum of four consecutive terms of an AP is $32$, and the ratio of the product of the first and the last terms to the product of the two middle terms is $7 : 15$. What is the largest term?",
              "options": [
                "$14$",
                "$11$",
                "$8$",
                "$5$"
              ],
              "correctIndex": 0,
              "solution": "Let terms be $(a-3d), (a-d), (a+d), (a+3d)$.\nSum $= 4a = 32 \\implies a = 8$.\nRatio condition: $\\frac{(a-3d)(a+3d)}{(a-d)(a+d)} = \\frac{7}{15}$.\n$\\frac{a^2 - 9d^2}{a^2 - d^2} = \\frac{7}{15}$.\nSubstitute $a=8$: $\\frac{64 - 9d^2}{64 - d^2} = \\frac{7}{15}$.\nCross-multiply: $15(64 - 9d^2) = 7(64 - d^2)$.\n$960 - 135d^2 = 448 - 7d^2 \\implies 512 = 128d^2 \\implies d^2 = 4 \\implies d = \\pm 2$.\nLargest term $= a + 3d = 8 + 3(2) = 14$ (taking positive $d$)."
            },
            {
              "id": "q4",
              "text": "Four numbers are in AP. Their sum is $20$ and the sum of their squares is $120$. Find the common difference (assume positive sequence).",
              "options": [
                "$1$",
                "$2$",
                "$3$",
                "$4$"
              ],
              "correctIndex": 1,
              "solution": "Let terms be $a-3d, a-d, a+d, a+3d$. Notice the common diff here is $2d$.\nSum $= 4a = 20 \\implies a = 5$.\nSum of squares $= (a-3d)^2 + (a-d)^2 + (a+d)^2 + (a+3d)^2 = 120$.\nExpands to $4a^2 + 20d^2 = 120$.\nSub $a=5$: $4(25) + 20d^2 = 120 \\implies 100 + 20d^2 = 120 \\implies 20d^2 = 20 \\implies d^2 = 1 \\implies d = 1$.\nWait! The formula uses a step size of $d$, but the actual common difference between $(a-d)$ and $(a-3d)$ is $2d$.\nSo actual common difference $= 2(1) = 2$."
            },
            {
              "id": "q5",
              "text": "The sum of 5 numbers in AP is $30$. The sum of the first and fifth term is equal to:",
              "options": [
                "$10$",
                "$12$",
                "$15$",
                "$18$"
              ],
              "correctIndex": 1,
              "solution": "Let terms be $(a-2d), (a-d), a, (a+d), (a+2d)$.\nSum $= 5a = 30 \\implies a = 6$.\nThe first term is $(a-2d)$ and fifth is $(a+2d)$.\nSum of first and fifth $= (a-2d) + (a+2d) = 2a$.\n$2a = 2(6) = 12$."
            },
            {
              "id": "q6",
              "text": "Five parts of 100 are in AP such that the middle part is 20. If the product of the first and fifth parts is 336, find the common difference.",
              "options": [
                "$2$",
                "$4$",
                "$6$",
                "$8$"
              ],
              "correctIndex": 1,
              "solution": "5 terms in AP: $(a-2d), (a-d), a, (a+d), (a+2d)$.\nSum $= 5a = 100 \\implies a = 20$. This matches the middle part being 20.\nProduct of 1st and 5th $= (a-2d)(a+2d) = a^2 - 4d^2 = 336$.\nSubstitute $a=20$: $400 - 4d^2 = 336$.\n$4d^2 = 64 \\implies d^2 = 16 \\implies d = 4$."
            }
          ]
        }
      ]
    },
    {
      "id": "seq-c9",
      "chapterId": "sequences",
      "title": "Concept 9",
      "subtitle": "Sum of First n Terms of an AP - Summation Formulas and Deductions",
      "difficulty": "Medium",
      "order": 9,
      "formulas": [
        {
          "id": "seq-c9-f1",
          "name": "Sum of First n Terms of an AP ...",
          "expression": {
            "lhs": "Sub-formula 1: $S_n = \\frac{n}{2}[2a + (n-1)d]$ OR $S_n = \\frac{n}{2}[a + l]$ (where $l$ is the last term). Number of terms $n = \\frac{l - a}{d} + 1$.\nSub-formula 2: A sequence is an AP if the sum of its first $n$ terms is of the form $An^2 + Bn$ (a pure quadratic in $n$). Here, common difference $d = 2A$.\nSub-formula 3: Nth term $a_n = S_n - S_{n-1}$.",
            "num": "",
            "den": "",
            "color": "info"
          },
          "explanation": "Symmetric selection of terms in Arithmetic Progression to simplify summation:\n• 3 terms: $a-d, a, a+d$ (sum = $3a$)\n• 4 terms: $a-3d, a-d, a+d, a+3d$ (sum = $4a$)\n• 5 terms: $a-2d, a-d, a, a+d, a+2d$ (sum = $5a$)",
          "mnemonic": "",
          "questions": [
            {
              "id": "q1",
              "text": "Find the sum of all natural numbers between 100 and 200 which are divisible by 3.",
              "options": [
                "$4950$",
                "$5000$",
                "$4851$",
                "$4900$"
              ],
              "correctIndex": 0,
              "solution": "First number $>100$ divisible by 3 is $102$. Last number $<200$ divisible by 3 is $198$.\nThis is an AP: $102, 105, \\dots, 198$ with $a=102, l=198, d=3$.\nFind $n$ using formula: $n = \\frac{l-a}{d} + 1 = \\frac{198-102}{3} + 1 = \\frac{96}{3} + 1 = 32 + 1 = 33$.\nSum $S_{33} = \\frac{n}{2}[a + l] = \\frac{33}{2}[102 + 198] = \\frac{33}{2}[300]$.\n$S_{33} = 33 \\times 150 = 4950$."
            },
            {
              "id": "q2",
              "text": "How many terms of the AP $24, 21, 18, \\dots$ must be taken so that their sum is 78?",
              "options": [
                "$4$ or $13$",
                "$5$ or $12$",
                "$4$ only",
                "$13$ only"
              ],
              "correctIndex": 0,
              "solution": "Given $a=24, d=-3, S_n=78$.\nFormula: $S_n = \\frac{n}{2}[2a + (n-1)d]$.\n$78 = \\frac{n}{2}[48 + (n-1)(-3)]$.\n$156 = n[48 - 3n + 3] = n[51 - 3n] = 51n - 3n^2$.\nRearrange to quadratic: $3n^2 - 51n + 156 = 0$.\nDivide by 3: $n^2 - 17n + 52 = 0$.\nFactorize: $(n-4)(n-13) = 0$. Thus $n = 4$ or $n = 13$. Both are valid (terms from 5th to 13th sum to 0)."
            },
            {
              "id": "q3",
              "text": "The sum of the first $n$ terms of an AP is given by $S_n = 4n^2 - n$. What is the common difference of this AP?",
              "options": [
                "$3$",
                "$4$",
                "$8$",
                "$7$"
              ],
              "correctIndex": 2,
              "solution": "Rule: If $S_n = An^2 + Bn$, it is an AP and the common difference $d = 2A$.\nHere, $A = 4$ and $B = -1$.\nTherefore, $d = 2(4) = 8$."
            },
            {
              "id": "q4",
              "text": "If the sum of $n$ terms of a sequence is $pn^2 + qn$, what is the first term of the sequence?",
              "options": [
                "$p$",
                "$q$",
                "$p+q$",
                "$2p+q$"
              ],
              "correctIndex": 2,
              "solution": "The first term $a_1$ is always equal to the sum of the first 1 term, $S_1$.\nSubstitute $n=1$ into $S_n = pn^2 + qn$.\n$S_1 = p(1)^2 + q(1) = p + q$.\nTherefore, $a_1 = p + q$."
            },
            {
              "id": "q5",
              "text": "The sum of first $n$ terms of a series is given by $S_n = 2n^2 + 3n$. Find the 10th term.",
              "options": [
                "$41$",
                "$43$",
                "$38$",
                "$45$"
              ],
              "correctIndex": 0,
              "solution": "Formula: $a_n = S_n - S_{n-1}$.\nWe need $a_{10} = S_{10} - S_9$.\n$S_{10} = 2(10)^2 + 3(10) = 200 + 30 = 230$.\n$S_9 = 2(9)^2 + 3(9) = 2(81) + 27 = 162 + 27 = 189$.\n$a_{10} = 230 - 189 = 41$.\n(Alternative shortcut using Sub-formula 2: $d=2(2)=4$. $a_1 = S_1 = 5$. $a_{10} = 5 + 9(4) = 41$.)"
            },
            {
              "id": "q6",
              "text": "If $S_n = 3n^2 + 2n$, what is the difference between the 5th and 2nd terms?",
              "options": [
                "$12$",
                "$15$",
                "$18$",
                "$21$"
              ],
              "correctIndex": 2,
              "solution": "We need $a_5 - a_2$.\nFrom quadratic sum property, common diff $d = 2 \\times A = 2 \\times 3 = 6$.\nIn any AP, $a_5 - a_2 = (a + 4d) - (a + d) = 3d$.\nSubstitute $d$: $3(6) = 18$.\n(No need to calculate individual terms!)"
            }
          ]
        }
      ]
    },
    {
      "id": "seq-c10",
      "chapterId": "sequences",
      "title": "Concept 10",
      "subtitle": "Arithmetic Mean (AM) - Inserting Arithmetic Means",
      "difficulty": "Medium",
      "order": 10,
      "formulas": [
        {
          "id": "seq-c10-f1",
          "name": "Arithmetic Mean (AM) - Inserti...",
          "expression": {
            "lhs": "Sub-formula 1: Single AM between $a$ and $b$ is $m = \\frac{a+b}{2}$.\nSub-formula 2: Inserting $n$ AMs between $a$ and $b$: The new sequence has $(n+2)$ terms. The common difference $d = \\frac{b-a}{n+1}$.\nSub-formula 3: Sum of $n$ AMs inserted between $a$ and $b$ is $n \\times \\frac{a+b}{2}$ (which is $n$ times the single AM).",
            "num": "",
            "den": "",
            "color": "info"
          },
          "explanation": "Sum of first $n$ terms of an AP:\n• $S_n = \\frac{n}{2}[2a + (n-1)d] = \\frac{n}{2}[a + l]$\n• If $S_n = An^2 + Bn$, the sequence is an AP with common difference $d = 2A$.\n• The $n$-th term is given by $a_n = S_n - S_{n-1}$.",
          "mnemonic": "",
          "questions": [
            {
              "id": "q1",
              "text": "If the arithmetic mean between two numbers is 15, and the larger number is 24, what is the smaller number?",
              "options": [
                "$6$",
                "$8$",
                "$9$",
                "$12$"
              ],
              "correctIndex": 0,
              "solution": "Let numbers be $a$ and $b$. Assume $b=24$.\nFormula: $m = \\frac{a+b}{2}$.\nSubstitute: $15 = \\frac{a+24}{2}$.\n$30 = a + 24 \\implies a = 6$."
            },
            {
              "id": "q2",
              "text": "The Arithmetic Mean of $3x - 4$ and $5x + 6$ is $13$. Find $x$.",
              "options": [
                "$3$",
                "$4$",
                "$5$",
                "$6$"
              ],
              "correctIndex": 0,
              "solution": "$AM = \\frac{(3x - 4) + (5x + 6)}{2} = 13$.\n$8x + 2 = 26$.\n$8x = 24 \\implies x = 3$."
            },
            {
              "id": "q3",
              "text": "If 4 Arithmetic Means are inserted between $5$ and $30$, what is the common difference of the resulting AP?",
              "options": [
                "$5$",
                "$4$",
                "$6$",
                "$7.5$"
              ],
              "correctIndex": 0,
              "solution": "Given $a=5, b=30$. Number of means $n = 4$.\nFormula for common difference when inserting means: $d = \\frac{b-a}{n+1}$.\nSubstitute: $d = \\frac{30 - 5}{4 + 1} = \\frac{25}{5} = 5$."
            },
            {
              "id": "q4",
              "text": "Five numbers are inserted between $10$ and $46$ to form an AP. What is the 3rd inserted number (i.e., the 3rd AM)?",
              "options": [
                "$22$",
                "$28$",
                "$34$",
                "$40$"
              ],
              "correctIndex": 1,
              "solution": "$a=10, b=46, n=5$.\n$d = \\frac{46 - 10}{5 + 1} = \\frac{36}{6} = 6$.\nThe inserted means are $A_1, A_2, A_3 \\dots$ The 3rd inserted mean $A_3$ corresponds to the 4th term of the entire AP ($a + 3d$).\nFormula for $k^{th}$ mean: $A_k = a + kd$.\n$A_3 = 10 + 3(6) = 10 + 18 = 28$."
            },
            {
              "id": "q5",
              "text": "What is the sum of 10 Arithmetic Means inserted between 12 and 48?",
              "options": [
                "$300$",
                "$600$",
                "$240$",
                "$480$"
              ],
              "correctIndex": 0,
              "solution": "Let $a=12, b=48, n=10$.\nFormula: Sum of $n$ AMs $= n \\times \\frac{a+b}{2}$.\nSubstitute: $10 \\times \\frac{12 + 48}{2} = 10 \\times \\frac{60}{2}$.\n$10 \\times 30 = 300$.\n(Notice how we didn't even need to find the common difference!)"
            },
            {
              "id": "q6",
              "text": "The sum of $n$ Arithmetic Means inserted between 5 and 95 is 1000. Find the value of $n$.",
              "options": [
                "$15$",
                "$20$",
                "$25$",
                "$30$"
              ],
              "correctIndex": 1,
              "solution": "Given Sum $= 1000$, $a=5, b=95$.\nFormula: $n \\times \\frac{a+b}{2} = \\text{Sum}$.\nSubstitute: $n \\times \\frac{5 + 95}{2} = 1000$.\n$n \\times \\frac{100}{2} = 1000 \\implies n \\times 50 = 1000$.\n$n = \\frac{1000}{50} = 20$."
            }
          ]
        }
      ]
    },
    {
      "id": "seq-c11",
      "chapterId": "sequences",
      "title": "Concept 11",
      "subtitle": "Important Results on AP - Term Interchanges and Special Cases",
      "difficulty": "Medium",
      "order": 11,
      "formulas": [
        {
          "id": "seq-c11-f1",
          "name": "Important Results on AP - Term...",
          "expression": {
            "lhs": "Result (i): If $p^{th}$ term is $q$, and $q^{th}$ term is $p$, then $(p+q)^{th}$ term is $0$, and $r^{th}$ term is $p + q - r$.\nResult (ii): If $p \\times a_p = q \\times a_q$, then $a_{p+q} = 0$.\nResult (iii): If $a_p = \\frac{1}{q}$ and $a_q = \\frac{1}{p}$, then $a_{pq} = 1$.",
            "num": "",
            "den": "",
            "color": "info"
          },
          "explanation": "Arithmetic Mean (AM) properties:\n• Single AM: $m = \\frac{a+b}{2}$\n• Inserting $n$ AMs: Common difference $d = \\frac{b-a}{n+1}$\n• Sum of $n$ inserted AMs is equal to $n \\times \\frac{a+b}{2}$",
          "mnemonic": "",
          "questions": [
            {
              "id": "q1",
              "text": "In an AP, if the 7th term is 12, and the 12th term is 7, what is the 19th term?",
              "options": [
                "$19$",
                "$0$",
                "$5$",
                "$-5$"
              ],
              "correctIndex": 1,
              "solution": "Identify the pattern: $a_p = q$ and $a_q = p$. Here $p=7, q=12$.\nRule states $a_{p+q} = 0$.\nWe need the 19th term, which is exactly $p+q$ ($7+12 = 19$).\nTherefore, $a_{19} = 0$."
            },
            {
              "id": "q2",
              "text": "In an AP, the 10th term is 15 and the 15th term is 10. Find the 5th term.",
              "options": [
                "$20$",
                "$25$",
                "$15$",
                "$0$"
              ],
              "correctIndex": 0,
              "solution": "Pattern: $a_p = q, a_q = p$. Here $p=10, q=15$.\nRule states $r^{th}$ term $a_r = p + q - r$.\nWe need 5th term, so $r = 5$.\n$a_5 = 10 + 15 - 5 = 20$."
            },
            {
              "id": "q3",
              "text": "If 8 times the 8th term of an AP is equal to 13 times its 13th term, find the 21st term.",
              "options": [
                "$21$",
                "$8$",
                "$13$",
                "$0$"
              ],
              "correctIndex": 3,
              "solution": "Identify the pattern: $p \\cdot a_p = q \\cdot a_q$.\nHere, $p=8, q=13$.\nRule states $a_{p+q} = 0$.\nWe are asked for $a_{21}$, and $8 + 13 = 21$.\nTherefore, $a_{21} = 0$."
            },
            {
              "id": "q4",
              "text": "If $m$ times the $m^{th}$ term of an AP is equal to $n$ times its $n^{th}$ term (where $m \\neq n$), what is the value of the $(m+n)^{th}$ term?",
              "options": [
                "$m+n$",
                "$m-n$",
                "$0$",
                "$mn$"
              ],
              "correctIndex": 2,
              "solution": "This is the direct theoretical expression of Result (ii).\nGiven $m \\cdot a_m = n \\cdot a_n$.\nBy expanding: $m[a + (m-1)d] = n[a + (n-1)d] \\implies am - an + d(m^2 - m - n^2 + n) = 0$.\n$a(m-n) + d[(m-n)(m+n) - (m-n)] = 0 \\implies (m-n)[a + (m+n-1)d] = 0$.\nSince $m \\neq n$, $a + (m+n-1)d = 0$, which is the formula for the $(m+n)^{th}$ term.\nThus, $a_{m+n} = 0$."
            },
            {
              "id": "q5",
              "text": "If the 4th term of an AP is $\\frac{1}{5}$ and the 5th term is $\\frac{1}{4}$, find the 20th term.",
              "options": [
                "$0$",
                "$1$",
                "$20$",
                "$\\frac{1}{20}$"
              ],
              "correctIndex": 1,
              "solution": "Pattern: $a_p = \\frac{1}{q}$ and $a_q = \\frac{1}{p}$. Here $p=4, q=5$.\nRule states $a_{pq} = 1$.\nWe are asked for the 20th term, which is $p \\times q$ ($4 \\times 5 = 20$).\nTherefore, $a_{20} = 1$."
            },
            {
              "id": "q6",
              "text": "If $a_p = \\frac{1}{q}$ and $a_q = \\frac{1}{p}$, what is the first term $a$ of this AP?",
              "options": [
                "$\\frac{1}{pq}$",
                "$1$",
                "$\\frac{p+q}{pq}$",
                "$0$"
              ],
              "correctIndex": 0,
              "solution": "Given $a + (p-1)d = \\frac{1}{q}$ and $a + (q-1)d = \\frac{1}{p}$.\nSubtract the two: $(p-q)d = \\frac{1}{q} - \\frac{1}{p} = \\frac{p-q}{pq}$.\nThus, $d = \\frac{1}{pq}$.\nSubstitute $d$ in first equation: $a + (p-1)(\\frac{1}{pq}) = \\frac{1}{q}$.\n$a + \\frac{1}{q} - \\frac{1}{pq} = \\frac{1}{q} \\implies a = \\frac{1}{pq}$.\n(Bonus fact: In this specific AP, both the first term $a$ and common difference $d$ equal $\\frac{1}{pq}$.)"
            }
          ]
        }
      ]
    },
    {
      "id": "seq-c12",
      "chapterId": "sequences",
      "title": "Concept 12",
      "subtitle": "Special Sum Interchanges and Reciprocal APs - Special Sum Interchanges and Reciprocal APs",
      "difficulty": "Medium",
      "order": 12,
      "formulas": [
        {
          "id": "seq-c12-f1",
          "name": "Special Sum Interchanges and R...",
          "expression": {
            "lhs": "Result (iv): If $S_p = q$ and $S_q = p$, then $S_{p+q} = -(p+q)$.\nResult (v): If $S_p = S_q$, then $S_{p+q} = 0$.\nResult (vi): If $a^2, b^2, c^2$ are in AP $\\implies \\frac{1}{b+c}, \\frac{1}{c+a}, \\frac{1}{a+b}$ are in AP and $\\frac{a}{b+c}, \\frac{b}{c+a}, \\frac{c}{a+b}$ are in AP.\nResult (vii): If $a_1, a_2 \\dots a_n$ are in AP, then $\\frac{1}{a_1a_2} + \\frac{1}{a_2a_3} + \\dots + \\frac{1}{a_{n-1}a_n} = \\frac{n-1}{a_1a_n}$.",
            "num": "",
            "den": "",
            "color": "info"
          },
          "explanation": "Special properties of Arithmetic Progressions:\n• If $a_p = q$ and $a_q = p$, then $a_{p+q} = 0$ and $a_r = p + q - r$.\n• If $p \\cdot a_p = q \\cdot a_q$, then $a_{p+q} = 0$.\n• If $a_p = \\frac{1}{q}$ and $a_q = \\frac{1}{p}$, then $a_{pq} = 1$ and $a_1 = d = \\frac{1}{pq}$.",
          "mnemonic": "",
          "questions": [
            {
              "id": "q1",
              "text": "If the sum of the first 8 terms of an AP is 15, and the sum of the first 15 terms is 8, find the sum of the first 23 terms.",
              "options": [
                "$23$",
                "$-23$",
                "$0$",
                "$7$"
              ],
              "correctIndex": 1,
              "solution": "Pattern: $S_p = q, S_q = p$. Here $p=8, q=15$.\nRule states $S_{p+q} = -(p+q)$.\nWe need $S_{23}$, and $8 + 15 = 23$.\n$S_{23} = -23$."
            },
            {
              "id": "q2",
              "text": "If the sum of the first 12 terms of an AP is equal to the sum of the first 18 terms, what is the sum of the first 30 terms?",
              "options": [
                "$30$",
                "$6$",
                "$0$",
                "Cannot be determined"
              ],
              "correctIndex": 2,
              "solution": "Pattern: $S_p = S_q$. Here $p=12, q=18$.\nRule states $S_{p+q} = 0$.\nWe need $S_{30}$, and $12 + 18 = 30$.\nTherefore, $S_{30} = 0$."
            },
            {
              "id": "q3",
              "text": "If $1, 25, 49$ are three terms in an Arithmetic Progression, which of the following sequences must also be in Arithmetic Progression?",
              "options": [
                "$\\frac{1}{12}, \\frac{1}{8}, \\frac{1}{6}$",
                "$\\frac{1}{13}, \\frac{1}{9}, \\frac{1}{5}$",
                "$\\frac{1}{6}, \\frac{1}{8}, \\frac{1}{12}$",
                "$\\frac{1}{5}, \\frac{1}{9}, \\frac{1}{13}$"
              ],
              "correctIndex": 0,
              "solution": "Observe the terms $1, 25, 49$. These are $1^2, 5^2, 7^2$.\nSo $a^2 = 1, b^2 = 25, c^2 = 49$. This means $a=1, b=5, c=7$.\nRule states if $a^2, b^2, c^2$ in AP, then $\\frac{1}{b+c}, \\frac{1}{c+a}, \\frac{1}{a+b}$ are in AP.\nCalculate terms: $\\frac{1}{5+7}, \\frac{1}{7+1}, \\frac{1}{1+5}$.\nThis is $\\frac{1}{12}, \\frac{1}{8}, \\frac{1}{6}$."
            },
            {
              "id": "q4",
              "text": "If $\\frac{a}{b+c}, \\frac{b}{c+a}, \\frac{c}{a+b}$ are in AP, which of the following is true?",
              "options": [
                "$a, b, c$ are in AP",
                "$a^2, b^2, c^2$ are in AP",
                "$\\sqrt{a}, \\sqrt{b}, \\sqrt{c}$ are in AP",
                "$\\frac{1}{a}, \\frac{1}{b}, \\frac{1}{c}$ are in AP"
              ],
              "correctIndex": 1,
              "solution": "This is the exact definition of Result (vi).\nTo prove it manually: add $1$ to each term. $\\frac{a}{b+c}+1 = \\frac{a+b+c}{b+c}$.\nSequence becomes $\\frac{a+b+c}{b+c}, \\frac{a+b+c}{c+a}, \\frac{a+b+c}{a+b}$ in AP.\nDivide by $a+b+c$: $\\frac{1}{b+c}, \\frac{1}{c+a}, \\frac{1}{a+b}$ in AP.\nThis condition mathematically leads to $a^2, b^2, c^2$ being in AP."
            },
            {
              "id": "q5",
              "text": "If $a_1, a_2, \\dots a_n$ are in AP with common difference $d$, what is the sum of $\\frac{1}{a_1a_2} + \\frac{1}{a_2a_3} + \\dots + \\frac{1}{a_9a_{10}}$?",
              "options": [
                "$\\frac{9}{a_1a_{10}}$",
                "$\\frac{10}{a_1a_{10}}$",
                "$\\frac{9d}{a_1a_{10}}$",
                "$\\frac{1}{a_1a_{10}}$"
              ],
              "correctIndex": 0,
              "solution": "Formula: $\\frac{1}{a_1a_2} + \\dots = \\frac{n-1}{a_1a_n}$.\nThe number of terms $n$ in the denominator of the last fraction is $10$.\nSubstitute $n=10$: $\\frac{10-1}{a_1a_{10}} = \\frac{9}{a_1a_{10}}$."
            },
            {
              "id": "q6",
              "text": "Given an AP: $2, 5, 8, 11 \\dots$ Find the value of $\\frac{1}{2 \\times 5} + \\frac{1}{5 \\times 8} + \\frac{1}{8 \\times 11} + \\frac{1}{11 \\times 14}$.",
              "options": [
                "$\\frac{1}{7}$",
                "$\\frac{2}{7}$",
                "$\\frac{3}{14}$",
                "$\\frac{5}{28}$"
              ],
              "correctIndex": 0,
              "solution": "Here $a_1 = 2, a_2 = 5, a_3 = 8, a_4 = 11, a_5 = 14$.\nThe sequence of fractions ends at $\\frac{1}{a_4a_5}$. So total $n$ in the formula is $5$.\nFormula: $\\frac{n-1}{a_1a_n} = \\frac{5-1}{a_1a_5}$.\n$a_1 = 2$, $a_5 = 14$.\n$\\frac{4}{2 \\times 14} = \\frac{4}{28} = \\frac{1}{7}$.\n(Verification via Telescoping formula: Diff = 3. $\\frac{1}{3}(\\frac{1}{2} - \\frac{1}{14}) = \\frac{1}{3}(\\frac{6}{14}) = \\frac{2}{14} = \\frac{1}{7}$. Both methods perfectly yield the same result)."
            }
          ]
        }
      ]
    },
    {
      "id": "seq-c13",
      "chapterId": "sequences",
      "title": "Concept 13",
      "subtitle": "Geometric Progression (GP) - General Term of a GP",
      "difficulty": "Medium",
      "order": 13,
      "formulas": [
        {
          "id": "seq-c13-f1",
          "name": "Geometric Progression (GP) - G...",
          "expression": {
            "lhs": "Sub-formula 1: A sequence is a GP if the ratio of any term to its preceding term is constant (Common Ratio $r = \\frac{a_{n+1}}{a_n}$).\nSub-formula 2: The $n^{th}$ Term (General Term) of a GP is $a_n = ar^{n-1}$ (where $a$ is the first term, $r$ is common ratio).\nSub-formula 3: General format of GP sequence: $a, ar, ar^2, ar^3, \\dots, ar^{n-1}, \\dots, l$.",
            "num": "",
            "den": "",
            "color": "info"
          },
          "explanation": "Sum relations and reciprocal properties in AP:\n• If $S_p = q$ and $S_q = p$, then $S_{p+q} = -(p+q)$.\n• If $S_p = S_q$, then $S_{p+q} = 0$.\n• If $a_1 \\dots a_n$ are in AP, the sum of adjacent reciprocal products is $\\frac{n-1}{a_1 a_n}$.",
          "mnemonic": "",
          "questions": [
            {
              "id": "q1",
              "text": "Which of the following sequences represents a valid Geometric Progression?",
              "options": [
                "$2, 4, 6, 8, \\dots$",
                "$3, 9, 18, 36, \\dots$",
                "$4, -8, 16, -32, \\dots$",
                "$1, 4, 9, 16, \\dots$"
              ],
              "correctIndex": 2,
              "solution": "A GP must have a constant ratio $r = \\frac{a_2}{a_1} = \\frac{a_3}{a_2}$.\nOption A: $4/2 = 2$, but $6/4 = 1.5$. (This is an AP).\nOption B: $9/3 = 3$, but $18/9 = 2$.\nOption C: $-8/4 = -2$, and $16/-8 = -2$, and $-32/16 = -2$. Ratio is constant.\nOption D: Squares, not a constant multiplier."
            },
            {
              "id": "q2",
              "text": "In a GP, the first term is $3$ and the common ratio is $2$. What is the 6th term?",
              "options": [
                "$192$",
                "$96$",
                "$48$",
                "$384$"
              ],
              "correctIndex": 1,
              "solution": "Given $a = 3$, $r = 2$, $n = 6$.\nFormula: $a_n = ar^{n-1}$.\nSubstitute: $a_6 = 3(2^{6-1})$.\n$a_6 = 3(2^5) = 3(32)$.\nCalculate: $3 \\times 32 = 96$."
            },
            {
              "id": "q3",
              "text": "The 3rd term of a GP is $12$ and the 6th term is $96$. What is the first term $a$?",
              "options": [
                "$2$",
                "$3$",
                "$4$",
                "$6$"
              ],
              "correctIndex": 1,
              "solution": "Using formula $a_n = ar^{n-1}$:\n$a_3 = ar^2 = 12$  --- (Eq 1)\n$a_6 = ar^5 = 96$  --- (Eq 2)\nDivide Eq 2 by Eq 1:\n$\\frac{ar^5}{ar^2} = \\frac{96}{12}$\n$r^3 = 8 \\implies r = 2$.\nSubstitute $r=2$ into Eq 1:\n$a(2^2) = 12 \\implies 4a = 12 \\implies a = 3$."
            }
          ]
        }
      ]
    }
  ]
};
