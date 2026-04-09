export default function StatusPill({ status }) {
  const styles = {
    '최우수': 'bg-tertiary-fixed text-on-tertiary-fixed',
    '집중관리': 'bg-error-container text-on-error-container',
    '보완필요': 'bg-secondary-fixed text-on-secondary-fixed',
  };

  return (
    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${styles[status] || ''}`}>
      {status}
    </span>
  );
}