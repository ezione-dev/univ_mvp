## ADDED Requirements

### Requirement: 비운영 빌드에서 레거시 경로로 Scholar Metric MVP 대시보드 접근

`import.meta.env.PROD`가 false일 때, Scholar Metric UI 스펙에 따른 대시보드 뷰(셸 및 MVP 본문)는 **`/dashboard/legacy`** 경로로 접근 가능해야 한다. 애플리케이션 루트 `/`는 `MainPage`(메인화면)이므로, “기본 대시보드 진입”과 동등한 Scholar 셸·본문 비교는 **같은 비운영 빌드 안에서** `/dashboard/legacy` 한 경로를 기준으로 하거나, 해당 경로에 도달했을 때의 동작을 기술한다.

#### Scenario: 비운영에서 레거시 경로로 Scholar 셸 표시

- **WHEN** `import.meta.env.PROD`가 false인 빌드로 애플리케이션이 실행 중이다
- **AND** 사용자가 `/dashboard/legacy`로 이동한다
- **THEN** 애플리케이션은 Scholar Metric UI 스펙이 요구하는 구조 요소(사이드바, 상단 앱 바, 대시보드 본문 영역)를 갖춘 Scholar Metric 대시보드 셸을 표시한다
- **AND** 데이터 로딩, 목/정적 콘텐츠 동작, 주요 비파괴적 액션은 구현된 `DashboardPage` 기대 동작과 일치해야 한다

### Requirement: 운영 빌드에서 Scholar 대시보드 URL 미제공

`import.meta.env.PROD`가 true일 때, 애플리케이션은 `/dashboard/legacy`에 Scholar Metric 대시보드를 라우트로 등록하지 않는다(프론트엔드 라우팅 스펙과 동일). 운영 사용자는 URL로 해당 MVP 대시보드에 진입할 수 없다.

#### Scenario: 운영에서 Scholar 레거시 URL

- **WHEN** `import.meta.env.PROD`가 true이다
- **AND** 사용자가 `/dashboard/legacy`로 이동한다
- **THEN** not-found 흐름으로 처리된다
