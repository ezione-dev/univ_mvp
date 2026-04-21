import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts/core';

export interface UniversalChartProps {
  chartType: string;
  data: any;
  config: {
    title?: string;
    xAxisName?: string;
    yAxisName?: string;
    legendPosition?: 'top' | 'bottom' | 'left' | 'right';
  };
}

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

function buildBarOption(data: any, config: UniversalChartProps['config']) {
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

function buildLineOption(data: any, config: UniversalChartProps['config'], options: any = {}) {
  const categories = data.categories || data.xAxis?.data || [];
  const series = data.series || (data.values ? [{ data: data.values }] : []);

  return {
    ...COMMON_THEME,
    ...buildCommonOption(config),
    xAxis: {
      type: 'category',
      data: categories,
      name: config.xAxisName || '',
      nameLocation: 'middle',
      nameGap: 30,
    },
    yAxis: {
      type: 'value',
      name: config.yAxisName || '',
      nameLocation: 'middle',
      nameGap: 40,
    },
    series: series.map((s: any, i: number) => ({
      type: 'line',
      data: s.data,
      name: s.name || `Series ${i + 1}`,
      smooth: true,
      ...options,
    })),
  };
}

function buildAreaOption(data: any, config: UniversalChartProps['config']) {
  return buildLineOption(data, config, {
    areaStyle: {},
    lineStyle: { width: 2 },
  });
}

function buildStackedBarOption(data: any, config: UniversalChartProps['config']) {
  const categories = data.categories || data.xAxis?.data || [];
  const series = data.series || [];

  return {
    ...COMMON_THEME,
    ...buildCommonOption(config),
    xAxis: {
      type: 'category',
      data: categories,
      name: config.xAxisName || '',
      nameLocation: 'middle',
      nameGap: 30,
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
      stack: 'total',
      itemStyle: { borderRadius: [0, 0, 0, 0] },
    })),
  };
}

function buildStackedAreaOption(data: any, config: UniversalChartProps['config']) {
  const categories = data.categories || data.xAxis?.data || [];
  const series = data.series || [];

  return {
    ...COMMON_THEME,
    ...buildCommonOption(config),
    xAxis: {
      type: 'category',
      data: categories,
      name: config.xAxisName || '',
      nameLocation: 'middle',
      nameGap: 30,
    },
    yAxis: {
      type: 'value',
      name: config.yAxisName || '',
      nameLocation: 'middle',
      nameGap: 40,
    },
    series: series.map((s: any, i: number) => ({
      type: 'line',
      data: s.data,
      name: s.name || `Series ${i + 1}`,
      stack: 'total',
      smooth: true,
      areaStyle: {},
      lineStyle: { width: 2 },
    })),
  };
}

function buildHorizontalBarOption(data: any, config: UniversalChartProps['config']) {
  const categories = data.categories || data.yAxis?.data || [];
  const series = data.series || [{ data: data.values || [] }];

  return {
    ...COMMON_THEME,
    ...buildCommonOption(config),
    xAxis: {
      type: 'value',
      name: config.xAxisName || '',
      nameLocation: 'middle',
      nameGap: 30,
    },
    yAxis: {
      type: 'category',
      data: categories,
      name: config.yAxisName || '',
      nameLocation: 'middle',
      nameGap: 40,
    },
    series: series.map((s: any, i: number) => ({
      type: 'bar',
      data: s.data,
      name: s.name || `Series ${i + 1}`,
      itemStyle: { borderRadius: [0, 4, 4, 0] },
    })),
  };
}

function buildPieOption(data: any, config: UniversalChartProps['config']) {
  const pieData = Array.isArray(data) ? data : data.values || [];

  return {
    ...COMMON_THEME,
    tooltip: { trigger: 'item' },
    ...buildCommonOption(config),
    series: [{
      type: 'pie',
      radius: '60%',
      data: pieData,
      label: { fontSize: 11 },
    }],
  };
}

