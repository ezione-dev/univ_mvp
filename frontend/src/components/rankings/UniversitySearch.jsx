import { useState, useEffect, useRef } from 'react';
import rankingsService from '../../services/rankings';

export default function UniversitySearch({ onSelect, initialValue }) {
  const [query, setQuery] = useState(initialValue?.school_name || '');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);

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

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length > 0 && isOpen) {
        setIsLoading(true);
        try {
          const schools = await rankingsService.searchSchools(query);
          setResults(schools);
        } catch (error) {
          console.error('Search failed:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, isOpen]);

  const handleSelect = (school) => {
    setQuery(school.school_name);
    setIsOpen(false);
    onSelect(school);
  };

  return (
    <div className="relative w-full min-w-[240px] sm:w-80" ref={dropdownRef}>
      <div className="group relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-primary">
          search
        </span>
        <input
          type="text"
          className="w-full rounded-xl border-none bg-surface-container-lowest py-3 pl-10 pr-4 text-sm font-semibold shadow-sm transition-all focus:ring-2 focus:ring-primary/20"
          placeholder="대학 이름을 검색하세요..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
          </div>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-outline-variant/20 bg-surface-container-lowest shadow-xl backdrop-blur-md">
          <ul className="max-h-60 overflow-y-auto py-2">
            {results.map((school) => (
              <li key={school.school_code}>
                <button
                  type="button"
                  className="w-full px-4 py-2.5 text-left text-sm font-medium hover:bg-surface-container transition-colors flex flex-col"
                  onClick={() => handleSelect(school)}
                >
                  <span className="text-primary">{school.school_name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{school.school_code}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {isOpen && query.trim() !== '' && !isLoading && results.length === 0 && (
        <div className="absolute z-50 mt-2 w-full rounded-xl border border-outline-variant/20 bg-surface-container-lowest p-4 text-center text-sm text-slate-400 shadow-xl">
          검색 결과가 없습니다.
        </div>
      )}
    </div>
  );
}
