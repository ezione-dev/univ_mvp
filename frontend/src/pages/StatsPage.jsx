import MainLayout from '../layouts/MainLayout';

export default function StatsPage() {
  return (
    <MainLayout>
      <div className="px-8 py-12 max-w-[1600px] mx-auto">
        <header className="mb-10">
          <p className="text-[11px] font-semibold tracking-[0.15em] text-primary/60 uppercase mb-2">Analytics</p>
          <h1 className="text-4xl font-bold tracking-tight">
            <span className="text-on-surface">학교 </span>
            <span className="text-primary">통계</span>
            <span className="text-on-surface"> 대시보드</span>
          </h1>
          <p className="mt-3 text-on-surface-variant text-[15px]">학교 운영 데이터와 성과를 한눈에 확인하세요</p>
        </header>

        <div className="flex flex-col items-center justify-center py-24 px-8 rounded-3xl bg-surface-container-low border border-outline-variant/20">
          <div className="relative mb-8">
            <div className="w-24 h-24 rounded-full bg-primary/8 flex items-center justify-center">
              <span className="material-symbols-outlined text-[48px] text-primary/60">bar_chart</span>
            </div>
            <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-surface-container-lowest border-4 border-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px] text-primary/40">schedule</span>
            </div>
          </div>

          <div className="text-center max-w-md">
            <h2 className="text-2xl font-bold tracking-tight text-on-surface mb-3">곧 공개됩니다</h2>
            <p className="text-on-surface-variant leading-relaxed">
              학교 통계 대시보드는 현재 준비 중입니다.
              <br />
              다양한 교육 지표와 성과 데이터를 한눈에 확인하실 수 있습니다.
            </p>
          </div>

          <div className="mt-10 flex items-center gap-8 text-[13px] text-on-surface-variant/60">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              <span>학생 현황 분석</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">trending_up</span>
              <span>학업 성과 추적</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">insights</span>
              <span>입시 현황 분석</span>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}