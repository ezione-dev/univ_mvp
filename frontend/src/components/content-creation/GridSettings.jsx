export default function GridSettings({ value, onChange, visible }) {
  const handleChange = (field, fieldValue) => {
    onChange({ ...value, [field]: fieldValue });
  };

  const handleColumnChange = (index, field, fieldValue) => {
    const newColumns = [...value.columns];
    newColumns[index] = { ...newColumns[index], [field]: fieldValue };
    onChange({ ...value, columns: newColumns });
  };

  const addColumn = () => {
    const newColumns = [
      ...value.columns,
      { displayName: "", dataKey: "", alignment: "left" },
    ];
    onChange({ ...value, columns: newColumns });
  };

  const removeColumn = (index) => {
    const newColumns = value.columns.filter((_, i) => i !== index);
    onChange({ ...value, columns: newColumns });
  };

  if (!visible) return null;

  return (
    <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="font-headline text-lg font-semibold text-on-surface">
          그리드 설정
        </h2>
        <span className="material-symbols-outlined text-sm text-on-surface-variant">
          grid_on
        </span>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="sectionTitle"
            className="ds-label block text-sm font-medium text-on-surface-variant"
          >
            섹션 제목
          </label>
          <input
            id="sectionTitle"
            type="text"
            value={value.sectionTitle}
            onChange={(e) => handleChange("sectionTitle", e.target.value)}
            placeholder="섹션 제목을 입력하세요"
            className="ds-input w-full h-12 px-4 rounded-lg bg-surface-container-low border border-outline-variant text-on-surface placeholder:text-outline-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all"
          />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="ds-label block text-sm font-medium text-on-surface-variant">
              컬럼 설정
            </label>
            <button
              type="button"
              onClick={addColumn}
              className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-secondary hover:bg-surface-container-low rounded-lg transition-all"
            >
              <span className="material-symbols-outlined text-base">add</span>
              추가
            </button>
          </div>

          {value.columns.length === 0 ? (
            <p className="text-sm text-on-surface-variant py-4 text-center">
              컬럼이 없습니다. "추가" 버튼을 눌러 컬럼을 추가하세요.
            </p>
          ) : (
            <div className="space-y-3">
              {value.columns.map((column, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-surface-container-low rounded-xl"
                >
                  <div className="flex-1 space-y-3">
                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1.5">
                        <label className="ds-label block text-xs font-medium text-on-surface-variant">
                          표시명
                        </label>
                        <input
                          type="text"
                          value={column.displayName}
                          onChange={(e) =>
                            handleColumnChange(index, "displayName", e.target.value)
                          }
                          placeholder="컬럼명"
                          className="ds-input w-full h-10 px-3 rounded-lg bg-surface-container-lowest border border-outline-variant text-on-surface placeholder:text-outline-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="ds-label block text-xs font-medium text-on-surface-variant">
                          데이터 키
                        </label>
                        <input
                          type="text"
                          value={column.dataKey}
                          onChange={(e) =>
                            handleColumnChange(index, "dataKey", e.target.value)
                          }
                          placeholder="dataKey"
                          className="ds-input w-full h-10 px-3 rounded-lg bg-surface-container-lowest border border-outline-variant text-on-surface placeholder:text-outline-variant focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="ds-label block text-xs font-medium text-on-surface-variant">
                          정렬
                        </label>
                        <select
                          value={column.alignment}
                          onChange={(e) =>
                            handleColumnChange(index, "alignment", e.target.value)
                          }
                          className="ds-input w-full h-10 px-3 rounded-lg bg-surface-container-lowest border border-outline-variant text-on-surface cursor-pointer appearance-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 outline-none transition-all text-sm"
                        >
                          <option value="left">좌측</option>
                          <option value="center">중앙</option>
                          <option value="right">우측</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeColumn(index)}
                    className="mt-6 p-1.5 text-error hover:bg-error/10 rounded-lg transition-all"
                  >
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}