import { Dispatch } from 'redux';
import { createAction } from '@reduxjs/toolkit';
import config from '../../../config';
import { 
    FETCH_PAQUETES_USUARIOS_REQUEST,
    FETCH_PAQUETES_USUARIOS_SUCCESS,
    FETCH_PAQUETES_USUARIOS_FAILURE
} from '../../../constantes/admin/users/Users';
import fetchWithIP from '../utils/fetchHeaders';

export const FetchPaquetesUsuariosReducer = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_PAQUETES_USUARIOS_REQUEST });
    try {
      
      const response = await fetchWithIP(`paquetes-usuarios` , {method:"GET"});
      const data = await response.json();

      if (data) {
        dispatch({
          type: FETCH_PAQUETES_USUARIOS_SUCCESS,
          payload: {
            rex_paquetes_usuarios: data       
          }
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch({
        type: FETCH_PAQUETES_USUARIOS_FAILURE,
        error: 'Error de red o en la solicitud',
      });
    }
  };
}

