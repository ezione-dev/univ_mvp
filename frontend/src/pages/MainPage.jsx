import MainLayout from '../layouts/MainLayout';
import PageTitleSection from '../components/main/PageTitleSection';
import KpiBentoGrid from '../components/main/KpiBentoGrid';
import StrengthWeaknessMatrix from '../components/main/StrengthWeaknessMatrix';
import InsightsPanel from '../components/main/InsightsPanel';
import RiskStrengthTable from '../components/main/RiskStrengthTable';
import ProgressMetricGrid from '../components/main/ProgressMetricGrid';
import sampleData from '../data/main_page_samples.json';

export default function MainPage() {
  return (
    <MainLayout>
      <PageTitleSection meta={sampleData.meta} />
      <KpiBentoGrid
        largeKpis={sampleData.kpis.large}
        smallKpis={sampleData.kpis.small}
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <StrengthWeaknessMatrix matrix={sampleData.matrix} />
        <InsightsPanel insights={sampleData.insights} />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RiskStrengthTable data={sampleData.riskTable} />
        <ProgressMetricGrid metrics={sampleData.progressMetrics} />
      </div>
    </MainLayout>
  );
}