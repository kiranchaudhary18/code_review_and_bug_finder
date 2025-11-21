import { useContext } from 'react';
import { ThemeContext } from '../src-context/ThemeContext.jsx';

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  return ctx;
};
