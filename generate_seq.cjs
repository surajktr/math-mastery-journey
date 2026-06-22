const fs = require('fs');

const raw = `Topic Name: Sequences and Series Basics
Concept / Formula 1: Definitions of Sequence, Progression, and Series
Formula / Rule:
Sequence: An arrangement of numbers in a definite order according to a rule.
Progression: A sequence whose terms follow a certain distinct mathematical pattern.
Series: The sum of the terms of a sequence ($a_1 + a_2 + a_3 + \\dots$). It can be a finite series (countable terms) or an infinite series (endless terms).
Concept / When to Use:
While SSC CGL rarely asks for direct definitions, understanding the terminology is crucial for interpreting word problems. Knowing whether a question asks for a "term in a progression" or the "sum of a series" determines your entire approach.
Question 1
Which of the following mathematical constructs specifically represents a "Finite Series" according to standard algebraic definitions?
A) $2, 4, 6, 8, 10, \\dots$
B) $1 + 3 + 5 + 7 + \\dots$
C) $5 + 10 + 15 + 20 + 25$
D) $1, 4, 9, 16, 25$
Step-by-step solution with full logic:
A series must be the sum of sequence terms, eliminating options A and D (which are sequences separated by commas).
A finite series must have a terminating end, meaning a countable number of terms.
Option B is an infinite series because of the "$\\dots$" at the end.
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
Form the series (sum of terms): $2 + 5 + 10$.
Calculate the sum: $17$.
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
Topic Name: Special Series Tricks
Concept / Formula 2: Multiplier with Same Denominator
Formula / Rule:
For a mixed fraction expression of the form $N \\frac{N - d}{N} \\times N$ (where $N$ consists of $k$ digits of $9$):
$$\\text{Step 1: Write the multiplier } (N)$$
$$\\text{Step 2: Attach as many zeroes as there are } 9\\text{'s in the first whole number.}$$
$$\\text{Step 3: Subtract the difference } (d) \\text{ between the denominator and numerator.}$$
Concept / When to Use:
This is a high-frequency SSC CGL time-saver. When you see $999 \\frac{991}{999} \\times 999$, expanding it traditionally as $(\\frac{999 \\times 999 + 991}{999}) \\times 999$ wastes precious minutes. Use this trick to solve it in 5 seconds.
Question 1
Find the exact value of $999 \\frac{987}{999} \\times 999$.
A) $998998$
B) $998988$
C) $999988$
D) $998992$
Step-by-step solution with full logic:
Identify the pattern: Multiplier is $999$. Whole number is $999$ (three $9$s). Denominator = Multiplier.
Step 1: Base number = $999$.
Step 2: Add three zeroes (since whole number is $999$) $\\rightarrow 999000$.
Step 3: Find difference between Denom and Num: $999 - 987 = 12$.
Step 4: Subtract difference: $999000 - 12 = 998988$.
**** B) $998988$
Question 2
Solve for the value of $99 \\frac{95}{99} \\times 99$.
A) $9896$
B) $9895$
C) $9904$
D) $9801$
Step-by-step solution with full logic:
Multiplier is $99$. Whole number is $99$ (two $9$s).
Base number with zeroes attached = $9900$.
Difference between Denom and Num: $99 - 95 = 4$.
Final calculation: $9900 - 4 = 9896$.
**** A) $9896$
Question 3
Evaluate the expression: $9999 \\frac{9991}{9999} \\times 9999 + 8$.
A) $99990000$
B) $99989992$
C) $99980000$
D) $99999992$
Step-by-step solution with full logic:
Apply the trick to the main term: $9999 \\frac{9991}{9999} \\times 9999$.
Multiplier is $9999$. Whole number has four $9$s $\\rightarrow 99990000$.
Difference = $9999 - 9991 = 8$.
Term value = $99990000 - 8$.
The full expression adds $8$ back: $(99990000 - 8) + 8 = 99990000$.
**** A) $99990000$
Topic Name: Special Series - Telescoping Fractions
Concept / Formula 3: Two-Factor Denominator Telescoping Series
Formula / Rule:
For a series $\\frac{1}{a \\times b} + \\frac{1}{b \\times c} + \\dots + \\frac{1}{y \\times z}$ where $b-a = c-b = \\text{common difference } (d)$:
$$\\text{Sum} = \\frac{1}{d} \\left[ \\frac{1}{\\text{First term of 1st den}} - \\frac{1}{\\text{Last term of last den}} \\right]$$
Concept / When to Use:
When you see fractions with consecutive products in the denominator (e.g., $5 \\times 6, 6 \\times 7$), they cancel each other out (telescope). Use this formula to jump straight to the answer without manual LCM calculations.
Question 1
Find the sum of the series: $\\frac{1}{3 \\times 5} + \\frac{1}{5 \\times 7} + \\frac{1}{7 \\times 9} + \\dots + \\frac{1}{21 \\times 23}$.
A) $\\frac{20}{69}$
B) $\\frac{10}{69}$
C) $\\frac{2}{23}$
D) $\\frac{5}{69}$
Step-by-step solution with full logic:
Identify common difference $d$ between factors: $5-3 = 2$, $7-5 = 2$. So, $d = 2$.
Identify first term of first denominator: $3$.
Identify last term of last denominator: $23$.
Apply formula: $\\text{Sum} = \\frac{1}{2} \\left[ \\frac{1}{3} - \\frac{1}{23} \\right]$.
Calculate: $\\frac{1}{2} \\left[ \\frac{23 - 3}{69} \\right] = \\frac{1}{2} \\left[ \\frac{20}{69} \\right] = \\frac{10}{69}$.
**** B) $\\frac{10}{69}$
Question 2
What is the value of $\\frac{1}{2 \\times 5} + \\frac{1}{5 \\times 8} + \\frac{1}{8 \\times 11} + \\dots + \\frac{1}{29 \\times 32}$?
A) $\\frac{5}{32}$
B) $\\frac{15}{64}$
C) $\\frac{15}{32}$
D) $\\frac{5}{64}$
Step-by-step solution with full logic:
Common difference $d = 5-2 = 3$.
First term of den $= 2$, Last term of den $= 32$.
Apply formula: $\\text{Sum} = \\frac{1}{3} \\left[ \\frac{1}{2} - \\frac{1}{32} \\right]$.
Calculate bracket: $\\frac{16}{32} - \\frac{1}{32} = \\frac{15}{32}$.
Final calculation: $\\frac{1}{3} \\times \\frac{15}{32} = \\frac{5}{32}$.
**** A) $\\frac{5}{32}$
Concept / Formula 4: Three-Factor Denominator Telescoping Series
Formula / Rule:
For a series $\\frac{1}{a \\times b \\times c} + \\frac{1}{b \\times c \\times d} + \\dots + \\frac{1}{x \\times y \\times z}$:
$$\\text{Sum} = \\frac{1}{\\text{Diff of 1st \\& 3rd no. in den}} \\left[ \\frac{1}{\\text{1st two no. of den}} - \\frac{1}{\\text{Last two no. of den}} \\right]$$
Concept / When to Use:
An advanced Tier-2 CGL concept. Instead of splitting into partial fractions, look at the difference between the extreme factors in a single denominator block. Group the first two factors and last two factors respectively.
Question 3
Find the sum of: $\\frac{1}{2 \\times 5 \\times 8} + \\frac{1}{5 \\times 8 \\times 11} + \\frac{1}{8 \\times 11 \\times 14} + \\frac{1}{11 \\times 14 \\times 17}$.
A) $\\frac{19}{1190}$
B) $\\frac{11}{1190}$
C) $\\frac{17}{1190}$
D) $\\frac{23}{1190}$
Step-by-step solution with full logic:
Diff of 1st & 3rd no. in denom (e.g., in $2 \\times 5 \\times 8$, diff is $8 - 2 = 6$).
Identify 1st two numbers of first denom: $2 \\times 5 = 10$.
Identify last two numbers of last denom: $14 \\times 17 = 238$.
Formula: $\\text{Sum} = \\frac{1}{6} \\left[ \\frac{1}{10} - \\frac{1}{238} \\right]$.
LCM of $10$ and $238$. $10 = 2 \\times 5$, $238 = 2 \\times 119$. LCM $= 1190$.
Bracket: $\\frac{119 - 5}{1190} = \\frac{114}{1190}$.
Final sum: $\\frac{1}{6} \\times \\frac{114}{1190} = \\frac{19}{1190}$. Wait, let me recheck the options.
Let's recalculate LCM of $10$ and $238$: $1190$. $\\frac{119}{1190} - \\frac{5}{1190} = \\frac{114}{1190}$. Then $\\frac{1}{6} \\times \\frac{114}{1190} = \\frac{19}{1190}$. My options list has $2720$ or $1360$. Let me adjust the options to ensure mathematical soundness perfectly. Option C will be $\\frac{19}{1190}$. Let's rewrite the correct option clearly. Let's trace it: $\\frac{19}{1190}$.
Let me use an option block that fits:
A) $\\frac{19}{1190}$
B) $\\frac{11}{1190}$
C) $\\frac{17}{1190}$
D) $\\frac{23}{1190}$
**** A) $\\frac{19}{1190}$
Question 4
Evaluate: $\\frac{1}{1 \\times 3 \\times 5} + \\frac{1}{3 \\times 5 \\times 7} + \\frac{1}{5 \\times 7 \\times 9} + \\frac{1}{7 \\times 9 \\times 11}$.
A) $\\frac{16}{99}$
B) $\\frac{16}{297}$
C) $\\frac{8}{99}$
D) $\\frac{4}{99}$
Step-by-step solution with full logic:
Diff of 1st & 3rd no. in denom: $5 - 1 = 4$.
1st two numbers of 1st denom: $1 \\times 3 = 3$.
Last two numbers of last denom: $9 \\times 11 = 99$.
Formula: $\\text{Sum} = \\frac{1}{4} \\left[ \\frac{1}{3} - \\frac{1}{99} \\right]$.
Bracket calculation: $\\frac{33 - 1}{99} = \\frac{32}{99}$.
Final sum: $\\frac{1}{4} \\times \\frac{32}{99} = \\frac{8}{99}$.
**** C) $\\frac{8}{99}$
Topic Name: Repetitive Series Concepts
Concept / Formula 5: Sum of Repeated 9s and 1s
Formula / Rule:
Sub-formula 1: Sum of $n$ terms of $9 + 99 + 999 + \\dots = \\frac{10(10^n - 1) - 9n}{9}$
Sub-formula 2: Sum of $n$ terms of $1 + 11 + 111 + \\dots = \\frac{10(10^n - 1) - 9n}{81}$
Concept / When to Use:
This specific progression is neither pure AP nor pure GP. These direct formulas are lifesavers for SSC Mains to avoid converting to GP manually ($10-1 + 10^2-1 \\dots$).
Question 1 (Sub-formula 1)
What is the sum of the first 5 terms of the series $9 + 99 + 999 + \\dots$?
A) $111105$
B) $111115$
C) $111101$
D) $111111$
Step-by-step solution with full logic:
Apply Sub-formula 1: $S_n = \\frac{10(10^n - 1) - 9n}{9}$. Here $n = 5$.
Substitute $n$: $S_5 = \\frac{10(10^5 - 1) - 9(5)}{9}$.
Calculate: $\\frac{10(99999) - 45}{9}$.
Simplify: $\\frac{999990 - 45}{9} = \\frac{999945}{9}$.
Divide: $111105$. (Alternatively, add manually to verify: $9 + 99 + 999 + 9999 + 99999 = 111105$).
**** A) $111105$
Question 2 (Sub-formula 1)
If the sum of $n$ terms of the series $9 + 99 + 999 + \\dots$ is given by $\\frac{10^{x+1} - yx - 10}{9}$, what are the values of $x$ and $y$?
A) $x = n, y = 9$
B) $x = 10, y = n$
C) $x = n, y = 10$
D) $x = 9, y = n$
Step-by-step solution with full logic:
We know the standard formula is $\\frac{10(10^n - 1) - 9n}{9}$.
Expand the standard formula: $\\frac{10^{n+1} - 10 - 9n}{9}$.
Compare with the given expression: $\\frac{10^{x+1} - yx - 10}{9}$.
By comparing terms, $x+1 = n+1 \\implies x = n$.
The middle term is $-yx$ and in the formula it is $-9n$. Since $x=n$, then $y = 9$.
**** A) $x = n, y = 9$
Question 3 (Sub-formula 2)
Find the sum of the first 4 terms of the series $1 + 11 + 111 + 1111$.
A) $1234$
B) $1230$
C) $1236$
D) $1240$
Step-by-step solution with full logic:
Use Sub-formula 2: $S_n = \\frac{10(10^n - 1) - 9n}{81}$. Here $n = 4$.
$S_4 = \\frac{10(10^4 - 1) - 9(4)}{81}$.
$S_4 = \\frac{10(9999) - 36}{81} = \\frac{99990 - 36}{81}$.
$S_4 = \\frac{99954}{81} = 1234$. (Manual verification: $1+11+111+1111 = 1234$).
**** A) $1234$
Question 4 (Sub-formula 2)
What is the sum of $n$ terms of the series $3 + 33 + 333 + \\dots$?
A) $\\frac{10(10^n - 1) - 9n}{9}$
B) $\\frac{10(10^n - 1) - 9n}{27}$
C) $\\frac{10(10^n - 1) - 9n}{81}$
D) $\\frac{30(10^n - 1) - 9n}{81}$
Step-by-step solution with full logic:
The series is $3(1 + 11 + 111 + \\dots)$.
We know the sum of $(1 + 11 + 111 + \\dots)$ is $\\frac{10(10^n - 1) - 9n}{81}$.
Multiply this result by $3$: $3 \\times \\left( \\frac{10(10^n - 1) - 9n}{81} \\right)$.
Simplify: $\\frac{10(10^n - 1) - 9n}{27}$.
**** B) $\\frac{10(10^n - 1) - 9n}{27}$
Topic Name: Bar Based Concepts (Recurring Decimals)
Concept / Formula 6: Converting Recurring Decimals to Fractions
Formula / Rule:
Sub-formula 1: $0.\\bar{p} = \\frac{p}{9}$
Sub-formula 2: $0.\\overline{pq} = \\frac{pq}{99}$
Sub-formula 3: $0.p\\overline{qr} = \\frac{pqr - p}{990}$
Sub-formula 4: $0.\\overline{pqr} = \\frac{pqr}{999}$
Concept / When to Use:
Number system fundamentals. The rule is: The numerator is the entire number minus the non-recurring part. The denominator consists of as many $9$s as there are recurring digits, followed by as many $0$s as there are non-recurring digits after the decimal point.
Question 1 (Sub-formulas 1 & 2)
Calculate the exact sum: $0.\\bar{4} + 0.\\overline{32}$.
A) $\\frac{76}{99}$
B) $\\frac{68}{99}$
C) $\\frac{36}{99}$
D) $\\frac{72}{99}$
Step-by-step solution with full logic:
Convert $0.\\bar{4}$ to fraction using Sub-formula 1: $\\frac{4}{9}$.
Convert $0.\\overline{32}$ to fraction using Sub-formula 2: $\\frac{32}{99}$.
Add fractions: $\\frac{4}{9} + \\frac{32}{99}$.
Find LCM of $9$ and $99$ which is $99$.
Convert: $\\frac{44}{99} + \\frac{32}{99} = \\frac{76}{99}$.
**** A) $\\frac{76}{99}$
Question 2 (Sub-formulas 1 & 2)
What is the difference between $0.\\overline{81}$ and $0.\\bar{2}$?
A) $\\frac{59}{99}$
B) $\\frac{61}{99}$
C) $\\frac{19}{33}$
D) $\\frac{20}{33}$
Step-by-step solution with full logic:
$0.\\overline{81} = \\frac{81}{99}$.
$0.\\bar{2} = \\frac{2}{9} = \\frac{22}{99}$.
Subtract: $\\frac{81}{99} - \\frac{22}{99} = \\frac{59}{99}$.
**** A) $\\frac{59}{99}$
Question 3 (Sub-formulas 3 & 4)
Convert the recurring decimal $0.2\\overline{45}$ into its simplest fractional form.
A) $\\frac{243}{990}$
B) $\\frac{245}{990}$
C) $\\frac{27}{110}$
D) $\\frac{29}{110}$
Step-by-step solution with full logic:
Use Sub-formula 3: $0.p\\overline{qr} = \\frac{pqr - p}{990}$.
Here $p=2$, $q=4$, $r=5$.
Numerator = $245 - 2 = 243$.
Denominator = Two digits have bars (two $9$s), one doesn't (one $0$) $\\rightarrow 990$.
Fraction = $\\frac{243}{990}$.
Simplify by dividing by $9$: $\\frac{27}{110}$.
**** C) $\\frac{27}{110}$
Question 4 (Sub-formulas 3 & 4)
Evaluate $0.\\overline{123} \\times 333$.
A) $37$
B) $41$
C) $45$
D) $123$
Step-by-step solution with full logic:
Use Sub-formula 4: $0.\\overline{pqr} = \\frac{pqr}{999}$.
Here $0.\\overline{123} = \\frac{123}{999}$.
Multiply by $333$: $\\frac{123}{999} \\times 333$.
Simplify $\\frac{333}{999} = \\frac{1}{3}$.
Final calculation: $123 \\times \\frac{1}{3} = 41$.
**** B) $41$
Topic Name: Arithmetic Progression (AP) - Nth Term
Concept / Formula 7: General Term Formulas of an AP
Formula / Rule:
Sub-formula 1: Nth term from the beginning, $a_n = a + (n-1)d$ (where $a$ = first term, $d$ = common difference).
Sub-formula 2: Nth term from the end $= l - (n-1)d$ (where $l$ = last term).
Sub-formula 3: Note: $a_1 + a_n = a_k + a_{n-k+1}$ (Sum of terms equidistant from beginning and end is constant and equal to sum of first and last term).
Concept / When to Use:
These are the foundational blocks of AP. Use the end-term formula directly instead of reversing the whole series. The equidistant property (Sub-formula 3) solves complex "find the sum of specific terms" questions instantly without finding $a$ or $d$.
Question 1 (Sub-formula 1)
In an Arithmetic Progression, the first term is $7$ and the common difference is $-3$. What is the 15th term?
A) $35$
B) $-35$
C) $-38$
D) $-42$
Step-by-step solution with full logic:
Identify given values: $a = 7$, $d = -3$, $n = 15$.
Formula: $a_n = a + (n-1)d$.
Substitute: $a_{15} = 7 + (15-1)(-3)$.
Calculate: $a_{15} = 7 + 14(-3) = 7 - 42 = -35$.
**** B) $-35$
Question 2 (Sub-formula 1)
Which term of the AP $5, 9, 13, 17, \\dots$ is $81$?
A) $19^{th}$
B) $20^{th}$
C) $21^{st}$
D) $22^{nd}$
Step-by-step solution with full logic:
Given: $a = 5$, $d = 9 - 5 = 4$, $a_n = 81$.
Formula: $a_n = a + (n-1)d$.
Substitute: $81 = 5 + (n-1)4$.
Solve: $76 = 4(n-1) \\implies n-1 = 19 \\implies n = 20$.
**** B) $20^{th}$
Question 3 (Sub-formula 2)
Find the 10th term from the end of the AP: $10, 15, 20, \\dots, 135$.
A) $85$
B) $90$
C) $95$
D) $100$
Step-by-step solution with full logic:
Given: AP is $10, 15, \\dots, 135$. Common diff $d = 15 - 10 = 5$. Last term $l = 135$.
We need 10th term from the end, so $n = 10$.
Formula: Term from end $= l - (n-1)d$.
Substitute: $135 - (10-1)5$.
Calculate: $135 - (9 \\times 5) = 135 - 45 = 90$.
**** B) $90$
Question 4 (Sub-formula 2)
The 4th term from the end of an AP is $22$. If the common difference is $-2$, what is the last term of the AP?
A) $16$
B) $14$
C) $28$
D) $30$
Step-by-step solution with full logic:
Given: Term from end $= 22$, $n = 4$, $d = -2$. Let last term be $l$.
Formula: Term from end $= l - (n-1)d$.
Substitute: $22 = l - (4-1)(-2)$.
Solve: $22 = l - 3(-2) \\implies 22 = l + 6$.
Result: $l = 16$.
**** A) $16$
Question 5 (Sub-formula 3)
In an AP of 50 terms, the sum of the first and last term is $120$. What is the sum of the 15th term from the beginning and the 15th term from the end?
A) $60$
B) $120$
C) $240$
D) Cannot be determined
Step-by-step solution with full logic:
Note the property: $a_k (\\text{from start}) + a_k (\\text{from end}) = a + l$.
We are given $a + l = 120$.
We need the sum of $15^{th}$ from start and $15^{th}$ from end.
According to the property, this is exactly equal to $a + l$.
Therefore, the sum is $120$.
**** B) $120$
Question 6 (Sub-formula 3)
For a finite AP having 21 terms, $a_3 + a_{19} = 64$. Find the value of $a_{11}$.
A) $32$
B) $64$
C) $16$
D) $48$
Step-by-step solution with full logic:
Property: $a_k + a_{n-k+1} = a_1 + a_n$.
Here $n=21$. Notice that $k=3 \\implies n-k+1 = 21-3+1 = 19$. Thus $a_3$ and $a_{19}$ are equidistant from the ends.
Their sum $a_3 + a_{19} = 64$.
The middle term of 21 terms is the $\\frac{21+1}{2}^{th}$ term = $11^{th}$ term ($a_{11}$).
The middle term added to itself is also equidistant: $a_{11} + a_{11} = a_3 + a_{19}$.
$2a_{11} = 64 \\implies a_{11} = 32$.
**** A) $32$
Topic Name: Properties of Arithmetic Progression
Concept / Formula 8: Operations on AP, Linear Expression, and AP Test
Formula / Rule:
Sub-formula 1: If a constant $k$ is added/subtracted to each term of an AP, the new sequence is an AP with the same $d$. If multiplied/divided by a non-zero $k$, the new AP has common difference $kd$ or $\\frac{d}{k}$.
Sub-formula 2: If $a, b, c$ (or $a_{n-1}, a_n, a_{n+1}$) are consecutive terms in AP, then $2b = a + c$ (or $2a_n = a_{n-1} + a_{n+1}$).
Sub-formula 3: If the $n^{th}$ term of a sequence is a linear expression in $n$ (i.e., $An + B$), it forms an AP where the common difference $d = A$.
Concept / When to Use:
Sub-formula 1 saves time when questions state "every term is multiplied by 5". Sub-formula 2 is the fastest test to check if unknown variables form an AP. Sub-formula 3 allows you to find the common difference instantly without calculating $a_1$ and $a_2$ and subtracting them.
Question 1 (Sub-formula 1)
An AP has a common difference of $8$. If every term of this AP is multiplied by $3$ and then $5$ is subtracted from each term, what will be the common difference of the newly formed sequence?
A) $24$
B) $19$
C) $8$
D) $3$
Step-by-step solution with full logic:
Original common difference $d = 8$.
Operation 1: Multiply by $3$. The new common difference becomes $d \\times 3 = 8 \\times 3 = 24$.
Operation 2: Subtract $5$. Adding or subtracting a constant does NOT change the common difference of an AP.
Therefore, the common difference remains $24$.
**** A) $24$
Question 2 (Sub-formula 1)
The terms of an AP with common difference $d$ are divided by $-2$. The new common difference is $7$. What is the value of $d$?
A) $14$
B) $-14$
C) $-3.5$
D) $3.5$
Step-by-step solution with full logic:
Rule: When an AP is divided by $k$, the new common diff is $\\frac{d}{k}$.
Here, $k = -2$ and new common difference $= 7$.
Equation: $\\frac{d}{-2} = 7$.
Solve: $d = 7 \\times (-2) = -14$.
**** B) $-14$
Question 3 (Sub-formula 2)
If $3x - 1, 5x + 2$, and $9x - 4$ are three consecutive terms of an Arithmetic Progression, find the value of $x$.
A) $4.5$
B) $4$
C) $5$
D) $2$
Step-by-step solution with full logic:
Condition for 3 terms $a, b, c$ in AP is $2b = a + c$.
Here, $a = 3x - 1$, $b = 5x + 2$, $c = 9x - 4$.
Substitute: $2(5x + 2) = (3x - 1) + (9x - 4)$.
Expand: $10x + 4 = 12x - 5$.
Solve: $4 + 5 = 12x - 10x \\implies 9 = 2x \\implies x = 4.5$.
Wait, let me re-evaluate my options, $4.5$ is not listed. Let me recalculate.
$2(5x+2) = 10x+4$.
$(3x-1) + (9x-4) = 12x-5$.
$10x+4 = 12x-5 \\implies 9 = 2x \\implies x = 4.5$.
Let's adjust the question to match an integer option perfectly. Let $c = 8x - 5$.
Then $a+c = 11x - 6$.
$2b = 10x + 4$.
$10x + 4 = 11x - 6 \\implies x = 10$.
Let me keep the original math but change the correct option to $4.5$ or adjust options. Let's adjust options.
A) $4.5$
B) $4$
C) $5$
D) $2$
**** A) $4.5$
Question 4 (Sub-formula 2)
If $\\log(2), \\log(2^x - 1),$ and $\\log(2^x + 3)$ are in AP, what is the value of $x$?
A) $\\log_2(5)$
B) $2$
C) $\\log_2(3)$
D) $3$
Step-by-step solution with full logic:
If in AP, $2 \\log(2^x - 1) = \\log(2) + \\log(2^x + 3)$.
Use log properties: $\\log((2^x - 1)^2) = \\log(2(2^x + 3))$.
Drop logs: $(2^x - 1)^2 = 2(2^x + 3)$. Let $2^x = y$.
$(y - 1)^2 = 2(y + 3) \\implies y^2 - 2y + 1 = 2y + 6$.
$y^2 - 4y - 5 = 0 \\implies (y - 5)(y + 1) = 0$.
$y = 5$ or $y = -1$. Since $2^x$ must be positive, $y = 5$.
$2^x = 5 \\implies x = \\log_2(5)$.
**** A) $\\log_2(5)$
Question 5 (Sub-formula 3)
The $n^{th}$ term of a sequence is given by the expression $T_n = -7n + 12$. What is the common difference of this progression?
A) $12$
B) $-7$
C) $5$
D) $-5$
Step-by-step solution with full logic:
Recognize the form: $T_n = An + B$. This is a linear expression in $n$.
The property states that the coefficient of $n$ (which is $A$) is exactly the common difference $d$.
Here, $A = -7$. Therefore, $d = -7$.
(Verification: $T_1 = 5, T_2 = -2$. $d = -2 - 5 = -7$).
**** B) $-7$
Question 6 (Sub-formula 3)
If the $n^{th}$ term of an AP is $5n - 3$, what is the sum of the first two terms?
A) $5$
B) $2$
C) $7$
D) $9$
Step-by-step solution with full logic:
$T_n = 5n - 3$.
Find 1st term ($n=1$): $T_1 = 5(1) - 3 = 2$.
Find 2nd term ($n=2$): $T_2 = 5(2) - 3 = 7$. (Notice common diff is $5$).
Sum of first two terms = $2 + 7 = 9$.
**** D) $9$
Topic Name: Selection of Terms in AP
Concept / Formula 9: Selecting Unknown Terms in AP
Formula / Rule:
3 terms: Take as $(a - d), a, (a + d)$. Common diff = $d$.
4 terms: Take as $(a - 3d), (a - d), (a + d), (a + 3d)$. Common diff = $2d$.
5 terms: Take as $(a - 2d), (a - d), a, (a + d), (a + 2d)$. Common diff = $d$.
Concept / When to Use:
Whenever a question gives the sum of an odd/even number of AP terms, DO NOT use $a, a+d, a+2d$. By using these specific symmetric selections, the $d$ terms perfectly cancel out when summing, letting you instantly find the value of $a$.
Question 1 (3 terms)
The sum of three numbers in an AP is $27$ and their product is $504$. What is the smallest of these three numbers?
A) $4$
B) $7$
C) $9$
D) $14$
Step-by-step solution with full logic:
Let the 3 terms be $(a-d), a, (a+d)$.
Sum = $(a-d) + a + (a+d) = 3a$.
$3a = 27 \\implies a = 9$.
Product = $(a-d)(a)(a+d) = a(a^2 - d^2) = 504$.
Substitute $a=9$: $9(81 - d^2) = 504$.
$81 - d^2 = 56 \\implies d^2 = 25 \\implies d = \\pm 5$.
If $d=5$, terms are $4, 9, 14$. Smallest is $4$. (If $d=-5$, terms are $14, 9, 4$, smallest is still $4$).
**** A) $4$
Question 2 (3 terms)
The sum of three angles of a triangle are in AP. If the smallest angle is $40^\\circ$, what is the largest angle?
A) $60^\\circ$
B) $80^\\circ$
C) $100^\\circ$
D) $120^\\circ$
Step-by-step solution with full logic:
Let angles be $(a-d), a, (a+d)$.
Sum of angles in a triangle is $180^\\circ$. So, $3a = 180 \\implies a = 60^\\circ$.
The smallest angle is given as $40^\\circ$. Assuming $d > 0$, $(a-d) = 40$.
$60 - d = 40 \\implies d = 20^\\circ$.
Largest angle = $a+d = 60 + 20 = 80^\\circ$.
**** B) $80^\\circ$
Question 3 (4 terms)
The sum of four consecutive terms of an AP is $32$, and the ratio of the product of the first and the last terms to the product of the two middle terms is $7 : 15$. What is the largest term?
A) $14$
B) $11$
C) $8$
D) $5$
Step-by-step solution with full logic:
Let terms be $(a-3d), (a-d), (a+d), (a+3d)$.
Sum $= 4a = 32 \\implies a = 8$.
Ratio condition: $\\frac{(a-3d)(a+3d)}{(a-d)(a+d)} = \\frac{7}{15}$.
$\\frac{a^2 - 9d^2}{a^2 - d^2} = \\frac{7}{15}$.
Substitute $a=8$: $\\frac{64 - 9d^2}{64 - d^2} = \\frac{7}{15}$.
Cross-multiply: $15(64 - 9d^2) = 7(64 - d^2)$.
$960 - 135d^2 = 448 - 7d^2 \\implies 512 = 128d^2 \\implies d^2 = 4 \\implies d = \\pm 2$.
Largest term $= a + 3d = 8 + 3(2) = 14$ (taking positive $d$).
**** A) $14$
Question 4 (4 terms)
Four numbers are in AP. Their sum is $20$ and the sum of their squares is $120$. Find the common difference (assume positive sequence).
A) $1$
B) $2$
C) $3$
D) $4$
Step-by-step solution with full logic:
Let terms be $a-3d, a-d, a+d, a+3d$. Notice the common diff here is $2d$.
Sum $= 4a = 20 \\implies a = 5$.
Sum of squares $= (a-3d)^2 + (a-d)^2 + (a+d)^2 + (a+3d)^2 = 120$.
Expands to $4a^2 + 20d^2 = 120$.
Sub $a=5$: $4(25) + 20d^2 = 120 \\implies 100 + 20d^2 = 120 \\implies 20d^2 = 20 \\implies d^2 = 1 \\implies d = 1$.
Wait! The formula uses a step size of $d$, but the actual common difference between $(a-d)$ and $(a-3d)$ is $2d$.
So actual common difference $= 2(1) = 2$.
**** B) $2$
Question 5 (5 terms)
The sum of 5 numbers in AP is $30$. The sum of the first and fifth term is equal to:
A) $10$
B) $12$
C) $15$
D) $18$
Step-by-step solution with full logic:
Let terms be $(a-2d), (a-d), a, (a+d), (a+2d)$.
Sum $= 5a = 30 \\implies a = 6$.
The first term is $(a-2d)$ and fifth is $(a+2d)$.
Sum of first and fifth $= (a-2d) + (a+2d) = 2a$.
$2a = 2(6) = 12$.
**** B) $12$
Question 6 (5 terms)
Five parts of 100 are in AP such that the middle part is 20. If the product of the first and fifth parts is 336, find the common difference.
A) $2$
B) $4$
C) $6$
D) $8$
Step-by-step solution with full logic:
5 terms in AP: $(a-2d), (a-d), a, (a+d), (a+2d)$.
Sum $= 5a = 100 \\implies a = 20$. This matches the middle part being 20.
Product of 1st and 5th $= (a-2d)(a+2d) = a^2 - 4d^2 = 336$.
Substitute $a=20$: $400 - 4d^2 = 336$.
$4d^2 = 64 \\implies d^2 = 16 \\implies d = 4$.
**** B) $4$
Topic Name: Sum of First n Terms of an AP
Concept / Formula 10: Summation Formulas and Deductions
Formula / Rule:
Sub-formula 1: $S_n = \\frac{n}{2}[2a + (n-1)d]$ OR $S_n = \\frac{n}{2}[a + l]$ (where $l$ is the last term). Number of terms $n = \\frac{l - a}{d} + 1$.
Sub-formula 2: A sequence is an AP if the sum of its first $n$ terms is of the form $An^2 + Bn$ (a pure quadratic in $n$). Here, common difference $d = 2A$.
Sub-formula 3: Nth term $a_n = S_n - S_{n-1}$.
Concept / When to Use:
Sub-formula 1 is standard. Sub-formula 2 is a massive shortcut: if given $S_n = 3n^2 + 5n$, the common difference is instantly $2 \\times 3 = 6$. Sub-formula 3 is used when you are only given the sum function and need a specific term.
Question 1 (Sub-formula 1)
Find the sum of all natural numbers between 100 and 200 which are divisible by 3.
A) $4950$
B) $5000$
C) $4851$
D) $4900$
Step-by-step solution with full logic:
First number $>100$ divisible by 3 is $102$. Last number $<200$ divisible by 3 is $198$.
This is an AP: $102, 105, \\dots, 198$ with $a=102, l=198, d=3$.
Find $n$ using formula: $n = \\frac{l-a}{d} + 1 = \\frac{198-102}{3} + 1 = \\frac{96}{3} + 1 = 32 + 1 = 33$.
Sum $S_{33} = \\frac{n}{2}[a + l] = \\frac{33}{2}[102 + 198] = \\frac{33}{2}[300]$.
$S_{33} = 33 \\times 150 = 4950$.
**** A) $4950$
Question 2 (Sub-formula 1)
How many terms of the AP $24, 21, 18, \\dots$ must be taken so that their sum is 78?
A) $4$ or $13$
B) $5$ or $12$
C) $4$ only
D) $13$ only
Step-by-step solution with full logic:
Given $a=24, d=-3, S_n=78$.
Formula: $S_n = \\frac{n}{2}[2a + (n-1)d]$.
$78 = \\frac{n}{2}[48 + (n-1)(-3)]$.
$156 = n[48 - 3n + 3] = n[51 - 3n] = 51n - 3n^2$.
Rearrange to quadratic: $3n^2 - 51n + 156 = 0$.
Divide by 3: $n^2 - 17n + 52 = 0$.
Factorize: $(n-4)(n-13) = 0$. Thus $n = 4$ or $n = 13$. Both are valid (terms from 5th to 13th sum to 0).
**** A) $4$ or $13$
Question 3 (Sub-formula 2)
The sum of the first $n$ terms of an AP is given by $S_n = 4n^2 - n$. What is the common difference of this AP?
A) $3$
B) $4$
C) $8$
D) $7$
Step-by-step solution with full logic:
Rule: If $S_n = An^2 + Bn$, it is an AP and the common difference $d = 2A$.
Here, $A = 4$ and $B = -1$.
Therefore, $d = 2(4) = 8$.
**** C) $8$
Question 4 (Sub-formula 2)
If the sum of $n$ terms of a sequence is $pn^2 + qn$, what is the first term of the sequence?
A) $p$
B) $q$
C) $p+q$
D) $2p+q$
Step-by-step solution with full logic:
The first term $a_1$ is always equal to the sum of the first 1 term, $S_1$.
Substitute $n=1$ into $S_n = pn^2 + qn$.
$S_1 = p(1)^2 + q(1) = p + q$.
Therefore, $a_1 = p + q$.
**** C) $p+q$
Question 5 (Sub-formula 3)
The sum of first $n$ terms of a series is given by $S_n = 2n^2 + 3n$. Find the 10th term.
A) $41$
B) $43$
C) $38$
D) $45$
Step-by-step solution with full logic:
Formula: $a_n = S_n - S_{n-1}$.
We need $a_{10} = S_{10} - S_9$.
$S_{10} = 2(10)^2 + 3(10) = 200 + 30 = 230$.
$S_9 = 2(9)^2 + 3(9) = 2(81) + 27 = 162 + 27 = 189$.
$a_{10} = 230 - 189 = 41$.
(Alternative shortcut using Sub-formula 2: $d=2(2)=4$. $a_1 = S_1 = 5$. $a_{10} = 5 + 9(4) = 41$.)
**** A) $41$
Question 6 (Sub-formula 3)
If $S_n = 3n^2 + 2n$, what is the difference between the 5th and 2nd terms?
A) $12$
B) $15$
C) $18$
D) $21$
Step-by-step solution with full logic:
We need $a_5 - a_2$.
From quadratic sum property, common diff $d = 2 \\times A = 2 \\times 3 = 6$.
In any AP, $a_5 - a_2 = (a + 4d) - (a + d) = 3d$.
Substitute $d$: $3(6) = 18$.
(No need to calculate individual terms!)
**** C) $18$
Topic Name: Arithmetic Mean (AM)
Concept / Formula 11: Inserting Arithmetic Means
Formula / Rule:
Sub-formula 1: Single AM between $a$ and $b$ is $m = \\frac{a+b}{2}$.
Sub-formula 2: Inserting $n$ AMs between $a$ and $b$: The new sequence has $(n+2)$ terms. The common difference $d = \\frac{b-a}{n+1}$.
Sub-formula 3: Sum of $n$ AMs inserted between $a$ and $b$ is $n \\times \\frac{a+b}{2}$ (which is $n$ times the single AM).
Concept / When to Use:
Questions asking to "insert numbers between two values so they form an AP" are testing this. Sub-formula 3 is a massive shortcut: the sum of 100 means between 2 and 10 is simply $100 \\times \\frac{2+10}{2}$, saving you from calculating the entire series sum.
Question 1 (Sub-formula 1)
If the arithmetic mean between two numbers is 15, and the larger number is 24, what is the smaller number?
A) $6$
B) $8$
C) $9$
D) $12$
Step-by-step solution with full logic:
Let numbers be $a$ and $b$. Assume $b=24$.
Formula: $m = \\frac{a+b}{2}$.
Substitute: $15 = \\frac{a+24}{2}$.
$30 = a + 24 \\implies a = 6$.
**** A) $6$
Question 2 (Sub-formula 1)
The Arithmetic Mean of $3x - 4$ and $5x + 6$ is $13$. Find $x$.
A) $3$
B) $4$
C) $5$
D) $6$
Step-by-step solution with full logic:
$AM = \\frac{(3x - 4) + (5x + 6)}{2} = 13$.
$8x + 2 = 26$.
$8x = 24 \\implies x = 3$.
**** A) $3$
Question 3 (Sub-formula 2)
If 4 Arithmetic Means are inserted between $5$ and $30$, what is the common difference of the resulting AP?
A) $5$
B) $4$
C) $6$
D) $7.5$
Step-by-step solution with full logic:
Given $a=5, b=30$. Number of means $n = 4$.
Formula for common difference when inserting means: $d = \\frac{b-a}{n+1}$.
Substitute: $d = \\frac{30 - 5}{4 + 1} = \\frac{25}{5} = 5$.
**** A) $5$
Question 4 (Sub-formula 2)
Five numbers are inserted between $10$ and $46$ to form an AP. What is the 3rd inserted number (i.e., the 3rd AM)?
A) $22$
B) $28$
C) $34$
D) $40$
Step-by-step solution with full logic:
$a=10, b=46, n=5$.
$d = \\frac{46 - 10}{5 + 1} = \\frac{36}{6} = 6$.
The inserted means are $A_1, A_2, A_3 \\dots$ The 3rd inserted mean $A_3$ corresponds to the 4th term of the entire AP ($a + 3d$).
Formula for $k^{th}$ mean: $A_k = a + kd$.
$A_3 = 10 + 3(6) = 10 + 18 = 28$.
**** B) $28$
Question 5 (Sub-formula 3)
What is the sum of 10 Arithmetic Means inserted between 12 and 48?
A) $300$
B) $600$
C) $240$
D) $480$
Step-by-step solution with full logic:
Let $a=12, b=48, n=10$.
Formula: Sum of $n$ AMs $= n \\times \\frac{a+b}{2}$.
Substitute: $10 \\times \\frac{12 + 48}{2} = 10 \\times \\frac{60}{2}$.
$10 \\times 30 = 300$.
(Notice how we didn't even need to find the common difference!)
**** A) $300$
Question 6 (Sub-formula 3)
The sum of $n$ Arithmetic Means inserted between 5 and 95 is 1000. Find the value of $n$.
A) $15$
B) $20$
C) $25$
D) $30$
Step-by-step solution with full logic:
Given Sum $= 1000$, $a=5, b=95$.
Formula: $n \\times \\frac{a+b}{2} = \\text{Sum}$.
Substitute: $n \\times \\frac{5 + 95}{2} = 1000$.
$n \\times \\frac{100}{2} = 1000 \\implies n \\times 50 = 1000$.
$n = \\frac{1000}{50} = 20$.
**** B) $20$
Topic Name: Important Results on AP
Concept / Formula 12: Term Interchanges and Special Cases
Formula / Rule:
Result (i): If $p^{th}$ term is $q$, and $q^{th}$ term is $p$, then $(p+q)^{th}$ term is $0$, and $r^{th}$ term is $p + q - r$.
Result (ii): If $p \\times a_p = q \\times a_q$, then $a_{p+q} = 0$.
Result (iii): If $a_p = \\frac{1}{q}$ and $a_q = \\frac{1}{p}$, then $a_{pq} = 1$.
Concept / When to Use:
These are pure magic for SSC CGL Tier 2. Standard methods involve solving two linear equations for $a$ and $d$, taking 2-3 minutes. These rules give you the answer in 2 seconds.
Question 1 (Result i)
In an AP, if the 7th term is 12, and the 12th term is 7, what is the 19th term?
A) $19$
B) $0$
C) $5$
D) $-5$
Step-by-step solution with full logic:
Identify the pattern: $a_p = q$ and $a_q = p$. Here $p=7, q=12$.
Rule states $a_{p+q} = 0$.
We need the 19th term, which is exactly $p+q$ ($7+12 = 19$).
Therefore, $a_{19} = 0$.
**** B) $0$
Question 2 (Result i)
In an AP, the 10th term is 15 and the 15th term is 10. Find the 5th term.
A) $20$
B) $25$
C) $15$
D) $0$
Step-by-step solution with full logic:
Pattern: $a_p = q, a_q = p$. Here $p=10, q=15$.
Rule states $r^{th}$ term $a_r = p + q - r$.
We need 5th term, so $r = 5$.
$a_5 = 10 + 15 - 5 = 20$.
**** A) $20$
Question 3 (Result ii)
If 8 times the 8th term of an AP is equal to 13 times its 13th term, find the 21st term.
A) $21$
B) $8$
C) $13$
D) $0$
Step-by-step solution with full logic:
Identify the pattern: $p \\cdot a_p = q \\cdot a_q$.
Here, $p=8, q=13$.
Rule states $a_{p+q} = 0$.
We are asked for $a_{21}$, and $8 + 13 = 21$.
Therefore, $a_{21} = 0$.
**** D) $0$
Question 4 (Result ii)
If $m$ times the $m^{th}$ term of an AP is equal to $n$ times its $n^{th}$ term (where $m \\neq n$), what is the value of the $(m+n)^{th}$ term?
A) $m+n$
B) $m-n$
C) $0$
D) $mn$
Step-by-step solution with full logic:
This is the direct theoretical expression of Result (ii).
Given $m \\cdot a_m = n \\cdot a_n$.
By expanding: $m[a + (m-1)d] = n[a + (n-1)d] \\implies am - an + d(m^2 - m - n^2 + n) = 0$.
$a(m-n) + d[(m-n)(m+n) - (m-n)] = 0 \\implies (m-n)[a + (m+n-1)d] = 0$.
Since $m \\neq n$, $a + (m+n-1)d = 0$, which is the formula for the $(m+n)^{th}$ term.
Thus, $a_{m+n} = 0$.
**** C) $0$
Question 5 (Result iii)
If the 4th term of an AP is $\\frac{1}{5}$ and the 5th term is $\\frac{1}{4}$, find the 20th term.
A) $0$
B) $1$
C) $20$
D) $\\frac{1}{20}$
Step-by-step solution with full logic:
Pattern: $a_p = \\frac{1}{q}$ and $a_q = \\frac{1}{p}$. Here $p=4, q=5$.
Rule states $a_{pq} = 1$.
We are asked for the 20th term, which is $p \\times q$ ($4 \\times 5 = 20$).
Therefore, $a_{20} = 1$.
**** B) $1$
Question 6 (Result iii)
If $a_p = \\frac{1}{q}$ and $a_q = \\frac{1}{p}$, what is the first term $a$ of this AP?
A) $\\frac{1}{pq}$
B) $1$
C) $\\frac{p+q}{pq}$
D) $0$
Step-by-step solution with full logic:
Given $a + (p-1)d = \\frac{1}{q}$ and $a + (q-1)d = \\frac{1}{p}$.
Subtract the two: $(p-q)d = \\frac{1}{q} - \\frac{1}{p} = \\frac{p-q}{pq}$.
Thus, $d = \\frac{1}{pq}$.
Substitute $d$ in first equation: $a + (p-1)(\\frac{1}{pq}) = \\frac{1}{q}$.
$a + \\frac{1}{q} - \\frac{1}{pq} = \\frac{1}{q} \\implies a = \\frac{1}{pq}$.
(Bonus fact: In this specific AP, both the first term $a$ and common difference $d$ equal $\\frac{1}{pq}$.)
**** A) $\\frac{1}{pq}$
Topic Name: Special Sum Interchanges and Reciprocal APs
Concept / Formula 13: Special Sum Interchanges and Reciprocal APs
Formula / Rule:
Result (iv): If $S_p = q$ and $S_q = p$, then $S_{p+q} = -(p+q)$.
Result (v): If $S_p = S_q$, then $S_{p+q} = 0$.
Result (vi): If $a^2, b^2, c^2$ are in AP $\\implies \\frac{1}{b+c}, \\frac{1}{c+a}, \\frac{1}{a+b}$ are in AP and $\\frac{a}{b+c}, \\frac{b}{c+a}, \\frac{c}{a+b}$ are in AP.
Result (vii): If $a_1, a_2 \\dots a_n$ are in AP, then $\\frac{1}{a_1a_2} + \\frac{1}{a_2a_3} + \\dots + \\frac{1}{a_{n-1}a_n} = \\frac{n-1}{a_1a_n}$.
Concept / When to Use:
Results iv and v are instant checks for Tier 2 sum questions. Result vii is actually an application of telescoping series (Concept 3) applied strictly to an AP. The common difference here sits in the numerator when solving.
Question 1 (Result iv & v)
If the sum of the first 8 terms of an AP is 15, and the sum of the first 15 terms is 8, find the sum of the first 23 terms.
A) $23$
B) $-23$
C) $0$
D) $7$
Step-by-step solution with full logic:
Pattern: $S_p = q, S_q = p$. Here $p=8, q=15$.
Rule states $S_{p+q} = -(p+q)$.
We need $S_{23}$, and $8 + 15 = 23$.
$S_{23} = -23$.
**** B) $-23$
Question 2 (Result iv & v)
If the sum of the first 12 terms of an AP is equal to the sum of the first 18 terms, what is the sum of the first 30 terms?
A) $30$
B) $6$
C) $0$
D) Cannot be determined
Step-by-step solution with full logic:
Pattern: $S_p = S_q$. Here $p=12, q=18$.
Rule states $S_{p+q} = 0$.
We need $S_{30}$, and $12 + 18 = 30$.
Therefore, $S_{30} = 0$.
**** C) $0$
Question 3 (Result vi)
If $1, 25, 49$ are three terms in an Arithmetic Progression, which of the following sequences must also be in Arithmetic Progression?
A) $\\frac{1}{12}, \\frac{1}{8}, \\frac{1}{6}$
B) $\\frac{1}{13}, \\frac{1}{9}, \\frac{1}{5}$
C) $\\frac{1}{6}, \\frac{1}{8}, \\frac{1}{12}$
D) $\\frac{1}{5}, \\frac{1}{9}, \\frac{1}{13}$
Step-by-step solution with full logic:
Observe the terms $1, 25, 49$. These are $1^2, 5^2, 7^2$.
So $a^2 = 1, b^2 = 25, c^2 = 49$. This means $a=1, b=5, c=7$.
Rule states if $a^2, b^2, c^2$ in AP, then $\\frac{1}{b+c}, \\frac{1}{c+a}, \\frac{1}{a+b}$ are in AP.
Calculate terms: $\\frac{1}{5+7}, \\frac{1}{7+1}, \\frac{1}{1+5}$.
This is $\\frac{1}{12}, \\frac{1}{8}, \\frac{1}{6}$.
**** A) $\\frac{1}{12}, \\frac{1}{8}, \\frac{1}{6}$
Question 4 (Result vi)
If $\\frac{a}{b+c}, \\frac{b}{c+a}, \\frac{c}{a+b}$ are in AP, which of the following is true?
A) $a, b, c$ are in AP
B) $a^2, b^2, c^2$ are in AP
C) $\\sqrt{a}, \\sqrt{b}, \\sqrt{c}$ are in AP
D) $\\frac{1}{a}, \\frac{1}{b}, \\frac{1}{c}$ are in AP
Step-by-step solution with full logic:
This is the exact definition of Result (vi).
To prove it manually: add $1$ to each term. $\\frac{a}{b+c}+1 = \\frac{a+b+c}{b+c}$.
Sequence becomes $\\frac{a+b+c}{b+c}, \\frac{a+b+c}{c+a}, \\frac{a+b+c}{a+b}$ in AP.
Divide by $a+b+c$: $\\frac{1}{b+c}, \\frac{1}{c+a}, \\frac{1}{a+b}$ in AP.
This condition mathematically leads to $a^2, b^2, c^2$ being in AP.
**** B) $a^2, b^2, c^2$ are in AP
Question 5 (Result vii)
If $a_1, a_2, \\dots a_n$ are in AP with common difference $d$, what is the sum of $\\frac{1}{a_1a_2} + \\frac{1}{a_2a_3} + \\dots + \\frac{1}{a_9a_{10}}$?
A) $\\frac{9}{a_1a_{10}}$
B) $\\frac{10}{a_1a_{10}}$
C) $\\frac{9d}{a_1a_{10}}$
D) $\\frac{1}{a_1a_{10}}$
Step-by-step solution with full logic:
Formula: $\\frac{1}{a_1a_2} + \\dots = \\frac{n-1}{a_1a_n}$.
The number of terms $n$ in the denominator of the last fraction is $10$.
Substitute $n=10$: $\\frac{10-1}{a_1a_{10}} = \\frac{9}{a_1a_{10}}$.
**** A) $\\frac{9}{a_1a_{10}}$
Question 6 (Result vii)
Given an AP: $2, 5, 8, 11 \\dots$ Find the value of $\\frac{1}{2 \\times 5} + \\frac{1}{5 \\times 8} + \\frac{1}{8 \\times 11} + \\frac{1}{11 \\times 14}$.
A) $\\frac{1}{7}$
B) $\\frac{2}{7}$
C) $\\frac{3}{14}$
D) $\\frac{5}{28}$
Step-by-step solution with full logic:
Here $a_1 = 2, a_2 = 5, a_3 = 8, a_4 = 11, a_5 = 14$.
The sequence of fractions ends at $\\frac{1}{a_4a_5}$. So total $n$ in the formula is $5$.
Formula: $\\frac{n-1}{a_1a_n} = \\frac{5-1}{a_1a_5}$.
$a_1 = 2$, $a_5 = 14$.
$\\frac{4}{2 \\times 14} = \\frac{4}{28} = \\frac{1}{7}$.
(Verification via Telescoping formula: Diff = 3. $\\frac{1}{3}(\\frac{1}{2} - \\frac{1}{14}) = \\frac{1}{3}(\\frac{6}{14}) = \\frac{2}{14} = \\frac{1}{7}$. Both methods perfectly yield the same result).
**** A) $\\frac{1}{7}$
Topic Name: Geometric Progression (GP)
Concept / Formula 14: General Term of a GP
Formula / Rule:
Sub-formula 1: A sequence is a GP if the ratio of any term to its preceding term is constant (Common Ratio $r = \\frac{a_{n+1}}{a_n}$).
Sub-formula 2: The $n^{th}$ Term (General Term) of a GP is $a_n = ar^{n-1}$ (where $a$ is the first term, $r$ is common ratio).
Sub-formula 3: General format of GP sequence: $a, ar, ar^2, ar^3, \\dots, ar^{n-1}, \\dots, l$.
Concept / When to Use:
AP relies on addition; GP relies on multiplication. Use these formulas for population growth, compound interest structure problems, or any sequence scaling by a factor.
Question 1 (Sub-formula 1)
Which of the following sequences represents a valid Geometric Progression?
A) $2, 4, 6, 8, \\dots$
B) $3, 9, 18, 36, \\dots$
C) $4, -8, 16, -32, \\dots$
D) $1, 4, 9, 16, \\dots$
Step-by-step solution with full logic:
A GP must have a constant ratio $r = \\frac{a_2}{a_1} = \\frac{a_3}{a_2}$.
Option A: $4/2 = 2$, but $6/4 = 1.5$. (This is an AP).
Option B: $9/3 = 3$, but $18/9 = 2$.
Option C: $-8/4 = -2$, and $16/-8 = -2$, and $-32/16 = -2$. Ratio is constant.
Option D: Squares, not a constant multiplier.
**** C) $4, -8, 16, -32, \\dots$
Question 2 (Sub-formula 2)
In a GP, the first term is $3$ and the common ratio is $2$. What is the 6th term?
A) $192$
B) $96$
C) $48$
D) $384$
Step-by-step solution with full logic:
Given $a = 3$, $r = 2$, $n = 6$.
Formula: $a_n = ar^{n-1}$.
Substitute: $a_6 = 3(2^{6-1})$.
$a_6 = 3(2^5) = 3(32)$.
Calculate: $3 \\times 32 = 96$.
**** B) $96$
Question 3 (Sub-formula 2 & 3)
The 3rd term of a GP is $12$ and the 6th term is $96$. What is the first term $a$?
A) $2$
B) $3$
C) $4$
D) $6$
Step-by-step solution with full logic:
Using formula $a_n = ar^{n-1}$:
$a_3 = ar^2 = 12$  --- (Eq 1)
$a_6 = ar^5 = 96$  --- (Eq 2)
Divide Eq 2 by Eq 1:
$\\frac{ar^5}{ar^2} = \\frac{96}{12}$
$r^3 = 8 \\implies r = 2$.
Substitute $r=2$ into Eq 1:
$a(2^2) = 12 \\implies 4a = 12 \\implies a = 3$.
**** B) $3$`;


const lines = raw.split('\n').map(l => l.trim()).filter(l => l.length > 0);
let chapter = {
  id: "sequences",
  title: "Sequences and Series",
  tagline: "Mastering AP, GP, and Special Series",
  color: "algebra",
  totalConcepts: 14,
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
  } else if (line.startsWith("Formula / Rule:")) {
    let ruleText = [];
    i++;
    while(i < lines.length && !lines[i].startsWith("Concept / When to Use:")) {
        ruleText.push(lines[i]);
        i++;
    }
    currentFormula = {
      id: `${currentConcept.id}-f1`,
      name: currentConcept.subtitle.substring(0, 30) + (currentConcept.subtitle.length > 30 ? "..." : ""),
      expression: { lhs: ruleText.join('\n'), num: "", den: "", color: "info" },
      explanation: "",
      mnemonic: "",
      questions: []
    };
    currentConcept.formulas.push(currentFormula);
    
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
        // we can add solution text if needed, but current schema only has correctIndex
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

fs.writeFileSync('parsed_seq.json', JSON.stringify(chapter, null, 2));
console.log("Done");
