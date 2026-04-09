import TrendBadge from './TrendBadge';

const accentColors = {
  secondary: 'border-secondary',
  error: 'border-error',
  primary: 'border-primary',
  'primary-container': 'border-primary-container',
};

export default function LargeKpiCard({ label, value, year, accentColor, regionalComparison, nationalComparison }) {
  if (!label || !value) return null;

  return (
    <div className={`bg-surface-container-lowest p-5 rounded-lg shadow-[0_8px_32px_rgba(24,28,30,0.04)] border-l-4 ${accentColors[accentColor] || 'border-secondary'}`}>
      <div className="flex justify-between items-start mb-3">
        <span className="text-[0.6875rem] font-bold text-outline uppercase tracking-wider">
          {label}
        </span>
        <span className="px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed rounded-full text-[10px] font-bold">
          {year}
        </span>
      </div>
      <div className={`text-3xl font-extrabold mb-2 ${accentColor === 'error' ? 'text-error' : accentColor === 'secondary' ? 'text-secondary' : 'text-primary'}`}>
        {value}
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-[11px] text-on-surface-variant">
          <span>지역 대비</span>
          <TrendBadge value={regionalComparison?.value} status={regionalComparison?.status} />
        </div>
        <div className="flex justify-between text-[11px] text-on-surface-variant">
          <span>전국 대비</span>
          <TrendBadge value={nationalComparison?.value} status={nationalComparison?.status} />
        </div>
      </div>
    </div>
  );
}