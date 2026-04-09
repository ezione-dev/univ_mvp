export default function InsightsPanel({ insights }) {
  if (!insights?.strengths && !insights?.risks) return null;

  return (
    <div className="bg-primary p-8 rounded-xl shadow-2xl text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <span className="material-symbols-outlined text-8xl">lightbulb</span>
      </div>
      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-secondary-fixed">auto_awesome</span>
        {insights?.title}
      </h3>
      <div className="space-y-6 relative z-10">
        {insights?.strengths && (
          <div className="space-y-2">
            <div className="text-[10px] font-bold text-secondary-fixed uppercase tracking-wider">
              Strengths
            </div>
            <p className="text-sm leading-relaxed text-secondary-fixed-dim">
              {insights.strengths}
            </p>
          </div>
        )}
        {insights?.risks && (
          <div className="space-y-2">
            <div className="text-[10px] font-bold text-error-container uppercase tracking-wider">
              Risks
            </div>
            <p className="text-sm leading-relaxed opacity-90">
              {insights.risks}
            </p>
          </div>
        )}
        {insights?.actions?.length > 0 && (
          <div className="space-y-2">
            <div className="text-[10px] font-bold text-white/50 uppercase tracking-wider">
              Action Plan
            </div>
            <ul className="text-sm space-y-2 opacity-90 list-disc ml-4">
              {insights.actions.map((action, index) => (
                <li key={index}>{action}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <button
        disabled
        className="mt-8 w-full py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-lg border border-white/20 text-xs font-bold cursor-not-allowed opacity-70"
      >
        상세 분석 리포트 보기
      </button>
    </div>
  );
}