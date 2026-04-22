import React from 'react';
import UniversalChart from './UniversalChart';

export interface ChartGalleryChartTileProps {
  chartId: string;
  chartType: string;
  title: string;
  data: any;
  config: {
    title?: string;
    xAxisName?: string;
    yAxisName?: string;
    legendPosition?: 'top' | 'bottom' | 'left' | 'right';
    titlePosition?: 'left' | 'center' | 'right';
  };
  onChartClick?: (chartId: string) => void;
  isLoading?: boolean;
}

function ChartGalleryChartTile({
  chartId,
  chartType,
  title,
  data,
  config,
  onChartClick,
  isLoading,
}: ChartGalleryChartTileProps) {
  const handleClick = () => {
    onChartClick?.(chartId);
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 flex flex-col">
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-3 w-2/3" />
        <div className="flex-1 min-h-[300px] bg-gray-100 rounded animate-pulse" />
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 flex flex-col cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={handleClick}
    >
      <div className="text-base font-semibold text-gray-800 mb-3 truncate">
        {title}
      </div>
      <div className="flex-1 min-h-[300px]">
        <UniversalChart chartType={chartType} data={data} config={config} />
      </div>
    </div>
  );
}

export default ChartGalleryChartTile;
