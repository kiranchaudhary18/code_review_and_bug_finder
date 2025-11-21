import { useMemo } from 'react';
import axios from 'axios';
import { useAuth } from './useAuth.js';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const useApi = () => {
  const { token } = useAuth() || {};

  const client = useMemo(() => {
    const instance = axios.create({ baseURL: API_BASE_URL });

    instance.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return instance;
  }, [token]);

  return client;
};
