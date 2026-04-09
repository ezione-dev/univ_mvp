## ADDED Requirements

### Requirement: 비운영 빌드에서의 레거시 대시보드 라우트

애플리케이션은 `import.meta.env.PROD`가 false인 경우에 한해, 클라이언트 라우터에 경로 `/dashboard/legacy`를 등록해야 한다. 앱은 **사이트 루트**에서 서빙되며(`BrowserRouter` 기본·Vite `base` `/`), 별도 `basename` 접두 경로는 본 변경 범위에서 다루지 않는다. 등록된 라우트는 `DashboardLayout` 하위의 `DashboardPage`로 Scholar Metric 대시보드 상호작용 경험을 렌더링해야 한다.

#### Scenario: 비운영에서 레거시 경로 접근

- **WHEN** `import.meta.env.PROD`가 false인 빌드로 애플리케이션이 실행 중이다
- **AND** 사용자가 `/dashboard/legacy`로 이동한다
- **THEN** 애플리케이션은 정의된 대시보드 경험을 표시한다
- **AND** 해당 경로만으로 not-found(404) 화면을 표시해서는 안 된다

### Requirement: 운영 빌드에서 레거시 대시보드 라우트 미등록

애플리케이션은 `import.meta.env.PROD`가 true일 때 `/dashboard/legacy` 라우트를 등록해서는 안 된다.

#### Scenario: 운영에서 레거시 직접 URL

- **WHEN** `import.meta.env.PROD`가 true인 빌드로 애플리케이션이 실행 중이다
- **AND** 사용자가 `/dashboard/legacy`로 이동한다
- **THEN** 어떤 등록된 라우트도 해당 경로와 일치하지 않는다
- **AND** 애플리케이션은 **프론트엔드 라우팅 스펙**에 따라 알 수 없는 경로에 대해 **not-found** 화면을 표시해야 한다

### Requirement: 비운영 빌드에서의 인사이트(`/insights`) 라우트

애플리케이션은 `import.meta.env.PROD`가 false인 경우에 한해 `/insights`에 `QueryPage`를 등록해야 한다. 운영 빌드에서는 등록하지 않아 404로 처리한다.

#### Scenario: 비운영에서 인사이트 접근

- **WHEN** `import.meta.env.PROD`가 false이다
- **AND** 사용자가 `/insights`로 이동한다
- **THEN** 자연어 질의·차트 경험(`QueryPage`)이 표시된다

#### Scenario: 운영에서 인사이트 직접 URL

- **WHEN** `import.meta.env.PROD`가 true이다
- **AND** 사용자가 `/insights`로 이동한다
- **THEN** 등록된 라우트와 일치하지 않아 not-found 화면이 표시된다

### Requirement: 운영에서 숨김 경로로의 UI 내비게이션 금지

`import.meta.env.PROD`가 true일 때, 애플리케이션은 `/dashboard/legacy` 또는 `/insights`로 이어지는 것이 주된 동작인 사용자에게 보이는 컨트롤(`Link`, 프로그래매틱 내비게이션, 해당 URL을 목적지로 하는 앵커 등)을 렌더링해서는 안 된다.

#### Scenario: 운영 크롬에 숨김 경로 링크 없음

- **WHEN** `import.meta.env.PROD`가 true이다
- **AND** 사용자가 메인 랜딩 및 등록된 화면의 지속적 크롬을 본다
- **THEN** 위 두 경로로 이동시키는 보이는 컨트롤은 없어야 한다

### Requirement: 애플리케이션 루트 랜딩

루트 경로 `/`는 Scholar Metric 대시보드가 아니라 애플리케이션 메인 랜딩(`MainPage`)을 표시해야 한다. Scholar Metric 대시보드 셸은 비운영 빌드에서 `/dashboard/legacy`로만 본 스펙 범위에서 접근한다.

#### Scenario: 루트는 메인화면

- **WHEN** 사용자가 `/`로 이동한다
- **THEN** `MainPage`(메인화면)가 표시된다
