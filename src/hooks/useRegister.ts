import { useState } from 'react';
import { userRegister } from '../auth/types/userTypes';
import { register } from '../auth/authService';

export const useRegister = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const OptRegister = async (credentials: userRegister) => {
    setLoading(true);
    setError(null);
    try {
      const result = await register(credentials);
      setData(result);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, OptRegister };
};
