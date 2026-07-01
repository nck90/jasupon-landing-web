export type TvScreen =
  | "RANKING"
  | "STATUS"
  | "MOTIVATION";

export interface TvSettings {
  activeScreen: TvScreen;
  rotationEnabled: boolean;
  rotationIntervalSeconds: number;
  displayOptions: Record<string, unknown> | null;
  updatedAt: string | null;
}

export interface DisplayStatus {
  checkedInCount: number;
  seatOccupancyRate: number;
  liveStudyMinutes: number;
  todayTotalStudyMinutes: number;
}

export interface RankingItem {
  studentId: string;
  rankNo: number;
  name: string;
  seatNo: string | null;
  actualStudySeconds?: number;
  actualStudyMinutes?: number;
  attendanceBonusSeconds?: number;
  attendanceBonusMinutes?: number;
  raceScoreSeconds?: number;
  raceScoreMinutes?: number;
  totalStudySeconds: number;
  totalStudyMinutes: number;
}

interface ApiEnvelope<T> {
  success: boolean;
  data: T;
}

async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`/api/v1${path}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  const body = (await response.json()) as ApiEnvelope<T>;
  return body.data;
}

export function getSettings() {
  return apiGet<TvSettings>("/display/current");
}

export function getStatus() {
  return apiGet<DisplayStatus>("/display/status");
}

export function getRankings() {
  return apiGet<RankingItem[]>("/display/rankings");
}