function buildDonutOption(data: any, config: UniversalChartProps['config']) {
  const pieData = Array.isArray(data) ? data : data.values || [];

  return {
    ...COMMON_THEME,
    tooltip: { trigger: 'item' },
    ...buildCommonOption(config),
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      data: pieData,
      label: { fontSize: 11 },
    }],
  };
}

function buildNightingaleRoseOption(data: any, config: UniversalChartProps['config']) {
  const pieData = Array.isArray(data) ? data : data.values || [];

  return {
    ...COMMON_THEME,
    tooltip: { trigger: 'item' },
    ...buildCommonOption(config),
    series: [{
      type: 'pie',
      radius: ['20%', '70%'],
      data: pieData,
      roseType: 'area',
      label: { fontSize: 10 },
    }],
  };
}

function buildScatterOption(data: any, config: UniversalChartProps['config']) {
  const scatterData = data.values || data.data || [];

  return {
    ...COMMON_THEME,
    ...buildCommonOption(config),
    xAxis: {
      type: 'value',
      name: config.xAxisName || '',
      nameLocation: 'middle',
      nameGap: 30,
    },
    yAxis: {
      type: 'value',
      name: config.yAxisName || '',
      nameLocation: 'middle',
      nameGap: 40,
    },
    series: [{
      type: 'scatter',
      data: scatterData,
      symbolSize: 10,
    }],
  };
}

function buildBubbleOption(data: any, config: UniversalChartProps['config']) {
  const bubbleData = (data.values || data.data || []).map((d: number[]) => [d[0], d[1], d[2] || Math.random() * 50 + 10]);

  return {
    ...COMMON_THEME,
    ...buildCommonOption(config),
    xAxis: {
      type: 'value',
      name: config.xAxisName || '',
      nameLocation: 'middle',
      nameGap: 30,
    },
    yAxis: {
      type: 'value',
      name: config.yAxisName || '',
      nameLocation: 'middle',
      nameGap: 40,
    },
    series: [{
      type: 'scatter',
      data: bubbleData,
      symbolSize: (val: number[]) => Math.sqrt(val[2]) * 2,
    }],
  };
}

function buildHeatmapOption(data: any, config: UniversalChartProps['config']) {
  const xData = data.xAxis?.data || data.xData || [];
  const yData = data.yAxis?.data || data.yData || [];
  const heatmapData = Array.isArray(data) ? data : (data.values || data.data || []);

  return {
    ...COMMON_THEME,
    ...buildCommonOption(config),
    xAxis: {
      type: 'category',
      data: xData,
      name: config.xAxisName || '',
      nameLocation: 'middle',
      nameGap: 30,
    },
    yAxis: {
      type: 'category',
      data: yData,
      name: config.yAxisName || '',
      nameLocation: 'middle',
      nameGap: 40,
    },
    visualMap: {
      show: true,
      orient: 'vertical',
      right: 'right',
      top: 'center',
      min: 0,
      max: heatmapData.length > 0 ? Math.max(...heatmapData.map((d: number[]) => d[2] || 0)) : 100,
      inRange: { color: ['#50a3ba', '#eac736', '#d94e5d'] },
    },
    series: [{
      type: 'heatmap',
      data: heatmapData,
      label: { show: false },
      emphasis: { itemStyle: { shadowBlur: 10, shadowColor: 'rgba(0,0,0,0.5)' } },
    }],
  };
}

function buildCalendarHeatmapOption(data: any, config: UniversalChartProps['config']) {
  const calendarData = data.values || data.data || [];

  return {
    ...COMMON_THEME,
    ...buildCommonOption(config),
    calendar: {
      top: 80,
      left: 30,
      right: 30,
      cellSize: ['auto', 20],
      range: data.range || '2024',
      itemStyle: { borderWidth: 0.5, borderColor: '#e0e0e0' },
      dayLabel: { firstDay: 1, nameMap: 'en' },
      monthLabel: { show: false },
      yearLabel: { show: false },
    },
    visualMap: {
      show: true,
      orient: 'horizontal',
      top: 10,
      left: 'center',
      min: 0,
      max: Math.max(...calendarData.map((d: any) => d[1] || 0)),
      inRange: { color: ['#ebedf0', '#9ec8e5', '#4a96c6', '#d94e5d'] },
    },
    series: [{
      type: 'heatmap',
      coordinateSystem: 'calendar',
      data: calendarData,
    }],
  };
}

