import { useState, useEffect } from 'react';
import { CONTENT_TYPE_MAP } from '../../constants/contentTypes';

/* ────────────── 읽기전용 필드 공통 컴포넌트 ────────────── */
function ReadField({ label, value, colSpan = 1, isTextarea = false }) {
  return (
    <div className={`space-y-2 ${colSpan === 2 ? 'col-span-2' : ''}`}>
      <label className="font-label text-[13px] text-[#424750] block">{label}</label>
      {isTextarea ? (
        <textarea
          readOnly
          value={value || ''}
          rows={4}
          className="w-full font-body text-sm text-on-surface bg-[#f1f4f7] p-3 rounded-md border-0 focus:ring-0 resize-none"
        />
      ) : (
        <div className="font-body text-sm text-on-surface bg-[#f1f4f7] p-3 rounded-md h-11 flex items-center">
          {value || '-'}
        </div>
      )}
    </div>
  );
}

/* ────────────── 아코디언 패널 ────────────── */
function AccordionPanel({ icon, title, isOpen, onToggle, children }) {
  return (
    <div className="bg-[#f1f4f7] rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <h3
          className={`font-headline text-[15px] font-bold flex items-center gap-2 ${
            isOpen ? 'text-[#006492]' : 'text-[#424750]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">{icon}</span>
          {title}
        </h3>
        <span className="material-symbols-outlined text-[18px] text-[#424750] transition-transform duration-200"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          expand_more
        </span>
      </button>
      {isOpen && (
        <div className="px-5 pb-5">
          {children}
        </div>
      )}
    </div>
  );
}

/* ────────────── label:value 행 ────────────── */
function DetailRow({ label, value }) {
  return (
    <div className="flex gap-3 text-sm py-1.5 border-b border-[#e0e3e6] last:border-0">
      <span className="font-label text-[#424750] min-w-[110px] shrink-0">{label}</span>
      <span className="font-body text-on-surface break-all">{value ?? '-'}</span>
    </div>
  );
}

/* ────────────── 차트 상세 ────────────── */
function ChartDetail({ data }) {
  const chartTypeLabel = {
    bar: '세로 막대형',
    stacked_bar: '누적 막대형',
    line: '꺾은선형',
    pie: '원형 (파이)',
    scatter: '산점도',
  };
  const legendLabel = { top: '상단', right: '우측', bottom: '하단', hidden: '숨김' };
  const positionLabel = { top: '상단', bottom: '하단', left: '좌측', right: '우측' };

  return (
    <div className="flex flex-col">
      <DetailRow label="차트 제목" value={data.chartTitle} />
      <DetailRow label="제목 위치" value={positionLabel[data.chartTitlePosition]} />
      <DetailRow label="차트 유형" value={chartTypeLabel[data.chartType]} />
      <DetailRow label="X축 컬럼명" value={data.xAxis} />
      <DetailRow label="Y축 컬럼명" value={data.yAxis} />
      <DetailRow label="범례 위치" value={legendLabel[data.legendPosition]} />
    </div>
  );
}

/* ────────────── 그리드 상세 ────────────── */
function GridDetail({ data }) {
  return (
    <div className="flex flex-col gap-3">
      <DetailRow label="섹션 제목" value={data.sectionTitle} />
      {data.columns?.length > 0 && (
        <div>
          <p className="font-label text-[#424750] text-[13px] mb-2">컬럼 설정</p>
          <div className="flex flex-col gap-2">
            {data.columns.map((col, i) => (
              <div key={i} className="bg-surface-container-lowest rounded-md p-3 text-sm flex flex-col gap-1">
                <div className="flex gap-2">
                  <span className="text-[#424750] min-w-[60px]">표시명</span>
                  <span className="text-on-surface font-medium">{col.displayName || '-'}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[#424750] min-w-[60px]">데이터키</span>
                  <span className="text-on-surface font-mono text-xs">{col.dataKey || '-'}</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[#424750] min-w-[60px]">정렬</span>
                  <span className="text-on-surface">
                    {{ left: '좌측', center: '중앙', right: '우측' }[col.alignment] || '-'}
                    {col.isAmount ? ' · 금액' : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ────────────── 카드 상세 ────────────── */
function CardDetail({ data }) {
  const positionLabel = { 'left-top': '좌측 상단', center: '중앙', 'right-top': '우측 상단' };

  return (
    <div className="flex flex-col gap-3">
      <DetailRow label="카드 제목" value={data.cardTitle} />
      <DetailRow label="제목 위치" value={positionLabel[data.titlePosition]} />
      {data.items?.length > 0 && (
        <div>
          <p className="font-label text-[#424750] text-[13px] mb-2">항목 목록</p>
          <div className="flex flex-col gap-2">
            {data.items.map((item, i) => (
              <div key={i} className="bg-surface-container-lowest rounded-md p-3 text-sm flex items-center gap-3">
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: item.color || '#002c5a' }}
                />
                <span className="text-[#424750] min-w-[80px]">{item.label || '-'}</span>
                <span className="text-on-surface font-medium">{item.content || '-'}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ────────────── SQL 상세 ────────────── */
function SqlDetail({ data }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-label text-[#424750] text-[13px]">생성된 SQL 쿼리</p>
      <div className="bg-inverse-surface text-inverse-on-surface p-4 rounded-lg font-mono text-xs leading-relaxed overflow-x-auto">
        <pre><code>{data.sql || '-'}</code></pre>
      </div>
    </div>
  );
}

/* ────────────── 메인 상세 컴포넌트 ────────────── */
export default function ContentsDetail({ content }) {
  const [openPanel, setOpenPanel] = useState(null);

  // 선택된 컨텐츠가 바뀌면 해당 타입 패널을 자동 확장
  useEffect(() => {
    if (content) {
      setOpenPanel(content.contentType);
    }
  }, [content?.contentId]);

  if (!content) {
    return (
      <div className="bg-surface-container-lowest rounded-xl p-8 shadow-ambient h-full flex items-center justify-center">
        <p className="text-on-surface-variant text-sm">항목을 선택하세요</p>
      </div>
    );
  }

  const typeInfo = CONTENT_TYPE_MAP[content.contentType] || CONTENT_TYPE_MAP.sql;

  const panels = [
    {
      key: 'chart',
      icon: 'bar_chart',
      title: '차트정보상세',
      component: <ChartDetail data={content.data} />,
    },
    {
      key: 'grid',
      icon: 'grid_on',
      title: '그리드정보상세',
      component: <GridDetail data={content.data} />,
    },
    {
      key: 'card',
      icon: 'space_dashboard',
      title: '카드정보상세',
      component: <CardDetail data={content.data} />,
    },
    {
      key: 'sql',
      icon: 'database',
      title: 'SQL정보상세',
      component: <SqlDetail data={content.data} />,
    },
  ];

  const togglePanel = (key) => {
    setOpenPanel((prev) => (prev === key ? null : key));
  };

  return (
    <div className="bg-surface-container-lowest rounded-xl p-8 shadow-ambient h-full flex flex-col overflow-y-auto">
      {/* 헤더 */}
      <div className="border-b border-[#e0e3e6] pb-6 mb-6 shrink-0">
        <h2 className="font-headline text-[22px] font-bold text-[#003875]">콘텐츠 상세 정보</h2>
      </div>

      {/* 일반정보 */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-5 shrink-0">
        <ReadField label="콘텐츠ID" value={content.contentId} />
        <ReadField
          label="타입"
          value={typeInfo.label}
        />
        <ReadField label="콘텐츠명" value={content.contentName} colSpan={2} />
        <ReadField label="제작자" value={content.creator} />
        <ReadField label="제작일시" value={content.createdAt?.replace('T', ' ')} />
        <ReadField label="삭제여부" value={content.isDeleted} />
        <ReadField label="생성일시" value={content.generatedAt?.replace('T', ' ')} />
        <ReadField label="기타메모" value={content.memo} colSpan={2} isTextarea />
      </div>

      {/* 타입별 상세 아코디언 */}
      <div className="pt-6 mt-6 border-t border-[#e0e3e6] flex flex-col gap-3">
        {panels.map((panel) => (
          <AccordionPanel
            key={panel.key}
            icon={panel.icon}
            title={panel.title}
            isOpen={openPanel === panel.key}
            onToggle={() => togglePanel(panel.key)}
          >
            {panel.component}
          </AccordionPanel>
        ))}
      </div>
    </div>
  );
}
