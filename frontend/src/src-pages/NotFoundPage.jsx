import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center gap-4">
      <div>
        <p className="text-xs font-semibold tracking-wide text-primary-600 mb-1">
          404
        </p>
        <h1 className="text-xl font-semibold mb-2">Page not found</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md">
          The page you are looking for does not exist. It may have been moved or removed.
        </p>
      </div>
      <Link
        to="/dashboard"
        className="mt-2 inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary-600 text-white text-xs font-medium hover:bg-primary-700"
      >
        Go back to dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;
