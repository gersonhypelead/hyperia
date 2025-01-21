import { useState } from 'react';
import { userCredential } from '../auth/types/userTypes';
import { login } from '../auth/authService';

export const useLogin = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const doLogin = async (credentials: userCredential) => {
    setLoading(true);
    setError(null);
    try {
      const result = await login(credentials);

      setData(result);
      if (result.data?.token) {
        localStorage.setItem('token', result.data?.token);

      }

    } catch (error: any) {
      setError(error.message);
      throw new Error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, doLogin };
};
