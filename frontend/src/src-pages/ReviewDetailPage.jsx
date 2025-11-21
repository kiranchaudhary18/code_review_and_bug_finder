import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from '../src-hooks/useApi.js';
import ReviewSections from '../src-components/review/ReviewSections.jsx';

const ReviewDetailPage = () => {
  const { id } = useParams();
  const api = useApi();
  const navigate = useNavigate();

  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReview = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get(`/review/${id}`);
        setReview(res.data?.review || null);
      } catch (err) {
        const message = err.response?.data?.message || 'Failed to load review';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchReview();
  }, [api, id]);

  return (
    <div className="space-y-5">
      <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-sm backdrop-blur-sm p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight mb-1.5 text-slate-900 dark:text-slate-50">
              AI Code Review
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              Detailed analysis of bugs, performance, security, clean code, complexity, and
              refactored output for this code snippet.
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/history')}
            className="inline-flex items-center gap-1.5 self-start sm:self-auto text-xs sm:text-[13px] font-medium px-3.5 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50/70 dark:hover:bg-slate-800/70 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
            Back to history
          </button>
        </div>
      </div>

      {loading && (
        <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3 mx-auto"></div>
            <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mx-auto"></div>
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="bg-white/90 dark:bg-slate-900/90 border border-red-200/70 dark:border-red-900/50 rounded-2xl p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Error loading review</h3>
              <div className="mt-1 text-sm text-red-700 dark:text-red-300">{error}</div>
              <div className="mt-4">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-red-900/30 dark:text-red-200 dark:hover:bg-red-900/50"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && !review && (
        <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 text-center">
          <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-slate-900 dark:text-slate-100">Review not found</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">The requested code review could not be found or is no longer available.</p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/history')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Back to history
            </button>
          </div>
        </div>
      )}

      {review && (
        <div className="space-y-5">
          <ReviewSections review={review} />
        </div>
      )}
    </div>
  );
};

export default ReviewDetailPage;
