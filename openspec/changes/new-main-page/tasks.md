## 1. Tailwind Configuration

- [ ] 1.1 Update `tailwind.config.js` with DESIGN.md colors (primary: #002c5a, secondary: #006492, etc.)
- [ ] 1.2 Update borderRadius to use `lg: 1rem` and `full: 9999px`
- [ ] 1.3 Verify fontFamily configuration (Manrope for headline, Inter for body)

## 2. Sample Data

- [ ] 2.1 Create `src/data/main_page_samples.json` with KPI data structure
- [ ] 2.2 Add large KPIs (신입생 충원율, 중도탈락률, 취업률, 진학률, 전임교원 확보율)
- [ ] 2.3 Add small KPIs (교육비, 장학금, 기숙사 수용률, 연구비, 기술이전)
- [ ] 2.4 Add matrix points, insights, riskTable, progressMetrics data

## 3. Layout Components

- [ ] 3.1 Create `src/layouts/MainLayout.jsx` with sticky header structure
- [ ] 3.2 Create `src/components/main/MainPageHeader.jsx` with logo and user menu
- [ ] 3.3 Implement navigation tabs (일반현황, 입시/충원, 학생/취업, 교육/교원, 연구/산학, 재정/장학, 캠퍼스/복지, 거버넌스)
- [ ] 3.4 Add notifications, settings, and profile icons to user menu
- [ ] 3.5 Apply DESIGN.md styling (colors, shadows, typography)

## 4. KPI Components

- [ ] 4.1 Create `src/components/main/StatusPill.jsx` for status badges (최우수, 집중관리, 보완필요)
- [ ] 4.2 Create `src/components/main/TrendBadge.jsx` for trend indicators (▲▼)
- [ ] 4.3 Create `src/components/main/LargeKpiCard.jsx` with border-left accent color
- [ ] 4.4 Create `src/components/main/SmallKpiCard.jsx` standard card style
- [ ] 4.5 Create `src/components/main/KpiBentoGrid.jsx` to arrange 5 large + 5 small cards

## 5. Analysis Components

- [ ] 5.1 Create `src/components/main/PageTitleSection.jsx` with title, year selector, PDF button
- [ ] 5.2 Create `src/components/main/StrengthWeaknessMatrix.jsx` with quadrant backgrounds and plot points
- [ ] 5.3 Create `src/components/main/InsightsPanel.jsx` with dark primary background
- [ ] 5.4 Implement disabled buttons for PDF report and detailed analysis

## 6. Table Components

- [ ] 6.1 Create `src/components/main/RiskStrengthTable.jsx` with hover states and status pills
- [ ] 6.2 Create `src/components/main/ProgressMetricGrid.jsx` with progress bars
- [ ] 6.3 Apply DESIGN.md table styling (no vertical lines, horizontal dividers)

## 7. Main Page Assembly

- [ ] 7.1 Update `src/pages/MainPage.jsx` to use MainLayout
- [ ] 7.2 Import and arrange all components (KPI grid, analysis section, tables section)
- [ ] 7.3 Load data from `src/data/main_page_samples.json`
- [ ] 7.4 Verify all sections render correctly
- [ ] 7.5 Update `App.jsx` routing if needed

## 8. Verification

- [ ] 8.1 Run `npm run dev` and verify page renders at `/`
- [ ] 8.2 Verify KPI cards display with correct styling
- [ ] 8.3 Verify matrix chart renders with quadrant backgrounds
- [ ] 8.4 Verify tables render with proper styling
- [ ] 8.5 Check for console errors
