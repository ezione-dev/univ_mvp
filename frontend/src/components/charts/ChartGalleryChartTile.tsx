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
  };
  onChartClick?: (chartId: string) => void;
}

function ChartGalleryChartTile({
  chartId,
  chartType,
  title,
  data,
  config,
  onChartClick,
}: ChartGalleryChartTileProps) {
  const handleClick = () => {
    onChartClick?.(chartId);
  };

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
