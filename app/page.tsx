"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  getRankings,
  getStatus,
  type DisplayStatus,
  type RankingItem,
} from "@/lib/api";

const slides = ["status", "ranking", "notice"] as const;

function formatMinutes(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h <= 0) return `${m}분`;
  return `${h}시간 ${m}분`;
}

function studentName(item: RankingItem) {
  return item.name || "학생";
}

export default function Home() {
  const [rankings, setRankings] = useState<RankingItem[]>([]);
  const [status, setStatus] = useState<DisplayStatus | null>(null);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null);
  const [offline, setOffline] = useState(false);
  const [slide, setSlide] = useState(0);

  const refresh = useCallback(async () => {
    try {
      const [nextRankings, nextStatus] = await Promise.all([
        getRankings(),
        getStatus(),
      ]);
      setRankings(nextRankings);
      setStatus(nextStatus);
      setLastUpdatedAt(new Date());
      setOffline(false);
    } catch (error) {
      console.warn("TV display refresh failed", error);
      setOffline(true);
    }
  }, []);

  useEffect(() => {
    void refresh();
    const poll = window.setInterval(() => void refresh(), 15_000);
    return () => window.clearInterval(poll);
  }, [refresh]);

  useEffect(() => {
    const timer = window.setInterval(
      () => setSlide((value) => (value + 1) % slides.length),
      12_000,
    );
    return () => window.clearInterval(timer);
  }, []);

  const topRankings = useMemo(() => rankings.slice(0, 8), [rankings]);
  const activeSlide = slides[slide];

  return (
    <main className="min-h-screen bg-[#f7fbff] text-[#14213d]">
      <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col px-12 py-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src="/jasupon_logo.png"
              alt="자습ON"
              className="h-16 w-16 rounded-2xl bg-white object-contain shadow-sm"
            />
            <div>
              <p className="text-5xl font-black tracking-tight">자습ON</p>
              <p className="mt-1 text-xl font-bold text-[#527085]">
                오늘의 자습실 현황
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-white px-5 py-3 text-right shadow-sm">
            <p className="text-sm font-bold text-[#6c7f90]">업데이트</p>
            <p className="text-2xl font-black">
              {lastUpdatedAt
                ? lastUpdatedAt.toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "--:--"}
            </p>
          </div>
        </header>

        <section className="mt-10 flex flex-1 items-stretch">
          {activeSlide === "status" && (
            <div className="grid flex-1 grid-cols-2 gap-6">
              <Metric
                label="입실 학생"
                value={`${status?.checkedInCount ?? 0}명`}
                tone="teal"
              />
              <Metric
                label="좌석 점유율"
                value={`${Math.round(status?.seatOccupancyRate ?? 0)}%`}
                tone="blue"
              />
              <Metric
                label="현재 공부 중"
                value={formatMinutes(status?.liveStudyMinutes ?? 0)}
                tone="yellow"
              />
              <Metric
                label="오늘 누적 공부"
                value={formatMinutes(status?.todayTotalStudyMinutes ?? 0)}
                tone="navy"
              />
            </div>
          )}

          {activeSlide === "ranking" && (
            <div className="flex-1 rounded-[32px] bg-white p-8 shadow-sm">
              <div className="mb-6 flex items-end justify-between">
                <div>
                  <p className="text-xl font-black text-[#20bfa9]">
                    공부시간 랭킹
                  </p>
                  <h1 className="text-5xl font-black tracking-tight">
                    오늘 가장 집중한 학생
                  </h1>
                </div>
                <p className="text-lg font-bold text-[#6c7f90]">
                  공부시간 기준으로 표시됩니다
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {topRankings.map((item) => (
                  <div
                    key={item.studentId}
                    className="flex items-center gap-5 rounded-3xl border border-[#e6eef5] bg-[#f9fcff] px-6 py-5"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#20bfa9] text-2xl font-black text-white">
                      {item.rankNo}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-2xl font-black">
                        {studentName(item)}
                      </p>
                      <p className="text-base font-bold text-[#6c7f90]">
                        {item.seatNo ? `좌석 ${item.seatNo}` : "좌석 미배정"}
                      </p>
                    </div>
                    <p className="text-2xl font-black text-[#1b75ff]">
                      {formatMinutes(item.totalStudyMinutes)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSlide === "notice" && (
            <div className="flex flex-1 flex-col justify-center rounded-[32px] bg-white p-12 text-center shadow-sm">
              <p className="text-2xl font-black text-[#20bfa9]">자습ON 안내</p>
              <h1 className="mt-4 text-6xl font-black leading-tight">
                입실, 좌석, 계획, 타이머를
                <br />
                한 화면에서 관리합니다
              </h1>
              <p className="mx-auto mt-8 max-w-3xl text-2xl font-bold leading-relaxed text-[#527085]">
                오늘의 공부 계획을 세우고 타이머로 기록하세요. 출석과 공부시간은
                관리자 화면에 자동으로 반영됩니다.
              </p>
            </div>
          )}
        </section>

        <footer className="mt-8 flex items-center justify-between text-lg font-bold text-[#6c7f90]">
          <span>{offline ? "서버 연결 확인 중" : "실시간 동기화 중"}</span>
          <div className="flex gap-2">
            {slides.map((item, index) => (
              <span
                key={item}
                className={`h-3 w-10 rounded-full ${
                  index === slide ? "bg-[#20bfa9]" : "bg-[#dbe8f3]"
                }`}
              />
            ))}
          </div>
        </footer>
      </div>
    </main>
  );
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "teal" | "blue" | "yellow" | "navy";
}) {
  const colors = {
    teal: "bg-[#e9fbf8] text-[#109b8c]",
    blue: "bg-[#eaf3ff] text-[#1b75ff]",
    yellow: "bg-[#fff8df] text-[#d99600]",
    navy: "bg-[#edf1f7] text-[#14213d]",
  }[tone];
  return (
    <div className={`flex flex-col justify-between rounded-[32px] p-8 ${colors}`}>
      <p className="text-2xl font-black">{label}</p>
      <p className="text-7xl font-black tracking-tight">{value}</p>
    </div>
  );
}
