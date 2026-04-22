import { useState } from 'react';
import { ADMIN_PAGE_CONTAINER_CLASS } from '../../constants/adminLayout';
import PageHeader from '../../components/common/PageHeader';
import GeneralInfoSection from '../../components/content-creation/GeneralInfoSection';
import ChartSettings from '../../components/content-creation/ChartSettings';
import GridSettings from '../../components/content-creation/GridSettings';
import CardSettings from '../../components/content-creation/CardSettings';
import SqlSettings from '../../components/content-creation/SqlSettings';
import ContentsTable from '../../components/content-list/ContentsTable';
import ContentsDetail from '../../components/content-list/ContentsDetail';
import { mockContents } from '../../data/mockContents';

export function ContentsCreate() {
  const [generalInfo, setGeneralInfo] = useState({
    contentId: '',
    contentName: '',
    creator: '',
    createdAt: '',
    isDeleted: 'N',
    generatedAt: '',
    memo: ''
  });
  const [contentType, setContentType] = useState('chart');
  const [chartData, setChartData] = useState({ chartTitle: '', chartTitlePosition: 'top', chartType: 'bar', xAxis: '', yAxis: '', legendPosition: 'right' });
  const [gridData, setGridData] = useState({ sectionTitle: '', columns: [] });
  const [cardData, setCardData] = useState({ cardTitle: '', titlePosition: 'left-top', items: [{ label: '', content: '', color: '#002c5a' }] });
  const [sqlData, setSqlData] = useState({ sql: '' });

  const handleSave = () => {
    const result = {
      ...generalInfo,
      contentType,
      data: (contentType === 'chart' && chartData) ||
        (contentType === 'grid' && gridData) ||
        (contentType === 'card' && cardData) ||
        (contentType === 'sql' && sqlData)
    };
    console.log(result);
  };

  const handleCancel = () => {
    setGeneralInfo({ contentId: '', contentName: '', creator: '', createdAt: '', isDeleted: 'N', generatedAt: '', memo: '' });
    setContentType('chart');
    setChartData({ chartTitle: '', chartTitlePosition: 'top', chartType: 'bar', xAxis: '', yAxis: '', legendPosition: 'right' });
    setGridData({ sectionTitle: '', columns: [] });
    setCardData({ cardTitle: '', titlePosition: 'left-top', items: [{ label: '', content: '', color: '#002c5a' }] });
    setSqlData({ sql: '' });
  };

  return (
    <div className={ADMIN_PAGE_CONTAINER_CLASS}>
      <PageHeader
        title="컨텐츠 생성"
        description="AI 쿼리와 차트·테이블·카드 설정을 조합하여 새로운 컨텐츠를 만듭니다."
        actions={
          <div className="flex items-center gap-3">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2.5 text-on-surface-variant font-medium rounded-lg hover:bg-surface-container-high transition-all"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-on-primary font-medium rounded-lg hover:bg-primary/90 shadow-sm transition-all"
            >
              <span className="material-symbols-outlined text-lg">check</span>
              저장
            </button>
          </div>
        }
      />
      <main className="w-full max-w-[1400px] mx-auto flex flex-col gap-8 pb-12">
        <GeneralInfoSection
          value={generalInfo}
          onChange={setGeneralInfo}
          contentType={contentType}
          onContentTypeChange={setContentType}
        />
        <ChartSettings value={chartData} onChange={setChartData} visible={contentType === 'chart'} />
        <GridSettings value={gridData} onChange={setGridData} visible={contentType === 'grid'} />
        <CardSettings value={cardData} onChange={setCardData} visible={contentType === 'card'} />
        <SqlSettings value={sqlData} onChange={setSqlData} visible={contentType === 'sql'} />
      </main>
    </div>
  );
}

export function ContentsList() {
  const [selectedId, setSelectedId] = useState(
    mockContents.length > 0 ? mockContents[0].contentId : null
  );

  const selectedContent = mockContents.find((c) => c.contentId === selectedId) || null;

  return (
    <div className={ADMIN_PAGE_CONTAINER_CLASS}>
      <PageHeader
        title="컨텐츠 목록"
        description="생성된 AI 쿼리, 차트·테이블·카드 설정을 확인하고 관리합니다."
      />
      <main className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12 items-start">
        {/* 좌측: 목록 테이블 (7/12) */}
        <div className="lg:col-span-7">
          <ContentsTable
            contents={mockContents}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>
        {/* 우측: 상세 패널 (5/12) */}
        <div className="lg:col-span-5">
          <ContentsDetail content={selectedContent} />
        </div>
      </main>
    </div>
  );
}