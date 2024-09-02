import { AppDispatch } from '../../store/store';
import config from '../../../config';
import { Dispatch } from 'redux';
import fetchWithIP from '../utils/fetchHeaders';

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

 export interface UserData {
  id: number;
  tipo_usuario?: string;

}

export const fetchTiposUsuarios = (
  page: number = 1, 
  limit: number = 10,
  sortColumn: string = 'id', 
  sortOrder: string = 'asc'
) => async (dispatch: AppDispatch) => {
  dispatch({ type: FETCH_TIPOS_USUARIOS_REQUEST });
  try {
    // const response = await fetch(`${config.API_URL}tipo-usuarios?page=${page}&limit=${limit}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`);
    const response = await fetchWithIP(`tipo-usuarios` , {method:"GET"});
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    } 
    const data = await response.json();
    if (data.respuesta) {
      dispatch({
        type: FETCH_TIPOS_USUARIOS_SUCCESS,
        payload: {
              tipos_usuarios: data.data, 
              meta: data.meta
        }
      });
      console.log('total2:', data.meta)
      console.log('payload:', data.data)
    } else {
      dispatch({
        type: FETCH_TIPOS_USUARIOS_FAILURE,
        error: 'Error en la respuesta del servidor',
      });
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
    const response = await fetch(`${config.API_URL}tipo-usuarios`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(typeuserData),
    });

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

    console.log('Datos que se están actualizando:', typeuserData);

    try {
      const response = await fetch(`${config.API_URL}tipo-usuarios/${typeuserData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tipo_usuario: typeuserData.tipo_usuario

        }),
      });

      if (!response.ok) {
        const errorData = await response.json(); 
        throw new Error(errorData.message || 'Error en la actualización'); 
      }

      const data = await response.json();
      const updatedUser = data.data[0]; 

      dispatch({
        type: UPDATE_TYPE_USER_SUCCESS_USERS,
        payload: updatedUser,
      });

      console.log('payload:', updatedUser);
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
      const response = await fetch(`${config.API_URL}tipo-usuarios/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error en la eliminación');
      }

      dispatch({
        type: DELETE_TYPE_USER_SUCCESS_USERS,
        payload: userId, // El payload puede ser el ID del usuario eliminado
      });

      console.log('El usuario con ID:', userId, 'ha sido eliminado exitosamente');
    } catch (error: any) {
      dispatch({
        type: DELETE_TYPE_USER_FAILURE_USERS,
        error: error.message || 'Error en la eliminación',
      });
      console.error('Error al eliminar el tipo de usuario:', error.message);
    }
  };
};
