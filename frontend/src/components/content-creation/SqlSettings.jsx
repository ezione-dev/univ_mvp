export default function SqlSettings({ value, onChange, visible }) {
  const handleChange = (field, fieldValue) => {
    onChange({ ...value, [field]: fieldValue });
  };

  if (!visible) return null;

  return (
    <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="font-headline text-lg font-semibold text-on-surface">
          데이터 조회 상세
        </h2>
        <span className="material-symbols-outlined text-sm text-on-surface-variant">
          database
        </span>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="sqlQuery"
          className="ds-label block text-sm font-medium text-on-surface-variant"
        >
          SQL 쿼리
        </label>
        <textarea
          id="sqlQuery"
          value={value.sql || ""}
          onChange={(e) => handleChange("sql", e.target.value)}
          readOnly
          rows={8}
          placeholder="SQL 쿼리가 여기에 표시됩니다"
          className="ds-input w-full px-4 py-3 rounded-lg border border-outline-variant text-on-inverse-surface placeholder:text-outline font-mono text-sm bg-[#2d3133] resize-none cursor-not-allowed"
        />
      </div>
    </section>
  );
}