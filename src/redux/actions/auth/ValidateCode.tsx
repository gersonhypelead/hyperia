import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store/store';
import { VALIDATE_CODE_REQUEST, VALIDATE_CODE_SUCCESS, VALIDATE_CODE_FAILURE, RESEND_CODE_REQUEST, RESEND_CODE_SUCCESS, RESEND_CODE_FAILURE } from '../../../constantes/auth/ValidateCode';
import fetchWithIP from '../utils/fetchHeaders';

interface ValidateCodeResponse {
  respuesta: boolean;
  mensaje: string;
  // Puedes agregar más campos si es necesario
}

export const validateCode = (codigo: number): ThunkAction<
  Promise<ValidateCodeResponse>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch: Dispatch) => {
  dispatch({ type: VALIDATE_CODE_REQUEST });

  try {
    const response = await fetchWithIP('auth/validate', {
      method: 'POST'},
      { codigo_verificacion: codigo }, // Cambié 'codigo' por 'codigo_verificacion'
    );

    const data = await response.json(); // Obtener la respuesta como json

    if (data.respuesta) {
      dispatch({
        type: VALIDATE_CODE_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: VALIDATE_CODE_FAILURE,
        payload: data.mensaje,
      });
    }

    return data; // Asegúrate de que esto devuelva la respuesta correcta
  } catch (error) {
    dispatch({
      type: VALIDATE_CODE_FAILURE,
      payload: 'Error al validar el código.',
    });
    console.error('Error al validar el código:', error);
    throw error;
  }
};


interface ResendCodeResponse {
  respuesta: boolean;
  mensaje: string;
  // Puedes agregar más campos si es necesario
}

export const resendCode = (email: string): ThunkAction<
  Promise<ResendCodeResponse>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch: Dispatch) => {
  dispatch({ type: RESEND_CODE_REQUEST });

  try {
    const response = await fetchWithIP('auth/resend-code', {
      method: 'POST' },
      { email },
   );

    const data = await response.json(); // Obtener la respuesta como json

    if (data.respuesta) {
      dispatch({
        type: RESEND_CODE_SUCCESS,
        payload: data,
      });
    } else {
      dispatch({
        type: RESEND_CODE_FAILURE,
        payload: data.mensaje,
      });
    }

    return data; // Asegúrate de que esto devuelva la respuesta correcta
  } catch (error) {
    dispatch({
      type: RESEND_CODE_FAILURE,
      payload: 'Error al reenviar el código.',
    });
    console.error('Error al reenviar el código:', error);
    throw error;
  }
};
