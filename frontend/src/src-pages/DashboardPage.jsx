import ReviewForm from '../src-components/review/ReviewForm.jsx';

const DashboardPage = () => {
  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-slate-200/70 bg-white/70 shadow-sm backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-900/80">
        <div className="px-4 py-4 sm:px-6 sm:py-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight mb-1 text-slate-900 dark:text-slate-50">
              Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
              Paste a function, upload a file, and let the AI surface bugs, performance issues,
              security risks, and a refactored version of your code.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px] sm:text-xs text-slate-600 dark:text-slate-300">
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/70 bg-emerald-50 px-3 py-1 text-emerald-700 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Live AI reviews
            </span>
            <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 dark:border-slate-700 dark:bg-slate-800/80">
              Zero setup beyond your API key
            </span>
          </div>
        </div>
      </section>

      <ReviewForm />
    </div>
  );
};

export default DashboardPage;
