import { useState, useMemo } from 'react';
import ChartTypeFilter, { ChartFilterType } from '../../components/charts/ChartTypeFilter';
import ChartGalleryChartTile from '../../components/charts/ChartGalleryChartTile';
import ChartConfigModal from '../../components/charts/ChartConfigModal';
import { chartMetadata } from '../../components/charts/chartMetadata';
import { ChartConfig, chartConfigs } from '../../configs/charts/index';
import chartMockData, {
  BarColumnData,
  StackedBarColumnData,
  LineAreaData,
  PieDonutRoseDataItem,
  ScatterBubbleData,
  HeatmapGridData,
  RadarData,
  CandlestickData,
  TreemapDataItem,
  GaugeData,
  CalendarHeatmapData,
  WaterfallData,
  PopulationPyramidData,
} from '../../data/chartMockData';
import { streamgraphData } from '../../data/chartMockData';

type ChartMockDataKey = 'barColumn' | 'stackedBarColumn' | 'lineArea' | 'streamgraph' | 'pieDonutRose' | 'scatterBubble' | 'heatmapGrid' | 'radar' | 'candlestick' | 'treemap' | 'gauge' | 'calendarHeatmap' | 'waterfall' | 'populationPyramid' | 'histogram';

type ChartMockDataValue =
  | BarColumnData
  | StackedBarColumnData
  | LineAreaData
  | typeof streamgraphData
  | PieDonutRoseDataItem[]
  | ScatterBubbleData
  | HeatmapGridData
  | RadarData
  | CandlestickData
  | TreemapDataItem[]
  | GaugeData
  | CalendarHeatmapData
  | WaterfallData
  | PopulationPyramidData
  | BarColumnData;

type ChartMockData = Record<ChartMockDataKey, ChartMockDataValue>;

const typeToDataKey: Record<string, ChartMockDataKey | undefined> = {
  column: 'barColumn',
  stacked_bar: 'stackedBarColumn',
  horizontal_bar: 'barColumn',
  line_multi: 'lineArea',
  stacked_column: 'stackedBarColumn',
  line_dots: 'lineArea',
  area: 'lineArea',
  area_stacked: 'lineArea',
  streamgraph: 'streamgraph',
  scatter: 'scatterBubble',
  bubble: 'scatterBubble',
  heatmap_grid: 'heatmapGrid',
  treemap: 'treemap',
  waterfall: 'waterfall',
  calendar_heatmap: 'calendarHeatmap',
  population_pyramid: 'populationPyramid',
  pie: 'pieDonutRose',
  donut: 'pieDonutRose',
  nightingale_rose: 'pieDonutRose',
  radar: 'radar',
  histogram: 'histogram',
};

export interface ChartGalleryChartConfig {
  chartType: string;
  title: string;
  xAxisName: string;
  yAxisName: string;
  titlePosition: 'left' | 'center' | 'right';
  legendPosition: 'top' | 'bottom' | 'left' | 'right';
}

export default function ChartGallery() {
  const [selectedChartId, setSelectedChartId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localChartConfigs, setLocalChartConfigs] = useState<ChartConfig[]>(
    chartConfigs.map((c) => ({ ...c }))
  );
  const [filterState, setFilterState] = useState<ChartFilterType>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const chartsWithData = useMemo(() => {
    return chartMetadata.map((metadata) => {
      const config = localChartConfigs.find((c) => c.chartType === metadata.type);
      const dataKey = typeToDataKey[metadata.type];
      const data = dataKey ? chartMockData[dataKey] : {};
      return {
        ...metadata,
        config: config
          ? {
              title: config.title,
              xAxisName: config.xAxisName,
              yAxisName: config.yAxisName,
              titlePosition: config.titlePosition,
              legendPosition: config.legendPosition,
            }
          : {},
        data,
      };
    });
  }, [localChartConfigs]);

  const filteredCharts = useMemo(() => {
    return chartsWithData.filter((chart) => {
      const matchesFilter = filterState === 'all' || chart.category === filterState;
      const matchesSearch =
        searchTerm === '' ||
        chart.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chart.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [chartsWithData, filterState, searchTerm]);

  const selectedChart = useMemo(() => {
    if (!selectedChartId) return null;
    return chartsWithData.find((c) => c.type === selectedChartId);
  }, [selectedChartId, chartsWithData]);

  const selectedChartConfig = useMemo((): ChartGalleryChartConfig | null => {
    if (!selectedChart) return null;
    return {
      chartType: selectedChart.type,
      title: selectedChart.config.title || '',
      xAxisName: selectedChart.config.xAxisName || '',
      yAxisName: selectedChart.config.yAxisName || '',
      titlePosition: selectedChart.config.titlePosition || 'center',
      legendPosition: selectedChart.config.legendPosition || 'bottom',
    };
  }, [selectedChart]);

  const handleChartClick = (chartId: string) => {
    setSelectedChartId(chartId);
    setIsModalOpen(true);
  };

  const handleSave = (config: ChartGalleryChartConfig) => {
    setLocalChartConfigs((prev) =>
      prev.map((c) =>
        c.chartType === config.chartType
          ? {
              ...c,
              title: config.title,
              xAxisName: config.xAxisName,
              yAxisName: config.yAxisName,
              titlePosition: config.titlePosition,
              legendPosition: config.legendPosition,
            }
          : c
      )
    );
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedChartId(null);
  };

  return (
    <div className="max-w-[1600px] mx-auto w-full flex flex-col gap-6 min-h-0">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#2d3133]">차트 갤러리</h1>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <ChartTypeFilter selectedFilter={filterState} onFilterChange={setFilterState} />
        <input
          type="text"
          placeholder="차트 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-md border border-[#e5e8eb] px-4 py-2 text-sm text-[#2d3133] placeholder-[#a1a7b0] focus:border-secondary focus:ring-secondary md:w-64"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCharts.map((chart) => (
          <ChartGalleryChartTile
            key={chart.type}
            chartId={chart.type}
            chartType={chart.type}
            title={chart.name}
            data={chart.data}
            config={chart.config}
            onChartClick={handleChartClick}
          />
        ))}
      </div>

      {filteredCharts.length === 0 && (
        <div className="py-12 text-center text-[#737781]">
          검색 결과가 없습니다.
        </div>
      )}

      {selectedChartConfig && (
        <ChartConfigModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          chartConfig={selectedChartConfig}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
