import { Dispatch } from 'redux';
import { createAction } from '@reduxjs/toolkit';
import config from '../../../config';

import {
  FETCH_USUARIOS_FAILURE_USERS,
  FETCH_USUARIOS_REQUEST_USERS,
  FETCH_USUARIOS_SUCCESS_USERS,
  SET_USUARIOS_PAGE_USERS,
  SET_USUARIOS_SORT_USERS,
  UPDATE_USER_REQUEST_USERS,
  UPDATE_USER_SUCCESS_USERS,
  UPDATE_USER_FAILURE_USERS,
  UPDATE_USER_STATUS_REQUEST_USERS,
  UPDATE_USER_STATUS_SUCCESS_USERS,
  UPDATE_USER_STATUS_FAILURE_USERS,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE
} from '../../../constantes/admin/users/Users';
import fetchWithIP from '../utils/fetchHeaders';

 export interface UserData {
  id: number;
  nombre?: string;
  apellido_paterno?: string;
  apellido_materno?: string;
  usuario?: string;
  tipo_usuario_id?: number;
  email?: string;
  estado?: boolean;
}

export const FetchUsuariosReducer = (
  page: number = 1, 
  limit: number = 10, 
  sortColumn: string, 
  sortOrder: string, 
  filters?: { 
    nombre?: string, 
    usuario?: string, 
    tipo_usuario?: string, 
    createdFrom?: string, 
    createdTo?: string, 
    updatedFrom?: string, 
    updatedTo?: string }
) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_USUARIOS_REQUEST_USERS });
    try {
      const queryParams = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        sortColumn,
        sortOrder,
      });

      if (filters?.updatedFrom) queryParams.append('createdFrom', filters.updatedFrom);
      if (filters?.updatedTo) queryParams.append('createdTo', filters.updatedTo);
      if (filters?.createdFrom) queryParams.append('createdFrom', filters.createdFrom);
      if (filters?.createdTo) queryParams.append('createdTo', filters.createdTo);
      if (filters?.nombre) queryParams.append('nombre', filters.nombre);
      if (filters?.usuario) queryParams.append('usuario', filters.usuario);
      if (filters?.tipo_usuario) queryParams.append('tipo_usuario', filters.tipo_usuario);

      const response = await fetch(`${config.API_URL}auth?${queryParams.toString()}`);
      const data = await response.json();

      dispatch({
        type: FETCH_USUARIOS_SUCCESS_USERS,
        payload: {
          usuarios: data.data,
          meta: {
            ...data.meta,
            page: page,
            limit: limit
          }
        }
      });
    } catch (error) {
      dispatch({ type: FETCH_USUARIOS_FAILURE_USERS, error });
    }
  };
};

// Acción para cambiar la página de usuarios
export const setUsuariosPage = (page: number) => ({
  type: SET_USUARIOS_PAGE_USERS,
  payload: page,
 
});
// Acción para cambiar el orden de los usuarios
export const setUsuariosSort = (sortColumn: string, sortOrder: string) => ({
  type: SET_USUARIOS_SORT_USERS,
  payload: { sortColumn, sortOrder },
});

export const updateUser = (userData: UserData) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST_USERS });

    console.log('Datos que se están actualizando:', userData);

    try {
      const response = await fetchWithIP(`auth/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: userData.nombre,
          apellido_paterno: userData.apellido_paterno,
          apellido_materno: userData.apellido_materno,
          tipo_usuario_id: userData.tipo_usuario_id, // Asegúrate de que este campo sea necesario
          usuario: userData.usuario,
          email: userData.email // Asegúrate de que este campo sea necesario
        }),
      });

      const data = await response.json()
      if (!response.ok) {
        const errorData = await response.json(); // Obtener detalles del error si es posible
        throw new Error(errorData.message || 'Error en la actualización'); // Mostrar mensaje de error si existe
      }

      const updatedUser = data.data[0]; // Asegúrate de que la estructura de datos sea correcta
      // const data = await response.json();
      // const updatedUser = data.data[0];

      dispatch({
        type: UPDATE_USER_SUCCESS_USERS,
        payload: updatedUser,
      });

      console.log('payload:', updatedUser);
    } catch (error: any) {
      dispatch({
        type: UPDATE_USER_FAILURE_USERS,
        error: error.message || 'Error en la actualización',
      });
    }
  };
};

export const createUser = (userData: any) => async (dispatch: any) => {
  dispatch(CREATE_USER_REQUEST());
  try {
    const response = await fetchWithIP(`auth`, {
      method: 'POST',
    },
      userData,
    );

    const data = response.json()
    if (response.ok) {
      dispatch(CREATE_USER_SUCCESS(data));
    } else {
      dispatch(CREATE_USER_FAILURE('Error al crear el usuario'));
    }
  } catch (error) {
    dispatch(CREATE_USER_FAILURE('Error de red al crear el usuario'));
  }
};


export const updateUserStatus = (id: number, estado: boolean) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_USER_STATUS_REQUEST_USERS });

    try {
      const response = await fetch(`${config.API_URL}auth/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado }),  
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el estado del usuario');
      }

      const data = await response.json();
      const updatedUser = data.data[0];

      dispatch({
        type: UPDATE_USER_STATUS_SUCCESS_USERS,
        payload: updatedUser,
      });

      console.log('Estado actualizado:', updatedUser);
    } catch (error) {
      dispatch({
        type: UPDATE_USER_STATUS_FAILURE_USERS,
        error: 'Error al actualizar el estado del usuario',
      });
    }
  };
};