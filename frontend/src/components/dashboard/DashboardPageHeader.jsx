export default function DashboardPageHeader({ schoolName }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
        Performance Intelligence
      </span>
      <h2 className="font-headline text-3xl font-extrabold tracking-tight text-primary md:text-4xl transition-all duration-700">
        성과 분석: <span className="text-secondary-fixed">{schoolName || '기관'}</span>
      </h2>
    </div>
  );
}
