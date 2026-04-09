import StatusPill from './StatusPill';

const comparisonStyles = {
  '우위': 'text-tertiary font-bold',
  '열세': 'text-error font-bold',
  '보통': 'text-on-surface-variant',
};

export default function RiskStrengthTable({ data }) {
  if (!data?.length) return null;

  return (
    <div className="bg-surface-container-lowest p-6 rounded-xl shadow-[0_8px_32px_rgba(24,28,30,0.04)]">
      <h3 className="text-lg font-bold text-primary mb-6">종합 리스크/우위 분석</h3>
      <table className="w-full text-left">
        <thead>
          <tr className="bg-surface-container-highest/50 text-[10px] font-bold text-outline uppercase tracking-wider">
            <th className="px-4 py-3 rounded-tl-lg">지표명</th>
            <th className="px-4 py-3">지역 대비</th>
            <th className="px-4 py-3">전국 대비</th>
            <th className="px-4 py-3 rounded-tr-lg">종합 판정</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {data.map((row, index) => (
            <tr
              key={row.indicator}
              className={`hover:bg-surface-container-low transition-colors ${index > 0 ? 'border-t border-outline-variant/10' : ''}`}
            >
              <td className="px-4 py-4 font-semibold text-primary">{row.indicator}</td>
              <td className={`px-4 py-4 ${comparisonStyles[row.regionalStatus] || ''}`}>
                {row.regionalStatus}
              </td>
              <td className={`px-4 py-4 ${comparisonStyles[row.nationalStatus] || ''}`}>
                {row.nationalStatus}
              </td>
              <td className="px-4 py-4">
                <StatusPill status={row.overallStatus} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}