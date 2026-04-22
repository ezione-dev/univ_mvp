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

export default function ChartTypeFilter({ selectedFilter, onFilterChange }: ChartTypeFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {FILTERS.map(({ type, label }) => {
        const isActive = selectedFilter === type;
        return (
          <button
            key={type}
            onClick={() => onFilterChange(type)}
            className={[
              'px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-150 cursor-pointer',
              isActive
                ? 'bg-[#002c5a] text-white shadow-sm'
                : 'bg-white text-[#5a5f64] border border-[#e5e8eb] hover:border-[#002c5a] hover:text-[#002c5a]',
            ].join(' ')}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}