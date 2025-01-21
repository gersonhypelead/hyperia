import { userCredential, userRegister } from './types/userTypes';
import config from '../config'
import fetchWithIP from '../redux/actions/utils/fetchHeaders';

export const login = async (credentials: userCredential) => {
  try {
   /*  const response = await fetch(`${config.API_URL}auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    }); */

    const response = await fetchWithIP('auth/login', {
      method: 'POST',
    },
    
      credentials
   
    );

    if (!response.ok) throw new Error('Login failed');
    return response.json();
  } catch (error) {
    console.log(error);
    throw new Error('Login failed');
  }
};

export const register = async (userInfo: userRegister) => {
  try {
    const response = await fetchWithIP(`auth`, {
      method: 'POST',
      
    },
    userInfo
    );
    if (!response.ok) throw new Error('Registration failed');
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
