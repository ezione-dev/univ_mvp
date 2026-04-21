import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import MenuItem from './MenuItem';
import { getNavMenus } from '../../services/api';
import MaterialIcon from '../MaterialIcon';

/** pathname에 맞는 1레벨 메뉴 (여러 개 매칭 시 가장 긴 menu_path — /admin vs / 등 충돌 방지) */
function pickLevel1ForPath(level1Menus, pathname) {
  const matches = level1Menus.filter(
    (m) => m.menu_path && pathname.startsWith(String(m.menu_path))
  );
  if (!matches.length) return null;
  return matches.reduce((best, m) =>
    String(m.menu_path).length > String(best.menu_path).length ? m : best
  );
}

function LnbMenuEmptyState({ title, hint }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-3 py-8">
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-[#002c5a]/10 blur-2xl" />
        <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#e5e8eb] bg-white shadow-md">
          <MaterialIcon name="menu_book" className="text-2xl text-[#5a5f64]" />
        </div>
      </div>
      <div className="mt-4 text-center">
        <p className="mb-0.5 text-sm font-medium text-[#2d3133]">{title}</p>
        <p className="text-xs text-[#737781]">{hint}</p>
      </div>
    </div>
  );
}

export default function LNBMenu() {
  const location = useLocation();
  const [navMenus, setNavMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const data = await getNavMenus();
        if (cancelled) return;
        setNavMenus(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled) setNavMenus([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  const level1Menus = useMemo(
    () => navMenus.filter(menu => menu.parent_menu_id === null),
    [navMenus]
  );

  const selectedLevel1 = useMemo(
    () => pickLevel1ForPath(level1Menus, location.pathname),
    [level1Menus, location.pathname]
  );

  const visibleChildren = useMemo(() => {
    const raw = selectedLevel1?.children ?? [];
    return raw.filter((m) => String(m.del_fg ?? 'N').toUpperCase() !== 'Y');
  }, [selectedLevel1]);

  const isAdminRoute = location.pathname.startsWith('/admin');
  const noMenusAtAll = !loading && navMenus.length === 0;

  return (
    <nav className="flex h-full min-h-0 flex-col" style={{ backgroundColor: '#f1f4f7' }}>
      {loading ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : noMenusAtAll ? (
        <LnbMenuEmptyState title="메뉴 없음" hint="할당된 메뉴가 없습니다" />
      ) : (
        <div className="flex min-h-0 flex-1 flex-col px-3 py-4">
          {isAdminRoute && (
            <div className="mb-4 px-3">
              <h2 className="text-[10px] font-semibold uppercase tracking-widest text-[#424750]">
                System Admin
              </h2>
            </div>
          )}
          {visibleChildren.length > 0 ? (
            <div className="min-h-0 flex-1">
              <div className="mb-2 px-3">
                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#424750]">
                  {selectedLevel1.menu_nm}
                </span>
              </div>
              <div className="space-y-0.5">
                {visibleChildren.map((menu) => (
                  <MenuItem key={menu.menu_id} menu={menu} isAdmin={isAdminRoute} />
                ))}
              </div>
            </div>
          ) : (
            <LnbMenuEmptyState
              title="메뉴 없음"
              hint={
                selectedLevel1
                  ? '하위 메뉴가 없습니다'
                  : '현재 화면에 표시할 메뉴가 없습니다'
              }
            />
          )}
        </div>
      )}
    </nav>
  );
}