export default function PageTitleSection({ meta }) {
  if (!meta) return null;

  return (
    <div className="mb-8 flex justify-between items-end">
      <div>
        <p className="text-secondary font-bold text-xs tracking-widest uppercase mb-1">
          {meta?.institutionalDashboardLabel || 'Institutional Dashboard'}
        </p>
        <h1 className="text-3xl font-extrabold text-primary tracking-tight">
          {meta?.dashboardTitle || '대학 종합 현황 대시보드'}
        </h1>
      </div>
      <div className="flex gap-3">
        <div className="bg-surface-container-low px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">calendar_today</span>
          기준연도: {meta?.baseYear || 'N/A'}
        </div>
        <button
          disabled
          className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-primary/20 cursor-not-allowed opacity-70"
        >
          <span className="material-symbols-outlined text-sm">download</span>
          PDF 리포트
        </button>
      </div>
    </div>
  );
}