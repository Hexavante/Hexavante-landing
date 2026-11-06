/**
 * URLs canônicas do app (hexavante web).
 *
 * Fonte única para `NEXT_PUBLIC_APP_URL`. Antes esta constante estava
 * reescrita em 7 arquivos e divergia de `lib/api.ts` (em dev uma apontava
 * para localhost:3000 e a outra para app.hexavante.com.br).
 *
 * Módulo sem dependências de servidor para poder ser importado por
 * componentes client (header, footer, theme-switcher).
 */
export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://app.hexavante.com.br"
    : "http://localhost:3000");

/** Monta uma URL absoluta para o app: `appUrl("/register")`. */
export function appUrl(path = ""): string {
  if (!path) return APP_URL;
  return `${APP_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Uploads pertencem ao app; arquivos da marca continuam locais à landing. */
export function publicMediaUrl(value: string | null | undefined): string | undefined {
  const url = value?.trim();
  if (!url) return undefined;
  return url.startsWith("/uploads/") ? APP_URL.replace(/\/$/, "") + url : url;
}
