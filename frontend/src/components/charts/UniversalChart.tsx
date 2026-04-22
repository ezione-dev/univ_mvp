import ReactECharts from 'echarts-for-react';

export interface UniversalChartProps {
  chartType: string;
  data: any;
  config: {
    title?: string;
    xAxisName?: string;
    yAxisName?: string;
    legendPosition?: 'top' | 'bottom' | 'left' | 'right';
    titlePosition?: 'left' | 'center' | 'right';
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

function buildLegendOption(legendPos: NonNullable<UniversalChartProps['config']['legendPosition']>) {
  const orient = legendPos === 'top' || legendPos === 'bottom' ? 'horizontal' : 'vertical';

  if (legendPos === 'top') return { top: 10, left: 'center', orient };
  if (legendPos === 'bottom') return { bottom: 8, left: 'center', orient };
  /** 왼쪽 세로 범례는 고정 폭으로 두고, 그리드 `left`와 맞물려 Y축 이름과 겹치지 않게 함 */
  if (legendPos === 'left') return { left: 6, top: 'middle', orient, width: 88, padding: [4, 4, 4, 0] };
  return { right: 6, top: 'middle', orient, width: 88, padding: [4, 0, 4, 4] }; // right
}

/** 타일(~300px)에서도 범례·축 이름·축 눈금이 겹치지 않도록 픽셀 기준으로 여백 계산 */
function buildDefaultGrid(config: UniversalChartProps['config']) {
  const legendPos = config.legendPosition || 'bottom';
  const hasTitle = Boolean(config.title);
  const hasXName = Boolean(config.xAxisName?.trim());
  const hasYName = Boolean(config.yAxisName?.trim());

  let top = hasTitle ? 50 : 38;
  if (legendPos === 'top') top += 44;

  let bottom = 14;
  if (legendPos === 'bottom') {
    bottom = 52;
    if (hasXName) bottom += 28;
    bottom += 12;
  } else if (hasXName) {
    bottom = 36;
  }

  let left = 12;
  /** 범례(left)·Y축 이름·(containLabel) Y눈금이 같은 왼쪽 띠를 쓰므로 여백을 넉넉히 */
  if (legendPos === 'left') {
    left = 6 + 88 + 10;
    if (hasYName) left += 40;
  } else if (hasYName) {
    left += 20;
  }

  let right = 12;
  if (legendPos === 'right') {
    right = 6 + 88 + 10;
  }

  return {
    left,
    right,
    top,
    bottom,
    containLabel: true,
  };
}

function buildCommonOption(config: UniversalChartProps['config']) {
  const legendPos = config.legendPosition || 'bottom';
  const titlePos = config.titlePosition || 'center';

  return {
    title: config.title ? {
      text: config.title,
      left: titlePos,
      top: 10,
      textStyle: { fontSize: 16, fontWeight: 600 },
    } : undefined,
    legend: {
      show: true,
      ...buildLegendOption(legendPos),
    },
    grid: buildDefaultGrid(config),
  };
}

function buildBarOption(data: any, config: UniversalChartProps['config']) {
  const categories = data.categories || data.xAxis?.data || [];
  const series = data.series || [{ data: data.values || [] }];
  const xName = config.xAxisName?.trim() || '';
  const yName = config.yAxisName?.trim() || '';

  return {
    ...COMMON_THEME,
    ...buildCommonOption(config),
    xAxis: {
      type: 'category',
      data: categories,
      name: xName || undefined,
      nameLocation: 'middle',
      nameGap: xName ? 36 : 28,
      nameTextStyle: { fontSize: 12, color: '#374151' },
      axisLabel: { fontSize: 11, color: '#4b5563', margin: 6 },
    },
    yAxis: {
      type: 'value',
      name: yName || undefined,
      nameLocation: 'middle',
      nameGap: 40,
      nameTextStyle: { fontSize: 12, color: '#374151' },
      axisLabel: { fontSize: 11, color: '#4b5563' },
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
  const xName = config.xAxisName?.trim() || '';
  const yName = config.yAxisName?.trim() || '';

  return {
    ...COMMON_THEME,
    ...buildCommonOption(config),
    xAxis: {
      type: 'category',
      data: categories,
      name: xName || undefined,
      nameLocation: 'middle',
      nameGap: xName ? 36 : 28,
      nameTextStyle: { fontSize: 12, color: '#374151' },
      axisLabel: { fontSize: 11, color: '#4b5563', margin: 6 },
    },
    yAxis: {
      type: 'value',
      name: yName || undefined,
      nameLocation: 'middle',
      nameGap: 40,
      nameTextStyle: { fontSize: 12, color: '#374151' },
      axisLabel: { fontSize: 11, color: '#4b5563' },
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

function buildStackedColumnOption(data: any, config: UniversalChartProps['config']) {
  const categories = data.categories || data.xAxis?.data || [];
  const series = data.series || [];
  const xName = config.xAxisName?.trim() || '';
  const yName = config.yAxisName?.trim() || '';

  return {
    ...COMMON_THEME,
    ...buildCommonOption(config),
    xAxis: {
      type: 'category',
      data: categories,
      name: xName || undefined,
      nameLocation: 'middle',
      nameGap: xName ? 36 : 28,
      nameTextStyle: { fontSize: 12, color: '#374151' },
      axisLabel: { fontSize: 11, color: '#4b5563', margin: 6 },
    },
    yAxis: {
      type: 'value',
      name: yName || undefined,
      nameLocation: 'middle',
      nameGap: 40,
      nameTextStyle: { fontSize: 12, color: '#374151' },
      axisLabel: { fontSize: 11, color: '#4b5563' },
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

function buildStackedHorizontalBarOption(data: any, config: UniversalChartProps['config']) {
  const categories = data.categories || data.yAxis?.data || [];
  const series = data.series || [];

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
      stack: 'total',
      itemStyle: { borderRadius: [0, 4, 4, 0] },
    })),
  };
}

function buildStackedAreaOption(data: any, config: UniversalChartProps['config']) {
  const categories = data.categories || data.xAxis?.data || [];
  const series = data.series || [];
  const xName = config.xAxisName?.trim() || '';
  const yName = config.yAxisName?.trim() || '';

  return {
    ...COMMON_THEME,
    ...buildCommonOption(config),
    xAxis: {
      type: 'category',
      data: categories,
      name: xName || undefined,
      nameLocation: 'middle',
      nameGap: xName ? 36 : 28,
      nameTextStyle: { fontSize: 12, color: '#374151' },
      axisLabel: { fontSize: 11, color: '#4b5563', margin: 6 },
    },
    yAxis: {
      type: 'value',
      name: yName || undefined,
      nameLocation: 'middle',
      nameGap: 40,
      nameTextStyle: { fontSize: 12, color: '#374151' },
      axisLabel: { fontSize: 11, color: '#4b5563' },
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
  const scatterData = Array.isArray(data) ? data : (data.values || data.data || []);

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
  const rawData = Array.isArray(data) ? data : (data.values || data.data || []);
  const bubbleData = rawData.map((d: number[]) => [d[0], d[1], d[2] || Math.random() * 50 + 10]);

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
  const calendarData = Array.isArray(data) ? data : (data.values || data.data || []);

  const maxValue = calendarData.length > 0
    ? Math.max(...calendarData.map((d: any) => d[1] || 0))
    : 100;

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
      max: maxValue,
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
      label: { show: true, formatter: '{b}' },
      visualMin: 0,
      visualMax: 100,
      leafDepth: 2,
      childrenVisibleDepth: 2,
      breadcrumb: { show: true },
    }],
  };
}

function buildRadarOption(data: any, config: UniversalChartProps['config']) {
  const indicator = data.indicator || [];
  const seriesData = data.series || [];

  return {
    ...COMMON_THEME,
    ...buildCommonOption(config),
    tooltip: {
      ...COMMON_THEME.tooltip,
      trigger: 'axis',
    },
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

  let cumulative = 0;
  const subtotals = categories.map((_: any, i: number) => {
    if (i === 0) return 0;
    const prev = (positive[i - 1] || 0) + (negative[i - 1] || 0);
    cumulative += prev;
    return cumulative;
  });

  const xName = config.xAxisName?.trim() || '';
  const yName = config.yAxisName?.trim() || '';

  return {
    ...COMMON_THEME,
    ...buildCommonOption(config),
    xAxis: {
      type: 'category',
      data: categories,
      name: xName || undefined,
      nameLocation: 'middle',
      nameGap: xName ? 36 : 28,
      nameTextStyle: { fontSize: 12, color: '#374151' },
      axisLabel: { fontSize: 11, color: '#4b5563', margin: 6 },
    },
    yAxis: {
      type: 'value',
      name: yName || undefined,
      nameLocation: 'middle',
      nameGap: 40,
      nameTextStyle: { fontSize: 12, color: '#374151' },
      axisLabel: { fontSize: 11, color: '#4b5563' },
    },
    series: [
      {
        type: 'bar',
        data: subtotals,
        itemStyle: { color: 'transparent', borderWidth: 0 },
        barWidth: '50%',
        stack: 'total',
      },
      {
        type: 'bar',
        data: positive,
        name: '증가',
        itemStyle: { color: '#4a96c6', borderRadius: [0, 0, 0, 0] },
        stack: 'total',
      },
      {
        type: 'bar',
        data: negative.map((v: number) => Math.abs(v)),
        name: '감소',
        itemStyle: { color: '#d94e5d', borderRadius: [0, 0, 0, 0] },
        stack: 'total',
      },
    ],
  };
}

function buildPopulationPyramidOption(data: any, config: UniversalChartProps['config']) {
  const ageGroups = data.ageGroups || [];
  const left = (data.left || []).map((v: number) => Number(v) || 0);
  const right = (data.right || []).map((v: number) => Number(v) || 0);
  const legendPos = config.legendPosition || 'bottom';
  const xName = config.xAxisName?.trim() || '';
  const yName = config.yAxisName?.trim() || '';

  const maxVal = Math.max(1, ...left, ...right);
  const axisMax = Math.ceil(maxVal * 1.1);

  const hasTitle = Boolean(config.title);
  const gridTop = legendPos === 'top' ? (hasTitle ? 88 : 64) : hasTitle ? 52 : 36;
  const gridBottom = legendPos === 'bottom' ? 52 : 28;
  const gridSide = legendPos === 'left' ? '14%' : legendPos === 'right' ? '14%' : '2%';

  const axisNameStyle = { fontSize: 11, fontWeight: 500 as const, color: '#374151' };
  const axisLabelStyle = { fontSize: 10, color: '#4b5563' };

  return {
    ...COMMON_THEME,
    title: config.title
      ? {
          text: config.title,
          left: config.titlePosition || 'center',
          top: 10,
          textStyle: { fontSize: 16, fontWeight: 600 },
        }
      : undefined,
    legend: {
      show: true,
      ...buildLegendOption(legendPos),
    },
    grid: [
      { left: gridSide, right: '52%', top: gridTop, bottom: gridBottom, containLabel: true },
      { left: '52%', right: gridSide, top: gridTop, bottom: gridBottom, containLabel: true },
    ],
    xAxis: [
      {
        type: 'value',
        gridIndex: 0,
        inverse: true,
        min: 0,
        max: axisMax,
        name: xName || undefined,
        nameLocation: 'middle',
        nameGap: 24,
        nameTextStyle: axisNameStyle,
        axisLabel: {
          ...axisLabelStyle,
          formatter: (v: number) => String(Math.abs(Math.round(v))),
        },
        splitLine: { show: true, lineStyle: { color: '#e5e7eb', type: 'dashed' as const } },
        axisLine: { lineStyle: { color: '#9ca3af' } },
      },
      {
        type: 'value',
        gridIndex: 1,
        min: 0,
        max: axisMax,
        name: xName || undefined,
        nameLocation: 'middle',
        nameGap: 24,
        nameTextStyle: axisNameStyle,
        axisLabel: axisLabelStyle,
        splitLine: { show: true, lineStyle: { color: '#e5e7eb', type: 'dashed' as const } },
        axisLine: { lineStyle: { color: '#9ca3af' } },
      },
    ],
    yAxis: [
      {
        type: 'category',
        gridIndex: 0,
        data: ageGroups,
        position: 'right',
        name: yName || undefined,
        nameLocation: 'middle',
        nameGap: 36,
        nameTextStyle: axisNameStyle,
        axisLabel: { ...axisLabelStyle, fontSize: 11, align: 'left' as const },
        axisTick: { alignWithLabel: true },
        axisLine: { show: true, lineStyle: { color: '#d1d5db' } },
      },
      {
        type: 'category',
        gridIndex: 1,
        data: ageGroups,
        position: 'left',
        axisLabel: { show: false },
        axisTick: { show: false },
        axisLine: { show: false },
      },
    ],
    series: [
      {
        type: 'bar',
        data: left,
        name: 'Male',
        xAxisIndex: 0,
        yAxisIndex: 0,
        itemStyle: { color: '#4a96c6', borderRadius: [0, 2, 2, 0] },
      },
      {
        type: 'bar',
        data: right,
        name: 'Female',
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: { color: '#d94e5d', borderRadius: [2, 0, 0, 2] },
      },
    ],
  };
}

function buildStreamgraphOption(data: any, config: UniversalChartProps['config']) {
  const categories = data.categories || [];
  const series = data.series || [];

  const themeRiverData = series.flatMap((s: any) =>
    (s.data || []).map((value: number, idx: number) => [categories[idx] || idx, value, s.name || `Series ${idx}`])
  );

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line',
        lineStyle: { color: 'rgba(0,0,0,0.2)', width: 1, type: 'solid' }
      }
    },
    legend: {
      show: true,
      bottom: 0,
    },
    singleAxis: {
      type: 'time',
      top: 50,
      bottom: 50,
      axisTick: {},
      axisLabel: {},
      axisPointer: {
        animation: true,
        label: { show: true }
      },
      splitLine: {
        show: true,
        lineStyle: { type: 'dashed', opacity: 0.2 }
      }
    },
    series: [{
      type: 'themeRiver',
      data: themeRiverData,
      label: { show: false },
      emphasis: {
        itemStyle: { shadowBlur: 20, shadowColor: 'rgba(0, 0, 0, 0.8)' }
      },
    }],
  };
}

function buildHistogramOption(data: any, config: UniversalChartProps['config']) {
  const categories = data.categories || data.xAxis?.data || [];
  const values = data.values || [];
  const xName = config.xAxisName?.trim() || '';
  const yName = config.yAxisName?.trim() || '';

  return {
    ...COMMON_THEME,
    ...buildCommonOption(config),
    xAxis: {
      type: 'category',
      data: categories,
      name: xName || undefined,
      nameLocation: 'middle',
      nameGap: xName ? 36 : 28,
      nameTextStyle: { fontSize: 12, color: '#374151' },
      axisLabel: { fontSize: 11, color: '#4b5563', margin: 6 },
    },
    yAxis: {
      type: 'value',
      name: yName || undefined,
      nameLocation: 'middle',
      nameGap: 40,
      nameTextStyle: { fontSize: 12, color: '#374151' },
      axisLabel: { fontSize: 11, color: '#4b5563' },
    },
    series: [{
      type: 'bar',
      data: values,
      barCategoryGap: '10%',
      itemStyle: { borderRadius: [0, 0, 0, 0] },
    }],
  };
}

const chartBuilders: Record<string, (data: any, config: UniversalChartProps['config']) => any> = {
  column: buildBarOption,
  stacked_bar: buildStackedHorizontalBarOption,
  horizontal_bar: buildHorizontalBarOption,
  line_multi: (data, config) => buildLineOption(data, config, { symbol: 'none' }),
  stacked_column: buildStackedColumnOption,
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
