import { userCredential, userRegister } from './types/userTypes';
import config from '../config'

export const login = async (credentials: userCredential) => {
  try {
    const response = await fetch(`${config.API_URL}auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  } catch (error) {
    console.log(error);
    throw new Error('Login failed');
  }
};

export const register = async (userInfo: userRegister) => {
  try {
    const response = await fetch(`${config.API_URL}/auth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      mode: 'cors',
      body: JSON.stringify(userInfo),
    });
    if (!response.ok) throw new Error('Registration failed');
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
