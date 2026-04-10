import { useEffect, useMemo, useState } from "react";
import { getOverviewTextBlocks } from "../services/api";

const DEFAULT_SCREEN_VER = "v0.1";
const BLOCK_CODE = "SUMMARY_JUDGMENT";

function firstNonEmptyText(lines) {
  if (!Array.isArray(lines)) return null;
  const any = lines.find((l) => (l?.text || "").trim() !== "");
  return any ? any.text : null;
}

/**
 * Overview PDF 버튼 라벨(제목/소제목)용.
 * - title: tq_overview_text_block.block_title (SUMMARY_JUDGMENT)
 * - subtitle: tq_overview_text_line 중 첫 비어있지 않은 line_text
 */
export function useOverviewPdfReportLabel({
  screenCode = "overview",
  screenVer = DEFAULT_SCREEN_VER,
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

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState(null);
  const [subtitle, setSubtitle] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const data = await getOverviewTextBlocks(params);
        const blocks = Array.isArray(data?.blocks) ? data.blocks : [];
        const block = blocks.find((b) => b?.blockCode === BLOCK_CODE);

        const t = (block?.title || "").trim();
        const lines = Array.isArray(block?.lines) ? block.lines : [];
        const sub = firstNonEmptyText(lines);

        if (!cancelled) {
          setTitle(t || null);
          setSubtitle((sub || "").trim() ? sub : null);
        }
      } catch {
        if (!cancelled) {
          setTitle(null);
          setSubtitle(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    if (!screenBaseYear || !schlNm) {
      setTitle(null);
      setSubtitle(null);
      setLoading(false);
      return () => {
        cancelled = true;
      };
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [params, screenBaseYear, schlNm]);

  return { title, subtitle, loading };
}

// ✅ 명칭 정리: 실제 의미는 "SUMMARY_JUDGMENT 표시"
export const useOverviewSummaryJudgmentLabel = useOverviewPdfReportLabel;

