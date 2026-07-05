import ContactForm from "./contact-form";

const img = (name: string) => `/smarthb-assets/original/${name}`;
const gen = (name: string) => `/studyon-generated/${name}`;
const asset = (name: string) =>
  name.startsWith("feature-") ||
  name.startsWith("hero-") ||
  name.startsWith("workflow-")
    ? gen(name)
    : img(name);

const levelAnchor = (id: string) => {
  const anchors: Record<string, string> = {
    math1: "attendance",
    math2: "seats",
    math3: "reports",
    enAdd: "rewards",
  };

  return anchors[id];
};

const nav = [
  { label: "자습ON", href: "#hero" },
  { label: "운영시스템", href: "#system" },
  { label: "기능소개", href: "#features" },
  { label: "리포트", href: "#report" },
  { label: "레이스", href: "#race" },
  { label: "요금안내", href: "#pricing" },
  { label: "도입문의", href: "#contact" },
];

const techStats = [
  {
    eyebrow: "Problem",
    title: "매일 반복되는 확인 업무",
    value: "출석·좌석",
    body: "누가 왔고 어디 앉았는지 계속 확인",
    note: "자습실은 있어도 출석, 좌석, 이탈 학생을 사람이 계속 챙기면 운영 부담이 줄지 않습니다.",
  },
  {
    eyebrow: "Cost",
    title: "보이지 않는 인건비",
    value: "조교 시간",
    body: "작아 보여도 매일 누적되는 관리 비용",
    note: "출석 체크, 지각 확인, 랭킹 정리, 쿠폰 지급이 반복되면 조교 1명 이상의 시간을 계속 잡아먹습니다.",
  },
  {
    eyebrow: "Solution",
    title: "시스템으로 대체",
    value: "자습ON",
    body: "사람이 지켜보던 관리를 자동화",
    note: "학생 입력, 관리자 화면, 전자칠판을 연결해 사람이 계속 붙어 있어야 했던 업무를 줄입니다.",
  },
];

const systemSteps = [
  {
    no: "01",
    title: "출석 확인 자동화",
    subtitle: "입실, 퇴실 시간이 분 단위로 기록",
    body: "몇시 몇분에 들어오고 나갔는지 남아 온 학생과 안 온 학생을 바로 구분합니다.",
    image: "feature-attendance.png",
    href: "#attendance",
  },
  {
    no: "02",
    title: "좌석 관리 자동화",
    subtitle: "배정 좌석, 빈 좌석, 이탈 학생 파악",
    body: "자리 배정과 사용 현황을 남겨 돌아다니며 확인하는 시간을 줄입니다.",
    image: "feature-seat.png",
    href: "#seats",
  },
  {
    no: "03",
    title: "공부시간 기록",
    subtitle: "공부 타이머, 누적 시간, 목표 미달 확인",
    body: "앉아 있는 시간보다 실제 공부 기록을 기준으로 관리합니다.",
    image: "feature-records.png",
    href: "#reports",
  },
  {
    no: "04",
    title: "학부모 리포트",
    subtitle: "출결, 공부시간, 누적 기록 원클릭 공유",
    body: "학생별 자습 리포트를 클릭 한 번으로 학부모에게 보낼 수 있습니다.",
    image: "feature-record-ranking-v2.png",
    href: "#report",
  },
  {
    no: "05",
    title: "랭킹·보상 운영",
    subtitle: "공부시간 랭킹, 챌린지, 쿠폰 대상자",
    body: "엑셀 정리 없이 랭킹과 보상 기준을 데이터로 운영합니다.",
    image: "feature-ranking.png",
    href: "#rewards",
  },
];

const pricingPlans = [
  { range: "1~10명", price: "9,900원" },
  { range: "11~30명", price: "19,900원" },
  { range: "31~70명", price: "39,900원" },
  { range: "71~150명", price: "69,900원" },
  { range: "151명 이상", price: "별도 문의" },
];

