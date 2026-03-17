# Autoencoder Playground

`autoencoder.pdf`(Deep Learning Book Chapter 14)를 바탕으로 만든 Vite 기반 인터랙티브 학습 사이트입니다.

## 무엇이 들어 있나
- 50개 학습 섹션
- 쉬운 한국어 설명
- 비유 / 오해 교정 / 원문 포인트
- 인터랙티브 랩
- Mission Board / Latent Rescue Challenge
- Source Trace / Scope Note / Reference Basis

## 실행
```bash
npm install
npm run dev
```

## 프로덕션 빌드
```bash
npm run build
```

빌드 결과물은 `dist/`에 생성됩니다.

## 검증
```bash
node --check src/main.js
node --check src/content.js
npm run build
npm audit --omit=dev
```

## 배포
정적 호스팅이면 대부분 바로 배포할 수 있습니다.

### Netlify / Cloudflare Pages / Vercel
- build command: `npm run build`
- output directory: `dist`

### GitHub Pages
1. `npm run build`
2. `dist/` 내용을 정적 사이트로 배포
3. 프로젝트가 서브패스에 배포된다면 Vite base 설정을 추가로 조정

## 보안/신뢰 메모
- 이 사이트는 **교육용 인터랙티브 시뮬레이션**입니다.
- 실제 학습된 autoencoder 추론 데모가 아니라 개념 이해를 돕는 설명형 웹 경험입니다.
- 배포 시 `public/_headers` 예시처럼 보안 헤더를 적용하면 더 안전합니다.

## 주요 파일
- `src/content.js`: 섹션 콘텐츠 / source trace / reference basis
- `src/main.js`: 상태 / 내비게이션 / 인터랙션 렌더링
- `src/style.css`: 레이아웃 / 반응형 / 인터랙션 스타일
- `public/_headers`: 정적 호스팅용 보안 헤더 예시
