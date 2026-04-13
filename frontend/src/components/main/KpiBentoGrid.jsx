import KPICard from "./KPICard";
import SmallKpiCard from "./SmallKpiCard";

const FALLBACK_LARGE_KPI_COUNT = 5;
const FALLBACK_SMALL_KPI_COUNT = 5;

function buildFallbackLarge({ baseYear }) {
  return Array.from({ length: FALLBACK_LARGE_KPI_COUNT }, (_, idx) => ({
    id: `fallback-large-${idx}`,
    label: `주요 지표 ${idx + 1}`,
    value: null,
    year: baseYear,
    accentColor: "secondary",
    accentColorHex: undefined,
    regionalComparison: null,
    nationalComparison: null,
  }));
}

function buildFallbackSmall() {
  return Array.from({ length: FALLBACK_SMALL_KPI_COUNT }, (_, idx) => ({
    id: `fallback-small-${idx}`,
    label: `보조 지표 ${idx + 1}`,
    value: null,
    subLabel: "미공시",
    status: undefined,
    accentColor: "secondary",
    accentColorHex: undefined,
  }));
}

export default function KpiBentoGrid({ baseYear, largeKpis, smallKpis }) {
  const hasAnyData =
    (Array.isArray(largeKpis) && largeKpis.length > 0) ||
    (Array.isArray(smallKpis) && smallKpis.length > 0);

  const normalizedBaseYear = baseYear == null || baseYear === "" ? undefined : baseYear;

  const displayLarge = hasAnyData ? largeKpis : buildFallbackLarge({ baseYear: normalizedBaseYear });
  const displaySmall = hasAnyData ? smallKpis : buildFallbackSmall();

  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">
        {displayLarge?.map((kpi) => (
          <KPICard
            key={kpi.id}
            label={kpi.label}
            value={kpi.value}
            year={kpi.year}
            accentColor={kpi.accentColor}
            accentColorHex={kpi.accentColorHex}
            regionalComparison={kpi.regionalComparison}
            nationalComparison={kpi.nationalComparison}
            isMainDashboard={true}
          />
        ))}
        {displaySmall?.map((kpi) => (
          <SmallKpiCard key={kpi.id} {...kpi} />
        ))}
      </div>
    </section>
  );
}