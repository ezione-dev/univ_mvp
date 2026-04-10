import { useEffect, useMemo, useState } from 'react';
import { getThemeChartBlocks } from '../services/api';

function buildFromBlocks(blocks) {
  const meta = {};
  const itemsByCode = {};
  for (const b of blocks) {
    const code = b?.blockCode;
    if (!code) continue;
    meta[code] = {
      title: typeof b.title === 'string' ? b.title : '',
      subtitle: typeof b.subtitle === 'string' ? b.subtitle : '',
    };
    const raw = Array.isArray(b.items) ? b.items : [];
    itemsByCode[code] = [...raw].sort((a, c) => (a?.order ?? 0) - (c?.order ?? 0));
  }
  return { meta, itemsByCode };
}

/**
 * `tq_screen_chart_block` / `tq_screen_chart_item` — 제목·부제목 + 블록별 차트 행 데이터.
 */
export function useThemeChartBlockMeta({
  screenCode,
  screenVer = 'v0.1',
  screenBaseYear,
  schlNm,
}) {
  const params = useMemo(
    () => ({
      screen_code: screenCode,
      screen_ver: screenVer,
      screen_base_year: screenBaseYear,
      schl_nm: schlNm,
    }),
    [screenCode, screenVer, screenBaseYear, schlNm],
  );

  const [metaByCode, setMetaByCode] = useState({});
  const [itemsByCode, setItemsByCode] = useState({});
  const [chartBlocksStatus, setChartBlocksStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      if (!cancelled) setChartBlocksStatus('loading');
      try {
        const data = await getThemeChartBlocks(params);
        const blocks = Array.isArray(data?.blocks) ? data.blocks : [];
        if (!cancelled) {
          const { meta, itemsByCode: nextItems } = buildFromBlocks(blocks);
          setMetaByCode(meta);
          setItemsByCode(nextItems);
          setChartBlocksStatus('ok');
        }
      } catch {
        if (!cancelled) {
          setMetaByCode({});
          setItemsByCode({});
          setChartBlocksStatus('error');
        }
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [params]);

  const chartLeft = metaByCode.CHART_LEFT ?? { title: '', subtitle: '' };
  const chartRight = metaByCode.CHART_RIGHT ?? { title: '', subtitle: '' };
  const leftBlockItems = itemsByCode.CHART_LEFT ?? [];
  const rightBlockItems = itemsByCode.CHART_RIGHT ?? [];

  return {
    byCode: metaByCode,
    chartLeft,
    chartRight,
    leftBlockItems,
    rightBlockItems,
    /** loading | ok — 성공 시 목 JSON으로 차트를 덮어쓰지 않도록 구분 */
    chartBlocksStatus,
  };
}
