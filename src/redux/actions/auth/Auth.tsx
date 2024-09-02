import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store/store';
import config from '../../../config';
import {
  GET_DATA_USER_AUTH
} from '../../../constantes/auth/Auth'
import fetchWithIP from '../utils/fetchHeaders';

export const LoginAuthReducer = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch: Dispatch) => {

  try {

    const usuario = localStorage.getItem('usuario')
    const constrasenia = localStorage.getItem('contrasenia')
    const token = localStorage.getItem("token")

   /*  const data = await fetch(config.API_URL + 'auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        usuario,
        contrasena: constrasenia,

      }),
    }).then(res => res.json());
 */
     const data = await fetchWithIP('auth/validateToken', {
      method: 'POST',
    }, {
      token
    }).then(res => res.json());
    console.log("data: -------------");
    console.log(data);
    console.log(data.data);
    console.log(data.data[0]);
    console.log(data.data[0].user);
    
    const nuevotoken = data.data[0]?.token;
    localStorage.setItem('token', nuevotoken);
    console.log(nuevotoken ,"-----Nuevo token")

    dispatch({
      type: GET_DATA_USER_AUTH,
      payload: data.data[0].user,

    });

  } catch (error) {
    console.error('Error al iniciar sesión', error);
    localStorage.clear()
  }
};