## Context

- 프론트는 Vite + React Router(`frontend/src/App.jsx`)를 사용한다.
- **루트 `/`** 는 `MainPage`(메인화면)이고, Scholar Metric 대시보드(`DashboardLayout` + `DashboardPage`)는 **`/dashboard/legacy`** 에서만 비운영 빌드로 노출한다.
- 자연어 인사이트(`QueryPage`)는 **`/insights`** 에서만 비운영 빌드로 노출한다.
- **운영 빌드**에서는 위 두 경로를 라우터에 등록하지 않아 직접 URL 입력 시 **404 규칙**으로 처리한다.
- 노출 스위치는 **`import.meta.env.PROD`만** 사용한다(추가 `VITE_*` 플래그 없음).
- 배포는 **도메인 루트** 기준(`base` `/`, `basename` 없음). 하위 경로 전용 설정은 현재 코드베이스에서 제거된 상태이다.

## Goals / Non-Goals

**Goals:**

- 비운영에서 `/dashboard/legacy`, `/insights`로 기존 화면에 접근 가능하게 한다.
- 운영에서 해당 라우트를 등록하지 않고, 공개 UI에 두 경로로 가는 내비게이션을 두지 않는다.

**Non-Goals:**

- 서버 사이드 경로 차단 또는 번들에서 코드 완전 제외 수준의 숨김.
- `VITE_ENABLE_LEGACY_DASHBOARD` 등 추가 플래그.

## Decisions

1. **조건: `import.meta.env.PROD`**  
   - 비운영에서만 `/dashboard/legacy`, `/insights` 등록.

2. **라우트 정의: `App.jsx`의 `Routes`**  
   - 한 파일에 유지해 변경 범위 최소화.

3. **레거시 대시보드: `DashboardPage` 재사용**  
   - `/dashboard/legacy`에서 기존 구현 그대로.

4. **인사이트: `QueryPage` 재사용**  
   - `/insights`에서 기존 구현 그대로.

5. **운영 링크 금지**  
   - 메인·공통 크롬에서 숨김 경로로 이어지는 컨트롤 없음.

## Risks / Trade-offs

- 스테이징이 production 모드 빌드를 쓰면 비운영 전용 URL을 열 수 없다 → 로컬 dev 또는 비운영 모드 빌드로 확인.
- 클라이언트만 숨김이므로 번들에 페이지 코드가 남을 수 있다 → UX 수준 노출 차단으로 한정.

## Migration Plan

1. 비운영에서 `/dashboard/legacy`, `/insights` 동작 확인 후 배포 정책 공유.
2. 운영 빌드에서 두 경로 404 및 내비 무링크 확인.

## Open Questions

- (없음.)
