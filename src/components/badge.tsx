import { cn } from "@/lib/cn";

type Props = {
  variant?: "sky" | "red" | "amber" | "emerald";
  className?: string;
  children: React.ReactNode;
};

const variants: Record<string, string> = {
  sky: "border-sky-400/30 bg-sky-400/10 text-sky-300",
  red: "border-rose-400/30 bg-rose-400/10 text-rose-300",
  amber: "border-amber-400/30 bg-amber-400/10 text-amber-300",
  emerald: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
};

export function Badge({ variant = "sky", className, children }: Props) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
