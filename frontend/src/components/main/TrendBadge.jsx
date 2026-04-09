export default function TrendBadge({ value, status }) {
  const isPositive = status === 'positive';
  const isNegative = status === 'negative';
  const isNeutral = status === 'neutral';

  const colorClass = isPositive
    ? 'text-tertiary'
    : isNegative
    ? 'text-error'
    : 'text-on-surface-variant';

  return (
    <span className={`font-bold ${colorClass}`}>
      {value}
    </span>
  );
}