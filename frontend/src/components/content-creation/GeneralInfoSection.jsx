export default function GeneralInfoSection({ value, onChange }) {
  const handleChange = (field, fieldValue) => {
    onChange({ ...value, [field]: fieldValue });
  };

  return (
    <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="font-headline text-lg font-semibold text-on-surface">
          일반 정보
        </h2>
        <span className="material-symbols-outlined text-sm text-on-surface-variant">
          info
        </span>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="ds-label block text-sm font-medium text-on-surface-variant"
          >
            제목
          </label>
          <input
            id="title"
            type="text"
            value={value.title}
            onChange={(e) => handleChange("title", e.target.value)}
            placeholder="보고서 제목을 입력하세요"
            className="ds-input w-full h-12 px-4 rounded-lg bg-surface-container-low border border-outline-variant text-on-surface placeholder:text-outline-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="subtitle"
            className="ds-label block text-sm font-medium text-on-surface-variant"
          >
            부제목
          </label>
          <input
            id="subtitle"
            type="text"
            value={value.subtitle}
            onChange={(e) => handleChange("subtitle", e.target.value)}
            placeholder="보고서 부제목을 입력하세요"
            className="ds-input w-full h-12 px-4 rounded-lg bg-surface-container-low border border-outline-variant text-on-surface placeholder:text-outline-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="memo"
            className="ds-label block text-sm font-medium text-on-surface-variant"
          >
            메모
          </label>
          <textarea
            id="memo"
            value={value.memo}
            onChange={(e) => handleChange("memo", e.target.value)}
            placeholder="추가 메모를 입력하세요"
            rows={4}
            className="ds-input w-full px-4 py-3 rounded-lg bg-surface-container-low border border-outline-variant text-on-surface placeholder:text-outline-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all resize-none"
          />
        </div>
      </div>
    </section>
  );
}
