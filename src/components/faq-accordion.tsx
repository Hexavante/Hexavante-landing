"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

const FAQS = [
  {
    q: "Como funcionam os certificados?",
    a: "Complete 100% de um curso no app e receba seu certificado com código de verificação para compartilhar no currículo.",
  },
  {
    q: "Como participo do ranking?",
    a: "Ganhe XP estudando e fazendo simulados. Quanto mais XP, mais alto você sobe no ranking da temporada.",
  },
  {
    q: "Preciso pagar para usar?",
    a: "Não. Criar conta e estudar é grátis — sem cartão de crédito e sem compromisso.",
  },
];

export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mt-5 space-y-2">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={f.q}
            className={cn(
              "overflow-hidden rounded-lg border transition-colors duration-200",
              isOpen ? "border-cyan-400/25 bg-cyan-400/[0.04]" : "border-white/[0.06] bg-white/[0.03]",
            )}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-xs font-semibold text-white/80 transition hover:text-white"
            >
              {f.q}
              <ChevronDown
                className={cn("h-3.5 w-3.5 shrink-0 text-cyan-300 transition-transform duration-300", isOpen && "rotate-180")}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-3 pb-3 text-xs leading-relaxed text-white/55">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
