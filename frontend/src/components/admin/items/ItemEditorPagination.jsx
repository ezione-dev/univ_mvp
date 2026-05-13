import React, { useMemo } from 'react';

export function ItemEditorPagination({ page, total, pageSize, onChange }) {
  const totalPages = Math.max(1, Math.ceil((total || 0) / (pageSize || 1)));
  const current = Math.min(Math.max(1, page), totalPages);

  const range = useMemo(() => {
    const pages = [];
    const windowSize = 7; // includes current
    const half = Math.floor(windowSize / 2);
    let start = Math.max(1, current - half);
    let end = Math.min(totalPages, start + windowSize - 1);
    start = Math.max(1, end - windowSize + 1);

    const push = (v) => pages.push(v);
    push(1);
    if (start > 2) push('…');
    for (let p = Math.max(2, start); p <= Math.min(totalPages - 1, end); p += 1) push(p);
    if (end < totalPages - 1) push('…');
    if (totalPages > 1) push(totalPages);

    // de-dupe
    return pages.filter((v, i) => (i === 0 ? true : pages[i - 1] !== v));
  }, [current, totalPages]);

  if (totalPages <= 1) return null;

  const go = (p) => {
    const next = Math.min(Math.max(1, p), totalPages);
    if (next === current) return;
    onChange?.(next);
  };

  const btnBase =
    'h-9 min-w-9 px-3 rounded-lg text-sm font-medium transition-colors border border-outline/30 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high disabled:opacity-50 disabled:cursor-not-allowed';
  const numBase =
    'h-9 min-w-9 px-3 rounded-lg text-sm font-semibold transition-colors border';

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
      <div className="text-xs text-on-surface-variant">
        총 <span className="font-semibold text-on-surface">{total ?? 0}</span>개 · {current} / {totalPages} 페이지
      </div>
      <div className="flex items-center gap-1.5">
        <button type="button" className={btnBase} onClick={() => go(1)} disabled={current <= 1}>
          처음
        </button>
        <button type="button" className={btnBase} onClick={() => go(current - 1)} disabled={current <= 1}>
          이전
        </button>
        {range.map((v, idx) =>
          v === '…' ? (
            <span key={`ellipsis-${idx}`} className="px-2 text-on-surface-variant/70">
              …
            </span>
          ) : (
            <button
              key={`p-${v}`}
              type="button"
              onClick={() => go(v)}
              className={
                v === current
                  ? `${numBase} border-primary bg-primary text-on-primary shadow-sm`
                  : `${numBase} border-outline/30 bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high`
              }
              aria-current={v === current ? 'page' : undefined}
            >
              {v}
            </button>
          )
        )}
        <button type="button" className={btnBase} onClick={() => go(current + 1)} disabled={current >= totalPages}>
          다음
        </button>
        <button type="button" className={btnBase} onClick={() => go(totalPages)} disabled={current >= totalPages}>
          끝
        </button>
      </div>
    </div>
  );
}
