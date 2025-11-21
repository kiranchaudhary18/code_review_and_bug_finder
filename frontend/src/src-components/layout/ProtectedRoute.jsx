import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../src-hooks/useAuth.js';

const ProtectedRoute = () => {
  const { user } = useAuth() || {};

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
