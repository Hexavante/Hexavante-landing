"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://api.hexavante.com.br";

export function SignOutButton() {
  const [loading, setLoading] = useState(false);

  return (
    <button
      type="button"
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        try {
          await fetch(`${API_BASE}/api/v1/auth/logout`, {
            method: "POST",
            credentials: "include",
          });
        } catch {
          /* ignore */
        } finally {
          window.location.reload();
        }
      }}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
    >
      <LogOut className="h-4 w-4" />
      {loading ? "Saindo..." : "Sair"}
    </button>
  );
}