const mathLevels = [
  {
    id: "math1",
    label: "출결 자동화",
    kicker: "조교가 계속 체크하던 출석 확인을",
    title: "온 학생과 안 온 학생을 바로 구분합니다",
    variant: "plain",
    points: [
      "입실·퇴실 시간이 분 단위로 자동 기록",
      "지각·미입실 학생 빠른 확인",
      "관리 필요한 학생 누락 감소",
    ],
    slides: [],
    boxes: [],
    desc: "입실, 퇴실, 지각, 미입실 상태와 시간이 함께 기록되면 관리 필요한 학생을 놓치지 않습니다.",
  },
  {
    id: "math2",
    label: "좌석 운영",
    kicker: "좌석 배정과 자리 이탈 확인까지",
    title: "자습실을 돌아다니며 확인하는 시간을 줄입니다",
    variant: "plain",
    points: [
      "배정 좌석과 빈 좌석 확인",
      "학생별 좌석 이용 이력 관리",
      "데스크 응대 기준 단순화",
    ],
    slides: [],
    boxes: [],
    desc: "배정 좌석, 빈 좌석, 이용 이력을 한 화면에서 확인해 데스크 대응을 단순화합니다.",
  },
  {
    id: "math3",
    label: "공부시간 리포트",
    kicker: "앉아 있는 시간보다 중요한 것은",
    title: "실제 공부시간이 데이터로 남는 것입니다",
    variant: "plain",
    points: [
      "과목별 공부 타이머 기록",
      "학생별 누적 공부시간 확인",
      "학부모에게 클릭 한 번으로 보낼 수 있는 리포트 생성",
    ],
    slides: [],
    boxes: [],
    desc: "과목별 타이머와 누적 기록으로 목표 미달 학생과 성실한 학생을 구분하고, 학부모에게 보낼 리포트까지 만듭니다.",
  },
  {
    id: "mathAdd",
    label: "운영 확장",
    kicker: "학원이 커질수록 더 필요한 것은",
    title: "사람마다 달라지지 않는 운영 기준입니다",
    variant: "plain",
    points: [
      "출석·좌석 기준을 한 화면 기준으로 통일",
      "조교별 확인 방식 차이 감소",
      "원장님이 보는 운영 지표와 현장 대응 기준 일치",
    ],
    slides: [],
    boxes: [],
    desc: "원장님, 조교, 선생님이 같은 데이터를 보고 출석·좌석·공부시간 기준을 맞춥니다.",
  },
];

const englishLevels = [
  {
    id: "en1",
    label: "학부모 알림",
    kicker: "학부모 문의에 감으로 답하지 않도록",
    title: "보여줄 수 있는 자습 기록을 만듭니다",
    variant: "plain",
    points: [
      "입실·퇴실·결석 이력 확인",
      "학생별 공부시간 기록 축적",
      "클릭 한 번으로 공유 가능한 리포트 확보",
    ],
    slides: [],
    boxes: [],
    desc: "입실, 퇴실, 결석, 공부시간 기록이 쌓이면 상담 근거가 선명해집니다.",
  },
  {
    id: "en2",
    label: "운영 가이드",
    kicker: "학생이 직접 기록하고 관리자는 확인",
    title: "확인 업무를 학생 입력과 시스템으로 분산합니다",
    variant: "plain",
    points: [
      "학생은 입실·계획·타이머·퇴실을 직접 기록",
      "관리자는 누락·지각·목표 미달 학생만 확인",
      "반복 확인 업무를 학생 흐름과 관리자 화면으로 분산",
    ],
    slides: [],
    boxes: [],
    desc: "로그인, 입실, 공부계획, 타이머, 퇴실 흐름이 남기 때문에 계속 지켜볼 필요가 줄어듭니다.",
  },
  {
    id: "en3",
    label: "상담 기록",
    kicker: "원장님이 매번 직접 확인하지 않아도",
    title: "지금 누가 있고 누가 관리 필요한지 보입니다",
    variant: "plain",
    points: [
      "현재 입실·미입실·지각 학생 구분",
      "목표 미달 학생 확인",
      "좌석 배정과 해지 이력 확인",
    ],
    slides: [],
    boxes: [],
    desc: "현재 입실 학생, 미입실 학생, 지각 학생, 목표 미달 학생을 한 화면에서 확인합니다.",
  },
  {
    id: "enAdd",
    label: "레이스·보상",
    kicker: "랭킹과 보상도 사람이 매번 정리하지 않게",
    title: "공부 레이스가 자습 분위기를 만듭니다",
    variant: "plain",
    points: [
      "공부시간 레이스와 랭킹 시각화",
      "출석 챌린지와 쿠폰 대상자 자동 관리",
      "보상 기준을 학생들이 바로 볼 수 있게 표시",
    ],
    slides: [],
    boxes: [],
    desc: "공부시간 레이스, 랭킹, 챌린지, 보상 대상자를 시각적으로 보여줘 자습실 분위기를 끌어올립니다.",
  },
];

