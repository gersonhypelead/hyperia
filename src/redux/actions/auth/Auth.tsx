import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store/store';
import config from '../../../config';
import {
  GET_DATA_USER_AUTH
} from '../../../constantes/auth/Auth'

export const LoginAuthReducer = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch: Dispatch) => {

  try {

    const usuario = localStorage.getItem('usuario')
    const constrasenia = localStorage.getItem('contrasenia')

    const data = await fetch(config.API_URL + 'auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuario,
        contrasena: constrasenia
      }),
    }).then(res => res.json());

    dispatch({
      type: GET_DATA_USER_AUTH,
      payload: data.data[0].user,
    });

  } catch (error) {
    console.error('Error al iniciar sesión', error);
    localStorage.clear()
  }
};