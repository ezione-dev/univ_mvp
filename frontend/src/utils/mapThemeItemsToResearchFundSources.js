import { parseBarRatioDisplayTextPercent } from './parseBarRatioDisplayTextPercent';

/**
 * 연구 CHART_LEFT: 막대 길이는 DB `bar_ratio_display_text`(API: barRatioDisplayText)만 사용.
 * `item_value_num`(금액 등)은 사용하지 않음. 파싱 실패 시 0%.
 */
export function mapThemeItemsToResearchFundSources(items) {
  if (!Array.isArray(items) || items.length === 0) return [];
  return items.map((it) => {
    const raw = it.barRatioDisplayText ?? it.bar_ratio_display_text;
    const percentage = parseBarRatioDisplayTextPercent(raw);
    return {
      name: typeof it.label === 'string' ? it.label : '',
      percentage,
    };
  });
}
