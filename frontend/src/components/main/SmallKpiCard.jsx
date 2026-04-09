const statusColors = {
  positive: 'text-tertiary',
  negative: 'text-error',
  growth: 'text-secondary',
};

export default function SmallKpiCard({ label, value, subLabel, status }) {
  if (!label || !value) return null;

  return (
    <div className="bg-surface-container-lowest p-5 rounded-lg shadow-[0_8px_32px_rgba(24,28,30,0.04)]">
      <span className="text-[0.6875rem] font-bold text-outline uppercase tracking-wider block mb-3">
        {label}
      </span>
      <div className="text-xl font-bold text-on-surface mb-2">
        {value}
      </div>
      <span className={`text-[10px] font-bold ${statusColors[status] || ''}`}>
        {subLabel}
      </span>
    </div>
  );
}