"use client";

import { useState } from "react";
import { Dices } from "lucide-react";
import { TEAM } from "@/lib/team";

const SIZE = 112;
const HALF = SIZE / 2;

const PIPS: Record<number, number[]> = {
  1: [5],
  2: [1, 9],
  3: [1, 5, 9],
  4: [1, 3, 7, 9],
  5: [1, 3, 5, 7, 9],
  6: [1, 3, 4, 6, 7, 9],
};

/* Rotação que traz cada face para frente */
const FACE_ROTATION: Record<number, { x: number; y: number }> = {
  1: { x: 0, y: 0 },
  6: { x: 0, y: 180 },
  3: { x: 0, y: -90 },
  4: { x: 0, y: 90 },
  2: { x: -90, y: 0 },
  5: { x: 90, y: 0 },
};

const FACE_TRANSFORM: Record<number, string> = {
  1: `rotateY(0deg) translateZ(${HALF}px)`,
  2: `rotateX(90deg) translateZ(${HALF}px)`,
  3: `rotateY(90deg) translateZ(${HALF}px)`,
  4: `rotateY(-90deg) translateZ(${HALF}px)`,
  5: `rotateX(-90deg) translateZ(${HALF}px)`,
  6: `rotateY(180deg) translateZ(${HALF}px)`,
};

function spinTo(current: number, target: number): number {
  const norm = ((current % 360) + 360) % 360;
  const tNorm = ((target % 360) + 360) % 360;
  const delta = (tNorm - norm + 360) % 360;
  return current + 720 + Math.floor(Math.random() * 2) * 360 + delta;
}

function Face({ value }: { value: number }) {
  return (
    <div
      className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-1 rounded-2xl border border-white/15 bg-gradient-to-br from-cyan-500/25 to-violet-500/25 p-3 shadow-[inset_0_0_24px_rgba(0,0,0,0.45)] backdrop-blur"
      style={{ transform: FACE_TRANSFORM[value], width: SIZE, height: SIZE }}
    >
      {Array.from({ length: 9 }, (_, i) => i + 1).map((pos) => (
        <span key={pos} className="grid place-items-center">
          {PIPS[value].includes(pos) && (
            <span className="h-3 w-3 rounded-full bg-cyan-200 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
          )}
        </span>
      ))}
    </div>
  );
}

export function TeamDice() {
  const [rotation, setRotation] = useState({ x: -18, y: 24 });
  const [rolling, setRolling] = useState(false);
  const [index, setIndex] = useState<number | null>(null);
  const [rolls, setRolls] = useState(0);

  const roll = () => {
    if (rolling) return;
    setRolling(true);
    const resultFace = 1 + Math.floor(Math.random() * 6);
    const target = FACE_ROTATION[resultFace];
    setRotation((r) => ({ x: spinTo(r.x, target.x), y: spinTo(r.y, target.y) }));

    setTimeout(() => {
      setIndex((prev) => {
        let next = Math.floor(Math.random() * TEAM.length);
        if (TEAM.length > 1) {
          while (next === prev) next = Math.floor(Math.random() * TEAM.length);
        }
        return next;
      });
      setRolling(false);
      setRolls((n) => n + 1);
    }, 1150);
  };

  const member = index !== null ? TEAM[index] : null;

  return (
    <div className="mx-auto max-w-xl text-center">
      <button
        type="button"
        onClick={roll}
        disabled={rolling}
        title="Rolar o dado"
        className="mx-auto block cursor-pointer disabled:cursor-wait"
        style={{ perspective: "700px" }}
      >
        <div
          className="relative"
          style={{
            width: SIZE,
            height: SIZE,
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: "transform 1.1s cubic-bezier(.2,.8,.25,1)",
          }}
        >
          {[1, 2, 3, 4, 5, 6].map((f) => (
            <Face key={f} value={f} />
          ))}
        </div>
      </button>

      <button
        type="button"
        onClick={roll}
        disabled={rolling}
        className="hx-hero-btn mx-auto mt-8 px-8 py-3.5"
      >
        <Dices className="h-4 w-4" />
        {rolling ? "Rolando..." : index === null ? "Rolar o dado" : "Rolar novamente"}
      </button>

      {member ? (
        <div key={`${member.name}-${rolls}`} className="anim-enter-scale mt-8 rounded-2xl border border-cyan-400/25 bg-cyan-400/[0.06] p-8">
          <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cyan-400/20 text-xl font-black text-cyan-300">
            {member.name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase()}
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
