## ADDED Requirements

### Requirement: Main page displays institutional KPI dashboard
The main page SHALL display a comprehensive institutional dashboard showing university KPIs, analysis charts, and data tables sourced from `src/data/main_page_samples.json`.

#### Scenario: Page loads with KPI data
- **WHEN** the user navigates to `/`
- **THEN** the page displays KPI cards, matrix chart, insights panel, and tables
- **AND** data is loaded from `src/data/main_page_samples.json`

#### Scenario: KPI cards display correctly
- **WHEN** KPI data is available
- **THEN** 5 large KPI cards display (신입생 충원율, 중도탈락률, 취업률, 진학률, 전임교원 확보율)
- **AND** 5 small KPI cards display (교육비, 장학금, 기숙사 수용률, 연구비, 기술이전 수입료)

#### Scenario: Trend indicators show correctly
- **WHEN** a KPI has comparison data
- **THEN** trend badges show ▲ for positive and ▼ for negative changes
- **AND** tertiary color (#003509) is used for positive, error color (#ba1a1a) for negative

### Requirement: Page title section
The page SHALL display a title section with "Institutional Dashboard" badge and "대학 종합 현황 대시보드" as main title.

#### Scenario: Title section displays
- **WHEN** the page loads
- **THEN** the title section shows base year (2024) and PDF report button
- **AND** the PDF report button is disabled (no action yet)

### Requirement: Strength/weakness matrix chart
The page SHALL display a 2/3 width scatter plot matrix showing regional vs national comparisons.

#### Scenario: Matrix displays plot points
- **WHEN** matrix data is available
- **THEN** quadrant backgrounds display (집중 홍보 구간, 지역 약세 보완, 전국 열세 개선, 지역 대비 우위)
- **AND** plot points show on hover with tooltip

### Requirement: Insights panel
The page SHALL display a 1/3 width insights panel with strengths, risks, and action items.

#### Scenario: Insights panel content
- **WHEN** the page loads
- **THEN** panel shows Strengths, Risks, and Action Plan sections
- **AND** "상세 분석 리포트 보기" button is disabled (no action yet)

### Requirement: Tables section
The page SHALL display risk/strength analysis table and progress metrics grid.

#### Scenario: Risk strength table
- **WHEN** the page loads
- **THEN** table shows indicator name, regional comparison, national comparison, and overall status
- **AND** status pills use tertiary-fixed for 최우수, error-container for 집중관리, secondary-fixed for 보완필요

#### Scenario: Progress metrics grid
- **WHEN** the page loads
- **THEN** progress bars show current value vs target
- **AND** percentage fill reflects achievement ratio
