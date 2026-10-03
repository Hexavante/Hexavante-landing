import { headers } from "next/headers";
import { DEFAULT_ACCOUNT_THEME_STATE, LANDING_THEMES, type AccountThemeState } from "@/lib/themes";

export const API_BASE =
  process.env.API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://api.hexavante.com.br"
    : "http://localhost:3045");

export const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://app.hexavante.com.br"
    : "http://localhost:3000");

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  shortDescription: string | null;
  thumbnailUrl: string | null;
  courseType: string;
  level: string;
  estimatedHours: number | null;
  totalModules: number;
  totalLessons: number;
  instructorName: string;
  createdAt: string;
}

export interface CourseDetail extends Course {
  description: string | null;
  coverImage: string | null;
  progressionType: string;
  status: string;
  modules: {
    id: string;
    title: string;
    description: string | null;
    orderNumber: number;
    lessons: {
      id: string;
      title: string;
      description: string | null;
      duration: number | null;
      orderNumber: number;
    }[];
  }[];
}

export interface Tutorial {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  thumbnailUrl: string | null;
  videoUrl: string | null;
  duration: number | null;
  viewCount: number;
  categoryId: string | null;
  categoryName: string | null;
  authorName: string;
  authorUsername: string | null;
  authorAvatarUrl: string | null;
  tags: string[];
  createdAt: string;
}

export interface Exam {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  coverImage: string | null;
  examType: string;
  questionCount: number;
  timeLimit: number | null;
  isPremiumOnly: boolean;
  userAttemptCount: number;
}

export interface Certificate {
  id: string;
  code: string;
  issuedAt: string;
  course: { title: string; categoryName: string };
}

export interface Category {
  id: string;
  name: string;
  description: string | null;
}

export interface PlatformStats {
  totalUsers: number;
  totalCourses: number;
  totalTutorials: number;
  totalExams: number;
  totalLessons: number;
}

async function getJson<T>(path: string, init?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      ...init,
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function getPlatformStats(): Promise<PlatformStats> {
  const fallback = {
    totalUsers: 0,
    totalCourses: 0,
    totalTutorials: 0,
    totalExams: 0,
    totalLessons: 0,
  };
  const stats = await getJson<PlatformStats>("/api/v1/platform/stats");
  return stats ?? fallback;
}

export async function getCategories(): Promise<Category[]> {
  const res = await getJson<{ success: boolean; categories: Category[] }>(
    "/api/v1/courses/categories",
  );
  return res?.categories ?? [];
}

export async function getCourses(params: {
  q?: string;
  level?: string;
  courseType?: string;
  page?: number;
  limit?: number;
}): Promise<{ data: Course[]; pagination: Pagination }> {
  const search = new URLSearchParams();
  if (params.q) search.set("search", params.q);
  if (params.level) search.set("level", params.level);
  if (params.courseType) search.set("courseType", params.courseType);
  if (params.page) search.set("page", String(params.page));
  search.set("limit", String(params.limit ?? 24));
  const qs = search.toString();
  const res = await getJson<{ data: Course[]; pagination: Pagination }>(
    `/api/v1/courses${qs ? `?${qs}` : ""}`,
  );
  return (
    res ?? {
      data: [],
      pagination: { page: 1, limit: params.limit ?? 24, total: 0, totalPages: 0 },
    }
  );
}

export async function getCourse(id: string): Promise<CourseDetail | null> {
  const res = await getJson<{ course: CourseDetail }>(
    `/api/v1/courses/${encodeURIComponent(id)}`,
  );
  return res?.course ?? null;
}

export async function getTutorials(params: {
  q?: string;
  categoryId?: string;
  sort?: string;
  page?: number;
  limit?: number;
}): Promise<{ data: Tutorial[]; pagination: Pagination }> {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.categoryId) search.set("categoryId", params.categoryId);
  if (params.sort) search.set("sort", params.sort);
  if (params.page) search.set("page", String(params.page));
  search.set("limit", String(params.limit ?? 24));
  const qs = search.toString();
  const res = await getJson<{ data: Tutorial[]; pagination: Pagination }>(
    `/api/v1/tutorials${qs ? `?${qs}` : ""}`,
  );
  return (
    res ?? {
      data: [],
      pagination: { page: 1, limit: params.limit ?? 24, total: 0, totalPages: 0 },
    }
  );
}

export async function getTutorial(id: string): Promise<Tutorial | null> {
  const res = await getJson<{ tutorial: Tutorial }>(
    `/api/v1/tutorials/${encodeURIComponent(id)}`,
  );
  return res?.tutorial ?? null;
}

export async function getExams(params: {
  q?: string;
  tipo?: string;
  sort?: string;
}): Promise<Exam[]> {
  const search = new URLSearchParams();
  if (params.q) search.set("q", params.q);
  if (params.tipo) search.set("tipo", params.tipo);
  if (params.sort) search.set("sort", params.sort);
  const qs = search.toString();
  const res = await getJson<Exam[]>(`/api/v1/exams${qs ? `?${qs}` : ""}`);
  return res ?? [];
}

