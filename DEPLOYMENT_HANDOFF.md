# 진수학 HOT-습 챌린지 배포 인수인계

## 배포 대상

### 1. Backend API
- 경로: `studyon_server`
- 역할: 학생 앱, 관리자 웹, 전자칠판 웹이 공통으로 사용하는 API 서버
- 주요 기능:
  - 관리자/학생 로그인
  - 학생 계정 발급
  - 입실/퇴실
  - 공부 리스트/공부 타이머
  - HOT-습 랭킹
  - 10시 이전 출석 360분 보너스
  - 15칸 출석 기록판
  - 5일 출석 음료쿠폰
  - 수호천사 면제권
  - 쿠폰 재고/사용/정산
  - 전자칠판 공개 API

### 2. Student Flutter App
- 경로: `studyon_client/apps/studyon_client`
- 역할: iPad 학생용 앱
- 운영 API 연결값 필요:
  - `API_BASE_URL=https://운영-api-domain`

### 3. Admin Web
- 경로: `studyon_client/apps/admin_web`
- 역할: 관리자/원장 웹
- 운영 API 연결값 필요:
  - `API_URL=https://운영-api-domain`

### 4. TV Display Web
- 경로: `studyon_client/apps/tv_display_web`
- 역할: 전자칠판 랭킹 화면
- 운영 API 연결값 필요:
  - `API_URL=https://운영-api-domain`

## 서버 운영 환경 변수

```env
NODE_ENV=production
PORT=3000
APP_NAME=STUDYON API
APP_URL=https://운영-api-domain
CORS_ORIGIN=https://관리자웹도메인,https://전자칠판웹도메인

DATABASE_URL=postgresql://USER:PASSWORD@HOST:5432/studyon?schema=public
REDIS_URL=redis://USER:PASSWORD@HOST:6379

JWT_ACCESS_SECRET=충분히_긴_랜덤_문자열
JWT_REFRESH_SECRET=충분히_긴_랜덤_문자열
PARENT_PORTAL_SECRET=충분히_긴_랜덤_문자열

DEFAULT_ADMIN_EMAIL=admin@studyon.local
DEFAULT_ADMIN_PASSWORD=운영초기비밀번호
```

## Backend API 배포 순서

```bash
cd studyon_server
pnpm install --frozen-lockfile
pnpm prisma:generate
pnpm prisma:migrate:deploy
pnpm build
pnpm start:prod
```

배포 후 확인:

```bash
curl https://운영-api-domain/api/v1/health
```

정상 응답이 나오면 API 서버는 기동된 상태입니다.

## Admin Web 배포 순서

```bash
cd studyon_client/apps/admin_web
npm install
API_URL=https://운영-api-domain npm run build
npm run start
```

확인 URL:
- `/login`
- `/students`
- `/attendance`
- `/rewards`
- `/settings`
- `/tv`

## TV Display Web 배포 순서

```bash
cd studyon_client/apps/tv_display_web
npm install
API_URL=https://운영-api-domain npm run build
npm run start
```

확인:
- 전자칠판 브라우저에서 TV URL 접속
- 브라우저 확대비율 100%
- 1920x1080 또는 전자칠판 실제 해상도에서 글자 잘림 없는지 확인
- 랭킹 5~10명 표시 확인

## Flutter iPad 앱 운영 빌드

```bash
cd studyon_client/apps/studyon_client
flutter pub get
flutter build ios --release --no-codesign \
  --dart-define=API_BASE_URL=https://운영-api-domain \
  --dart-define=APP_ENV=prod \
  --dart-define=ENABLE_LOGGING=false \
  --dart-define=DEVICE_CODE=studyon_client_release
```

시뮬레이터 테스트:

```bash
flutter run \
  --dart-define=API_BASE_URL=https://운영-api-domain \
  --dart-define=APP_ENV=prod \
  --dart-define=ENABLE_LOGGING=true \
  --dart-define=DEVICE_CODE=qa-ipad-01
```

## 운영 DB 초기 세팅

운영 DB에 반드시 필요한 데이터:
- 관리자 계정
- 학년/반/그룹
- 좌석
- 학생 계정
- HOT-습 정책
- 쿠폰 재고
- TV 설정

학생 계정 정책:
- 학생 ID: 핸드폰번호
- 학생 초기 비밀번호: `t12345`
- 학생 정보: 이름, 성별, 학교, 핸드폰번호, 비밀번호, 좌석

주의:
- 운영 DB에 로컬 QA 데이터나 테스트 학생을 그대로 넣지 말 것
- seed 실행 후 기본 관리자 비밀번호는 반드시 변경할 것

## HOT-습 운영 정책 확인값

- 기간: 3주
- 기준일: 평일 15일
- 등원 기준: 매일 오전 10시까지
- 10시 이전 출석: 360분 보너스
- 랭킹 점수: 실제 공부시간 + 출석 보너스
- 핵심 보상 1: 수석 장학금 20만원
- 핵심 보상 2: 연속 5일 출석 음료쿠폰
- 보조 보상: 하루 5시간 이상 공부 시 수호천사
- 쿠폰 재고 기본값: 100장

## 운영 전 필수 리허설

1. 관리자 웹 로그인
2. 학생 1명 등록
3. 학생 앱 로그인
4. 입실 처리
5. 오늘 공부 리스트 작성
6. 공부 시작
7. 공부 종료
8. 학생 앱 랭킹 확인
9. 관리자 대시보드 확인
10. 전자칠판 랭킹 확인
11. 쿠폰/수호천사 화면 접근 확인
12. 로그아웃 후 재로그인

통과 기준:
- 학생 앱 공부시간이 앱 랭킹에 반영됨
- 학생 앱 공부시간이 관리자 HOT 대시보드에 반영됨
- 학생 앱 공부시간이 전자칠판 랭킹에 반영됨
- 10시 전 출석 학생에게 360분 보너스 반영됨
- 오늘 공부 리스트가 수학 고정이 아님
- 전자칠판 화면에서 글자 잘림/깨짐/스크롤 문제가 없음

## 최종 QA 통과 내역

통과한 검증:
- 서버 build/test
- Flutter analyze/test
- 관리자 웹 build
- TV 웹 build
- iPad 통합 스모크
- HOT-습 최종 리허설
- QR 동시 로그인 1회 성공 제한
- 기기 등록 invalid input 400 처리
- 비활성 학생 refresh 차단 및 세션 만료 처리
- KST 기준 날짜 처리
- 출석/지각/결석 도장판 중복 처리 방지
- 쿠폰 중복 사용/정산 방지
- 수호천사 중복 사용 방지
- 전자칠판 랭킹 연동

## 남은 현장 체크

- 운영 서버 시간/KST 기준 확인
- 운영 API HTTPS 인증서 확인
- 관리자 웹 CORS 확인
- iPad에서 운영 API 접속 확인
- 전자칠판 네트워크에서 운영 API 접속 확인
- 운영 DB 백업 설정
- Redis 재시작 시 세션 영향 확인
- 전자칠판 브라우저 전체화면/확대비율 확인

