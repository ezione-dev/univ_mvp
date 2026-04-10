/** DB `bar_ratio_display_text` / API `barRatioDisplayText` → 0~100. 파싱 실패 시 0. */
export function parseBarRatioDisplayTextPercent(raw) {
  if (raw == null) return 0;
  const s = String(raw)
    .trim()
    .replace(/%/g, '')
    .replace(',', '.')
    .trim();
  if (!s) return 0;
  const x = parseFloat(s);
  if (Number.isNaN(x)) return 0;
  return Math.min(100, Math.max(0, x));
}
