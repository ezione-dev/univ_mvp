## Why

현재 메인화면(`MainPage`)은 플레이스홀더 상태로, `docs/new_main/code.html`의 대학 종합 현황 대시보드 디자인을 React 컴포넌트로 변환하여 실제 사용 가능한 메인화면이 필요합니다. 기존 `DashboardPage`는 `/dashboard/legacy`로 분리되어 있으며, 새 메인화면은 대학의 핵심 KPI 및 분석 데이터를 한눈에 제공하는 통합 대시보드로 구성됩니다.

## What Changes

- `MainLayout` 레이아웃 컴포넌트 생성 (헤더, 네비게이션, 유저메뉴)
- `MainPage` 페이지 생성 및 `/` 라우팅
- KPI 카드, 매트릭스 차트, 인사이트 패널, 테이블 등 UI 컴포넌트 변환
- `tailwind.config.js` DESIGN.md 색상 시스템 반영
- `src/data/main_page_samples.json` 샘플 데이터 파일 생성
- 하드코딩된 샘플 데이터로 초기 렌더링

## Capabilities

### New Capabilities

- `main-page`: 메인 대시보드 페이지 - 대학 종합 현황 KPI, 강점/약점 매트릭스, 핵심 인사이트, 리스크/우위 분석 테이블, 목표 달성도 프로그레스를 표시
- `main-layout`: 공유 레이아웃 - 로고, 네비게이션 탭, 알림/설정/프로필 아이콘 포함

### Modified Capabilities

- (없음 - 새 기능만 추가)

## Impact

- `frontend/src/App.jsx` - `/` 라우팅이 `MainPage` 사용하도록 변경
- `frontend/src/components/main/` - 신규 컴포넌트 디렉토리
- `frontend/src/layouts/` - `MainLayout.jsx` 신규
- `frontend/src/pages/MainPage.jsx` - 기존 플레이스홀더 대체
- `frontend/src/data/main_page_samples.json` - 샘플 데이터 파일
- `frontend/tailwind.config.js` - DESIGN.md 색상/반경 업데이트
