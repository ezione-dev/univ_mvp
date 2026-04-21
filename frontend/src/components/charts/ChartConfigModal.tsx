import { useState, useEffect } from 'react';

export interface ChartConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  chartConfig: {
    chartType: string;
    title: string;
    xAxisName: string;
    yAxisName: string;
    titlePosition: 'left' | 'center' | 'right';
    legendPosition: 'top' | 'bottom' | 'left' | 'right';
  };
  onSave: (config: ChartConfigModalProps['chartConfig']) => void;
}

const TITLE_POSITIONS = ['left', 'center', 'right'] as const;
const LEGEND_POSITIONS = ['top', 'bottom', 'left', 'right'] as const;

export type TitlePosition = (typeof TITLE_POSITIONS)[number];
export type LegendPosition = (typeof LEGEND_POSITIONS)[number];

export default function ChartConfigModal({
  isOpen,
  onClose,
  chartConfig,
  onSave,
}: ChartConfigModalProps) {
  const [localConfig, setLocalConfig] = useState({
    ...chartConfig,
    titlePosition: chartConfig.titlePosition ?? 'center',
  });

  useEffect(() => {
    if (isOpen) {
      setLocalConfig(chartConfig);
    }
  }, [isOpen, chartConfig]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(localConfig);
    onClose();
  };

  const handleChange = <K extends keyof typeof localConfig>(
    key: K,
    value: (typeof localConfig)[K]
  ) => {
    setLocalConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-[#e5e8eb] px-5 py-4">
          <h2 className="text-base font-semibold text-[#2d3133]">차트 설정</h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded text-[#737781] hover:bg-[#f1f4f7] hover:text-[#2d3133]"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4 px-5 py-4">
          <div className="grid grid-cols-4 items-center gap-3">
            <label className="text-sm text-[#5a5f64]">차트 제목</label>
            <input
              type="text"
              value={localConfig.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="col-span-3 rounded-md border border-[#e5e8eb] px-3 py-2 text-sm text-[#2d3133] focus:border-[#006_one] focus:outline-none focus:ring-1 focus:ring-[#006_one]"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-3">
            <label className="text-sm text-[#5a5f64]">X축 이름</label>
            <input
              type="text"
              value={localConfig.xAxisName}
              onChange={(e) => handleChange('xAxisName', e.target.value)}
              className="col-span-3 rounded-md border border-[#e5e8eb] px-3 py-2 text-sm text-[#2d3133] focus:border-[#006_one] focus:outline-none focus:ring-1 focus:ring-[#006_one]"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-3">
            <label className="text-sm text-[#5a5f64]">Y축 이름</label>
            <input
              type="text"
              value={localConfig.yAxisName}
              onChange={(e) => handleChange('yAxisName', e.target.value)}
              className="col-span-3 rounded-md border border-[#e5e8eb] px-3 py-2 text-sm text-[#2d3133] focus:border-[#006_one] focus:outline-none focus:ring-1 focus:ring-[#006_one]"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-3">
            <label className="text-sm text-[#5a5f64]">타이틀 위치</label>
            <select
              value={localConfig.titlePosition}
              onChange={(e) => handleChange('titlePosition', e.target.value as TitlePosition)}
              className="col-span-3 rounded-md border border-[#e5e8eb] px-3 py-2 text-sm text-[#2d3133] focus:border-[#006_one] focus:outline-none focus:ring-1 focus:ring-[#006_one]"
            >
              {TITLE_POSITIONS.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-4 items-center gap-3">
            <label className="text-sm text-[#5a5f64]">범례 위치</label>
            <select
              value={localConfig.legendPosition}
              onChange={(e) => handleChange('legendPosition', e.target.value as typeof localConfig.legendPosition)}
              className="col-span-3 rounded-md border border-[#e5e8eb] px-3 py-2 text-sm text-[#2d3133] focus:border-[#006_one] focus:outline-none focus:ring-1 focus:ring-[#006_one]"
            >
              {LEGEND_POSITIONS.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-[#e5e8eb] px-5 py-4">
          <button
            onClick={onClose}
            className="rounded-md border border-[#e5e8eb] bg-white px-4 py-2 text-sm font-medium text-[#5a5f64] hover:bg-[#f1f4f7]"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="rounded-md bg-[#006_one] px-4 py-2 text-sm font-medium text-white hover:bg-[#005_one]"
          >
            적용
          </button>
        </div>
      </div>
    </div>
  );
}