function buildTreemapOption(data: any, config: UniversalChartProps['config']) {
  const treemapData = Array.isArray(data) ? data : data.values || [];

  return {
    ...COMMON_THEME,
    ...buildCommonOption(config),
    series: [{
      type: 'treemap',
      data: treemapData,
      label: { show: true, formatter: '{b}', fontSize: 12 },
      breadcrumb: { show: false },
    }],
  };
}

function buildRadarOption(data: any, config: UniversalChartProps['config']) {
  const indicator = data.indicator || [];
  const seriesData = data.series || [];

  return {
    ...COMMON_THEME,
    tooltip: {},
    ...buildCommonOption(config),
    radar: {
      indicator,
      center: ['50%', '55%'],
      radius: '65%',
    },
    series: [{
      type: 'radar',
      data: seriesData.map((s: any, i: number) => ({
        value: s.data || s,
        name: s.name || `Series ${i + 1}`,
        areaStyle: { opacity: 0.3 },
      })),
    }],
  };
}

function buildCandlestickOption(data: any, config: UniversalChartProps['config']) {
  const categories = data.categories || data.xAxis?.data || [];
  const candleData = data.values || data.data || [];

  return {
    ...COMMON_THEME,
    ...buildCommonOption(config),
    xAxis: {
      type: 'category',
      data: categories,
      name: config.xAxisName || '',
      nameLocation: 'middle',
      nameGap: 30,
    },
    yAxis: {
      type: 'value',
      name: config.yAxisName || '',
      nameLocation: 'middle',
      nameGap: 40,
    },
    series: [{
      type: 'candlestick',
      data: candleData,
      itemStyle: {
        color: '#d94e5d',
        color0: '#4a96c6',
        borderColor: '#d94e5d',
        borderColor0: '#4a96c6',
      },
    }],
  };
}

function buildGaugeOption(data: any, config: UniversalChartProps['config']) {
  const value = data.value ?? 0;

  return {
    ...COMMON_THEME,
    ...buildCommonOption(config),
    series: [{
      type: 'gauge',
      startAngle: 180,
      endAngle: 0,
      center: ['50%', '75%'],
      radius: '90%',
      min: 0,
      max: 100,
      value,
      splitNumber: 8,
      axisLine: {
        lineStyle: {
          width: 6,
          color: [[1, '#4a96c6']],
        },
      },
      pointer: { itemStyle: { color: '#d94e5d' }, width: 5 },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { distance: 20, fontSize: 10 },
      detail: { valueAnimation: true, fontSize: 24, offsetCenter: [0, 0] },
    }],
  };
}

function buildWaterfallOption(data: any, config: UniversalChartProps['config']) {
  const categories = data.categories || [];
  const positive = data.positive || [];
  const negative = data.negative || [];

  const total = positive.map((p: number, i: number) => p + (negative[i] || 0));
  const subtotals: (number | '-')[] = Array(categories.length).fill('-');

  return {
    ...COMMON_THEME,
    ...buildCommonOption(config),
    xAxis: {
      type: 'category',
      data: categories,
      name: config.xAxisName || '',
      nameLocation: 'middle',
      nameGap: 30,
    },
    yAxis: {
      type: 'value',
      name: config.yAxisName || '',
      nameLocation: 'middle',
      nameGap: 40,
    },
    series: [
      {
        type: 'bar',
        data: subtotals.map((v, i) => ({
          value: v === '-' ? '-' : total[i],
          itemStyle: { color: 'transparent', borderWidth: 0 },
        })),
        barWidth: '50%',
      },
      {
        type: 'bar',
        data: positive.map((v: number) => v > 0 ? v : 0),
        name: 'Increase',
        itemStyle: { color: '#4a96c6', borderRadius: [0, 0, 0, 0] },
      },
      {
        type: 'bar',
        data: negative.map((v: number) => v < 0 ? v : 0),
        name: 'Decrease',
        itemStyle: { color: '#d94e5d', borderRadius: [0, 0, 0, 0] },
      },
    ],
  };
}

