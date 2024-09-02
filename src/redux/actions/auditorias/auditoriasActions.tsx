import { AppDispatch } from '../../store/store';
import config from '../../../config';
import {
    FETCH_AUDITORIAS_TABLE_REQUEST,
    FETCH_AUDITORIAS_TABLE_SUCCESS,
    FETCH_AUDITORIAS_TABLE_FAILURE

} from '../../../constantes/admin/auditorias/Auditorias';


export const findAuditoriaTableUser = (
    tabla: string = 'tipousuarios',
    pk_actualizado: number = 1
) => {
    return async (dispatch: AppDispatch) => {
        dispatch({ type: FETCH_AUDITORIAS_TABLE_REQUEST });
        try {
            const response = await fetch(`${config.API_URL}auditorias/tablaUser?tabla=${tabla}&pk_actualizado=${pk_actualizado}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
        
            if (data.respuesta) {
                dispatch({
                    type: FETCH_AUDITORIAS_TABLE_SUCCESS,
                    payload: { auditorias: data.data }
                });
            } else {
                dispatch({
                    type: FETCH_AUDITORIAS_TABLE_FAILURE,
                    error: 'Error en la respuesta del servidor',
                });
            }
        } catch (error) {
            dispatch({
                type: FETCH_AUDITORIAS_TABLE_FAILURE,
                error: 'Error de red o en la solicitud',
            });
        }
    }
};
