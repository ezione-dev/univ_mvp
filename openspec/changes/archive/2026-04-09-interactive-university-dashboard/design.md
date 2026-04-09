## Context

현재 대시보드는 정적인 컴포넌트들이 하드코딩된 데이터를 출력하고 있다. `DashboardPage`를 상태 컨테이너로 전환하여, `UniversitySearch` 및 `IndicatorSelector`에서 발생한 입력을 차트(`RankingHeatmapCard`)와 요약 패널(`InstitutionSummaryPanel`)에 즉시 반영해야 한다. 백엔드에서 제공하는 3종 API를 효율적으로 호출하여 레이턴시를 최소화하고 부드러운 전환을 제공하는 것이 핵심이다.

## Goals / Non-Goals

**Goals:**
- 대학 및 지표 선택 시 실시간으로 대시보드 데이터 갱신
- 입력 컴포넌트(검색, 지표 선택)와 출력 컴포넌트(차트, 요약) 간의 상태 연동
- 사용자가 5개 초과 지표를 선택하지 못하도록 하는 클라이언트 측 제어 로직 구현
- 대시보드 로딩 상태 시각화

**Non-Goals:**
- 영구 검색 기록 저장 (로컬 스토리지 등)
- 차트 종류의 변경 (현재 히트맵 유지)
- 세션/로그인 연동

## Decisions

### 1. 상태 관리 전략 (Lifting State Up)

`DashboardPage` 상단에서 `selectedSchool`과 `selectedIndicators` 상태를 관리한다. 이 상태들이 변경될 때마다 전용 `useEffect`가 `comparison` API를 호출하여 `rankingData`를 갱신한다. 이는 컴포넌트 간의 복잡한 props 전달을 방지하고 데이터 일관성을 유지하기 위함이다.

### 2. 대학 검색 디바운싱 (Debouncing)

`UniversitySearch`에서 입력을 받을 때마다 API를 호출하면 서버 부하가 커지므로, 300ms의 디바운스를 적용한다. `axios`의 `CancelToken`을 활용하여 이전 요청을 취소함으로써 네트워크 낭비를 방지한다.

### 3. 지표 로컬 캐싱 및 검색

지표 목록(60여 개)은 앱 진입 시 한 번만 로드하여 메모리에 캐싱한다. `IndicatorSelector` 내부에서 지표명을 실시간으로 필터링하는 기능을 추가하여 사용자 편의성을 높인다.

### 4. 차트 데이터 정규화

`RankingHeatmapCard`는 기존에 1-10위 단위의 고정된 행을 가지고 있다. 실제 데이터가 이 범위를 벗어날 경우(예: 150위), 디자인 가이드를 준수하기 위해 상위 100위 밖은 별도의 'Out of Range' 그룹으로 묶거나, 표시 구간을 동적으로 확장하는 유연한 렌더링 로직을 추가한다.

## Risks / Trade-offs

- **[Risk]** 지표를 변경할 때마다 대량의 데이터를 다시 렌더링하면 성능 저하가 발생할 수 있음
  - → Mitigation: React Memo 및 차트 데이터 부분 갱신(ECharts 특징 활용)을 통해 최적화
- **[Trade-off]** 모든 상태를 최상위(`DashboardPage`)에 보관하면 하위 컴포넌트로의 Props Drillings가 일부 발생함
  - → Mitigation: 현재 컴포넌트 깊이가 깊지 않으므로 Context API 도입 대신 명시적인 Props 전달 방식 선택
- **[Risk]** API 호출 실패 시 대시보드가 먹통이 되는 상황
  - → Mitigation: Error Boundary 또는 사용자에게 노출되는 에러 알림(Toast 등) 제공
