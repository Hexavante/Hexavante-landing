import { headers } from "next/headers";

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
