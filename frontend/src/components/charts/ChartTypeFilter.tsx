export type ChartFilterType = 'all' | 'bar' | 'line' | 'pie' | 'scatter' | 'heatmap' | 'special';

interface ChartTypeFilterProps {
  selectedFilter: ChartFilterType;
  onFilterChange: (filter: ChartFilterType) => void;
}

const FILTERS: { type: ChartFilterType; label: string }[] = [
  { type: 'all', label: '전체' },
  { type: 'bar', label: 'Bar' },
  { type: 'line', label: 'Line' },
  { type: 'pie', label: 'Pie' },
  { type: 'scatter', label: 'Scatter' },
  { type: 'heatmap', label: 'Heatmap' },
  { type: 'special', label: '기타' },
];

const baseBtn =
  'rounded-lg px-3 py-1.5 text-sm font-semibold transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-surface';

export default function ChartTypeFilter({ selectedFilter, onFilterChange }: ChartTypeFilterProps) {
  return (
    <div className="flex flex-wrap gap-2" role="toolbar" aria-label="차트 종류 필터">
      {FILTERS.map(({ type, label }) => {
        const isActive = selectedFilter === type;
        return (
          <button
            key={type}
            type="button"
            onClick={() => onFilterChange(type)}
            aria-pressed={isActive}
            className={
              isActive
                ? `${baseBtn} bg-secondary text-on-secondary shadow-sm hover:brightness-95`
                : `${baseBtn} border border-outline-variant bg-surface-container-lowest text-on-surface shadow-sm hover:border-secondary hover:text-secondary`
            }
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
