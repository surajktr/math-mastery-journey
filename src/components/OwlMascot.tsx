import owl from "@/assets/owl.png";
export function OwlMascot({ size = 96, className = "" }: { size?: number; className?: string }) {
  return <img src={owl} alt="MathDojo owl" width={size} height={size} className={className} style={{ width: size, height: size }} loading="lazy" />;
}
