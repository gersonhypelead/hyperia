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
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE
} from '../../../constantes/admin/users/Users';



interface UserData {
  id: number;
  nombre?: string;
  apellido_paterno?: string;
  apellido_materno?: string;
  usuario?: string;
  tipo_usuario_id?: string;
  estado?: boolean;
}

export const FetchUsuariosReducer = (page: number, limit: number, sortColumn: string, sortOrder: string) => {

  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_USUARIOS_REQUEST_USERS });
    try {
      const response = await fetch(`${config.API_URL}auth?page=${page}&limit=${limit}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`);
      const data = await response.json();
      // Asegúrate de que `data.meta` contiene el total de usuarios

      dispatch({
        type: FETCH_USUARIOS_SUCCESS_USERS,
        payload: {
          usuarios: data.data,
          meta: data.meta
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
      const response = await fetch(`${config.API_URL}auth/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: userData.nombre,
          apellido_paterno: userData.apellido_paterno,
          apellido_materno: userData.apellido_materno,
          tipo_usuario_id: userData.tipo_usuario_id,
          usuario: userData.usuario,
        }),

      });


      if (!response.ok) {
        throw new Error('Error en la actualización');
      }

      const data = await response.json();

      const updatedUser = data.data[0];

      dispatch({
        type: UPDATE_USER_SUCCESS_USERS,
        payload: updatedUser,

      });
      console.log('payload:', updatedUser)
    } catch (error) {
      dispatch({
        type: UPDATE_USER_FAILURE_USERS,
        error: 'Error en la actualización',
      });
    }
  };
};

export const createUser = (userData: any) => async (dispatch: any) => {
  dispatch(CREATE_USER_REQUEST());

  try {
    const response = await fetch(`${config.API_URL}auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      dispatch(CREATE_USER_SUCCESS(data));
    } else {
      dispatch(CREATE_USER_FAILURE('Error al crear el usuario'));
    }
  } catch (error) {
    dispatch(CREATE_USER_FAILURE('Error de red al crear el usuario'));
  }
};
