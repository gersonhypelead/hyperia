import { AppDispatch } from '../../store/store';
import config from '../../../config';
import { Dispatch } from 'redux';

import { 
  FETCH_TIPOS_USUARIOS_REQUEST,
  FETCH_TIPOS_USUARIOS_SUCCESS, 
  FETCH_TIPOS_USUARIOS_FAILURE,
  SET_TYPE_USUARIOS_PAGE_USERS,
  SET_TYPE_USUARIOS_SORT_USERS,
  CREATE_TYPE_USER_REQUEST,
  CREATE_TYPE_USER_SUCCESS,
  CREATE_TYPE_USER_FAILURE,
  UPDATE_TYPE_USER_REQUEST_USERS,
  UPDATE_TYPE_USER_SUCCESS_USERS,
  UPDATE_TYPE_USER_FAILURE_USERS,
  DELETE_TYPE_USER_REQUEST_USERS,
  DELETE_TYPE_USER_SUCCESS_USERS,
  DELETE_TYPE_USER_FAILURE_USERS
} from '../../../constantes/admin/typeUsers/TypeUser';
import fetchWithIP from '../utils/fetchHeaders';

export interface UserData {
  id?: number;
  tipo_usuario?: string;
  createdFrom?: string;
  createdTo?: string;
  updatedFrom?: string;
  updatedTo?: string;
}

export const FetchTiposUsuariosReducer = (
  page: number = 1, 
  limit: number = 10, 
  sortColumn: string = 'id', 
  sortOrder: string = 'asc', 
  filters?: {
    id?: number,
    tipo_usuario?: string,
    createdFrom?: string,
    createdTo?: string,
    updateFrom?: string,
    updateTo?: string,
  }
) => async (dispatch: AppDispatch) => {
  dispatch({ type: FETCH_TIPOS_USUARIOS_REQUEST });
  try {
    const queryParams = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      sortColumn,
      sortOrder,
    });
    if (filters?.tipo_usuario) queryParams.append('tipo_usuario', filters.tipo_usuario);
    if (filters?.createdFrom) queryParams.append('createdFrom', filters.createdFrom);
    if (filters?.createdTo) queryParams.append('createdTo', filters.createdTo);
    if (filters?.updateFrom) queryParams.append('updateFrom', filters.updateFrom);
    if (filters?.updateTo) queryParams.append('updateTo', filters.updateTo);
    // const response = await fetch(`${config.API_URL}tipo-usuarios?page=${page}&limit=${limit}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`);
    const response = await fetch(`${config.API_URL}tipo-usuarios?${queryParams.toString()}`);
    const data = await response.json();

    if (data.respuesta) {
      dispatch({
        type: FETCH_TIPOS_USUARIOS_SUCCESS,
        payload: {
          tipoUsuarios: data.data,
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
      type: FETCH_TIPOS_USUARIOS_FAILURE,
      error: 'Error de red o en la solicitud',
    });
  }
};

export const setTypeUsuariosPage = (page: number) => ({
  type: SET_TYPE_USUARIOS_PAGE_USERS,
  payload: page,
});

export const setTypeUsuariosSort = (sortColumn: string, sortOrder: string) => ({
  type: SET_TYPE_USUARIOS_SORT_USERS,
  payload: { sortColumn, sortOrder },
});


export const createTypeUser = (typeuserData: any) => async (dispatch: any) => {
  dispatch(CREATE_TYPE_USER_REQUEST());

  try {
    const response = await fetchWithIP(`tipo-usuarios`, {
      method: 'POST'},
      typeuserData,
    );
    const data = await response.json();
    if (response.ok) {
      dispatch(CREATE_TYPE_USER_SUCCESS(data));
    } else {
      dispatch(CREATE_TYPE_USER_FAILURE('Error al crear el usuario'));
    }
  } catch (error) {
    dispatch(CREATE_TYPE_USER_FAILURE('Error de red al crear el usuario'));
  }
};


export const updateTypeUser = (typeuserData: UserData) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_TYPE_USER_REQUEST_USERS });
    try {
      const response = await fetchWithIP(`tipo-usuarios/${typeuserData.id}`, {
        method: 'PUT',
      }, {
        tipo_usuario: typeuserData.tipo_usuario,
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en la actualización');
      }
      const updatedUser = data.data[0]; // Ajusta esto si el backend devuelve el formato diferente

      dispatch({
        type: UPDATE_TYPE_USER_SUCCESS_USERS,
        payload: updatedUser,
      });
    } catch (error: any) {
      dispatch({
        type: UPDATE_TYPE_USER_FAILURE_USERS,
        error: error.message || 'Error en la actualización',
      });
    }
  };
};


export const deleteTypeUser = (userId: number) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: DELETE_TYPE_USER_REQUEST_USERS });

    try {
      const response = await fetchWithIP(`tipo-usuarios/${userId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la eliminación');
      }
      dispatch({
        type: DELETE_TYPE_USER_SUCCESS_USERS,
        payload: userId, // El payload puede ser el ID del usuario eliminado
      });
    } catch (error: any) {
      dispatch({
        type: DELETE_TYPE_USER_FAILURE_USERS,
        error: error.message || 'Error en la eliminación',
      });
    }
  };
};