function buildPopulationPyramidOption(data: any, config: UniversalChartProps['config']) {
  const ageGroups = data.ageGroups || [];
  const left = data.left || [];
  const right = data.right || [];

  return {
    ...COMMON_THEME,
    ...buildCommonOption(config),
    xAxis: [
      {
        type: 'value',
        name: config.xAxisName || '',
        nameLocation: 'middle',
        nameGap: 30,
        axisLabel: { fontSize: 10 },
      },
      {
        type: 'value',
        name: config.xAxisName || '',
        nameLocation: 'middle',
        nameGap: 30,
        axisLabel: { fontSize: 10 },
      },
    ],
    yAxis: {
      type: 'category',
      data: ageGroups,
      name: config.yAxisName || '',
      nameLocation: 'middle',
      nameGap: 40,
    },
    series: [
      {
        type: 'bar',
        data: left.map((v: number) => -v),
        name: 'Male',
        stack: 'total',
        xAxisIndex: 0,
        itemStyle: { color: '#4a96c6', borderRadius: [0, 0, 0, 0] },
      },
      {
        type: 'bar',
        data: right,
        name: 'Female',
        stack: 'total',
        xAxisIndex: 1,
        itemStyle: { color: '#d94e5d', borderRadius: [0, 0, 0, 0] },
      },
    ],
  };
}

function buildStreamgraphOption(data: any, config: UniversalChartProps['config']) {
  const categories = data.categories || data.xAxis?.data || [];
  const series = data.series || [];

  return {
    ...COMMON_THEME,
    ...buildCommonOption(config),
    xAxis: {
      type: 'category',
      data: categories,
      name: config.xAxisName || '',
      nameLocation: 'middle',
      nameGap: 30,
    },
    yAxis: { type: 'value', show: false },
    series: series.map((s: any, i: number) => ({
      type: 'line',
      data: s.data,
      name: s.name || `Series ${i + 1}`,
      stack: 'total',
      smooth: true,
      areaStyle: { opacity: 0.6 },
      lineStyle: { width: 0 },
    })),
  };
}

function buildHistogramOption(data: any, config: UniversalChartProps['config']) {
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
      barCategoryGap: '0%',
      itemStyle: { borderRadius: [2, 2, 0, 0] },
    })),
  };
}

const chartBuilders: Record<string, (data: any, config: UniversalChartProps['config']) => any> = {
  column: buildBarOption,
  stacked_bar: buildStackedBarOption,
  horizontal_bar: buildHorizontalBarOption,
  line_multi: buildLineOption,
  stacked_column: buildStackedBarOption,
  line_dots: (data, config) => buildLineOption(data, config, { symbol: 'circle', symbolSize: 8 }),
  area: buildAreaOption,
  area_stacked: buildStackedAreaOption,
  streamgraph: buildStreamgraphOption,
  scatter: buildScatterOption,
  heatmap_grid: buildHeatmapOption,
  treemap: buildTreemapOption,
  waterfall: buildWaterfallOption,
  calendar_heatmap: buildCalendarHeatmapOption,
  population_pyramid: buildPopulationPyramidOption,
  pie: buildPieOption,
  donut: buildDonutOption,
  nightingale_rose: buildNightingaleRoseOption,
  radar: buildRadarOption,
  histogram: buildHistogramOption,
  bubble: buildBubbleOption,
  candlestick: buildCandlestickOption,
  gauge: buildGaugeOption,
};

function buildChartOption(chartType: string, data: any, config: UniversalChartProps['config']) {
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
