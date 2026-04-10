import { useMemo } from 'react';
import researchData from '../../data/research-industry-startup-data.json';
import PageTitleSection from '../main/PageTitleSection';
import StatusChips from '../main/StatusChips';
import {
  ResearchIndustryStartupKPICards,
  ResearchFundStructureChart,
  TechStartupProgressChart,
  ResearchIndustryStartupInsights,
  ResearchIndustryStartupTable,
} from './index';
import { useThemeInsights } from '../../hooks/useThemeInsights';
import { useThemeSourceRefs } from '../../hooks/useThemeSourceRefs';
import { useThemeChartBlockMeta } from '../../hooks/useThemeChartBlockMeta';
import { mapThemeItemsToResearchFundSources } from '../../utils/mapThemeItemsToResearchFundSources';
import { mapThemeItemsToResearchStartupProgress } from '../../utils/mapThemeItemsToResearchStartupProgress';

const RESEARCH_SCREEN_BASE_YEAR = 2025;

export default function ResearchIndustryStartupDashboard() {
  const { pageTitle, pageSubtitle, baseYear, filters, kpiCards, fundStructure, startupProgress, insights, tablePreview } =
    researchData;

  const { items: dbInsights } = useThemeInsights({
    screenCode: 'research',
    screenVer: 'v0.1',
    screenBaseYear: RESEARCH_SCREEN_BASE_YEAR,
    schlNm: '충남대학교',
  });

  const { refs: sourceRefs } = useThemeSourceRefs({
    screenCode: 'research',
    screenVer: 'v0.1',
    screenBaseYear: RESEARCH_SCREEN_BASE_YEAR,
    schlNm: '충남대학교',
  });

  const { chartLeft, chartRight, leftBlockItems, rightBlockItems, chartBlocksStatus } = useThemeChartBlockMeta({
    screenCode: 'research',
    screenVer: 'v0.1',
    screenBaseYear: RESEARCH_SCREEN_BASE_YEAR,
    schlNm: '충남대학교',
  });

  const fundSourcesFromDb = useMemo(
    () => mapThemeItemsToResearchFundSources(leftBlockItems),
    [leftBlockItems],
  );

  /** chart-blocks가 성공했을 때만 override — 실패 시에만 샘플 JSON 비율(15/55/…) 사용 */
  const fundOverrideSources = chartBlocksStatus === 'ok' ? fundSourcesFromDb : undefined;

  const startupProgressFromDb = useMemo(
    () => mapThemeItemsToResearchStartupProgress(rightBlockItems),
    [rightBlockItems],
  );

  const startupOverrideProgress = chartBlocksStatus === 'ok' ? startupProgressFromDb : undefined;

  const insightsToRender = dbInsights?.length ? dbInsights : insights;
  const tableToRender = sourceRefs?.length ? sourceRefs : tablePreview;

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-6 space-y-8">
      <PageTitleSection title={pageTitle} subtitle={pageSubtitle} baseYear={baseYear} />

      <StatusChips filters={filters} />
      <ResearchIndustryStartupKPICards kpiCards={kpiCards} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <ResearchFundStructureChart
            fundStructure={fundStructure}
            overrideSources={fundOverrideSources}
            bannerYear={fundOverrideSources !== undefined ? RESEARCH_SCREEN_BASE_YEAR : undefined}
            title={chartLeft.title}
            subtitle={chartLeft.subtitle}
          />
        </div>
        <TechStartupProgressChart
          startupProgress={startupProgress}
          overrideProgress={startupOverrideProgress}
          title={chartRight.title}
          subtitle={chartRight.subtitle}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ResearchIndustryStartupInsights insights={insightsToRender} />
        <div className="lg:col-span-2">
          <ResearchIndustryStartupTable tablePreview={tableToRender} />
        </div>
      </div>
    </div>
  );
}
