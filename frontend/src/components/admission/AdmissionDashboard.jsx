import admissionData from '../../data/admission-data.json';
import PageTitleSection from '../main/PageTitleSection';
import StatusChips from '../main/StatusChips';
import {
  AdmissionFilters,
  AdmissionKPICards,
  EnrollmentRateChart,
  OpportunityBalanceChart,
  AdmissionInsights,
  AdmissionTable,
} from './index';

export default function AdmissionDashboard() {
  const { pageTitle, pageSubtitle, baseYear, filters, kpiCards, enrollmentRates, opportunityBalance, insights, tablePreview } =
    admissionData;

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-6 space-y-8">
      <PageTitleSection title={pageTitle} subtitle={pageSubtitle} baseYear={baseYear} />

      <StatusChips filters={filters} />
      <AdmissionKPICards kpiCards={kpiCards} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <EnrollmentRateChart enrollmentRates={enrollmentRates} />
        <OpportunityBalanceChart opportunityBalance={opportunityBalance} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <AdmissionInsights insights={insights} />
        <AdmissionTable tablePreview={tablePreview} />
      </div>
    </div>
  );
}