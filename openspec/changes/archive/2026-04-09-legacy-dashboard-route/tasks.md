## 1. 라우팅

- [x] 1.1 `frontend/src/App.jsx`에서 루트 `/`는 `MainPage`(메인화면)로 등록한다.
- [x] 1.2 `import.meta.env.PROD`가 false일 때만 `/dashboard/legacy`를 등록한다(`DashboardLayout` + `DashboardPage` index).
- [x] 1.3 `import.meta.env.PROD`가 false일 때만 `/insights`를 등록한다(`QueryPage`).
- [x] 1.4 production 빌드 후 `/dashboard/legacy`, `/insights`가 미등록으로 `NotFoundPage` 처리되는지 확인한다.
- [x] 1.5 사이트 루트 배포만 사용한다(Vite `base` `/`, `BrowserRouter` 기본). 하위 경로 `basename`/`VITE_APP_BASE`는 사용하지 않는다.

## 2. 내비게이션·링크 감사

- [x] 2.1 `frontend/src`에서 `dashboard/legacy`, `/dashboard/legacy`, `/insights`가 운영 빌드에 노출 링크로 쓰이지 않는지 확인한다(필요 시 `!import.meta.env.PROD`로 제한).
- [x] 2.2 `MainPage`, `Sidebar`, `TopBar`, `NotFoundPage`, `SupportPage` 등에 숨김 경로로 가는 컨트롤이 없는지 확인한다.

## 3. 스펙 정합성

- [x] 3.1 `openspec/specs/frontend-routing`, `openspec/specs/scholar-metric-ui` 및 본 변경 `specs/` 델타가 구현과 일치하는지 유지한다.
