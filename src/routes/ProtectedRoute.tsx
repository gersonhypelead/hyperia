import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store/store';
import { LoginAuthReducer } from '../redux/actions/auth/Auth';

const ProtectedRoute = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      dispatch(LoginAuthReducer())
    }
  }, []);

  return <Outlet />;
};

export default ProtectedRoute;
