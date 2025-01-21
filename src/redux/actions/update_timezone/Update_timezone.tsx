import { Dispatch } from 'redux';
import { 
  UPDATE_TIMEZONE_REQUEST, 
  UPDATE_TIMEZONE_SUCCESS, 
  UPDATE_TIMEZONE_FAILURE 
} from '../../../constantes/update_timezone/Update_timezone';
import fetchWithIP from '../utils/fetchHeaders';

export const updateTimezoneReducer = (timezone: string) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_TIMEZONE_REQUEST });

    try {
      // Enviar el huso horario como parte del cuerpo JSON
      const response = await fetchWithIP(`auth/timezone`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        }
      }, { timezone });

      // Validar la respuesta
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al actualizar la zona horaria');
      }

      // Procesar la respuesta si es exitosa
      const data = await response.json();

      dispatch({
        type: UPDATE_TIMEZONE_SUCCESS,
        payload: data, // Datos recibidos de la API
      });

    } catch (error: any) {
      // Manejo de errores
      dispatch({
        type: UPDATE_TIMEZONE_FAILURE,
        error: error.message || 'Error al actualizar la zona horaria',
      });
    }
  };
};
