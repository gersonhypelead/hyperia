import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store/store';
import config from '../../../config';
import {
  GET_DATA_USER_AUTH,
  VALIDATE_USER_AUTH
} from '../../../constantes/auth/Auth'
import fetchWithIP from '../utils/fetchHeaders';

export const LoginAuthReducer = (
  values: {
    usuario: string,
    contrasena: string
  }): ThunkAction<
    Promise<void>,
    RootState,
    unknown,
    Action<string>
  > => async (dispatch: Dispatch) => {

    try {

      const data = await fetchWithIP('auth/login', {
        method: 'POST',
      }, values).then(res => res.json());

      if (data.respuesta) {
        dispatch({
          type: GET_DATA_USER_AUTH,
          payload: data.data.user,
        });
        localStorage.setItem('token', data.data.token)
      }

      return data

    } catch (error) {
      console.error('Error al iniciar sesión', error);
      localStorage.clear()
      throw error;
    }
  };

export const ValidateTokenAuthReducer = (): ThunkAction<
  Promise<boolean>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch: Dispatch) => {

  try {

    dispatch({
      type: VALIDATE_USER_AUTH,
      payload: false
    })

    const token = localStorage.getItem("token")

    const data = await fetchWithIP('auth/validateToken', {
      method: 'POST',
    }, {
      token
    }).then(res => res.json());

    if (data.data) {

      dispatch({
        type: GET_DATA_USER_AUTH,
        payload: data.data.user,
      });
      localStorage.setItem('token', data.data.token)
    }

    return data

  } catch (error) {
    console.error('Error al iniciar sesión', error);
    localStorage.clear();
    return false;
  }
};