export default function DashboardPageHeader({ school }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
        Performance Intelligence
      </span>
      <h2 className="font-headline text-3xl font-extrabold tracking-tight text-primary md:text-4xl transition-all duration-700 flex flex-wrap items-baseline gap-3">
        성과 분석: <span className="text-primary-container bg-primary-fixed/30 px-2 rounded-md">{school?.school_name || '기관'}</span>
        {school?.establishment_type && (
          <span className="text-sm font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
            {school.establishment_type} / {school.region}
          </span>
        )}
      </h2>
    </div>
  );
}
