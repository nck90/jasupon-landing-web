# 진수학 HOT-습 챌린지 TV Display Web

전자칠판 랭킹 화면 배포용 레포입니다.

## 필요값

- `API_URL=https://운영-api-domain`
- 참고 파일: `.env.production.example`

## 배포 순서

```bash
npm install
API_URL=https://운영-api-domain npm run build
npm run start
```

## 운영 전 확인

- 전자칠판 브라우저에서 접속
- 1920x1080 또는 실제 전자칠판 해상도 확인
- 랭킹 5~10명 표시
- 글자 잘림/겹침/불필요한 스크롤 없음
- 앱 공부시간 변경 후 랭킹 반영
