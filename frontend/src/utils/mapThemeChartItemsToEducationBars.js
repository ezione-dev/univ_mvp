/**
 * `/api/theme/chart-blocks` 의 ThemeChartItem → 교육/교원 바 차트 props.
 * - item_label → 축 라벨(학기명 / 규모 구간)
 * - item_value_num → 막대 길이(%), 0~100 클램프
 * - item_display_text → 우측 숫자(강좌 수 등), 없으면 item_note_text에서 숫자 추출
 */

function clampPercent(value) {
  if (value == null || Number.isNaN(Number(value))) return 0;
  return Math.min(100, Math.max(0, Number(value)));
}

function parseIntLoose(value) {
  if (value == null || value === '') return 0;
  const digits = String(value).replace(/[^\d]/g, '');
  const n = parseInt(digits, 10);
  return Number.isFinite(n) ? n : 0;
}

function pickCount(item) {
  const fromDisplay = parseIntLoose(item?.displayText);
  if (fromDisplay > 0) return fromDisplay;
  return parseIntLoose(item?.noteText);
}

/**
 * CHART_LEFT: 학기별 전임 강의담당 비율
 */
export function mapThemeItemsToSemesterRatios(items) {
  if (!Array.isArray(items) || items.length === 0) return [];
  return items.map((it) => ({
    semester: typeof it.label === 'string' ? it.label : '',
    ratio: clampPercent(it.valueNum),
    courses: pickCount(it),
    colorHex: typeof it.colorHex === 'string' && it.colorHex.trim() ? it.colorHex.trim() : null,
  }));
}

/**
 * CHART_RIGHT: 강좌 규모 분포
 */
export function mapThemeItemsToCourseDistribution(items) {
  if (!Array.isArray(items) || items.length === 0) return [];
  return items.map((it) => ({
    range: typeof it.label === 'string' ? it.label : '',
    percentage: clampPercent(it.valueNum),
    count: pickCount(it),
    colorHex: typeof it.colorHex === 'string' && it.colorHex.trim() ? it.colorHex.trim() : null,
  }));
}
