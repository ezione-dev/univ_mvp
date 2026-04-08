import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import TopBar from '../components/dashboard/TopBar';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('종합현황');

  return (
    <div className="flex min-h-screen bg-surface text-on-surface">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col overflow-x-hidden bg-surface md:ml-64">
        <TopBar 
          onMenuClick={() => setSidebarOpen(true)} 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {activeTab === '종합현황' ? (
          <Outlet />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-surface-container-lowest m-4 md:m-8 rounded-3xl border-2 border-dashed border-outline-variant/30">
            <div className="bg-primary/5 p-6 rounded-full mb-6">
              <span className="material-symbols-outlined text-6xl text-primary/40">
                dashboard_customize
              </span>
            </div>
            <h2 className="text-3xl font-black text-primary mb-2">{activeTab}</h2>
            <p className="text-slate-500 max-w-md">
              이 영역은 현재 준비 중인 화면입니다. <br />
              곧 <strong>{activeTab}</strong>에 관련된 심층 분석 데이터가 업데이트될 예정입니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
