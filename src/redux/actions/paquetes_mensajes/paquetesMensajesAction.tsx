import { Dispatch } from 'redux';
import { createAction } from '@reduxjs/toolkit';
import config from '../../../config';
import { 
    PAQUETES_MENSAJES_REQUEST,
    PAQUETES_MENSAJES_SUCCESS,
    PAQUETES_MENSAJES_FAILURE,
    SET_PAQUETES_MENSAJES_PAGE,
    SET_PAQUETES_MENSAJES_SORT,
    CREATE_PAQUETES_MENSAJES_FAILURE,
    CREATE_PAQUETES_MENSAJES_REQUEST,
    CREATE_PAQUETES_MENSAJES_SUCCESS,
    UPDATE_PAQUETES_MENSAJES_REQUEST,
    UPDATE_PAQUETES_MENSAJES_SUCCESS,
    UPDATE_PAQUETES_MENSAJES_FAILURE,
    DISABLE_PAQUETES_MENSAJES_REQUEST,
    DISABLE_PAQUETES_MENSAJES_SUCCESS,
    DISABLE_PAQUETES_MENSAJES_FAILURE
} from '../../../constantes/paquetes_mensajes/PaquetesMensajes';
import fetchWithIP from '../utils/fetchHeaders';

export interface UserData {
  paquete?: string;
  total_mensaje?: number;
  precio_eur?: number;
}


export const FetchPaquetesMensajesReducer = (
  page : number = 1,
  limit: number = 10,
  sortColumn: string = 'id',
  sortOrder: string =  'asc',
  filters?: {
    paquete?: string,
    total_mensaje?: number
    precio_eur?: number
  }
  ) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: PAQUETES_MENSAJES_REQUEST });
    try {
      const queryParams = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        sortColumn,
        sortOrder,
      });

      if (filters?.paquete) queryParams.append('paquete', filters.paquete);
      if (filters?.total_mensaje) queryParams.append('total_mensaje', String(filters.total_mensaje));
      if (filters?.precio_eur) queryParams.append('precio_eur', String(filters.precio_eur));
      
      const response = await fetchWithIP(`paquetes-mensajes?${queryParams.toString()}` , {method: "GET"});
      const data = await response.json();
      if (data.respuesta) {
        dispatch({
          type: PAQUETES_MENSAJES_SUCCESS,
          payload: {
            rex_paquetes_mensajes: data.data,
            meta: {
              ...data.meta,
              page: page,
              limit: limit
            }       
          }
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch({
        type: PAQUETES_MENSAJES_FAILURE,
        error: 'Error de red o en la solicitud',
      });
    }
  };
}

export const setPaquetesMensajesPage = (page: number) => ({
  type: SET_PAQUETES_MENSAJES_PAGE,
  payload: page,
});
// Acción para cambiar el orden de los usuarios
export const setPaquetesMensajesSort = (sortColumn: string, sortOrder: string) => ({
  type: SET_PAQUETES_MENSAJES_SORT,
  payload: { sortColumn, sortOrder },
});

export const CreatePaquetesMensajesReducer = (paquetesMensajesData: any) => async (dispatch: any) => {
  dispatch(CREATE_PAQUETES_MENSAJES_REQUEST());
  try {
    const response = await fetchWithIP(`paquetes-mensajes`, {
      method: 'POST',
    },
     paquetesMensajesData
    );
    const data = await response.json();

    if (response.ok) {
      dispatch(CREATE_PAQUETES_MENSAJES_SUCCESS(data));
    } else {
      dispatch(CREATE_PAQUETES_MENSAJES_FAILURE('Error al crear el paquete de mensaje'));
    }
  } catch (error) {
    dispatch(CREATE_PAQUETES_MENSAJES_FAILURE('Error de red al crear el paquete de mensaje'));
  }
};

export const UpdatePaquetesMensajesReducer = (id:number, PaquetesMensajesData: UserData) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_PAQUETES_MENSAJES_REQUEST });

    try {
      const response = await fetchWithIP(`paquetes-mensajes/${id}`, {
        method: 'PUT',
      },
      PaquetesMensajesData
      );

      const data = await response.json()
      if (!response.ok) {
        const errorData = await response.json(); // Obtener detalles del error si es posible
        throw new Error(errorData.message || 'Error en la actualización'); // Mostrar mensaje de error si existe
      }
      const updatedPaquetesMensajes = data.data[0]; // Asegúrate de que la estructura de datos sea correcta
      // const data = await response.json();
      // const updatedUser = data.data[0];

      dispatch({
        type: UPDATE_PAQUETES_MENSAJES_SUCCESS,
        payload: updatedPaquetesMensajes,
      });

    } catch (error: any) {
      dispatch({
        type: UPDATE_PAQUETES_MENSAJES_FAILURE,
        error: error.message || 'Error en la actualización',
      });
    }
  };
};


export const DisablePaquetesMensajesReducer = (id: number) => {
  return async (dispatch: Dispatch) => {
      dispatch({ type: DISABLE_PAQUETES_MENSAJES_REQUEST });
      
      try {
          const response = await fetchWithIP(`paquetes-mensajes/${id}/disable`, {
              method: 'PATCH',
            } ,{ estado: false },  
          );

          const data = await response.json();

          if (!response.ok) {
              throw new Error(data.message || 'Error al desactivar el paquete de mensajes');
          }

          dispatch({
              type: DISABLE_PAQUETES_MENSAJES_SUCCESS,
              payload: data.data,  // Puedes ajustar según la estructura de tu respuesta de API
          });

      } catch (error) {
          dispatch({
              type: DISABLE_PAQUETES_MENSAJES_FAILURE,
              // error: error.message || 'Error al desactivar el paquete de mensajes',
          });
      }
  };
};


