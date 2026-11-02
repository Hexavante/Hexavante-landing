"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://api.hexavante.com.br";

export function SignOutButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
    <button
      type="button"
      disabled={loading}
      onClick={async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(`${API_BASE}/api/v1/auth/logout`, {
            method: "POST",
            credentials: "include",
            signal: AbortSignal.timeout(10_000),
          });
          if (!response.ok) throw new Error("Logout failed");
          window.location.reload();
        } catch {
          setError("Não foi possível sair. Sua sessão pode continuar ativa. Tente novamente.");
          setLoading(false);
        }
      }}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
    >
      <LogOut className="h-4 w-4" />
      {loading ? "Saindo..." : "Sair"}
    </button>
    {error && <p role="alert" className="px-3 pb-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}
