export default function ContentTypeSelector({ value, onChange }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="font-headline text-lg font-semibold text-on-surface">
          콘텐츠 유형
        </h2>
        <span className="material-symbols-outlined text-sm text-on-surface-variant">
          widgets
        </span>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="content-type"
          className="ds-label block text-sm font-medium text-on-surface-variant"
        >
          유형 선택
        </label>
        <select
          id="content-type"
          value={value}
          onChange={handleChange}
          className="ds-input w-full h-12 px-4 rounded-lg bg-surface-container-low border border-outline-variant text-on-surface cursor-pointer appearance-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
        >
          <option value="chart">데이터 차트 (Chart)</option>
          <option value="grid">데이터 그리드 (Grid)</option>
          <option value="card">요약 카드 (Summary Card)</option>
          <option value="sql">SQL 쿼리 (SQL)</option>
        </select>
      </div>
    </section>
  );
}
