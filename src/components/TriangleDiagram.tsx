export function TriangleDiagram({
  labels = true,
  opp,
  adj,
  hyp,
}: { labels?: boolean; opp?: number | string; adj?: number | string; hyp?: number | string }) {
  return (
    <svg viewBox="0 0 320 200" className="w-full max-w-sm mx-auto">
      <polygon points="20,170 280,170 280,40" fill="oklch(0.95 0.04 240)" stroke="none" />
      <line x1="20" y1="170" x2="280" y2="170" stroke="oklch(0.7 0.18 145)" strokeWidth="4" strokeLinecap="round" />
      <line x1="280" y1="170" x2="280" y2="40" stroke="oklch(0.74 0.17 60)" strokeWidth="4" strokeLinecap="round" />
      <line x1="20" y1="170" x2="280" y2="40" stroke="oklch(0.68 0.17 240)" strokeWidth="4" strokeLinecap="round" />
      <path d="M 268 170 L 268 158 L 280 158" fill="none" stroke="oklch(0.4 0.02 260)" strokeWidth="2" />
      <path d="M 50 170 A 30 30 0 0 0 44 156" fill="none" stroke="oklch(0.7 0.18 145)" strokeWidth="3" />
      <text x="60" y="162" fontSize="16" fill="oklch(0.4 0.02 260)" fontWeight="700">θ</text>
      {labels && (
        <>
          <text x="120" y="100" fontSize="14" fill="oklch(0.68 0.17 240)" fontWeight="700" transform="rotate(-26 120 100)">
            {hyp ?? "Hypotenuse"}
          </text>
          <text x="290" y="110" fontSize="14" fill="oklch(0.74 0.17 60)" fontWeight="700">{opp ?? "Opp"}</text>
          <text x="130" y="190" fontSize="14" fill="oklch(0.7 0.18 145)" fontWeight="700">{adj ?? "Adjacent"}</text>
        </>
      )}
    </svg>
  );
}
