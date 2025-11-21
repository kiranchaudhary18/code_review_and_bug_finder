import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './src-components/layout/Navbar.jsx';
import ProtectedRoute from './src-components/layout/ProtectedRoute.jsx';
import LoginPage from './src-pages/auth/LoginPage.jsx';
import RegisterPage from './src-pages/auth/RegisterPage.jsx';
import DashboardPage from './src-pages/DashboardPage.jsx';
import HistoryPage from './src-pages/HistoryPage.jsx';
import ReviewDetailPage from './src-pages/ReviewDetailPage.jsx';
import NotFoundPage from './src-pages/NotFoundPage.jsx';

const App = () => {
  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.16),transparent_55%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.18),transparent_55%)] opacity-70 dark:opacity-80" />
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-6 md:py-10">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/review/:id" element={<ReviewDetailPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
