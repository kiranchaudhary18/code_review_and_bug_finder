import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const mapLanguageToPrism = (language) => {
  switch (language) {
    case 'javascript':
      return 'javascript';
    case 'typescript':
      return 'typescript';
    case 'python':
      return 'python';
    case 'cpp':
    case 'c':
      return 'cpp';
    case 'java':
      return 'java';
    case 'csharp':
      return 'csharp';
    case 'php':
      return 'php';
    case 'ruby':
      return 'ruby';
    case 'go':
      return 'go';
    default:
      return 'text';
  }
};

const SectionCard = ({ title, children, className = '' }) => (
  <section className={`bg-white/90 dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800/80 rounded-xl shadow-sm backdrop-blur-sm p-4 sm:p-5 space-y-3 ${className}`}>
    <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-2">
      {title === 'Errors & bugs' && (
        <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      )}
      {title === 'Performance & optimization' && (
        <svg className="w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )}
      {title === 'Security issues' && (
        <svg className="w-4 h-4 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      )}
      {title === 'Clean code suggestions' && (
        <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      )}
      {title === 'Time & space complexity' && (
        <svg className="w-4 h-4 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )}
      {title === 'Summary' && (
        <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )}
      {title === 'Original code' && (
        <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )}
      {title === 'Refactored code' && (
        <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
      <span>{title}</span>
    </h2>
    <div className="text-xs sm:text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed">
      {children}
    </div>
  </section>
);

const renderList = (items, emptyText) => {
  if (!items || items.length === 0) {
    return (
      <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-xs py-1.5 px-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span>{emptyText}</span>
      </div>
    );
  }

  return (
    <ul className="space-y-2">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-2 group">
          <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 8 8">
              <circle cx="4" cy="4" r="3" />
            </svg>
          </span>
          <span className="text-slate-700 dark:text-slate-300">{item}</span>
        </li>
      ))}
    </ul>
  );
};

const ReviewSections = ({ review }) => {
  if (!review) return null;

  const { language, code, reviewOutput } = review;
  const prismLanguage = mapLanguageToPrism(language);

  const [copied, setCopied] = useState('');

  const handleCopy = async (value, label) => {
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => {
        setCopied('');
      }, 2000);
    } catch (error) {
      // ignore clipboard errors in UI
    }
  };

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <SectionCard title="Errors & bugs">
          {renderList(
            reviewOutput?.errors,
            'No obvious bugs or runtime risks were detected.'
          )}
        </SectionCard>

        <SectionCard title="Performance & optimization">
          {renderList(
            reviewOutput?.improvements,
            'No major performance issues were highlighted.'
          )}
        </SectionCard>

        <SectionCard title="Security issues">
          {renderList(
            reviewOutput?.security_issues,
            'No critical security vulnerabilities were found.'
          )}
        </SectionCard>

        <SectionCard title="Clean code suggestions">
          {renderList(
            reviewOutput?.clean_code,
            'The AI did not suggest additional clean code improvements.'
          )}
        </SectionCard>
      </div>

      <div className="grid gap-4 md:grid-cols-2 items-stretch">
        <SectionCard title="Time & space complexity" className="h-full">
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200/70 dark:border-slate-700/50">
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">Analysis</p>
              <p className="text-slate-700 dark:text-slate-200">
                {reviewOutput?.complexity?.trim() ||
                  'No specific complexity analysis was provided for this snippet.'}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Understanding code complexity helps identify potential performance bottlenecks and optimization opportunities.</span>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Summary" className="h-full">
          <div className="space-y-3">
            <div className="p-3 bg-blue-50/70 dark:bg-blue-900/20 rounded-lg border border-blue-200/70 dark:border-blue-900/30">
              <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mb-1">Key Points</p>
              <p className="text-slate-700 dark:text-slate-200">
                {reviewOutput?.summary?.trim() ||
                  'The AI did not generate a specific summary for this review.'}
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>This summary highlights the most important aspects of the code review.</span>
            </div>
          </div>
        </SectionCard>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <svg className="w-4 h-4 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Code Comparison
          </h3>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Compare the original and refactored code side by side</span>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 items-start">
          <SectionCard title="Original code" className="h-full flex flex-col">
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between gap-3 mb-3">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  The original snippet you submitted for review.
                </p>
                <button
                  type="button"
                  onClick={() => handleCopy(code, 'original')}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/70 transition-colors"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy
                </button>
              </div>
              <div className="flex-1 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-[#282c34]">
                <SyntaxHighlighter
                  language={prismLanguage}
                  style={oneDark}
                  customStyle={{
                    margin: 0,
                    fontSize: '12px',
                    height: '100%',
                    minHeight: '200px',
                    backgroundColor: 'transparent',
                  }}
                  showLineNumbers
                  wrapLines
                >
                  {code}
                </SyntaxHighlighter>
              </div>
              {copied === 'original' && (
                <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Copied to clipboard</span>
                </div>
              )}
            </div>
          </SectionCard>

          <SectionCard title="Refactored code" className="h-full flex flex-col">
            {reviewOutput?.refactor_code?.trim() ? (
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Improved version of your code. Copy it directly into your editor.
                  </p>
                  <button
                    type="button"
                    onClick={() => handleCopy(reviewOutput.refactor_code, 'refactor')}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/70 transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    Copy
                  </button>
                </div>
                <div className="flex-1 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-[#282c34] relative">
                  <div className="absolute top-2 right-2 z-10">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                      <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Improved
                    </span>
                  </div>
                  <SyntaxHighlighter
                    language={prismLanguage}
                    style={oneDark}
                    customStyle={{
                      margin: 0,
                      fontSize: '12px',
                      height: '100%',
                      minHeight: '200px',
                      backgroundColor: 'transparent',
                    }}
                    showLineNumbers
                    wrapLines
                  >
                    {reviewOutput.refactor_code}
                  </SyntaxHighlighter>
                </div>
                {copied === 'refactor' && (
                  <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Copied to clipboard</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center h-full">
                <svg className="w-10 h-10 text-slate-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">No refactored code</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
                  The AI did not provide a refactored version of this code.
                </p>
              </div>
            )}
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default ReviewSections;
