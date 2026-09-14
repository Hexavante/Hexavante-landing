"use client";

import { useRef, useState } from "react";
import { Dices } from "lucide-react";
import { TEAM } from "@/lib/team";

const PIPS: Record<number, number[]> = {
  1: [5],
  2: [1, 9],
  3: [1, 5, 9],
  4: [1, 3, 7, 9],
  5: [1, 3, 5, 7, 9],
  6: [1, 3, 4, 6, 7, 9],
};

function memberInitials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function TeamDice() {
  const [face, setFace] = useState(6);
  const [rolling, setRolling] = useState(false);
  const [index, setIndex] = useState<number | null>(null);
  const [rolls, setRolls] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const roll = () => {
    if (rolling) return;
    setRolling(true);
    timer.current = setInterval(() => {
      setFace(1 + Math.floor(Math.random() * 6));
    }, 90);

    setTimeout(() => {
      if (timer.current) clearInterval(timer.current);
      setIndex((prev) => {
        let next = Math.floor(Math.random() * TEAM.length);
        if (TEAM.length > 1) {
          while (next === prev) next = Math.floor(Math.random() * TEAM.length);
        }
        return next;
      });
      setFace(1 + Math.floor(Math.random() * 6));
      setRolling(false);
      setRolls((r) => r + 1);
    }, 900);
  };

  const member = index !== null ? TEAM[index] : null;

  return (
    <div className="mx-auto max-w-xl text-center">
      <button
        type="button"
        onClick={roll}
        disabled={rolling}
        title="Rolar o dado"
        className={`relative mx-auto grid h-28 w-28 place-items-center rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 shadow-2xl transition hover:border-cyan-400/40 disabled:opacity-90 ${
          rolling ? "animate-bounce" : "hover:scale-105"
        }`}
        style={{ boxShadow: "0 20px 50px -12px rgb(0 0 0 / 0.5)" }}
      >
        <span className="grid h-20 w-20 grid-cols-3 grid-rows-3 gap-1 p-2">
          {Array.from({ length: 9 }, (_, i) => i + 1).map((pos) => (
            <span key={pos} className="grid place-items-center">
              {PIPS[face].includes(pos) && (
                <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              )}
            </span>
          ))}
        </span>
      </button>

      <button
        type="button"
        onClick={roll}
        disabled={rolling}
        className="hx-hero-btn mx-auto mt-6 px-8 py-3.5"
      >
        <Dices className="h-4 w-4" />
        {rolling ? "Rolando..." : index === null ? "Rolar o dado" : "Rolar novamente"}
      </button>

      {member ? (
        <div key={`${member.name}-${rolls}`} className="anim-enter-scale mt-8 rounded-2xl border border-cyan-400/25 bg-cyan-400/[0.06] p-8">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cyan-400/20 text-xl font-black text-cyan-300">
            {memberInitials(member.name)}
          </span>
          <p className="mt-4 text-xl font-black text-white">{member.name}</p>
          <p className="mx-auto mt-2 max-w-sm text-sm text-[hsl(var(--sidebar-foreground)/0.6)]">
            {member.role}
          </p>
          <p className="mt-4 text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--sidebar-foreground)/0.3)]">
            Membro {(index ?? 0) + 1} de {TEAM.length} · {rolls} {rolls === 1 ? "rolagem" : "rolagens"}
          </p>
        </div>
      ) : (
        <p className="mt-8 text-sm text-[hsl(var(--sidebar-foreground)/0.45)]">
          Clique no dado para conhecer quem está por trás do Hexavante.
        </p>
      )}
    </div>
  );
}
