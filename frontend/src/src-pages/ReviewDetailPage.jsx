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
    <div className="space-y-6">
      <div className="bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-lg backdrop-blur-sm p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
              AI Code Review Analysis
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Comprehensive analysis of bugs, performance, security, clean code, complexity, and 
              refactored output for this code snippet.
            </p>
            {review && (
              <div className="flex items-center gap-4 mt-4 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  {review.language}
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  {review.code.split('\n').length} lines
                </span>
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => navigate('/history')}
            className="inline-flex items-center gap-2 self-start sm:self-auto text-sm font-medium px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50/70 dark:hover:bg-slate-800/70 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
            Back to History
          </button>
        </div>
      </div>

      {loading && (
        <div className="bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-8 text-center shadow-lg backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/3 mx-auto"></div>
              <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/2 mx-auto"></div>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Analyzing review details...</p>
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="bg-white/95 dark:bg-slate-900/95 border border-red-200/70 dark:border-red-900/50 rounded-2xl p-6 sm:p-8 shadow-lg backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-red-800 dark:text-red-200">Error loading review</h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">{error}</div>
              <div className="mt-6">
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:bg-red-900/30 dark:text-red-200 dark:hover:bg-red-900/50 transition-all"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {!loading && !error && !review && (
        <div className="bg-white/95 dark:bg-slate-900/95 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-8 text-center shadow-lg backdrop-blur-sm">
          <svg className="mx-auto h-16 w-16 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">Review not found</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">The requested code review could not be found or is no longer available.</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate('/history')}
              className="inline-flex items-center px-4 py-2 border border-slate-300 dark:border-slate-700 text-sm font-medium rounded-lg text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all"
            >
              Go to History
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              New Analysis
            </button>
          </div>
        </div>
      )}

      {!loading && !error && review && <ReviewSections review={review} />}
    </div>
  );
};

export default ReviewDetailPage;
