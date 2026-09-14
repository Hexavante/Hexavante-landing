"use client";

import { useEffect } from "react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://api.hexavante.com.br"
    : "http://localhost:3045");

export function ViewTracker({ tutorialId }: { tutorialId: string }) {
  useEffect(() => {
    fetch(`${API_BASE}/api/v1/tutorials/${encodeURIComponent(tutorialId)}/view`, {
      method: "POST",
    }).catch(() => undefined);
  }, [tutorialId]);

  return null;
}
