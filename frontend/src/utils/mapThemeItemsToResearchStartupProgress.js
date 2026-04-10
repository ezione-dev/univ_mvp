import { parseBarRatioDisplayTextPercent } from './parseBarRatioDisplayTextPercent';

/**
 * 연구 CHART_RIGHT: 막대는 `bar_ratio_display_text`만. 우측 문구는 displayText → noteText → 비율 문자열 순.
 */
export function mapThemeItemsToResearchStartupProgress(items) {
  if (!Array.isArray(items) || items.length === 0) return [];
  return items.map((it) => {
    const label = typeof it.label === 'string' ? it.label : '';
    const rawRatio = it.barRatioDisplayText ?? it.bar_ratio_display_text;
    const percentage = parseBarRatioDisplayTextPercent(rawRatio);
    const displayText = typeof it.displayText === 'string' ? it.displayText.trim() : '';
    const noteText = typeof it.noteText === 'string' ? it.noteText.trim() : '';
    let valueCaption = displayText || noteText;
    if (!valueCaption && rawRatio != null && String(rawRatio).trim()) {
      valueCaption = String(rawRatio).trim();
    }
    if (!valueCaption) {
      valueCaption = `${percentage}%`;
    }
    return { label, percentage, valueCaption };
  });
}
