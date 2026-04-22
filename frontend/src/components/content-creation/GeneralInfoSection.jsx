export default function GeneralInfoSection({ value, onChange, contentType, onContentTypeChange }) {
  const handleChange = (field, fieldValue) => {
    onChange({ ...value, [field]: fieldValue });
  };

  return (
    <section className="bg-surface-container-lowest rounded-xl p-8 shadow-ambient flex flex-col gap-6">
      <div className="flex items-center gap-3 border-b border-surface-container-high pb-4">
        <span className="material-symbols-outlined text-secondary">info</span>
        <h2 className="font-headline text-xl font-bold text-primary">일반 정보</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        <div className="flex flex-col">
          <label className="ds-label">콘텐츠 ID</label>
          <div className="bg-surface px-4 py-3 rounded-lg text-on-surface-variant font-mono text-sm border border-outline-variant/30">
            CNT-2023-089-A
          </div>
        </div>
        <div className="flex flex-col">
          <label className="ds-label">콘텐츠 유형</label>
          <select
            className="ds-input cursor-pointer appearance-none"
            value={contentType}
            onChange={(e) => onContentTypeChange(e.target.value)}
          >
            <option value="chart">데이터 차트 (Chart)</option>
            <option value="grid">데이터 그리드 (Grid)</option>
            <option value="card">요약 카드 (Summary Card)</option>
            <option value="sql">SQL 쿼리 (SQL)</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="ds-label" htmlFor="title">제목 (Title)</label>
          <input
            id="title"
            type="text"
            value={value.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="대시보드에 표시될 메인 타이틀"
            className="ds-input"
          />
        </div>
        <div className="flex flex-col">
          <label className="ds-label" htmlFor="subtitle">부제목 (Subtitle)</label>
          <input
            id="subtitle"
            type="text"
            value={value.subtitle}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            placeholder="제목을 보조하는 추가 설명"
            className="ds-input"
          />
        </div>
        <div className="flex flex-col md:col-span-2">
          <label className="ds-label" htmlFor="memo">내부 메모 (Memo)</label>
          <textarea
            id="memo"
            value={value.memo}
            onChange={(e) => handleChange('memo', e.target.value)}
            placeholder="관리자용 메모를 입력하세요..."
            className="ds-input min-h-[100px] resize-none"
          />
        </div>
      </div>
    </section>
  );
}