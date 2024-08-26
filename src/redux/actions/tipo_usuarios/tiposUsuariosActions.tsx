// src/redux/actions/usuarios/tiposUsuariosActions.ts
import { AppDispatch } from '../../store/store';
import config from '../../../config';

export const FETCH_TIPOS_USUARIOS_REQUEST = 'FETCH_TIPOS_USUARIOS_REQUEST';
export const FETCH_TIPOS_USUARIOS_SUCCESS = 'FETCH_TIPOS_USUARIOS_SUCCESS';
export const FETCH_TIPOS_USUARIOS_FAILURE = 'FETCH_TIPOS_USUARIOS_FAILURE';

export const fetchTiposUsuarios = () => async (dispatch: AppDispatch) => {
  dispatch({ type: FETCH_TIPOS_USUARIOS_REQUEST });
  try {
    const response = await fetch(`${config.API_URL}tipo-usuarios`);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      } 
    const data = await response.json();
    if (data.respuesta) {
      dispatch({
        type: FETCH_TIPOS_USUARIOS_SUCCESS,
        payload: data.data,
      });
    } else {
      dispatch({
        type: FETCH_TIPOS_USUARIOS_FAILURE,
        error: 'Error en la respuesta del servidor',
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_TIPOS_USUARIOS_FAILURE,
      error: 'Error de red o en la solicitud',
    });
  }
};
