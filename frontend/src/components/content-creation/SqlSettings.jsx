const DEMO_SQL = `SELECT 
    t.base_year,
    c.college_nm,
    d.department_nm,
    SUM(t.tuition_amount) as tuition_revenue
FROM fact_tuition_revenue t
JOIN dim_department d ON t.dept_id = d.dept_id
JOIN dim_college c ON d.college_id = c.college_id
WHERE t.base_year >= (EXTRACT(YEAR FROM CURRENT_DATE) - 5)
GROUP BY 
    t.base_year,
    c.college_nm,
    d.department_nm
ORDER BY 
    t.base_year DESC,
    tuition_revenue DESC;`;

const DEMO_PROMPT = "최근 5년간의 연도별, 학과별 등록금 수입 데이터를 추출해줘. 단과대 이름도 포함하고, 등록금 수입이 높은 순으로 정렬해.";

export default function SqlSettings({ value, onChange, visible }) {
  if (!visible) return null;

  const displaySql = value.sql || DEMO_SQL;

  return (
    <section className="bg-surface-container-lowest rounded-xl p-8 shadow-ambient flex flex-col gap-6">
      <div className="flex items-center gap-3 border-b border-surface-container-high pb-4">
        <span className="material-symbols-outlined text-secondary">database</span>
        <h2 className="font-headline text-xl font-bold text-primary">데이터 조회 상세</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label className="ds-label flex items-center justify-between">
              <span>자연어 프롬프트 (요청사항)</span>
              <span className="text-secondary bg-secondary-fixed px-2 py-0.5 rounded text-[10px]">AI Assistant</span>
            </label>
            <div className="bg-surface-container-low p-4 rounded-lg text-sm text-on-surface">
              {DEMO_PROMPT}
            </div>
          </div>
          <div className="flex flex-col flex-grow">
            <label className="ds-label flex items-center justify-between">
              <span>생성된 SQL 쿼리</span>
              <button className="text-secondary hover:text-primary transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">content_copy</span>
                <span className="text-[10px] normal-case">복사</span>
              </button>
            </label>
            <div className="bg-inverse-surface text-inverse-on-surface p-5 rounded-xl font-mono text-xs leading-relaxed overflow-x-auto h-full shadow-inner">
              <pre><code>{displaySql}</code></pre>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="ds-label flex items-center justify-between mb-2">
            <span>데이터 미리보기 (Top 100)</span>
            <button className="flex items-center gap-1 text-secondary text-xs hover:underline">
              <span className="material-symbols-outlined text-[14px]">refresh</span>
              쿼리 재실행
            </button>
          </label>
          <div className="bg-surface-container-low rounded-xl overflow-hidden border border-outline-variant/20 flex-grow flex flex-col">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-surface-container-highest text-on-surface-variant font-label text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3 font-medium">base_year</th>
                    <th className="px-4 py-3 font-medium">college_nm</th>
                    <th className="px-4 py-3 font-medium">department_nm</th>
                    <th className="px-4 py-3 font-medium text-right">tuition_revenue</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-body bg-surface-container-lowest divide-y divide-surface-container-low/50">
                  <tr className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-4 py-3 text-on-surface">2023</td>
                    <td className="px-4 py-3 text-on-surface-variant">공과대학</td>
                    <td className="px-4 py-3 text-on-surface-variant">컴퓨터공학과</td>
                    <td className="px-4 py-3 text-on-surface text-right font-medium">1,250,000,000</td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-4 py-3 text-on-surface">2023</td>
                    <td className="px-4 py-3 text-on-surface-variant">경영대학</td>
                    <td className="px-4 py-3 text-on-surface-variant">경영학과</td>
                    <td className="px-4 py-3 text-on-surface text-right font-medium">980,500,000</td>
                  </tr>
                  <tr className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="px-4 py-3 text-on-surface">2022</td>
                    <td className="px-4 py-3 text-on-surface-variant">공과대학</td>
                    <td className="px-4 py-3 text-on-surface-variant">컴퓨터공학과</td>
                    <td className="px-4 py-3 text-on-surface text-right font-medium">1,180,000,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-auto bg-surface px-4 py-3 border-t border-outline-variant/20 flex justify-between items-center text-xs text-on-surface-variant">
              <span>Showing 3 of 142 rows</span>
              <div className="flex gap-2">
                <button className="text-on-surface hover:text-secondary">Previous</button>
                <span>|</span>
                <button className="text-on-surface hover:text-secondary">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}