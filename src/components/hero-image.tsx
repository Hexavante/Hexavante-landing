"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const DARK_SRC = "/brand/mascote-hero.png";
const LIGHT_SRC = "/brand/icon-hero-light.webp";

function currentIsLight(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.getAttribute("data-theme-mode") === "light";
}

// Hero que troca para o ícone específico quando o tema claro está ativo.
export function HeroImage() {
  const [src, setSrc] = useState(DARK_SRC);

  useEffect(() => {
    setSrc(currentIsLight() ? LIGHT_SRC : DARK_SRC);
    const observer = new MutationObserver(() => {
      setSrc(currentIsLight() ? LIGHT_SRC : DARK_SRC);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme-mode"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <Image
      src={src}
      alt="Mascote Hexavante"
      width={420}
      height={420}
      className="relative h-[340px] w-auto object-contain xl:h-[420px]"
      priority
    />
  );
}
