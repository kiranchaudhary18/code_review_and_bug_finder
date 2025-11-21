import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../src-hooks/useAuth.js';
import { useTheme } from '../../src-hooks/useTheme.js';

const Navbar = () => {
  const { user, logout } = useAuth() || {};
  const { theme, toggleTheme } = useTheme() || {};
  const navigate = useNavigate();

  const handleLogout = () => {
    logout?.();
    navigate('/login');
  };

  const linkBase =
    'px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-primary-500 hover:text-white';

  const activeClass =
    'bg-primary-600 text-white dark:bg-primary-500 dark:text-white';

  return (
    <header className="border-b border-slate-200/70 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur sticky top-0 z-20">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link to={user ? '/dashboard' : '/login'} className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white font-bold">
            AI
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-sm sm:text-base">
              AI Code Review & Bug Finder
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Analyze, optimize, and secure your code instantly
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {user && (
            <div className="hidden sm:flex items-center gap-1 mr-2">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `${linkBase} ${
                    isActive
                      ? activeClass
                      : 'text-slate-700 dark:text-slate-200'
                  }`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/history"
                className={({ isActive }) =>
                  `${linkBase} ${
                    isActive
                      ? activeClass
                      : 'text-slate-700 dark:text-slate-200'
                  }`
                }
              >
                History
              </NavLink>
            </div>
          )}

          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs"
            aria-label="Toggle color theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs text-slate-600 dark:text-slate-300">
                {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-md text-xs font-medium bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:opacity-90"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <Link
                to="/login"
                className="px-3 py-1.5 rounded-md border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-3 py-1.5 rounded-md bg-primary-600 text-white hover:bg-primary-700 text-xs sm:text-sm"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
