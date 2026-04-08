## Why

현재 대학 대시보드는 정적인 데이터(건국대학교 고정)를 보여주고 있어 데이터 탐색이 불가능하다. 사용자가 원하는 대학을 검색하고 관심 있는 지표를 직접 선택하여 실시간으로 순위 분포를 시각화할 수 있는 인터랙티브한 대시보드 환경이 필요하다.

## What Changes

- **신규 컴포넌트 추가**: `UniversitySearch` (자동완성 검색), `IndicatorSelector` (다중 지표 선택)
- **기존 페이지 고도화**: `DashboardPage.jsx`에 통합 상태 관리 및 API 연동 로직 추가
- **기존 차트 고도화**: `RankingHeatmapCard.jsx`가 동적 데이터를 받아 렌더링하도록 수정
- **통합 데이터 흐름**: 대학/지표 변경 시 백엔드 API를 호출하여 화면 전체가 즉시 반응하는 루프 완성

## Capabilities

### New Capabilities
- `interactive-university-dashboard`: 사용자 입력(검색/선택)에 반응하여 실시간으로 데이터를 갱신하고 시각화하는 통합 대시보드 기능

### Modified Capabilities
- (없음)

## Impact

- **프론트엔드**: `DashboardPage`와 하위 컴포넌트들의 데이터 흐름이 Mock 중심에서 API 중심으로 전환됨
- **사용자 경험**: "검색 -> 선택 -> 즉시 시각화"로 이어지는 매끄러운 UX 제공
- **백엔드**: 아까 만든 rankings 관련 API들을 본격적으로 소모하기 시작함
