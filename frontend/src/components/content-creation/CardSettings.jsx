export default function CardSettings({ value, onChange, visible }) {
  const handleChange = (field, fieldValue) => {
    onChange({ ...value, [field]: fieldValue });
  };

  if (!visible) return null;

  return (
    <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="font-headline text-lg font-semibold text-on-surface">
          카드 설정
        </h2>
        <span className="material-symbols-outlined text-sm text-on-surface-variant">
          space_dashboard
        </span>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="cardTitle"
            className="ds-label block text-sm font-medium text-on-surface-variant"
          >
            카드 제목
          </label>
          <input
            type="text"
            id="cardTitle"
            value={value.cardTitle}
            onChange={(e) => handleChange("cardTitle", e.target.value)}
            className="ds-input w-full h-12 px-4 rounded-lg bg-surface-container-low border border-outline-variant text-on-surface placeholder:text-on-surface-variant/50 focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
            placeholder="카드 제목을 입력하세요"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="titlePosition"
            className="ds-label block text-sm font-medium text-on-surface-variant"
          >
            제목 위치
          </label>
          <select
            id="titlePosition"
            value={value.titlePosition}
            onChange={(e) => handleChange("titlePosition", e.target.value)}
            className="ds-input w-full h-12 px-4 rounded-lg bg-surface-container-low border border-outline-variant text-on-surface cursor-pointer appearance-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
          >
            <option value="left-top">좌측 상단</option>
            <option value="center">중앙</option>
            <option value="right-top">우측 상단</option>
          </select>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="itemCount"
            className="ds-label block text-sm font-medium text-on-surface-variant"
          >
            아이템 개수
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleChange("itemCount", Math.max(1, (value.itemCount || 1) - 1))}
              className="ds-input w-12 h-12 rounded-lg bg-surface-container-low border border-outline-variant text-on-surface cursor-pointer flex items-center justify-center hover:bg-surface-container transition-all"
            >
              <span className="material-symbols-outlined text-lg">remove</span>
            </button>
            <input
              type="number"
              id="itemCount"
              min="1"
              value={value.itemCount}
              onChange={(e) => handleChange("itemCount", parseInt(e.target.value) || 1)}
              className="ds-input w-24 h-12 px-4 rounded-lg bg-surface-container-low border border-outline-variant text-on-surface text-center focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
            />
            <button
              type="button"
              onClick={() => handleChange("itemCount", (value.itemCount || 1) + 1)}
              className="ds-input w-12 h-12 rounded-lg bg-surface-container-low border border-outline-variant text-on-surface cursor-pointer flex items-center justify-center hover:bg-surface-container transition-all"
            >
              <span className="material-symbols-outlined text-lg">add</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
