export default function CardSettings({ value, onChange, visible }) {
  const handleChange = (field, fieldValue) => {
    onChange({ ...value, [field]: fieldValue });
  };

  if (!visible) return null;

  return (
    <section className="bg-surface-container-lowest rounded-xl p-8 shadow-ambient flex flex-col gap-6">
      <div className="flex items-center justify-between border-b border-surface-container-high pb-4">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-secondary">space_dashboard</span>
          <h2 className="font-headline text-xl font-bold text-primary">카드 설정</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="ds-label">카드 제목</label>
          <input
            className="ds-input"
            type="text"
            value={value.cardTitle}
            onChange={(e) => handleChange('cardTitle', e.target.value)}
            placeholder="카드 제목을 입력하세요"
          />
        </div>
        <div className="flex flex-col">
          <label className="ds-label">제목 위치</label>
          <select
            className="ds-input"
            value={value.titlePosition}
            onChange={(e) => handleChange('titlePosition', e.target.value)}
          >
            <option value="left-top">좌측 상단</option>
            <option value="center">중앙</option>
            <option value="right-top">우측 상단</option>
          </select>
        </div>
        <div className="flex flex-col md:col-span-2">
          <label className="ds-label flex items-center justify-between">
            <span>콘텐츠 항목 수</span>
            <span className="text-xs text-on-surface-variant normal-case">표시할 데이터 개수</span>
          </label>
          <div className="flex items-center gap-4 mt-1">
            <div className="flex items-center bg-surface-container-low rounded-lg border border-outline-variant/30 overflow-hidden">
              <button
                type="button"
                onClick={() => handleChange('itemCount', Math.max(1, (value.itemCount || 1) - 1))}
                className="px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-sm">remove</span>
              </button>
              <input
                className="w-16 bg-transparent border-none text-center text-sm font-medium focus:ring-0 p-0"
                type="number"
                min="1"
                value={value.itemCount}
                onChange={(e) => handleChange('itemCount', parseInt(e.target.value) || 1)}
              />
              <button
                type="button"
                onClick={() => handleChange('itemCount', (value.itemCount || 1) + 1)}
                className="px-3 py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
              >
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
            <button
              type="button"
              className="px-4 py-2 bg-secondary-container text-on-secondary-container rounded-lg text-sm font-medium hover:bg-secondary-fixed transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[16px]">add_circle</span>
              항목 설정 추가
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}