import MaterialIcon from '../MaterialIcon';

function HeatmapCellStack({ children }) {
  return <div className="flex flex-col-reverse gap-1">{children}</div>;
}

function RankMarker({ rank }) {
  return (
    <div className="relative flex-1 rounded-sm bg-secondary/90 shadow-inner">
      <div className="absolute inset-0 z-10 flex items-center justify-center rounded-sm border-2 border-primary bg-primary/20 shadow-[0_0_15px_rgba(var(--primary-rgb),0.4)] transition-all">
        <span className="text-[10px] font-black text-white">#{rank}</span>
      </div>
    </div>
  );
}

const BUCKETS = ['91-100', '81-90', '71-80', '61-70', '51-60', '41-50', '31-40', '21-30', '11-20', '1-10'];

const getBucketIndex = (rank) => {
  if (!rank || rank > 100) return 0; // Place in last bucket if rank > 100 for now
  return 9 - Math.floor((rank - 1) / 10);
};

export default function RankingHeatmapCard({ data, selectedIndicators, isLoading, schoolName }) {
  const noop = (e) => {
    e.preventDefault();
  };

  const getRankForIndicator = (indicatorId) => {
    if (!data?.rankings) return null;
    const item = data.rankings.find(r => r.indicator === indicatorId);
    return item?.rank;
  };

  return (
    <div className={`col-span-12 rounded-2xl bg-surface-container-lowest p-6 transition-all lg:col-span-9 lg:p-8 ${isLoading ? 'opacity-60 pointer-events-none grayscale-[0.3]' : ''}`}>
      <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between lg:flex-row">
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-primary">지표별 순위 분포</h3>
            {isLoading && (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
            )}
          </div>
          <p className="text-sm text-slate-500">{schoolName || '선택된 기관'}의 성과 구간별 위치</p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-md p-2 transition-colors hover:bg-surface-container"
            title="다운로드"
            onClick={noop}
          >
            <MaterialIcon name="download" className="text-slate-500" />
          </button>
        </div>
      </div>
      
      <div className="relative overflow-x-auto pb-4">
        <div className="grid min-w-[520px] grid-cols-[100px_1fr] gap-6">
          {/* Y Axis Labels */}
          <div className="flex flex-col-reverse justify-between border-r border-slate-100 py-6 pr-2 text-right">
            {BUCKETS.map((label) => (
              <span key={label} className="text-xs font-bold text-slate-400">
                {label}
              </span>
            ))}
            <span className="mt-2 text-[10px] font-black uppercase text-slate-300">순위 구간</span>
          </div>

          <div className="flex flex-col gap-8">
            {/* X Axis Labels (Dynamic) */}
            <div className={`grid gap-4 px-2`} style={{ gridTemplateColumns: `repeat(${selectedIndicators.length}, minmax(0, 1fr))` }}>
              {selectedIndicators.map((ind) => (
                <span key={ind.id} className="text-center text-[11px] sm:text-xs font-bold text-slate-700 truncate" title={ind.label}>
                  {ind.label}
                </span>
              ))}
            </div>

            {/* Heatmap Grid (Dynamic) */}
            <div className={`grid h-[400px] gap-4`} style={{ gridTemplateColumns: `repeat(${selectedIndicators.length}, minmax(0, 1fr))` }}>
              {selectedIndicators.map((ind) => {
                const rank = getRankForIndicator(ind.id);
                const markerIndex = rank ? getBucketIndex(rank) : -1;
                
                return (
                  <HeatmapCellStack key={ind.id}>
                    {BUCKETS.map((_, idx) => {
                      if (idx === markerIndex) {
                        return <RankMarker key={idx} rank={rank} />;
                      }
                      
                      const opacity = (idx + 1) * 10;
                      const bgColor = rank && rank <= 30 ? 'bg-secondary' : 'bg-secondary/40';
                      
                      return (
                        <div 
                          key={idx} 
                          className={`flex-1 rounded-sm transition-all duration-500 ${bgColor}`} 
                          style={{ opacity: `${opacity}%` }}
                        />
                      );
                    })}
                  </HeatmapCellStack>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-outline-variant/20 pt-8 lg:mt-12 lg:gap-8">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-sm bg-secondary" />
          <span className="text-xs font-semibold text-slate-600">상위 티어 (1-30)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-sm bg-secondary/40" />
          <span className="text-xs font-semibold text-slate-600">일반 지표</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 rounded-sm border-2 border-primary bg-primary/10" />
          <span className="text-xs font-semibold text-slate-600">{schoolName || '기관'} 현재 위치</span>
        </div>
        <div className="w-full text-[10px] font-bold italic text-slate-400 lg:ml-auto lg:w-auto">
          *Y축은 순위 구간을 나타냅니다. 데이터 로딩 중에는 반매 불투명하게 표시됩니다.
        </div>
      </div>
    </div>
  );
}
