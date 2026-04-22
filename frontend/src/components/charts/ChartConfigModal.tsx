import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

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

const inputClassName =
  'col-span-3 rounded-md border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-surface focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/25';

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

  const supportsXYAxisName = !['treemap', 'radar'].includes(localConfig.chartType);

  useEffect(() => {
    if (isOpen) {
      setLocalConfig(chartConfig);
    }
  }, [isOpen, chartConfig]);

  const handleSave = () => {
    const nextConfig = supportsXYAxisName
      ? localConfig
      : { ...localConfig, xAxisName: '', yAxisName: '' };
    onSave(nextConfig);
    onClose();
  };

  const handleChange = <K extends keyof typeof localConfig>(
    key: K,
    value: (typeof localConfig)[K]
  ) => {
    setLocalConfig((prev) => ({ ...prev, [key]: value }));
  };

  if (!isOpen) return null;

  const modal = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />
      <div
        className="relative w-full max-w-md rounded-lg border border-outline-variant bg-surface-container-lowest shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="chart-config-modal-title"
      >
        <div className="flex items-center justify-between border-b border-outline-variant px-5 py-4">
          <h2 id="chart-config-modal-title" className="font-headline text-base font-semibold text-on-surface">
            차트 설정
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            aria-label="닫기"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="max-h-[min(70vh,32rem)] space-y-4 overflow-y-auto px-5 py-4">
          <div className="grid grid-cols-4 items-center gap-3">
            <label className="text-sm text-on-surface-variant">차트 제목</label>
            <input
              type="text"
              value={localConfig.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className={inputClassName}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-3">
            <label className="text-sm text-on-surface-variant">X축 이름</label>
            <input
              type="text"
              value={localConfig.xAxisName}
              onChange={(e) => handleChange('xAxisName', e.target.value)}
              className={`${inputClassName} ${supportsXYAxisName ? '' : 'cursor-not-allowed opacity-60'}`}
              disabled={!supportsXYAxisName}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-3">
            <label className="text-sm text-on-surface-variant">Y축 이름</label>
            <input
              type="text"
              value={localConfig.yAxisName}
              onChange={(e) => handleChange('yAxisName', e.target.value)}
              className={`${inputClassName} ${supportsXYAxisName ? '' : 'cursor-not-allowed opacity-60'}`}
              disabled={!supportsXYAxisName}
            />
          </div>

          {!supportsXYAxisName && (
            <p className="-mt-2 text-xs text-on-surface-variant">
              이 차트 타입에서는 X/Y축 이름 설정을 지원하지 않습니다.
            </p>
          )}

          <div className="grid grid-cols-4 items-center gap-3">
            <label className="text-sm text-on-surface-variant">타이틀 위치</label>
            <select
              value={localConfig.titlePosition}
              onChange={(e) => handleChange('titlePosition', e.target.value as TitlePosition)}
              className={inputClassName}
            >
              {TITLE_POSITIONS.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-4 items-center gap-3">
            <label className="text-sm text-on-surface-variant">범례 위치</label>
            <select
              value={localConfig.legendPosition}
              onChange={(e) => handleChange('legendPosition', e.target.value as typeof localConfig.legendPosition)}
              className={inputClassName}
            >
              {LEGEND_POSITIONS.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-2 border-t border-outline-variant bg-surface-container-low px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-outline bg-surface-container-lowest px-4 py-2 text-sm font-semibold text-on-surface shadow-sm hover:bg-surface-container-high focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-on-secondary shadow-sm hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-container-lowest"
          >
            적용
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
