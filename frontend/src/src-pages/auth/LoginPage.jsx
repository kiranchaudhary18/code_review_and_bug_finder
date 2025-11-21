import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../../src-hooks/useApi.js';
import { useAuth } from '../../src-hooks/useAuth.js';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth() || {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      const { token, user } = res.data;
      login?.(user, token);
      navigate('/dashboard');
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to login';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-10">
      <div className="w-full max-w-4xl rounded-2xl border border-slate-200/70 bg-white/80 shadow-sm backdrop-blur-sm dark:border-slate-800/80 dark:bg-slate-900/80">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] p-5 sm:p-7">
          <div className="hidden md:flex flex-col justify-between border-r border-slate-200/70 pr-6 dark:border-slate-800/80">
            <div className="space-y-3">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                Welcome back
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Sign in to review, optimize, and secure your code with AI. Turn every code
                snippet into a clear, actionable report in seconds.
              </p>
            </div>
            <div className="mt-6 space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <p className="font-semibold text-slate-700 dark:text-slate-200">
                What you can do inside
              </p>
              <ul className="space-y-1 list-disc pl-4">
                <li>Scan functions or full files for bugs and security issues</li>
                <li>Get refactored versions of your code with explanations</li>
                <li>Track every review in your personal history</li>
              </ul>
            </div>
          </div>

          <div className="md:pl-4">
            <div className="mb-4 md:hidden">
              <h1 className="text-xl font-semibold mb-1">Welcome back</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Sign in to review, optimize, and secure your code with AI.
              </p>
            </div>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-slate-300 dark:border-slate-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center rounded-md bg-primary-600 text-white text-sm font-medium py-2.5 hover:bg-primary-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
          New to the platform?{' '}
          <Link to="/register" className="text-primary-600 hover:underline">
            Create an account
          </Link>
        </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
