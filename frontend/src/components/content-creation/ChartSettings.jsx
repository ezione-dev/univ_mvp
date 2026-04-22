export default function ChartSettings({ value, onChange, visible }) {
  const handleChange = (field, fieldValue) => {
    onChange({ ...value, [field]: fieldValue });
  };

  if (!visible) return null;

  return (
    <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="font-headline text-lg font-semibold text-on-surface">
          차트 설정
        </h2>
        <span className="material-symbols-outlined text-sm text-on-surface-variant">
          bar_chart
        </span>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="chartType"
            className="ds-label block text-sm font-medium text-on-surface-variant"
          >
            차트 유형
          </label>
          <select
            id="chartType"
            value={value.chartType}
            onChange={(e) => handleChange("chartType", e.target.value)}
            className="ds-input w-full h-12 px-4 rounded-lg bg-surface-container-low border border-outline-variant text-on-surface cursor-pointer appearance-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
          >
            <option value="bar">막대 그래프 (Bar)</option>
            <option value="stacked_bar">누적 막대 그래프 (Stacked Bar)</option>
            <option value="line">선 그래프 (Line)</option>
            <option value="pie">원 그래프 (Pie)</option>
            <option value="scatter">산점도 (Scatter)</option>
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="xAxis"
            className="ds-label block text-sm font-medium text-on-surface-variant"
          >
            X축
          </label>
          <select
            id="xAxis"
            value={value.xAxis}
            onChange={(e) => handleChange("xAxis", e.target.value)}
            className="ds-input w-full h-12 px-4 rounded-lg bg-surface-container-low border border-outline-variant text-on-surface cursor-pointer appearance-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
          >
            <option value="">선택하세요</option>
            <option value="category">카테고리</option>
            <option value="time">시간</option>
            <option value="value">값</option>
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="yAxis"
            className="ds-label block text-sm font-medium text-on-surface-variant"
          >
            Y축
          </label>
          <select
            id="yAxis"
            value={value.yAxis}
            onChange={(e) => handleChange("yAxis", e.target.value)}
            className="ds-input w-full h-12 px-4 rounded-lg bg-surface-container-low border border-outline-variant text-on-surface cursor-pointer appearance-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
          >
            <option value="">선택하세요</option>
            <option value="category">카테고리</option>
            <option value="time">시간</option>
            <option value="value">값</option>
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="legendPosition"
            className="ds-label block text-sm font-medium text-on-surface-variant"
          >
            범례 위치
          </label>
          <select
            id="legendPosition"
            value={value.legendPosition}
            onChange={(e) => handleChange("legendPosition", e.target.value)}
            className="ds-input w-full h-12 px-4 rounded-lg bg-surface-container-low border border-outline-variant text-on-surface cursor-pointer appearance-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
          >
            <option value="top">상단 (Top)</option>
            <option value="right">우측 (Right)</option>
            <option value="bottom">하단 (Bottom)</option>
            <option value="hidden">非표시 (Hidden)</option>
          </select>
        </div>
      </div>
    </section>
  );
}
