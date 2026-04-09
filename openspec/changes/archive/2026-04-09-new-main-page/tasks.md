## 1. Tailwind Configuration

- [x] 1.1 Update `tailwind.config.js` with DESIGN.md colors (primary: #002c5a, secondary: #006492, etc.)
- [x] 1.2 Update borderRadius to use `lg: 1rem` and `full: 9999px`
- [x] 1.3 Verify fontFamily configuration (Manrope for headline, Inter for body)

## 2. Sample Data

- [x] 2.1 Create `src/data/main_page_samples.json` with KPI data structure
- [x] 2.2 Add large KPIs (신입생 충원율, 중도탈락률, 취업률, 진학률, 전임교원 확보율)
- [x] 2.3 Add small KPIs (교육비, 장학금, 기숙사 수용률, 연구비, 기술이전)
- [x] 2.4 Add matrix points, insights, riskTable, progressMetrics data

## 3. Layout Components

- [x] 3.1 Create `src/layouts/MainLayout.jsx` with sticky header structure
- [x] 3.2 Create `src/components/main/MainPageHeader.jsx` with logo and user menu
- [x] 3.3 Implement navigation tabs (일반현황, 입시/충원, 학생/취업, 교육/교원, 연구/산학, 재정/장학, 캠퍼스/복지, 거버넌스)
- [x] 3.4 Add notifications, settings, and profile icons to user menu
- [x] 3.5 Apply DESIGN.md styling (colors, shadows, typography)

## 4. KPI Components

- [x] 4.1 Create `src/components/main/StatusPill.jsx` for status badges (최우수, 집중관리, 보완필요)
- [x] 4.2 Create `src/components/main/TrendBadge.jsx` for trend indicators (▲▼)
- [x] 4.3 Create `src/components/main/LargeKpiCard.jsx` with border-left accent color
- [x] 4.4 Create `src/components/main/SmallKpiCard.jsx` standard card style
- [x] 4.5 Create `src/components/main/KpiBentoGrid.jsx` to arrange 5 large + 5 small cards

## 5. Analysis Components

- [x] 5.1 Create `src/components/main/PageTitleSection.jsx` with title, year selector, PDF button
- [x] 5.2 Create `src/components/main/StrengthWeaknessMatrix.jsx` with quadrant backgrounds and plot points
- [x] 5.3 Create `src/components/main/InsightsPanel.jsx` with dark primary background
- [x] 5.4 Implement disabled buttons for PDF report and detailed analysis

## 6. Table Components

- [x] 6.1 Create `src/components/main/RiskStrengthTable.jsx` with hover states and status pills
- [x] 6.2 Create `src/components/main/ProgressMetricGrid.jsx` with progress bars
- [x] 6.3 Apply DESIGN.md table styling (no vertical lines, horizontal dividers)

## 7. Main Page Assembly

- [x] 7.1 Update `src/pages/MainPage.jsx` to use MainLayout
- [x] 7.2 Import and arrange all components (KPI grid, analysis section, tables section)
- [x] 7.3 Load data from `src/data/main_page_samples.json`
- [x] 7.4 Verify all sections render correctly
- [x] 7.5 Update `App.jsx` routing if needed

## 8. Verification

- [x] 8.1 Run `npm run dev` and verify page renders at `/`
- [x] 8.2 Verify KPI cards display with correct styling
- [x] 8.3 Verify matrix chart renders with quadrant backgrounds
- [x] 8.4 Verify tables render with proper styling
- [x] 8.5 Check for console errors

## 9. Edge Case Handling

- [x] 9.1 Add null check to `KpiBentoGrid` - render null if no KPIs data
- [x] 9.2 Add null check to `StrengthWeaknessMatrix` - render null if no matrix.points
- [x] 9.3 Add null check to `InsightsPanel` - render null if no insights data
- [x] 9.4 Add null check to `RiskStrengthTable` - render null if no table data
- [x] 9.5 Add null check to `ProgressMetricGrid` - render null if no metrics data
- [x] 9.6 Update `PageTitleSection` to handle missing meta gracefully
- [x] 9.7 Rebuild and verify no console errors

## 10. Individual Item Null-Check

- [x] 10.1 Add null check to `LargeKpiCard` - render null if label/value missing
- [x] 10.2 Add null check to `SmallKpiCard` - render null if label/value missing
- [x] 10.3 Verify single missing KPI doesn't break other cards
- [x] 10.4 Rebuild and verify no console errors

## 11. Matrix Chart Enhancement

- [x] 11.1 Add center cross lines (가로/세로 점선) for quadrant analysis
- [x] 11.2 Rebuild and verify
