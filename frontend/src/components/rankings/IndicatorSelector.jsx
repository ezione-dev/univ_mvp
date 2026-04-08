import { useState, useEffect, useRef } from 'react';
import rankingsService from '../../services/rankings';

export default function IndicatorSelector({ selectedIndicators, onToggle }) {
  const [allIndicators, setAllIndicators] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        // Prevent default only if there is room to scroll left or right
        const canScrollLeft = el.scrollLeft > 0;
        const canScrollRight = el.scrollLeft < el.scrollWidth - el.clientWidth - 1;
        
        if ((e.deltaY > 0 && canScrollRight) || (e.deltaY < 0 && canScrollLeft)) {
          e.preventDefault();
          el.scrollLeft += e.deltaY;
        }
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);

  useEffect(() => {
    const fetchIndicators = async () => {
      try {
        const data = await rankingsService.getIndicators();
        setAllIndicators(data);
      } catch (error) {
        console.error('Failed to load indicators:', error);
      }
    };
    fetchIndicators();
  }, []);

  // Handle clicking outside of dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isSelected = (id) => selectedIndicators.some(ind => ind.id === id);
  const isLimitReached = selectedIndicators.length >= 5;

  const availableIndicators = allIndicators.filter(ind => 
    !isSelected(ind.id) && ind.label.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-bold text-slate-700">순위 지표</h4>
        <div className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
          {selectedIndicators.length} / 5
        </div>
      </div>



      {/* Search Input & Dropdown */}
      <div className="relative mt-1" ref={dropdownRef}>
        <div className="group relative">
          <input
            type="text"
            className={`w-full rounded-xl border-none bg-surface-container-lowest py-2.5 px-4 text-xs font-medium shadow-sm transition-all focus:ring-2 focus:ring-primary/20 ${isLimitReached ? 'opacity-50 cursor-not-allowed' : ''}`}
            placeholder={isLimitReached ? "최대 5개까지 선택했습니다." : "지표 추가하기 (검색)..."}
            value={filterText}
            onChange={(e) => {
              setFilterText(e.target.value);
              if (!isOpen) setIsOpen(true);
            }}
            onFocus={() => {
              if (!isLimitReached) setIsOpen(true);
            }}
            disabled={isLimitReached}
          />
          <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[18px] text-slate-400">
            add_circle
          </span>
        </div>

        {isOpen && !isLimitReached && (
          <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-lowest shadow-xl backdrop-blur-md">
            <ul className="max-h-56 overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-outline-variant">
              {availableIndicators.map((ind) => (
                <li key={ind.id}>
                  <button
                    type="button"
                    className="w-full rounded-lg px-3 py-2 text-left text-xs font-medium hover:bg-primary/5 transition-colors text-slate-600 hover:text-primary"
                    onClick={() => {
                      onToggle(ind);
                      setFilterText('');
                      setIsOpen(false);
                    }}
                  >
                    + {ind.label}
                  </button>
                </li>
              ))}
              {availableIndicators.length === 0 && (
                <li className="px-3 py-4 text-center text-xs text-slate-400 italic">
                  추가할 지표가 없거나 일치하는 검색어가 없습니다.
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
      
      {isLimitReached && (
        <p className="text-[10px] font-bold text-secondary-fixed animate-pulse text-right">
          ⚠️ 더 이상 추가할 수 없습니다.
        </p>
      )}
    </div>
  );
}
