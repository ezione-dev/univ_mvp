import { useState } from 'react';
import { ADMIN_PAGE_CONTAINER_CLASS } from '../../constants/adminLayout';
import PageHeader from '../../components/common/PageHeader';
import GeneralInfoSection from '../../components/content-creation/GeneralInfoSection';
import ContentTypeSelector from '../../components/content-creation/ContentTypeSelector';
import ChartSettings from '../../components/content-creation/ChartSettings';
import GridSettings from '../../components/content-creation/GridSettings';
import CardSettings from '../../components/content-creation/CardSettings';
import SqlSettings from '../../components/content-creation/SqlSettings';

function PreparingState({ message }) {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[480px]">
      <div className="flex flex-col items-center gap-6 text-center max-w-md">
        <div className="relative">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-surface-container-low to-surface-container-high border border-outline-variant/30 flex items-center justify-center shadow-[0_8px_32px_rgba(24,28,30,0.06)]">
            <span className="material-symbols-outlined text-5xl text-primary/60">
              construction
            </span>
          </div>
          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg">
            <span className="material-symbols-outlined text-sm text-on-primary">
              construction
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-headline font-bold text-2xl text-primary tracking-tight">
            준비 중입니다
          </h2>
          <p className="text-on-surface-variant text-sm leading-relaxed">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ContentsList() {
  return (
    <div className={ADMIN_PAGE_CONTAINER_CLASS}>
      <PageHeader
        title="컨텐츠 목록"
        description="생성된 AI 쿼리, 차트·테이블·카드 설정을 확인하고 관리합니다."
      />
      <PreparingState message="컨텐츠 목록 조회 기능을 곧 제공할 예정입니다." />
    </div>
  );
}

export function ContentsCreate() {
  const [generalInfo, setGeneralInfo] = useState({ title: '', subtitle: '', memo: '' });
  const [contentType, setContentType] = useState('chart');
  const [chartData, setChartData] = useState({ chartType: 'bar', xAxis: '', yAxis: '', legendPosition: 'top' });
  const [gridData, setGridData] = useState({ sectionTitle: '', columns: [] });
  const [cardData, setCardData] = useState({ cardTitle: '', titlePosition: 'left-top', itemCount: 1 });
  const [sqlData, setSqlData] = useState({ sql: '' });

  const handleSave = () => {
    let result;
    switch (contentType) {
      case 'chart':
        result = { general: generalInfo, contentType: 'chart', data: chartData };
        break;
      case 'grid':
        result = { general: generalInfo, contentType: 'grid', data: gridData };
        break;
      case 'card':
        result = { general: generalInfo, contentType: 'card', data: cardData };
        break;
      case 'sql':
        result = { general: generalInfo, contentType: 'sql', data: sqlData };
        break;
      default:
        result = { general: generalInfo, contentType };
    }
    console.log(result);
  };

  const handleCancel = () => {
    setGeneralInfo({ title: '', subtitle: '', memo: '' });
    setContentType('chart');
    setChartData({ chartType: 'bar', xAxis: '', yAxis: '', legendPosition: 'top' });
    setGridData({ sectionTitle: '', columns: [] });
    setCardData({ cardTitle: '', titlePosition: 'left-top', itemCount: 1 });
    setSqlData({ sql: '' });
  };

  const SaveButton = () => (
    <button
      onClick={handleSave}
      className="flex items-center gap-2 px-4 py-2.5 bg-primary text-on-primary font-medium rounded-lg hover:bg-primary/90 transition-all"
    >
      <span className="material-symbols-outlined text-lg">check</span>
      저장
    </button>
  );

  const CancelButton = () => (
    <button
      onClick={handleCancel}
      className="flex items-center gap-2 px-4 py-2.5 text-on-surface-variant font-medium rounded-lg hover:bg-surface-container transition-all"
    >
      취소
    </button>
  );

  return (
    <div className={ADMIN_PAGE_CONTAINER_CLASS}>
      <PageHeader
        title="컨텐츠 생성"
        description="AI 쿼리와 차트·테이블·카드 설정을 조합하여 새로운 컨텐츠를 만듭니다."
        actions={<><CancelButton /><SaveButton /></>}
      />
      <div className="flex flex-col gap-6">
        <GeneralInfoSection value={generalInfo} onChange={setGeneralInfo} />
        <ContentTypeSelector value={contentType} onChange={setContentType} />
        <ChartSettings value={chartData} onChange={setChartData} visible={contentType === 'chart'} />
        <GridSettings value={gridData} onChange={setGridData} visible={contentType === 'grid'} />
        <CardSettings value={cardData} onChange={setCardData} visible={contentType === 'card'} />
        <SqlSettings value={sqlData} onChange={setSqlData} visible={contentType === 'sql'} />
      </div>
    </div>
  );
}

export default function ContentsPlaceholder() {
  return (
    <div className={ADMIN_PAGE_CONTAINER_CLASS}>
      <PageHeader
        title="컨텐츠 관리"
        description="AI 쿼리, 차트·테이블·카드 설정을 생성·조회하고 조합합니다."
      />
      <PreparingState message="컨텐츠 관리 기능을 곧 제공할 예정입니다." />
    </div>
  );
}