import { useRef } from 'react';
import MaterialIcon from '../MaterialIcon';

const CATEGORIES = [
  "종합현황",
  "입학/선발",
  "학생/진로",
  "교육/교원",
  "연구/산학/창업",
  "재정/등록금/학생지원",
  "캠퍼스/복지/안전",
  "거버넌스/인증",
  "컴플라이언스"
];

export default function TopBar({ onMenuClick, activeTab, setActiveTab }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header className="z-30 flex h-16 w-full items-center justify-between gap-4 bg-white px-4 shadow-sm border-b border-outline-variant/10 dark:bg-slate-900 md:px-8">
      {/* Logo Section */}
      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          className="rounded-lg p-2 hover:bg-slate-200/50 md:hidden"
          aria-label="메뉴 열기"
          onClick={onMenuClick}
        >
          <MaterialIcon name="menu" className="text-slate-600" />
        </button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-white text-[20px]">insights</span>
          </div>
          <h1 className="hidden truncate text-lg font-black tracking-tight text-[#002045] dark:text-blue-100 sm:block">
            InsightBridge
          </h1>
        </div>
      </div>

      {/* Middle section: Scrollable Tabs */}
      <div className="relative flex flex-1 items-center min-w-0 max-w-4xl h-full border-x border-outline-variant/10 px-2 group">
        <button
          onClick={() => scroll('left')}
          className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/90 shadow-sm border border-outline-variant/20 transition-all hover:bg-white hover:scale-110 opacity-0 group-hover:opacity-100 dark:bg-slate-800/90"
          aria-label="이전 탭"
        >
          <MaterialIcon name="chevron_left" className="text-slate-600 text-[20px]" />
        </button>

        <nav 
          ref={scrollRef}
          className="flex flex-1 items-center gap-1 overflow-x-hidden scroll-smooth px-2 h-full"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`whitespace-nowrap px-4 h-full text-xs font-bold transition-all border-b-2 ${
                activeTab === cat
                  ? 'text-primary border-primary bg-primary/5'
                  : 'text-slate-400 border-transparent hover:text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </nav>

        <button
          onClick={() => scroll('right')}
          className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/90 shadow-sm border border-outline-variant/20 transition-all hover:bg-white hover:scale-110 opacity-0 group-hover:opacity-100 dark:bg-slate-800/90"
          aria-label="다음 탭"
        >
          <MaterialIcon name="chevron_right" className="text-slate-600 text-[20px]" />
        </button>
      </div>

      {/* Profile Section */}
      <div className="flex shrink-0 items-center gap-3 md:gap-4">
        <div className="hidden items-center gap-1 lg:flex">
          <button
            type="button"
            className="rounded-full p-2 transition-colors hover:bg-slate-200/50"
            title="알림"
          >
            <MaterialIcon name="notifications" className="text-slate-600" />
          </button>
          <button
            type="button"
            className="rounded-full p-2 transition-colors hover:bg-slate-200/50"
            title="설정"
          >
            <MaterialIcon name="settings" className="text-slate-600" />
          </button>
        </div>
        <div className="hidden h-8 w-px bg-outline-variant/30 md:block" />
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#002045] text-xs font-bold text-white ring-2 ring-primary/10 cursor-pointer transition-transform hover:scale-105"
          title="사용자 프로필"
        >
          KU
        </div>
      </div>
    </header>
  );
}
