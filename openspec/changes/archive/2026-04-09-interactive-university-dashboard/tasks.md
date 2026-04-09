## 1. 서비스 및 상태 기반 구축

- [x] 1.1 `frontend/src/services/rankings.js` 생성 및 API 호출 함수(`searchSchools`, `getIndicators`, `getComparison`) 구현
- [x] 1.2 `DashboardPage.jsx`의 `DashboardFilters` 컴포넌트를 분리된 인터랙티브 컴포넌트로 교체 준비
- [x] 1.3 `DashboardPage`에 전역 상태(`selectedSchool`, `selectedIndicators`, `rankingData`) 추가 및 초기값(서울대 등) 설정

## 2. 입력 컴포넌트 구현

- [x] 2.1 `frontend/src/components/rankings/UniversitySearch.jsx` 생성 (디바운스 검색 로직 포함)
- [x] 2.2 `frontend/src/components/rankings/IndicatorSelector.jsx` 생성 (지표 목록 로드 및 5개 제한 토글 로직)
- [x] 2.3 `DashboardPage`에 두 컴포넌트 배치 및 상태 연동

## 3. 데이터 시각화 및 통합

- [x] 3.1 `DashboardPage`에서 선택 변경 시 `getComparison` 호출하여 `rankingData` 갱신하는 브릿지 로직 구현
- [x] 3.2 `RankingHeatmapCard.jsx` 수정: Props로 전달받은 실제 `rankingData`로 마커 및 라벨 렌더링
- [x] 3.3 로딩 상태를 위한 단순 Skeleton UI 또는 Spinner 적용

## 4. 프리미엄 폴리싱 및 검증

- [ ] 4.1 Tailwind CSS를 사용한 입출력 컴포넌트 디자인 마감 (Glassmorphism 스타일)
- [ ] 4.2 모바일/태블릿 반응형 레이아웃 확인
- [ ] 4.3 실제 검색 및 선택 시 차트가 즉시 업데이트되는지 최종 검증
