"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  getRankings,
  getStatus,
  type DisplayStatus,
  type RankingItem,
} from "@/lib/api";

type RaceEntry = {
  id: string;
  rankNo: number;
  score: number;
  name: string;
  seatNo?: string | null;
  isDemo?: boolean;
};

const slideCount = 3;

const demoRaceEntries: RaceEntry[] = [
  { id: "demo-1", rankNo: 1, score: 4820, name: "손흥민", isDemo: true },
  { id: "demo-2", rankNo: 2, score: 4510, name: "김연아", isDemo: true },
  { id: "demo-3", rankNo: 3, score: 3970, name: "이강인", isDemo: true },
  { id: "demo-4", rankNo: 4, score: 3220, name: "박지성", isDemo: true },
  { id: "demo-5", rankNo: 5, score: 2890, name: "황희찬", isDemo: true },
  { id: "demo-6", rankNo: 6, score: 2540, name: "안정환", isDemo: true },
  { id: "demo-7", rankNo: 7, score: 2190, name: "신유빈", isDemo: true },
  { id: "demo-8", rankNo: 8, score: 1760, name: "김민재", isDemo: true },
];

const demoDisplayNames = [
  "손흥민",
  "김연아",
  "이강인",
  "박지성",
  "황희찬",
  "안정환",
  "신유빈",
  "김민재",
];

