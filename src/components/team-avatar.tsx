"use client";

import { useState } from "react";
import Image from "next/image";
import { initials } from "@/lib/team";

const SIZES = {
  sm: { box: "h-9 w-9", text: "text-[11px]" },
  md: { box: "h-12 w-12", text: "text-sm" },
  lg: { box: "h-16 w-16", text: "text-xl" },
} as const;

export type TeamAvatarSize = keyof typeof SIZES;

type TeamAvatarProps = {
  name: string;
  /** Caminho em /public (ex.: "/team/nicolas-kirsch.webp") */
  src?: string;
  size?: TeamAvatarSize;
  className?: string;
};

/**
 * Avatar de membro da equipe: foto circular (`object-cover`) quando o
 * arquivo existe e fallback por iniciais quando o arquivo está ausente
 * ou falha ao carregar.
 */
export function TeamAvatar({ name, src, size = "md", className = "" }: TeamAvatarProps) {
  const [failed, setFailed] = useState(false);
  const { box, text } = SIZES[size];

  if (src && !failed) {
    return (
      <span
        className={`relative block shrink-0 overflow-hidden rounded-full ring-1 ring-white/15 ${box} ${className}`}
      >
        <Image
          src={src}
          alt={`Foto de ${name}`}
          fill
          sizes="64px"
          className="object-cover object-[center_30%]"
          onError={() => setFailed(true)}
        />
      </span>
    );
  }

  return (
    <span
      aria-label={name}
      className={`grid shrink-0 place-items-center rounded-full bg-cyan-400/15 font-black text-cyan-300 ring-1 ring-cyan-400/20 ${box} ${text} ${className}`}
    >
      {initials(name)}
    </span>
  );
}
