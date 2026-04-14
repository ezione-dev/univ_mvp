import { useState } from 'react';
import { query } from '../services/api';
import { BentoGrid, BentoGridSkeleton } from '../components/bento';
import { Search } from 'lucide-react';

function QueryPage() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await query(question);
      setResult(data);
    } catch (err) {
      const detail = err.response?.data?.detail;
      const message =
        typeof detail === 'string'
          ? detail
          : Array.isArray(detail)
            ? detail.map((d) => d.msg).join('; ')
            : err.message;
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-headline font-bold text-on-background mb-2">
            InsightBridge
          </h1>
          <p className="text-on-surface-variant text-sm">
            자연어로 데이터를 쿼리하고 차트로 시각화합니다
          </p>
        </header>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="예: 월별 매출을 보여줘"
              className="w-full px-5 py-4 pr-12 text-base bg-surface-container-lowest border border-outline rounded-xl 
                         text-on-surface placeholder:text-on-surface-variant 
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
                         transition-all duration-200"
            />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-lg bg-primary text-on-primary
                         hover:bg-primary-fixed-dim disabled:opacity-50 disabled:cursor-not-allowed
                         transition-all duration-200"
            >
              <Search size={18} />
            </button>
          </div>
        </form>

        {error && (
          <div className="mb-6 p-4 bg-error-container text-on-error-container rounded-xl text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <BentoGridSkeleton />
        ) : result ? (
          <BentoGrid
            sql={result.sql}
            data={result.data}
            chartConfig={result.chart_config}
          />
        ) : null}
      </div>
    </div>
  );
}

export default QueryPage;