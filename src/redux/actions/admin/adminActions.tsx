import { Dispatch } from 'redux';
import config from '../../../config';
import { 
  FETCH_ADMIN_REQUEST_USERS,
  FETCH_ADMIN_SUCCESS_USERS,
  FETCH_ADMIN_FAILURE_USERS,
  SET_ADMIN_PAGE_USERS,
  SET_ADMIN_SORT_USERS
} from '../../../constantes/admin/ChatBot/Bot';
import { message } from 'antd';
import { AppDispatch } from '../../store/store';

export const FetchAdminReducer = (
  page: number = 1, 
  limit: number = 10, 
  sortColumn: string, 
  sortOrder: string, 
  filters?: {
    nombre?: string,
    usuario?: string,
    chatbot?: string,
    descripcion?: string,
    createdFrom?: string,
    createdTo?: string,
    updateFrom?: string,
    updateTo?: string,
  }
) => async (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_ADMIN_REQUEST_USERS });
    try {
      const queryParams = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        sortColumn,
        sortOrder,
      });

      if (filters?.nombre) queryParams.append('nombre', filters.nombre);
      if (filters?.usuario) queryParams.append('usuario', filters.usuario);
      if (filters?.chatbot) queryParams.append('chatbot', filters.chatbot);
      if (filters?.descripcion) queryParams.append('descripcion', filters.descripcion);
      if (filters?.createdFrom) queryParams.append('createdFrom', filters.createdFrom);
      if (filters?.createdTo) queryParams.append('createdTo', filters.createdTo);
      if (filters?.updateFrom) queryParams.append('updateFrom', filters.updateFrom);
      if (filters?.updateTo) queryParams.append('updateTo', filters.updateTo);

      const response = await fetch(`${config.API_URL}admin?${queryParams.toString()}`);
      const data = await response.json();

      if (data.success) {
        dispatch({
          type: FETCH_ADMIN_SUCCESS_USERS,
          payload: {
            admin: data.data,
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
      dispatch({ type: FETCH_ADMIN_FAILURE_USERS, error: message });
    }
  };

export const setAdminPage = (page: number) => ({
  type: SET_ADMIN_PAGE_USERS,
  payload: page,
});

export const setAdminSort = (sortColumn: string, sortOrder: string) => ({
  type: SET_ADMIN_SORT_USERS,
  payload: { sortColumn, sortOrder },
});