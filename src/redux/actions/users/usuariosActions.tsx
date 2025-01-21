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
  CREATE_USER_FAILURE,
  UPDATE_PLANES_FAILURE,
  UPDATE_PLANES_REQUEST,
  UPDATE_PLANES_SUCCESS,
  PAQUETES_USERS_REQUEST,
  PAQUETES_USERS_FAILURE,
  PAQUETES_USERS_SUCCESS
} from '../../../constantes/admin/users/Users';
import fetchWithIP from '../utils/fetchHeaders';

export interface UserData {
  nombre?: string;
  apellido_paterno?: string;
  apellido_materno?: string;
  usuario?: string;
  tipo_usuario_id?: number;
  email?: string;
  estado?: boolean;
  contrasena?:string;
}

export const FetchUsuariosReducer = (
  page: number = 1, 
  limit: number = 10, 
  sortColumn: string = 'usuario', 
  sortOrder: string = 'asc', 
  filters?: { 
    nombre?: string, 
    usuario?: string, 
    tipo_usuario?: string, 
    createdFrom?: string, 
    createdTo?: string, 
    updatedFrom?: string, 
    updatedTo?: string 
  }
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

      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value) queryParams.append(key, value);
        });
      }
      const response = await fetchWithIP(`auth?${queryParams.toString()}` , {method:"GET"});
      const data = await response.json();
      if (data.respuesta) {
        dispatch({
          type: FETCH_USUARIOS_SUCCESS_USERS,
          payload: {
            usuarios: data.data,
            meta: data.meta
          }
        });
      } else {
        throw new Error(data.mensaje || 'Error fetching usuarios');
      }
    } catch (error) {
      dispatch({ 
        type: FETCH_USUARIOS_FAILURE_USERS, 
        error: error instanceof Error ? error.message : 'An unknown error occurred' 
      });
    }
  };
};

// Existing action creators
export const setUsuariosPage = (page: number) => ({
  type: SET_USUARIOS_PAGE_USERS,
  payload: page,
});

export const setUsuariosSort = (sortColumn: string, sortOrder: string) => ({
  type: SET_USUARIOS_SORT_USERS,
  payload: { sortColumn, sortOrder },
});


export const updateUser = (id: number, userData: UserData) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_USER_REQUEST_USERS });
    try {

      // Configurar correctamente la solicitud PUT
      // const response = await fetchWithIP(`auth/${id}`, {
      const response = await fetchWithIP(`auth`, {
        method: 'PUT'},
        userData
      );

      // Asegurarse de que se maneje la respuesta correctamente
      if (!response.ok) {
        const errorData = await response.json(); // Obtener detalles del error si hay
        throw new Error(errorData.message || 'Error en la actualización');
      }

      const data = await response.json();

      const updatedUser = data.data; // Verifica la estructura de los datos de la API

      dispatch({
        type: UPDATE_USER_SUCCESS_USERS,
        payload: updatedUser,
      });

      console.log('Usuario actualizado:', updatedUser);
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

      const response = await fetchWithIP(`auth/${id}/status`, {
        method: 'PUT',
      }, { estado });  

      if (!response.ok) {
        throw new Error('Error al actualizar el estado del usuario');
      }

      const data = await response.json();
      const updatedUser = data.data[0];

      dispatch({
        type: UPDATE_USER_STATUS_SUCCESS_USERS,
        payload: updatedUser,
      });

    } catch (error) {
      dispatch({
        type: UPDATE_USER_STATUS_FAILURE_USERS,
        error: 'Error al actualizar el estado del usuario',
      });
    }
  };
};

export const UpdatePlanUserReducer = (userData: any) => async (dispatch: any) => {
  dispatch(UPDATE_PLANES_REQUEST());
  try {
    const response = await fetchWithIP(`planes-usuarios`, {
      method: 'POST',
    },
      userData,
    );
    const data = response.json()
    if (response.ok) {
      dispatch(UPDATE_PLANES_SUCCESS(data));
    } else {
      dispatch(UPDATE_PLANES_FAILURE('Error al editar plan'));
    }
  } catch (error) {
    dispatch(UPDATE_PLANES_FAILURE('Error de red al editar plan'));
  }
};

export const PaquetesUsuariosReducer = (userData: any) => async (dispatch: any) => {
  dispatch(PAQUETES_USERS_REQUEST());
  try {
    const response = await fetchWithIP(`paquetes-usuarios`, {
      method: 'POST',
    },
      userData,
    );

    const data = response.json()
    if (response.ok) {
      dispatch(PAQUETES_USERS_SUCCESS(data));
    } else {
      dispatch(PAQUETES_USERS_FAILURE('Error al crear el usuario'));
    }
  } catch (error) {
    dispatch(PAQUETES_USERS_FAILURE('Error de red al crear el usuario'));
  }
};