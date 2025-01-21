import React, { useEffect } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store/store';
import { ValidateTokenAuthReducer } from '../redux/actions/auth/Auth';
import { VALIDATE_USER_AUTH } from '../constantes/auth/Auth';

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const {
    rex_user_auth,
    rex_user
  } = useSelector(({ auth }: any) => auth);

  const ValidateAuth = async () => {
    const auth: any = await dispatch(ValidateTokenAuthReducer());

    if (!auth) {
      navigate("/login");
    } else if (!auth.respuesta) {
      navigate("/login");
      localStorage.clear();
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      if (!rex_user) {
        ValidateAuth();
      }
    } else {
      navigate("/login");
      dispatch({
        type: VALIDATE_USER_AUTH,
        payload: true
      });
    }
  }, []);



  return rex_user_auth ? <Outlet /> : <></>;
};

export default ProtectedRoute;
