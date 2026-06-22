import { Chapter } from './data';
export const sequencesChapter: Chapter = {
  "id": "sequences",
  "title": "Sequences and Series",
  "tagline": "Mastering AP, GP, and Special Series",
  "color": "algebra",
  "totalConcepts": 14,
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
            "lhs": "Sequence: Numbers in a defined order.\nProgression: Follows a strict mathematical pattern.\nSeries: Sum of sequence terms ($a_1 + a_2 + \\dots$).",
            "num": "",
            "den": "",
            "color": "info"
          },
          "explanation": "While SSC CGL rarely asks for direct definitions, understanding the terminology is crucial for interpreting word problems. Knowing whether a question asks for a \"term in a progression\" or the \"sum of a series\" determines your entire approach.",
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
              "correctIndex": 2
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
              "correctIndex": 1
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
              "correctIndex": 1
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
            "lhs": "For a mixed fraction of the form $N \\frac{N-d}{N} \\times N$ (where $N$ = $k$ digits of 9):\n\nStep 1: Write the multiplier ($N$)\nStep 2: Attach as many zeroes as there are 9's in the whole number\nStep 3: Subtract the difference ($d$) between denominator and numerator",
            "num": "",
            "den": "",
            "color": "info"
          },
          "explanation": "This is a high-frequency SSC CGL time-saver. When you see $999 \\frac{991}{999} \\times 999$, expanding it traditionally as $(\\frac{999 \\times 999 + 991}{999}) \\times 999$ wastes precious minutes. Use this trick to solve it in 5 seconds.",
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
              "correctIndex": 1
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
              "correctIndex": 0
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
              "correctIndex": 0
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
            "lhs": "For a series $\\frac{1}{a \\times b} + \\frac{1}{b \\times c} + \\dots + \\frac{1}{y \\times z}$ where $b-a = c-b = d$:\n\nSum $= \\frac{1}{d} \\left[ \\frac{1}{\\text{1st}} - \\frac{1}{\\text{Last}} \\right]$",
            "num": "",
            "den": "",
            "color": "info"
          },
          "explanation": "When you see fractions with consecutive products in the denominator (e.g., $5 \\times 6, 6 \\times 7$), they cancel each other out (telescope). Use this formula to jump straight to the answer without manual LCM calculations.",
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
              "correctIndex": 1
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
              "correctIndex": 0
            }
          ]
        },
        {
          "id": "seq-c3-f1",
          "name": "Special Series - Telescoping F...",
          "expression": {
            "lhs": "For a series $\\frac{1}{a \\times b \\times c} + \\frac{1}{b \\times c \\times d} + \\dots + \\frac{1}{x \\times y \\times z}$:\n\nSum $= \\frac{1}{\\text{Diff of 1st \\& 3rd}} \\left[ \\frac{1}{\\text{1st two}} - \\frac{1}{\\text{Last two}} \\right]$",
            "num": "",
            "den": "",
            "color": "info"
          },
          "explanation": "An advanced Tier-2 CGL concept. Instead of splitting into partial fractions, look at the difference between the extreme factors in a single denominator block. Group the first two factors and last two factors respectively.",
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
              "correctIndex": 0
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
              "correctIndex": 2
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
          "explanation": "This specific progression is neither pure AP nor pure GP. These direct formulas are lifesavers for SSC Mains to avoid converting to GP manually ($10-1 + 10^2-1 \\dots$).",
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
              "correctIndex": 0
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
              "correctIndex": 0
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
              "correctIndex": 0
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
              "correctIndex": 1
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
          "explanation": "Number system fundamentals. The rule is: The numerator is the entire number minus the non-recurring part. The denominator consists of as many $9$s as there are recurring digits, followed by as many $0$s as there are non-recurring digits after the decimal point.",
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
              "correctIndex": 0
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
              "correctIndex": 0
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
              "correctIndex": 2
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
              "correctIndex": 1
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
          "explanation": "These are the foundational blocks of AP. Use the end-term formula directly instead of reversing the whole series. The equidistant property (Sub-formula 3) solves complex \"find the sum of specific terms\" questions instantly without finding $a$ or $d$.",
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
              "correctIndex": 1
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
              "correctIndex": 1
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
              "correctIndex": 1
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
              "correctIndex": 0
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
              "correctIndex": 1
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
              "correctIndex": 0
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
          "explanation": "Sub-formula 1 saves time when questions state \"every term is multiplied by 5\". Sub-formula 2 is the fastest test to check if unknown variables form an AP. Sub-formula 3 allows you to find the common difference instantly without calculating $a_1$ and $a_2$ and subtracting them.",
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
              "correctIndex": 0
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
              "correctIndex": 1
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
              "correctIndex": 0
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
              "correctIndex": 0
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
              "correctIndex": 1
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
              "correctIndex": 3
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
          "explanation": "Whenever a question gives the sum of an odd/even number of AP terms, DO NOT use $a, a+d, a+2d$. By using these specific symmetric selections, the $d$ terms perfectly cancel out when summing, letting you instantly find the value of $a$.",
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
              "correctIndex": 0
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
              "correctIndex": 1
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
              "correctIndex": 0
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
              "correctIndex": 1
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
              "correctIndex": 1
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
              "correctIndex": 1
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
          "explanation": "Sub-formula 1 is standard. Sub-formula 2 is a massive shortcut: if given $S_n = 3n^2 + 5n$, the common difference is instantly $2 \\times 3 = 6$. Sub-formula 3 is used when you are only given the sum function and need a specific term.",
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
              "correctIndex": 0
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
              "correctIndex": 0
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
              "correctIndex": 2
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
              "correctIndex": 2
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
              "correctIndex": 0
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
              "correctIndex": 2
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
          "explanation": "",
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
              "correctIndex": 0
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
              "correctIndex": 0
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
              "correctIndex": 0
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
              "correctIndex": 1
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
              "correctIndex": 0
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
              "correctIndex": 1
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
          "explanation": "These are pure magic for SSC CGL Tier 2. Standard methods involve solving two linear equations for $a$ and $d$, taking 2-3 minutes. These rules give you the answer in 2 seconds.",
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
              "correctIndex": 1
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
              "correctIndex": 0
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
              "correctIndex": 3
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
              "correctIndex": 2
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
              "correctIndex": 1
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
              "correctIndex": 0
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
          "explanation": "Results iv and v are instant checks for Tier 2 sum questions. Result vii is actually an application of telescoping series (Concept 3) applied strictly to an AP. The common difference here sits in the numerator when solving.",
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
              "correctIndex": 1
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
              "correctIndex": 2
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
              "correctIndex": 0
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
              "correctIndex": 1
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
              "correctIndex": 0
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
              "correctIndex": 0
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
          "explanation": "AP relies on addition; GP relies on multiplication. Use these formulas for population growth, compound interest structure problems, or any sequence scaling by a factor.",
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
              "correctIndex": 2
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
              "correctIndex": 1
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
              "correctIndex": 1
            }
          ]
        }
      ]
    }
  ]
};