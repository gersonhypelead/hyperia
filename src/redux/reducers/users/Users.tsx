import {
  FETCH_USUARIOS_REQUEST_USERS,
  FETCH_USUARIOS_SUCCESS_USERS,
  FETCH_USUARIOS_FAILURE_USERS,
  SET_USUARIOS_PAGE_USERS,
  SET_USUARIOS_SORT_USERS,
  UPDATE_USER_REQUEST_USERS,
  UPDATE_USER_SUCCESS_USERS,
  UPDATE_USER_FAILURE_USERS,
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAILURE,
} from '../../../constantes/admin/users/Users';

const initialState = {
  rex_users: [],
  rex_meta: {
    page: 1,
    limit: 10,
    total: 0,
  },
  rex_loading: false,
  rex_sortColumn: 'nombre',
  rex_sortOrder: 'asc',
  rex_error: null,
  loading: false,
  error: null,
  user: null,
};

const Users = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_USUARIOS_REQUEST_USERS:
      return {
        ...state,
        rex_loading: true,
      };
    case FETCH_USUARIOS_SUCCESS_USERS:
      return {
        ...state,
        rex_loading: false,
        rex_users: action.payload.usuarios,
        rex_meta: action.payload.meta,
      };
    case FETCH_USUARIOS_FAILURE_USERS:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.error,
      };
    case SET_USUARIOS_PAGE_USERS:
      return {
        ...state,
        rex_meta: {
          ...state.rex_meta,
          page: action.payload,
        },
      };
    case SET_USUARIOS_SORT_USERS:
      return {
        ...state,
        rex_sortColumn: action.payload.sortColumn,
        rex_sortOrder: action.payload.sortOrder,
      };
    case UPDATE_USER_REQUEST_USERS:
      return {
        ...state,
        rex_loading: true,
      };
    case UPDATE_USER_SUCCESS_USERS:
      return {
        ...state,
        rex_loading: false,
        rex_users: state.rex_users.map(user =>
          user === action.payload.id ? action.payload : user
        ),
      };
    case UPDATE_USER_FAILURE_USERS:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.error,
      };
    case CREATE_USER_REQUEST:
      return { 
        ...state, 
        loading: true };
    case CREATE_USER_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        user: action.payload };
    case CREATE_USER_FAILURE:
      return { 
        ...state, 
        loading: false, 
        error: action.error };
    default:
      return state;
  }
};

export default Users;