export default function Home() {
  const [rankings, setRankings] = useState<RankingItem[]>([]);
  const [status, setStatus] = useState<DisplayStatus | null>(null);
  const [lastUpdatedAt, setLastUpdatedAt] = useState<Date | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [screenIndex, setScreenIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const refresh = useCallback(async () => {
    try {
      const [nextRankings, nextStatus] = await Promise.all([
        getRankings(),
        getStatus(),
      ]);
      setRankings(nextRankings);
      setStatus(nextStatus);
      setLastUpdatedAt(new Date());
      setIsOffline(false);
    } catch (error) {
      console.warn("TV display refresh failed", error);
      setIsOffline(true);
    }
  }, []);

  useEffect(() => {
    const initialRefresh = window.setTimeout(() => void refresh(), 0);
    const poll = window.setInterval(() => void refresh(), 15_000);
    return () => {
      window.clearTimeout(initialRefresh);
      window.clearInterval(poll);
    };
  }, [refresh]);

  useEffect(() => {
    const source = new EventSource(
      "/api/v1/events/public?channels=display,attendance,seat",
    );
    const handleRefresh = () => void refresh();

    source.onopen = () => setIsOffline(false);
    source.onerror = () => setIsOffline(true);
    source.onmessage = handleRefresh;
    source.addEventListener("display.updated", handleRefresh);
    source.addEventListener("display.refresh", handleRefresh);
    source.addEventListener("student.checked_in", handleRefresh);
    source.addEventListener("student.checked_out", handleRefresh);

    return () => source.close();
  }, [refresh]);

  useEffect(() => {
    const slider = window.setInterval(
      () => setScreenIndex((index) => (index + 1) % slideCount),
      12_000,
    );
    return () => window.clearInterval(slider);
  }, []);

  const scholarshipLeader = useMemo(
    () => rankings[0] ?? null,
    [rankings],
  );
  const raceItems = useMemo(
    () => rankings.slice(0, 8),
    [rankings],
  );
  const visibleLeader = scholarshipLeader
    ? {
        name: displayName(scholarshipLeader),
        score: scholarshipLeader.totalStudyMinutes,
      }
    : { name: demoRaceEntries[0].name, score: demoRaceEntries[0].score };

  return (
    <main
      className="presentation-shell bg-[#fff7e8] text-[#263047]"
      onTouchStart={(event) => setTouchStartX(event.touches[0]?.clientX ?? null)}
      onTouchEnd={(event) => {
        if (touchStartX === null) return;
        const endX = event.changedTouches[0]?.clientX ?? touchStartX;
        const delta = touchStartX - endX;
        if (Math.abs(delta) > 40) {
          setScreenIndex((index) =>
            delta > 0
              ? (index + 1) % slideCount
              : (index + slideCount - 1) % slideCount,
          );
        }
        setTouchStartX(null);
      }}
    >
      <div
        className="screen-deck"
        style={{ transform: `translateX(-${screenIndex * 100}%)` }}
      >
        <section className="deck-slide soon-screen" aria-label="다음 공개 안내">
          <div className="soon-poster">
            <div className="poster-pattern" aria-hidden="true">
              {Array.from({ length: 11 }).map((_, row) => (
                <div key={row} className="pattern-row">
                  <span>2026</span>
                  <b>HOT</b>
                  <span>STUDY</span>
                  <strong>2026</strong>
                  <b>HOT</b>
                  <span>STUDY</span>
                  <strong>2026</strong>
                  <b>HOT</b>
                  <span>STUDY</span>
                  <strong>2026</strong>
                  <b>HOT</b>
                  <span>STUDY</span>
                  <strong>2026</strong>
                  <b>HOT</b>
                  <span>STUDY</span>
                </div>
              ))}
            </div>

            <p className="poster-eyebrow">서울대생체험</p>
            <h1>
              <span className="poster-year">2026 진수학</span>
              <span className="poster-hot">
                <b>HOT</b>
                <em>STUDY</em>
              </span>
              <span className="poster-challenge">챌린지</span>
            </h1>

            <div className="poster-medal" aria-hidden="true">
              <div className="medal-ribbon" />
              <div className="medal-face" />
            </div>

            <div className="poster-soon">COMING SOON</div>
            <div className="poster-ticket ticket-main">
              <span>수석 장학금</span>
              <strong>20만원!!</strong>
            </div>
            <div className="poster-ticket ticket-small-a">수석 장학금 20만원!!</div>
            <div className="poster-ticket ticket-small-b">커피 쿠폰</div>
            <div className="poster-ticket ticket-small-c">커피 쿠폰</div>
          </div>
        </section>

        <section className="deck-slide race-screen" aria-label="공부시간 레이스">
          <ScreenHeader
            eyebrow="서울대생체험"
            title="2026 진수학 HOT STUDY 챌린지"
            accentEyebrow="🔥 실시간 레이스"
            accentPrimary={`${raceItems.length > 0 ? raceItems.length : 8}명 경쟁`}
            accentSecondary={`1위 ${formatMinutes(visibleLeader.score)} · 출석 보너스 포함`}
          />

          <div className="race-hero">
            <div className="status-pair">
              <Metric label="입실" value={`${status?.checkedInCount ?? 0}명`} />
              <Metric
                label="오늘 공부"
                value={formatMinutes(status?.todayTotalStudyMinutes ?? 0)}
              />
            </div>

            <div className="race-prize-panel">
              <span>출석 보너스 + 실제 공부시간</span>
              <h2>수석 장학금 20만원</h2>
            </div>

            <div className="leader-card">
              <span>현재 선두</span>
              <strong>{visibleLeader.name}</strong>
              <p>{formatMinutes(visibleLeader.score)} 점수</p>
            </div>
          </div>

          <RaceArena items={raceItems} />

          <ScreenFooter
            isOffline={isOffline}
            lastUpdatedAt={lastUpdatedAt}
          />
        </section>

        <section className="deck-slide benefit-screen" aria-label="챌린지 혜택">
          <ScreenHeader
            eyebrow="혜택 보드"
            title="혜택 요약"
            accentEyebrow="🔥 혜택"
            accentPrimary="20만원"
            accentSecondary="5일 출석 · 3주 누적"
          />

          <div className="benefit-board">
            <div className="benefit-main-card">
              <span>혜택 01</span>
              <h2>수석 장학금</h2>
              <strong>20만원</strong>
              <em>3주 누적 공부시간 1등</em>
            </div>
            <div className="benefit-side-card">
              <span>혜택 02</span>
              <h2>커피 쿠폰</h2>
              <strong>연속 5일 출석</strong>
              <em>오전 10시 전 등원</em>
            </div>
            <div className="benefit-side-card blue">
              <span>기준</span>
              <h2>3주 누적</h2>
              <strong>레이스 점수</strong>
              <em>10시 전 출석 + 공부시간</em>
            </div>
          </div>

          <div className="mission-strip">
            <span>참여 방법</span>
            <strong>10시 전 입실 · 공부 기록 · 레이스 점수 경쟁</strong>
          </div>

          <ScreenFooter
            isOffline={isOffline}
            lastUpdatedAt={lastUpdatedAt}
          />
        </section>
      </div>

      <div className="screen-dots" aria-label="화면 전환">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            aria-label={`${index + 1}번 화면 보기`}
            className={screenIndex === index ? "is-active" : ""}
            type="button"
            onClick={() => setScreenIndex(index)}
          />
        ))}
      </div>
    </main>
  );
}

