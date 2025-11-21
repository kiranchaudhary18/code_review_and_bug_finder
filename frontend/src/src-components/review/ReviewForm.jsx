import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../src-hooks/useApi.js';

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript / TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'cpp', label: 'C / C++' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'php', label: 'PHP' },
  { value: 'ruby', label: 'Ruby' },
  { value: 'go', label: 'Go' },
  { value: 'plaintext', label: 'Other / Plain text' },
];

const ReviewForm = () => {
  const api = useApi();
  const navigate = useNavigate();

  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    setFile(selected || null);
  };

  const handleClear = () => {
    setCode('');
    setFile(null);
    setError('');
  };

  const handleAnalyze = async () => {
    setError('');

    if (!code.trim() && !file) {
      setError('Paste code or upload a file to analyze.');
      return;
    }

    setLoading(true);

    try {
      let response;
      if (code.trim()) {
        response = await api.post('/review/analyze', {
          code,
          language,
        });
      } else if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('language', language);
        response = await api.post('/review/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      const review = response?.data?.review;
      if (review?._id) {
        navigate(`/review/${review._id}`);
      }
    } catch (err) {
      const message =
        err.response?.data?.message || 'Failed to analyze the code. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-sm backdrop-blur-sm p-4 sm:p-5 space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
        <div>
          <h2 className="text-lg font-semibold">Analyze new snippet</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Paste a code snippet or upload a file. The AI will scan for bugs, security issues,
            and improvements.
          </p>
        </div>
        <div className="flex flex-col items-stretch sm:items-end gap-2 w-full sm:w-auto">
          <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
            Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full sm:w-52 rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-600 dark:text-slate-300">
            Paste code
          </label>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={14}
            spellCheck={false}
            placeholder="Paste any function, module, or script. The AI will highlight bugs, performance issues, security risks, and suggest refactors."
            className="w-full resize-y rounded-md border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-medium text-slate-600 dark:text-slate-300 mb-1">
              Or upload a file
            </label>
            <input
              type="file"
              accept=".txt,.js,.jsx,.ts,.tsx,.py,.c,.cpp,.cc,.cxx,.hpp,.java,.cs,.php,.rb,.go"
              onChange={handleFileChange}
              className="block w-full text-xs text-slate-700 dark:text-slate-100 file:mr-3 file:rounded-md file:border-0 file:bg-primary-600 file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-white hover:file:bg-primary-700 cursor-pointer"
            />
            <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">
              Supports text and source files up to 2MB.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <button
              type="button"
              onClick={handleAnalyze}
              disabled={loading}
              className="inline-flex items-center justify-center gap-1 rounded-md bg-primary-600 text-white text-xs font-medium px-4 py-2 hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Analyzing…' : 'Analyze code'}
            </button>
            <button
              type="button"
              onClick={handleClear}
              disabled={loading}
              className="inline-flex items-center justify-center rounded-md border border-slate-300 dark:border-slate-700 text-xs font-medium px-4 py-2 text-slate-700 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Clear
            </button>
          </div>

          {error && (
            <div className="text-xs text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md px-3 py-2">
              {error}
            </div>
          )}

          <div className="mt-2 rounded-md border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40 p-3">
            <h3 className="text-xs font-semibold mb-1">What you’ll get</h3>
            <ul className="text-[11px] text-slate-600 dark:text-slate-300 space-y-1 list-disc pl-4">
              <li>Detected bugs and runtime risks</li>
              <li>Performance and scalability suggestions</li>
              <li>Security vulnerabilities and unsafe patterns</li>
              <li>Clean code and readability improvements</li>
              <li>Time &amp; space complexity (for algorithms)</li>
              <li>Refactored version of your code</li>
              <li>Short, readable summary of the review</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
