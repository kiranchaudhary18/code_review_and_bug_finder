import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../src-hooks/useApi.js';
import { useAuth } from '../src-hooks/useAuth.js';

const HistoryPage = () => {
  const api = useApi();
  const { user } = useAuth() || {};
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      if (!user?.id) return;
      setLoading(true);
      setError('');
      try {
        const res = await api.get(`/review/history/${user.id}`);
        setItems(res.data?.history || []);
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to load history';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [api, user]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this review permanently?')) return;
    try {
      await api.delete(`/review/${id}`);
      setItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      // optional: surface error
    }
  };

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleString();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight mb-1">Review history</h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
            Every analysis is stored securely. Revisit past reviews, inspect details, or
            clean up old entries.
          </p>
        </div>
      </div>

      {loading && (
        <div className="text-xs text-slate-500 dark:text-slate-400">Loading history…</div>
      )}

      {error && !loading && (
        <div className="text-xs text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md px-3 py-2">
          {error}
        </div>
      )}

      {!loading && !error && items.length === 0 && (
        <div className="text-xs text-slate-500 dark:text-slate-400">
          No reviews yet. Run your first analysis from the dashboard.
        </div>
      )}

      {!loading && items.length > 0 && (
        <div className="grid gap-3 md:grid-cols-2">
          {items.map((item) => (
            <article
              key={item._id}
              className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-4 flex flex-col justify-between gap-3 shadow-sm backdrop-blur-sm"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {item.language}
                  </span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500">
                    {formatDate(item.createdAt)}
                  </span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-200 line-clamp-3 font-mono whitespace-pre-wrap">
                  {item.code}
                </p>
                {item.reviewOutput?.summary && (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    {item.reviewOutput.summary}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => navigate(`/review/${item._id}`)}
                  className="text-xs px-3 py-1.5 rounded-md bg-primary-600 text-white hover:bg-primary-700"
                >
                  View details
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item._id)}
                  className="text-[11px] px-3 py-1.5 rounded-md border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
