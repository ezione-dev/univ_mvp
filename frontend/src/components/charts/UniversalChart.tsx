import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';
import { CHART_COLORS } from '../../constants/chartColors';

export interface UniversalChartProps {
  chartType: string;
  data: ChartData;
  config: {
    title?: string;
    xAxisName?: string;
    yAxisName?: string;
    legendPosition?: 'top' | 'bottom' | 'left' | 'right';
  };
}

export type ChartData = 
  | { categories?: string[]; series?: SeriesItem[]; values?: number[] }
  | number[]
  | Record<string, unknown>;

export type SeriesItem = {
  name?: string;
  data: number[] | [number, number, number][];
};

const COMMON_THEME = {
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' },
  },
  animation: true,
  animationDuration: 800,
  animationEasing: 'cubicOut' as const,
};

function buildCommonOption(config: UniversalChartProps['config']) {
  const legendPos = config.legendPosition || 'bottom';
  const legendOrient = legendPos === 'top' || legendPos === 'bottom' ? 'horizontal' : 'vertical';

  return {
    title: config.title ? {
      text: config.title,
      left: 'center',
      top: 10,
      textStyle: { fontSize: 16, fontWeight: 600 },
    } : undefined,
    legend: {
      show: true,
      position: legendPos,
      orient: legendOrient,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: legendPos === 'bottom' ? '10%' : '3%',
      containLabel: true,
    },
  };
}

function buildBarOption(data: ChartData, config: UniversalChartProps['config']) {
  const categories = data.categories || data.xAxis?.data || [];
  const series = data.series || [{ data: data.values || [] }];

  return {
    ...COMMON_THEME,
    ...buildCommonOption(config),
    xAxis: {
      type: 'category',
      data: categories,
      name: config.xAxisName || '',
      nameLocation: 'middle',
      nameGap: 30,
      axisLabel: { fontSize: 11 },
    },
    yAxis: {
      type: 'value',
      name: config.yAxisName || '',
      nameLocation: 'middle',
      nameGap: 40,
    },
    series: series.map((s: any, i: number) => ({
      type: 'bar',
      data: s.data,
      name: s.name || `Series ${i + 1}`,
      itemStyle: { borderRadius: [4, 4, 0, 0] },
    })),
  };
}

function buildLineOption(data: ChartData, config: UniversalChartProps['config'], options: object = {}) {
function buildAreaOption(data: ChartData, config: UniversalChartProps['config']) {
function buildStackedColumnOption(data: ChartData, config: UniversalChartProps['config']) {
function buildStackedHorizontalBarOption(data: ChartData, config: UniversalChartProps['config']) {
function buildStackedAreaOption(data: ChartData, config: UniversalChartProps['config']) {
function buildHorizontalBarOption(data: ChartData, config: UniversalChartProps['config']) {
function buildPieOption(data: ChartData, config: UniversalChartProps['config']) {
function buildDonutOption(data: ChartData, config: UniversalChartProps['config']) {
function buildNightingaleRoseOption(data: ChartData, config: UniversalChartProps['config']) {
function buildScatterOption(data: ChartData, config: UniversalChartProps['config']) {
function buildBubbleOption(data: ChartData, config: UniversalChartProps['config']) {
function buildHeatmapOption(data: ChartData, config: UniversalChartProps['config']) {
function buildCalendarHeatmapOption(data: ChartData, config: UniversalChartProps['config']) {
function buildTreemapOption(data: ChartData, config: UniversalChartProps['config']) {
function buildRadarOption(data: ChartData, config: UniversalChartProps['config']) {
function buildCandlestickOption(data: ChartData, config: UniversalChartProps['config']) {
function buildGaugeOption(data: ChartData, config: UniversalChartProps['config']) {
function buildWaterfallOption(data: ChartData, config: UniversalChartProps['config']) {
function buildPopulationPyramidOption(data: ChartData, config: UniversalChartProps['config']) {
function buildStreamgraphOption(data: ChartData, config: UniversalChartProps['config']) {
function buildHistogramOption(data: ChartData, config: UniversalChartProps['config']) {
function buildChartOption(chartType: string, data: ChartData, config: UniversalChartProps['config']) {
  const builder = chartBuilders[chartType];
  if (!builder) {
    return {
      title: { text: 'Unsupported chart type' },
      series: [],
    };
  }
  return builder(data, config);
}

function UniversalChart({ chartType, data, config }: UniversalChartProps) {
  const option = buildChartOption(chartType, data, config);

  return (
    <div className="w-full h-full min-h-[300px]">
      <ReactECharts
        option={option}
        style={{ height: '100%', width: '100%', minHeight: '300px' }}
        opts={{ renderer: 'canvas' }}
      />
    </div>
  );
}

export default UniversalChart;
