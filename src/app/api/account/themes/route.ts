import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { API_BASE } from "@/lib/api";
import { LANDING_THEMES } from "@/lib/themes";

export async function POST(request: Request) {
  const cookie = (await headers()).get("cookie");
  if (!cookie) {
    return NextResponse.json({ error: "Entre na sua conta para equipar temas." }, { status: 401 });
  }

  let themeId: unknown;
  try {
    ({ themeId } = await request.json());
  } catch {
    return NextResponse.json({ error: "Tema inválido." }, { status: 400 });
  }

  if (typeof themeId !== "string" || !LANDING_THEMES.some((theme) => theme.id === themeId)) {
    return NextResponse.json({ error: "Tema inválido." }, { status: 400 });
  }

  try {
    const inventoryResponse = await fetch(`${API_BASE}/api/v1/inventory`, {
      headers: { cookie },
      cache: "no-store",
    });
    if (!inventoryResponse.ok) {
      return NextResponse.json({ error: "Não foi possível consultar seu inventário." }, { status: inventoryResponse.status });
    }

    const inventory = (await inventoryResponse.json()) as {
      items?: Array<{
        id: string;
        item: { category: string; slug: string; metadata?: unknown };
        expiresAt: string | null;
      }>;
    };
    const ownedTheme = (inventory.items ?? []).find((entry) => {
      if (
        entry.item.category !== "THEME" ||
        (entry.expiresAt !== null && Date.parse(entry.expiresAt) <= Date.now())
      ) return false;
      const metadata = entry.item.metadata as { themeId?: unknown } | null;
      const ownedId = typeof metadata?.themeId === "string"
        ? metadata.themeId
        : entry.item.slug === "theme-hexavante"
          ? "default"
          : entry.item.slug.startsWith("theme-")
            ? entry.item.slug.slice("theme-".length)
            : null;
      return ownedId === themeId;
    });

    if (!ownedTheme) {
      return NextResponse.json({ error: "Você ainda não possui esse tema." }, { status: 403 });
    }

    const equipResponse = await fetch(`${API_BASE}/api/v1/shop/equip`, {
      method: "POST",
      headers: { cookie, "content-type": "application/json" },
      body: JSON.stringify({ inventoryId: ownedTheme.id }),
      cache: "no-store",
    });
    const result = await equipResponse.json().catch(() => ({}));
    if (!equipResponse.ok) {
      return NextResponse.json(
        { error: typeof result.error === "string" ? result.error : "Não foi possível equipar o tema." },
        { status: equipResponse.status },
      );
    }

    return NextResponse.json({ success: true, themeId });
  } catch {
    return NextResponse.json({ error: "Serviço de temas indisponível." }, { status: 502 });
  }
}