export async function getExam(id: string): Promise<Exam | null> {
  const res = await getJson<{ exam: Exam }>(`/api/v1/exams/${encodeURIComponent(id)}`);
  return res?.exam ?? null;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  username: string | null;
  avatarUrl: string | null;
  roles: string[];
}

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookie = (await headers()).get("cookie");
    if (!cookie) return null;
    const res = await fetch(`${API_BASE}/api/v1/auth/session`, {
      headers: { cookie },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { user: SessionUser };
    return data.user ?? null;
  } catch {
    return null;
  }
}

/** Lê os temas do inventário autenticado; a API é a fonte de propriedade e equipamento. */
export async function getAccountThemeState(): Promise<AccountThemeState> {
  const fallback = DEFAULT_ACCOUNT_THEME_STATE;

  try {
    const cookie = (await headers()).get("cookie");
    if (!cookie) return fallback;
    const response = await fetch(`${API_BASE}/api/v1/inventory`, {
      headers: { cookie },
      cache: "no-store",
    });
    if (!response.ok) return fallback;

    const data = (await response.json()) as {
      items?: Array<{
        id: string;
        isEquipped: boolean;
        expiresAt: string | null;
        item: { category: string; slug: string; metadata?: unknown };
      }>;
    };
    const themes = (data.items ?? []).filter(
      (entry) => entry.item.category === "THEME" && (!entry.expiresAt || Date.parse(entry.expiresAt) > Date.now()),
    );
    const supportedIds = new Set(LANDING_THEMES.map((theme) => theme.id));
    const ids = themes
      .map((entry) => {
        const metadata = entry.item.metadata as { themeId?: unknown } | null;
        return typeof metadata?.themeId === "string"
          ? metadata.themeId
          : entry.item.slug === "theme-hexavante"
            ? "default"
            : entry.item.slug.startsWith("theme-")
              ? entry.item.slug.slice("theme-".length)
              : null;
      })
      .filter((id): id is string => typeof id === "string" && supportedIds.has(id));

    return {
      authenticated: true,
      ownedThemeIds: Array.from(new Set(["default", ...ids])),
      equippedThemeId:
        themes.find((entry) => entry.isEquipped)
          ? (() => {
              const active = themes.find((entry) => entry.isEquipped)!;
              const metadata = active.item.metadata as { themeId?: unknown } | null;
              const id = typeof metadata?.themeId === "string"
                ? metadata.themeId
                : active.item.slug === "theme-hexavante"
                  ? "default"
                  : active.item.slug.slice("theme-".length);
              return supportedIds.has(id) ? id : "default";
            })()
          : "default",
    };
  } catch {
    return fallback;
  }
}

export interface CoinPack {
  id: string;
  coins: number;
  priceBrl: number;
  label: string;
}

export interface PremiumOffer {
  id: string;
  priceBrl: number;
  days: number;
  label: string;
}

export interface PaymentCatalog {
  packs: CoinPack[];
  premium: PremiumOffer | null;
}

/** Catálogo público de compra de moedas (preços sempre vêm da API, nunca hardcoded). */
export async function getPaymentCatalog(): Promise<PaymentCatalog | null> {
  const res = await getJson<PaymentCatalog>("/api/v1/payments/catalog");
  if (!res || !Array.isArray(res.packs)) return null;
  return { packs: res.packs, premium: res.premium ?? null };
}

export interface RankEntry {
  rank: number;
  userId: string;
  username: string | null;
  fullName: string;
  avatarUrl: string | null;
  level: number;
  totalXp: number;
  league: string;
}

export async function getLeaderboard(limit = 8): Promise<RankEntry[]> {
  const res = await getJson<{ data: RankEntry[] }>(`/api/v1/rankings?limit=${limit}`);
  return res?.data ?? [];
}

export interface Achievement {
  key: string;
  name: string;
  description: string;
}

export async function getAchievements(): Promise<Achievement[]> {
  const res = await getJson<{ achievements: Achievement[] }>("/api/v1/achievements");
  return res?.achievements ?? [];
}

export interface LiveRoom {
  id: string;
  title: string;
  description: string | null;
  status: string;
  maxParticipants: number;
  participantCount: number;
  scheduledAt: string;
  startedAt: string | null;
  endedAt: string | null;
  instructor: { id: string; username: string | null; fullName: string };
}

export async function getLiveRooms(): Promise<LiveRoom[]> {
  const res = await getJson<{ rooms: LiveRoom[] }>("/api/v1/live-rooms");
  return res?.rooms ?? [];
}

export async function getMyCertificates(): Promise<Certificate[] | null> {
  try {
    const cookie = (await headers()).get("cookie");
    if (!cookie) return null;
    const res = await fetch(`${API_BASE}/api/v1/certificates`, {
      headers: { cookie },
      cache: "no-store",
    });
    if (res.status === 401) return null;
    if (!res.ok) return null;
    const data = (await res.json()) as {
      success: boolean;
      certificates: Certificate[];
    };
    return data.certificates ?? [];
  } catch {
    return null;
  }
}

export function formatDuration(totalSeconds: number | null): string {
  if (!totalSeconds) return "—";
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export const EXAM_TYPE_LABELS: Record<string, string> = {
  ENEM: "ENEM",
  VESTIBULAR: "Vestibular",
  TECNOLOGIA: "Tecnologia",
};

export const LEVEL_LABELS: Record<string, string> = {
  BEGINNER: "Iniciante",
  INTERMEDIATE: "Intermediário",
  ADVANCED: "Avançado",
};
