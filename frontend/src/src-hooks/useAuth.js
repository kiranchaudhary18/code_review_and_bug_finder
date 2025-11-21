import { useContext } from 'react';
import { AuthContext } from '../src-context/AuthContext.jsx';

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  return ctx;
};
