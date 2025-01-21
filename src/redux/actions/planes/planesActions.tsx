import { Dispatch } from 'redux';
import { createAction } from '@reduxjs/toolkit';
import config from '../../../config';
import {
  FETCH_PLANES_FAILURE,
  FETCH_PLANES_REQUEST,
  FETCH_PLANES_SUCCESS,
  SET_PLANES_PAGE,
  SET_PLANES_SORT,
  CREATE_TYPE_PLANES_REQUEST,
  CREATE_TYPE_PLANES_SUCCESS,
  CREATE_TYPE_PLANES_FAILURE,
  UPDATE_TYPE_PLANES_REQUEST,
  UPDATE_TYPE_PLANES_SUCCESS,
  UPDATE_TYPE_PLANES_FAILURE,
  DELETE_TYPE_PLANES_REQUEST,
  DELETE_TYPE_PLANES_SUCCESS,
  DELETE_TYPE_PLANES_FAILURE
} from '../../../constantes/planes/planes';
import fetchWithIP from '../utils/fetchHeaders';

export interface UserData {
  plan?: string;
  total_mensaje?: number;
  dias_disponible?: string;
}

export const FetchPlanesReducer = (
  page: number = 1,
  limit: number = 10,
  sortColumn: string,
  sortOrder: string,
  filters?: {
    plan?: string,
    total_mensaje?: string
    dias_disponible?: string
  }
) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_PLANES_REQUEST });
    try {
      const queryParams = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        sortColumn,
        sortOrder,
      });

      if (filters?.plan) queryParams.append('plan', filters.plan);
      if (filters?.total_mensaje) queryParams.append('total_mensaje', filters.total_mensaje);
      if (filters?.dias_disponible) queryParams.append('dias_disponible', filters.dias_disponible);

      const response = await fetchWithIP(`planes?${queryParams.toString()}` , {method:"GET"});
      const data = await response.json();
      if (data.respuesta) {
        dispatch({
          type: FETCH_PLANES_SUCCESS,
          payload: {
            planes: data.data,
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
        type: FETCH_PLANES_FAILURE,
        error: 'Error de red o en la solicitud',
      });
    }
  };
}
// Acción para cambiar la página de usuarios
export const setUsuariosPage = (page: number) => ({
  type: SET_PLANES_PAGE,
  payload: page,
});
// Acción para cambiar el orden de los usuarios
export const setUsuariosSort = (sortColumn: string, sortOrder: string) => ({
  type: SET_PLANES_SORT,
  payload: { sortColumn, sortOrder },
});

export const CreatePlanesReducer = (typeuserData: any) => async (dispatch: any) => {
  dispatch(CREATE_TYPE_PLANES_REQUEST());

  try {
    const response = await fetchWithIP(`planes`, {
      method: 'POST'},
     typeuserData,
    );

    const data = await response.json();

    if (response.ok) {
      dispatch(CREATE_TYPE_PLANES_SUCCESS(data));
    } else {
      dispatch(CREATE_TYPE_PLANES_FAILURE('Error al crear el plan'));
    }
  } catch (error) {
    dispatch(CREATE_TYPE_PLANES_FAILURE('Error de red al crear el plan'));
  }
};