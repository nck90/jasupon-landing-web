# STUDYON HOT-습 TV Display Web

진수학 HOT-습 챌린지 전자칠판용 Next.js 16 앱이다. 학원 TV에서 커밍순 포스터, 실시간 공부시간 레이스, 혜택 보드를 PPT 슬라이드처럼 자동 순환 표시한다.

## Local run

```bash
npm install
npm run dev
```

기본 개발 포트는 `11112`다.

## Production build

```bash
npm run build
```

standalone 배포 런타임과 정적 파일까지 포함하려면 루트 스크립트를 사용한다.

```bash
cd /Users/bagjun-won/studyon
./scripts/build_web_release.sh
```

실행:

```bash
PORT=11112 HOSTNAME=0.0.0.0 node .next/standalone/server.js
```

## Environment

- `PORT`: server port
- `HOSTNAME`: bind address
- `API_URL`: backend origin for `/api/*` rewrite target

예시는 [.env.example](/Users/bagjun-won/studyon/apps/tv_display_web/.env.example:1)에 있다.
