## Context

현재 `MainPage`는 플레이스홀더 상태이며, `docs/new_main/code.html`의 HTML/Tailwind 데모를 React 컴포넌트로 변환해야 합니다.

**현재 상태:**
- `/` → 플레이스홀더 `MainPage`
- `/dashboard/legacy` → 기존 `DashboardPage` (순위 비교)
- `/insights` → `QueryPage` (자연어 쿼리)
- `/support` → `SupportPage`

**Design System (docs/new_main/DESIGN.md):**
- Blue-Centric 색상 시스템 (Primary #002c5a, Secondary #006492)
- "The Academic Curator" - premium, scholarly, modern
- "No-Line Rule" - 배경색 차이로 경계 구분
- Manrope (Headlines) + Inter (Body) 타이포그래피
- 1rem border-radius (roundedness-lg)

## Goals / Non-Goals

**Goals:**
- `MainLayout` 생성 (헤더, 네비게이션 탭, 유저메뉴)
- `MainPage` 생성 (KPI 그리드, 매트릭스 차트, 인사이트 패널, 테이블)
- DESIGN.md 색상/타이포그래피 시스템을 Tailwind 설정에 반영
- 샘플 데이터 JSON 파일로 컴포넌트 렌더링
- 나중에 API 연동 시 데이터 소스만 교체即可

**Non-Goals:**
- API 연동 (샘플 데이터로 초기 렌더링)
- 네비게이션 탭 클릭 동작 (버튼만 존재, 클릭 시 이벤트なし)
- PDF/상세 리포트 버튼 동작
- 반응형 레이아웃 세밀한 조정

## Decisions

### 1. Tailwind 색상 업데이트 (docs/new_main/code.html 기준)

`tailwind.config.js`의 색상을 DESIGN.md 시스템으로 교체:

```js
// 변경 전
primary: '#002045'
secondary: '#2c694e'

// 변경 후
primary: '#002c5a'
secondary: '#006492'
primary-container: '#004282'
tertiary: '#003509'
error: '#ba1a1a'
// ... (DESIGN.md 색상 테이블 참조)
```

### 2. borderRadius 업데이트

```js
// 변경 전
lg: '0.25rem'

// 변경 후
lg: '1rem',  // DESIGN.md roundedness-lg
full: '9999px'  // status chips
```

### 3. 컴포넌트 디렉토리 구조

```
src/components/main/
├── MainLayout.jsx          # 레이아웃 래퍼
├── MainPageHeader.jsx      # 상단 헤더
├── PageTitleSection.jsx    # 페이지 타이틀
├── KpiBentoGrid.jsx        # KPI 그리드 컨테이너
├── LargeKpiCard.jsx        # 주요 KPI 카드 (5개)
├── SmallKpiCard.jsx        # 세부 KPI 카드 (5개)
├── StatusPill.jsx          # 상태 표시 필
├── TrendBadge.jsx          # 트렌드 표시 (▲▼)
├── StrengthWeaknessMatrix.jsx  # 2/3 너비 매트릭스
├── InsightsPanel.jsx      # 1/3 너비 인사이트
├── RiskStrengthTable.jsx   # 리스크/우위 테이블
└── ProgressMetricGrid.jsx # 목표 달성도
```

### 4. 샘플 데이터 구조

`src/data/main_page_samples.json`:

```json
{
  "meta": { "baseYear": 2024 },
  "kpis": {
    "large": [...],  // 신입생 충원율, 중도탈락률, 취업률, 진학률, 전임교원 확보율
    "small": [...]   // 교육비, 장학금, 기숙사, 연구비, 기술이전
  },
  "matrix": { "points": [...] },
  "insights": { "strengths": "", "risks": "", "actions": [...] },
  "riskTable": [...],
  "progressMetrics": [...]
}
```

### 5. MainLayout 구조

```jsx
<MainLayout>
  <MainPageHeader />  {/* sticky, shadow */}
  <main class="max-w-[1920px] mx-auto p-8">
    {children}
  </main>
</MainLayout>
```

## Risks / Trade-offs

- [Risk] 네비게이션 탭이 현재 빈 링크 → 나중에 실제 페이지 라우팅 추가 필요
- [Risk] PDF/상세 리포트 버튼 미動作 →将来 구현
- [Trade-off] 샘플 데이터 하드코딩 → API 연동 시 `data/main_page_samples.json` 교체만으로対応可能

## Open Questions

1. 네비게이션 탭 클릭 시 이동할 페이지 목록/구조가 결정되었는가?
2. 연도 선택 (基准연도)은 표시 전용으로足够了?
3. PDF 다운로드 기능은将来 어떤 형태로 구현予定?
