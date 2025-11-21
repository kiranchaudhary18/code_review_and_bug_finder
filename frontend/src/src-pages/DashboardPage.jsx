import ReviewForm from '../src-components/review/ReviewForm.jsx';

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200/70 bg-gradient-to-r from-white/90 to-blue-50/90 dark:from-slate-900/90 dark:to-blue-900/20 shadow-lg backdrop-blur-sm">
        <div className="px-6 py-6 sm:px-8 sm:py-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              AI Code Review Dashboard
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              Transform your code quality with AI-powered analysis. Detect bugs, security vulnerabilities, 
              performance issues, and get refactoring suggestions in seconds.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/70 bg-emerald-50 px-4 py-2 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300 font-medium">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live AI Analysis
            </span>
            <span className="inline-flex items-center rounded-full border border-blue-300/70 bg-blue-50 px-4 py-2 text-blue-700 dark:border-blue-500/40 dark:bg-blue-500/10 dark:text-blue-300 font-medium">
              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Fast Processing
            </span>
            <span className="inline-flex items-center rounded-full border border-purple-300/70 bg-purple-50 px-4 py-2 text-purple-700 dark:border-purple-500/40 dark:bg-purple-500/10 dark:text-purple-300 font-medium">
              <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure Results
            </span>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-200/50 dark:border-blue-800/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-100">Smart Analysis</h3>
              <p className="text-xs text-blue-700 dark:text-blue-300">AI-powered code review</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl p-4 border border-emerald-200/50 dark:border-emerald-800/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-emerald-500 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-emerald-900 dark:text-emerald-100">Clean Code</h3>
              <p className="text-xs text-emerald-700 dark:text-emerald-300">Best practices & standards</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-4 border border-purple-200/50 dark:border-purple-800/50">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-500 rounded-lg">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-purple-900 dark:text-purple-100">Refactoring</h3>
              <p className="text-xs text-purple-700 dark:text-purple-300">Improved code suggestions</p>
            </div>
          </div>
        </div>
      </div>

      <ReviewForm />
    </div>
  );
};

export default DashboardPage;