function ScreenHeader({
  eyebrow = "STUDYON 방학특강",
  title = "",
  accentEyebrow = "3주 레이스",
  accentPrimary = "LIVE",
  accentSecondary = "",
}: {
  eyebrow?: string;
  title?: string;
  accentEyebrow?: string;
  accentPrimary?: string;
  accentSecondary?: string;
}) {
  return (
    <header className="slide-header">
      <div>
        <p className="brand-pill">{eyebrow}</p>
        {title ? <h1>{title}</h1> : null}
      </div>
      <div className="header-accent" aria-hidden="true">
        <span>{accentEyebrow}</span>
        <strong>{accentPrimary}</strong>
        {accentSecondary ? <p>{accentSecondary}</p> : null}
      </div>
    </header>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="metric-tile">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function RaceArena({ items }: { items: RankingItem[] }) {
  const entries: RaceEntry[] =
    items.length > 0
      ? items.map((item) => ({
          id: item.studentId,
          rankNo: item.rankNo,
          score: item.totalStudyMinutes,
          name: displayName(item),
          seatNo: item.seatNo,
        }))
      : demoRaceEntries;
  const laneRefs = useRef(new Map<string, HTMLLIElement>());
  const previousRectsRef = useRef(new Map<string, DOMRect>());
  const previousRanksRef = useRef(new Map<string, number>());
  const leaderScore = Math.max(1, entries[0]?.score ?? 0);
  const visibleCount = entries.length;
  const runnerUpGap = Math.max(0, leaderScore - (entries[1]?.score ?? leaderScore));

  useLayoutEffect(() => {
    const previousRects = previousRectsRef.current;
    const nextRects = new Map<string, DOMRect>();

    entries.forEach((entry) => {
      const node = laneRefs.current.get(entry.id);
      if (!node) return;
      const nextRect = node.getBoundingClientRect();
      const previousRect = previousRects.get(entry.id);
      const previousRank = previousRanksRef.current.get(entry.id);
      nextRects.set(entry.id, nextRect);

      node.classList.remove("lane-rank-up", "lane-rank-down");
      if (previousRank !== undefined && previousRank !== entry.rankNo) {
        node.classList.add(
          previousRank > entry.rankNo ? "lane-rank-up" : "lane-rank-down",
        );
        window.setTimeout(() => {
          node.classList.remove("lane-rank-up", "lane-rank-down");
        }, 1200);
      }

      if (!previousRect) return;
      const deltaX = previousRect.left - nextRect.left;
      const deltaY = previousRect.top - nextRect.top;
      if (Math.abs(deltaX) < 1 && Math.abs(deltaY) < 1) return;

      node.style.transition = "none";
      node.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      node.style.zIndex = deltaY > 0 ? "6" : "5";

      window.requestAnimationFrame(() => {
        node.style.transition =
          "transform 820ms cubic-bezier(0.18, 0.9, 0.24, 1)";
        node.style.transform = "translate(0, 0)";
      });
    });

    previousRectsRef.current = nextRects;
    previousRanksRef.current = new Map(
      entries.map((entry) => [entry.id, entry.rankNo]),
    );
  }, [entries]);

  return (
    <div className={items.length > 0 ? "race-arena" : "race-arena is-demo"}>
      <div className="arena-title">
        <div>
          <span>방학 장학금 레이스</span>
          <h2>8명 실시간 랩 보드</h2>
        </div>
        <div className="arena-summary" aria-label="레이스 요약">
          <strong>{visibleCount}명 경쟁</strong>
          <span>
            1위 {formatMinutes(leaderScore)} · 2위와 {formatMinutes(runnerUpGap)} 차
          </span>
        </div>
      </div>
      <ol className="runner-track">
        {entries.map((item) => {
          const score = item.score;
          const progress = Math.max(8, Math.min(96, (score / leaderScore) * 100));
          const runnerProgress = Math.max(8, Math.min(90, progress));
          const gap = Math.max(0, leaderScore - score);
          return (
            <li
              key={item.id}
              ref={(node) => {
                if (node) laneRefs.current.set(item.id, node);
                else laneRefs.current.delete(item.id);
              }}
              className={`${item.rankNo === 1 ? "lane-leader" : ""} ${item.isDemo ? "lane-demo" : ""}`}
            >
              <div className="lane-meta">
                <strong>{item.rankNo}</strong>
                <span>
                  {item.name}
                  {item.seatNo ? <em>{item.seatNo}</em> : null}
                </span>
              </div>
              <div className="runner-lane">
                <div className="lane-fill" style={{ width: `${progress}%` }} />
                <div
                  className={`runner runner-${item.rankNo}`}
                  style={{
                    left: `calc(${runnerProgress}% - var(--runner-offset))`,
                    animationDelay: `${item.rankNo * 120}ms`,
                  }}
                >
                  <span>{item.rankNo}</span>
                </div>
                <div className="goal-flag" />
              </div>
              <div className="lane-score">
                <strong>{formatMinutes(item.score)}</strong>
                <span>
                  {gap === 0 ? "현재 1등" : `${formatMinutes(gap)} 따라잡기`}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function ScreenFooter({
  isOffline,
  lastUpdatedAt,
}: {
  isOffline: boolean;
  lastUpdatedAt: Date | null;
}) {
  return (
    <footer className="slide-footer">
      <span>
        {isOffline
          ? "연결 재시도 중"
          : lastUpdatedAt
            ? `${formatTime(lastUpdatedAt)} 업데이트`
            : "데이터 준비 중"}
      </span>
      <span>출석 보너스 포함 레이스 점수</span>
    </footer>
  );
}

function displayName(item: RankingItem) {
  return item.name || demoDisplayNames[item.rankNo - 1] || "학생";
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatMinutes(minutes: number) {
  const safe = Math.max(0, Math.round(minutes));
  const hours = Math.floor(safe / 60);
  const mins = safe % 60;
  return hours > 0 ? `${hours}시간 ${mins}분` : `${mins}분`;
}
