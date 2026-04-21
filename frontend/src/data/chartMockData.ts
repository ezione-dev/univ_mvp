interface BarColumnData {
  categories: string[];
  values: number[];
}

interface LineAreaData {
  categories: string[];
  series: number[][];
}

interface PieDonutRoseDataItem {
  name: string;
  value: number;
}

type ScatterBubbleData = [number, number][];

type HeatmapGridData = [number, number, number][];

interface RadarData {
  indicator: { name: string; max: number }[];
  series: number[];
}

type CandlestickData = [number, number, number, number][];

interface TreemapDataItem {
  name: string;
  value?: number;
  children?: TreemapDataItem[];
}

interface GaugeData {
  value: number;
}

type CalendarHeatmapData = [string, number][];

interface WaterfallData {
  positive: number[];
  negative: number[];
}

interface PopulationPyramidData {
  left: number[];
  right: number[];
  ageGroups: string[];
}

export const barColumnData: BarColumnData = {
  categories: ['A', 'B', 'C', 'D'],
  values: [10, 20, 30, 40],
};

export const lineAreaData: LineAreaData = {
  categories: ['1월', '2월', '3월', '4월'],
  series: [
    [100, 120, 130, 150],
    [80, 90, 100, 110],
  ],
};

export const pieDonutRoseData: PieDonutRoseDataItem[] = [
  { name: 'A', value: 30 },
  { name: 'B', value: 50 },
  { name: 'C', value: 20 },
];

export const scatterBubbleData: ScatterBubbleData = [
  [10, 20],
  [30, 40],
  [50, 30],
  [70, 80],
  [90, 60],
];

export const heatmapGridData: HeatmapGridData = [
  [0, 0, 5],
  [0, 1, 10],
  [0, 2, 15],
  [1, 0, 8],
  [1, 1, 12],
  [1, 2, 7],
  [2, 0, 3],
  [2, 1, 6],
  [2, 2, 9],
];

export const radarData: RadarData = {
  indicator: [
    { name: 'A', max: 100 },
    { name: 'B', max: 100 },
    { name: 'C', max: 100 },
    { name: 'D', max: 100 },
    { name: 'E', max: 100 },
  ],
  series: [80, 65, 70, 85, 60],
};

export const candlestickData: CandlestickData = [
  [20, 30, 15, 35],
  [25, 35, 20, 40],
  [30, 38, 28, 42],
  [35, 42, 30, 48],
];

export const treemapData: TreemapDataItem[] = [
  { name: 'A', value: 30 },
  { name: 'B', children: [{ name: 'C', value: 20 }] },
];

export const gaugeData: GaugeData = { value: 80 };

export const calendarHeatmapData: CalendarHeatmapData = [
  ['2024-01-01', 10],
  ['2024-01-02', 15],
  ['2024-01-03', 8],
  ['2024-01-04', 20],
  ['2024-01-05', 12],
  ['2024-01-06', 5],
  ['2024-01-07', 18],
];

export const waterfallData: WaterfallData = {
  positive: [30, 20, 15],
  negative: [-10, -5, -8],
};

export const populationPyramidData: PopulationPyramidData = {
  left: [30, 25, 20, 15, 10],
  right: [28, 22, 18, 12, 8],
  ageGroups: ['0-9', '10-19', '20-29', '30-39', '40-49'],
};

interface ChartMockData {
  barColumn: BarColumnData;
  lineArea: LineAreaData;
  pieDonutRose: PieDonutRoseDataItem[];
  scatterBubble: ScatterBubbleData;
  heatmapGrid: HeatmapGridData;
  radar: RadarData;
  candlestick: CandlestickData;
  treemap: TreemapDataItem[];
  gauge: GaugeData;
  calendarHeatmap: CalendarHeatmapData;
  waterfall: WaterfallData;
  populationPyramid: PopulationPyramidData;
}

const chartMockData: ChartMockData = {
  barColumn: barColumnData,
  lineArea: lineAreaData,
  pieDonutRose: pieDonutRoseData,
  scatterBubble: scatterBubbleData,
  heatmapGrid: heatmapGridData,
  radar: radarData,
  candlestick: candlestickData,
  treemap: treemapData,
  gauge: gaugeData,
  calendarHeatmap: calendarHeatmapData,
  waterfall: waterfallData,
  populationPyramid: populationPyramidData,
};

export default chartMockData;