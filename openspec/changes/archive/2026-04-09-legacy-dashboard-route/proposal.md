## Why

메인 화면을 `docs/new_main` 방향으로 새로 짜는 동안, 지금의 대학 비교·랭킹 대시보드(`DashboardPage`)와 자연어 인사이트 화면(`QueryPage`)을 **개발·내부 확인용**으로 보존해야 한다. 동시에 **운영(production) 빌드**에서는 해당 URL을 **등록하지 않아** 직접 입력 시 404와 같이 처리하고, **공개 UI 링크로도 노출하지 않기**를 원한다(발견 가능성·혼선 최소화).

## What Changes

- **루트 `/`**: 애플리케이션 메인 랜딩은 `MainPage`(메인화면). Scholar Metric 대시보드는 루트에 두지 않는다.
- **`/dashboard/legacy`**: `import.meta.env.PROD`가 **아닐 때만** 등록하고 `DashboardLayout` + `DashboardPage`를 렌더한다. 운영 빌드에서는 **미등록 → not-found** 와 동일.
- **`/insights`**: 동일하게 **비운영에서만** `QueryPage`를 등록한다. 운영에서는 미등록·404.
- **내비게이션**: 운영 빌드에서 `/dashboard/legacy`, `/insights`로 가는 **보이는** 링크·버튼 등을 두지 않는다.
- **배포 경로**: 현재 구현은 **사이트 루트**(`Vite base` `/`, `BrowserRouter` 기본) 기준. 하위 경로 배포용 `basename`/`VITE_APP_BASE`는 본 리포지토리 상태에서 사용하지 않는다(필요 시 별도 변경).
- **별도 환경 변수 플래그는 사용하지 않는다** (`import.meta.env.PROD`만 사용).
- **BREAKING**: 운영에서 이전에 공개용으로 고정하지 않았던 개발용 URL 정책을 명시한다.

## Capabilities

### New Capabilities

- (없음 — 라우팅·노출 정책은 `frontend-routing` 델타로 반영.)

### Modified Capabilities

- `frontend-routing`: 루트 메인 랜딩, `/insights`·`/dashboard/legacy` 비운영 전용 등록, 운영 미노출·내비 금지.
- `scholar-metric-ui`: Scholar Metric 대시보드 셸은 **비운영**에서 `/dashboard/legacy`에만 해당 시나리오로 명시(루트 `/`는 메인 랜딩).

## Impact

- **코드**: `frontend/src/App.jsx`, `MainPage`, 공통 내비·메인에서 숨김 경로 링크 제거.
- **문서**: OpenSpec 델타 스펙 2종(`frontend-routing`, `scholar-metric-ui`); 메인 스펙 동기화.
- **후속**: 비운영에서 `/dashboard/legacy`로 기존 대시보드 회귀 비교, `/insights`로 쿼리 화면 확인.
