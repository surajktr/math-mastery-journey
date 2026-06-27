import katex from "katex";
import "katex/dist/katex.min.css";

/**
 * Renders a string containing LaTeX math delimiters ($...$, $$...$$)
 * into properly formatted HTML using KaTeX directly.
 */
export function MathText({ children }: { children: string }) {
  if (!children) return null;

  const html = renderMathInText(children);
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

function renderMathInText(text: string): string {
  const parts: string[] = [];
  let i = 0;

  while (i < text.length) {
    // Check for display math $$...$$
    if (text[i] === "$" && text[i + 1] === "$") {
      const end = text.indexOf("$$", i + 2);
      if (end !== -1) {
        const tex = text.slice(i + 2, end);
        try {
          parts.push(katex.renderToString(tex.trim(), { displayMode: true, throwOnError: false }));
        } catch {
          parts.push(tex);
        }
        i = end + 2;
        continue;
      }
    }

    // Check for inline math $...$
    if (text[i] === "$") {
      const end = text.indexOf("$", i + 1);
      if (end !== -1) {
        const tex = text.slice(i + 1, end);
        try {
          parts.push(katex.renderToString(tex.trim(), { displayMode: false, throwOnError: false }));
        } catch {
          parts.push(tex);
        }
        i = end + 1;
        continue;
      }
    }

    // Check for newline
    if (text[i] === "\n") {
      parts.push("<br/>");
      i++;
      continue;
    }

    // Regular character — accumulate
    let j = i;
    while (j < text.length && text[j] !== "$" && text[j] !== "\n") {
      j++;
    }
    // Escape HTML in plain text parts
    let plainText = text.slice(i, j);
    plainText = escapeHtml(plainText);
    
    // Convert markdown images: ![alt](url) -> <img>
    plainText = plainText.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full rounded-xl my-4 mx-auto block shadow-sm border" />');
    
    // Remove unreplaced [IMAGE] placeholders so they don't show to students
    plainText = plainText.replace(/\[IMAGE\]/g, '');

    // Convert markdown bold: **text** -> <strong>text</strong>
    plainText = plainText.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    
    parts.push(plainText);
    i = j;
  }

  return parts.join("");
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