export default function Home() {
  return (
    <main className="smarthb smarthb-long">
      <Header />
      <MobileMiniNav />
      <Hero />
      <DataSection />
      <TeacherIntro />
      <BridgeSection />
      <LineBanner theme="blue">
        사람이 매번 확인하던 자습실 관리를 시스템으로 줄입니다
      </LineBanner>
      <SystemSection />
      <CoursewareSection />
      <ReportSection />
      <RaceSection />
      <PricingSection />
      <FinalCta />
      <Footer />
      <BottomTrialBanner />
      <ContactForm />
    </main>
  );
}

function MobileMiniNav() {
  return (
    <nav className="mobile-mini-nav" aria-label="모바일 빠른 이동">
      <a href="#features">기능</a>
      <a href="#report">리포트</a>
      <a href="#pricing">가격</a>
      <a href="#contact-form">문의</a>
    </nav>
  );
}

function Header() {
  return (
    <header className="hb-header">
      <div className="hb-wide hb-header-inner">
        <a className="hb-logo-img" href="#hero">
          <img src="/studyon-assets/jasupon_wordmark.png" alt="자습ON" />
        </a>
        <nav>
          {nav.map((item) => (
            <a
              className={item.label === "자습ON" ? "active" : ""}
              href={item.href}
              key={item.label}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="section-hero" id="hero">
      <div className="hb-wide hero-layout">
        <div className="hero-copy">
          <p>자습실, 아직도 사람이 직접 관리하고 있나요?</p>
          <h1>
            출석·좌석·공부시간·랭킹·보상까지
            <br />한 번에 관리하는 자습실 운영 시스템
          </h1>
          <strong>자습ON</strong>
          <em className="hero-price">월 9,900원부터</em>
        </div>
        <div className="hero-images">
          <img
            className="studyon-hero-mockup"
            src={gen("hero-device-mockup-v2.png")}
            alt="자습ON 학생 앱과 관리자 웹 화면"
          />
        </div>
      </div>
    </section>
  );
}

function DataSection() {
  return (
    <section className="section-data long-section" id="problem">
      <div className="hb-wide">
        <TitleBlock
          title={
            <>
              자습실은 있는데,
              <br />
              관리하려면 사람이 필요합니다
            </>
          }
        />
        <div className="phone-composition">
          <img
            className="phone left"
            src={gen("feature-attendance-seat-v2.png")}
            alt="자습ON 출석 관리 화면"
          />
          <img
            className="phone center"
            src={gen("feature-record-ranking-v2.png")}
            alt="자습ON 공부 기록 화면"
          />
          <img
            className="phone right"
            src={gen("workflow-strip-v2.png")}
            alt="자습ON 운영 자동화 흐름"
          />
        </div>
        <div className="stat-row">
          {techStats.map((stat) => (
            <article key={stat.title} className="big-stat">
              <span>{stat.eyebrow}</span>
              <p>{stat.title}</p>
              <strong>{stat.value}</strong>
              <em>{stat.body}</em>
              <small>{stat.note}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeacherIntro() {
  return (
    <section className="section-teacher-intro long-section" id="operation">
      <div className="hb-wide teacher-intro-grid">
        <div>
          <TitleBlock
            eyebrow="숨은 비용"
            title={
              <>
                자습실 관리에는
                <br />
                보이지 않는 인건비가 들어갑니다
              </>
            }
            align="left"
          />
          <article className="big-stat teacher-stat">
            <span>Hidden Cost</span>
            <p>매일 반복되는 관리 업무</p>
            <strong>조교 1명 이상</strong>
            <em>작아 보여도 계속 잡아먹히는 시간</em>
          </article>
          <p className="lead">
            출석 체크, 좌석 배정, 공부시간 기록, 랭킹 정리, 쿠폰 지급, 학부모
            문의 응대까지 반복되는 업무를 시스템으로 줄입니다.
          </p>
          <a className="primary-pill" href="#contact-form">
            1주 데모 세팅 문의
          </a>
        </div>
        <div className="teacher-composition studyon-teacher-mockups">
          <img
            className="teacher-main"
            src={gen("workflow-vertical-v2.png")}
            alt="자습ON 운영 자동화 흐름"
          />
          <img
            className="teacher-side side-a"
            src={gen("feature-attendance-seat-v2.png")}
            alt="자습ON 출석 좌석 관리"
          />
          <img
            className="teacher-side side-b"
            src={gen("feature-record-ranking-v2.png")}
            alt="자습ON 기록 랭킹 관리"
          />
        </div>
      </div>
    </section>
  );
}

function BridgeSection() {
  return (
    <section className="section-bridge">
      <div className="hb-wide bridge-grid">
        <div>
          <span>학생 입력</span>
          <strong>학생이 직접 기록</strong>
          <p>입실·계획·타이머·퇴실</p>
        </div>
        <b>+</b>
        <div>
          <span>관리자 확인</span>
          <strong>관리자는 한 화면 확인</strong>
          <p>출석·좌석·랭킹·보상</p>
        </div>
      </div>
      <h2>
        사람이 계속 지켜봐야 했던 자습실 관리,
        <br />
        이제 시스템으로 대체하세요
      </h2>
      <p>
        자습ON은 조교와 원장님이 매일 직접 확인하던 반복 업무를 줄이는 학원 운영
        도구입니다
      </p>
    </section>
  );
}

function LineBanner({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: "blue" | "teacher";
}) {
  return (
    <section className={`line-banner ${theme}`}>
      <div className="hb-wide">
        <h2>{children}</h2>
      </div>
    </section>
  );
}

function SystemSection() {
  return (
    <section className="section-system-detail long-section" id="system">
      <div className="hb-wide">
        <TitleBlock
          title={
            <>
              학생이 직접 기록하고,
              <br />
              관리자는 한 화면에서 확인합니다
            </>
          }
        />
        <div className="system-tabs">
          {systemSteps.map((step) => (
            <a href={step.href} key={step.no}>
              <span>STEP {step.no}</span>
              <strong>{step.title}</strong>
            </a>
          ))}
        </div>
        <div className="system-step-grid">
          {systemSteps.map((step) => (
            <article className="system-step" key={step.no}>
              <div>
                <span>{step.no}</span>
                <h3>{step.title}</h3>
                <strong>{step.subtitle}</strong>
                <p>{step.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoursewareSection() {
  return (
    <section className="section-courseware" id="features">
      <div className="hb-wide course-head">
        <TitleBlock
          eyebrow="해결 구조"
          title={
            <>
              출석·좌석·공부시간·보상까지
              <br />
              자습실 관리 업무를 자동화합니다
            </>
          }
        />
        <h3>사람이 매번 확인하던 일을 시스템으로 분산합니다</h3>
        <div className="course-summary">
          <p>
            학생 태블릿 앱으로 입실 시간, 공부계획, 타이머, 퇴실 시간을 직접
            기록합니다
          </p>
          <p>
            관리자 웹과 전자칠판이 출석, 좌석, 랭킹, 보상 현황을 자동으로
            보여줍니다
          </p>
        </div>
        <div className="product-scenes" aria-label="자습ON 제품 화면 구성">
          <article>
            <img
              src={gen("feature-attendance-seat-v2.png")}
              alt="학생 태블릿에서 출석과 좌석을 확인하는 화면"
            />
            <span>학생 태블릿</span>
            <strong>입실 시간과 좌석을 학생이 직접 기록</strong>
          </article>
          <article>
            <img
              src={gen("feature-records.png")}
              alt="관리자 웹에서 공부시간과 학생 상태를 확인하는 화면"
            />
            <span>관리자 웹</span>
            <strong>누가 몇시 몇분에 왔는지 한 화면에서 확인</strong>
          </article>
          <article>
            <img
              src={gen("feature-ranking.png")}
              alt="전자칠판에 표시되는 공부시간 랭킹 화면"
            />
            <span>전자칠판</span>
            <strong>랭킹과 레이스를 자동 노출해 분위기 형성</strong>
          </article>
        </div>
      </div>
      {[...mathLevels, ...englishLevels].map((level, index) => (
        <LevelSection level={level} index={index} key={level.id} />
      ))}
    </section>
  );
}

function LevelSection({
  level,
  index,
}: {
  level: (typeof mathLevels)[number];
  index: number;
}) {
  const isPlain = "variant" in level && level.variant === "plain";

  return (
    <section
      className={`level-section ${level.id.includes("en") ? "english" : "math"} ${isPlain ? "plain" : ""}`}
      id={levelAnchor(level.id)}
    >
      <div className="hb-wide">
        <div className="level-title">
          <strong className="level-badge">자습ON</strong>
          <span>{level.label}</span>
          <p>{level.kicker}</p>
          <h3>{level.title}</h3>
        </div>
        {isPlain ? (
          <div className="plain-level-card">
            <p>{level.desc}</p>
            <ul>
              {level.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        ) : (
          <>
            <div
              className={`slide-wall count-${Math.min(level.slides.length, 6)}`}
            >
              {level.slides.map((src, i) => (
                <img
                  className={i === 0 ? "featured" : ""}
                  src={asset(src)}
                  alt=""
                  key={`${level.id}-${src}`}
                />
              ))}
            </div>
            <img className="down-plus" src={img("sec6_down_plus.png")} alt="" />
          </>
        )}
        {!isPlain ? <p className="level-desc">{level.desc}</p> : null}
        {!isPlain && level.boxes.length > 0 ? (
          <div className="box-row">
            {level.boxes.map((src) => (
              <img src={asset(src)} alt="" key={src} />
            ))}
          </div>
        ) : !isPlain ? (
          <div className="list-grid">
            {level.slides.map((src) => (
              <img src={asset(src)} alt="" key={`list-${src}`} />
            ))}
          </div>
        ) : null}
      </div>
      {index < 7 ? <div className="level-spacer" /> : null}
    </section>
  );
}

function ReportSection() {
  return (
    <section className="section-report" id="report">
      <div className="hb-wide">
        <TitleBlock
          eyebrow="리포트"
          title={
            <>
              학부모에게 보낼 수 있는
              <br />
              자습 기록을 만듭니다
            </>
          }
        />
        <div className="report-grid">
          <article>
            <span>01</span>
            <strong>출결 리포트</strong>
            <p>입실, 퇴실, 지각, 미입실 시간을 분 단위로 확인합니다.</p>
          </article>
          <article>
            <span>02</span>
            <strong>공부시간 리포트</strong>
            <p>과목별 타이머와 누적 공부시간을 상담 자료로 정리합니다.</p>
          </article>
          <article>
            <span>03</span>
            <strong>원클릭 학부모 공유</strong>
            <p>학생별 자습 리포트를 클릭 한 번으로 학부모에게 보냅니다.</p>
          </article>
        </div>
      </div>
    </section>
  );
}

function RaceSection() {
  return (
    <section className="section-race" id="race">
      <div className="hb-wide race-grid">
        <div>
          <span className="race-eyebrow">레이스·랭킹</span>
          <h2>
            공부시간이 보이면
            <br />
            자습실 분위기가 달라집니다
          </h2>
          <p>
            학생들이 지금 누가 앞서고 있는지 바로 볼 수 있도록 공부시간 레이스와
            랭킹을 시각적으로 보여줍니다.
          </p>
        </div>
        <div className="race-board" aria-label="공부시간 레이스 예시">
          {[
            { name: "민준", time: "3시간 42분", progress: "92%" },
            { name: "서연", time: "3시간 18분", progress: "81%" },
            { name: "지호", time: "2시간 54분", progress: "68%" },
          ].map((student, index) => (
            <div className="race-row" key={student.name}>
              <strong>{index + 1}</strong>
              <span>{student.name}</span>
              <div>
                <i style={{ width: student.progress }} />
              </div>
              <em>{student.time}</em>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="section-pricing" id="pricing">
      <div className="hb-wide">
        <TitleBlock
          eyebrow="요금안내"
          title={
            <>
              학생 수에 맞춰
              <br />
              부담 없이 시작하세요
            </>
          }
        />
        <div className="pricing-table">
          {pricingPlans.map((plan) => (
            <article key={plan.range}>
              <span>{plan.range}</span>
              <strong>{plan.price}</strong>
            </article>
          ))}
        </div>
        <p className="pricing-note">
          월 이용료 기준 · 151명 이상은 학원 운영 방식에 맞춰 별도 상담
        </p>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="section-final" id="contact">
      <div className="hb-wide final-grid">
        <div>
          <h2>
            자습실 관리,
            <br />
            사람에게만 맡기지 마세요.
          </h2>
          <p>
            출석이 보이고, 좌석이 관리되고, 공부시간이 쌓이고, 보상이 운영되는
            공간으로 바꿉니다.
          </p>
          <p className="price-copy">월 9,900원부터 · 1주 데모 세팅 가능</p>
          <a className="primary-pill" href="#contact-form">
            도입 문의하기
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="wrap-footer">
      <div className="hb-wide footer-grid">
        <div>
          <strong className="footer-brand">자습ON</strong>
          <p>
            자습실 출석, 좌석, 공부시간, 랭킹, 보상 관리를 자동화하는 학원 운영
            시스템
          </p>
          <p>사람이 계속 붙어 있어야 했던 자습실 관리를 시스템으로 줄입니다.</p>
        </div>
        <div className="footer-call">
          <strong>도입 및 운영 문의</strong>
          <span>출결 관리 상담</span>
          <span>좌석·리포트 상담</span>
        </div>
      </div>
    </footer>
  );
}

function BottomTrialBanner() {
  return (
    <aside className="bottom-banner">
      <div className="hb-wide">
        <img src={img("ban_img1.png")} alt="" />
        <strong>자습ON 도입 문의</strong>
        <a href="#contact-form">문의하기</a>
      </div>
    </aside>
  );
}

function TitleBlock({
  eyebrow,
  title,
  align = "center",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  align?: "center" | "left";
}) {
  return (
    <div className={`title-block ${align}`}>
      {eyebrow ? <span>{eyebrow}</span> : null}
      <h2>{title}</h2>
    </div>
  );
}
