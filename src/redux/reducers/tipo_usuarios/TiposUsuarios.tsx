// src/redux/reducers/usuarios/tiposUsuariosReducer.ts
import {
  FETCH_TIPOS_USUARIOS_REQUEST,
  FETCH_TIPOS_USUARIOS_SUCCESS,
  FETCH_TIPOS_USUARIOS_FAILURE,
  SET_TYPE_USUARIOS_PAGE_USERS,
  SET_TYPE_USUARIOS_SORT_USERS,
  CREATE_TYPE_USER_REQUEST,
  CREATE_TYPE_USER_SUCCESS,
  CREATE_TYPE_USER_FAILURE,
  DELETE_TYPE_USER_REQUEST_USERS,
  DELETE_TYPE_USER_SUCCESS_USERS,
  DELETE_TYPE_USER_FAILURE_USERS

} from "../../../constantes/admin/typeUsers/TypeUser";


const initialState = {
  rex_loading: false,
  rex_tiposUsuarios: [],
  rex_error: null,
  rex_meta: {
    page: 1,
    limit: 10,
    total: 0,
  },
};

const TiposUsuarios = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_TIPOS_USUARIOS_REQUEST:
      return {
        ...state,
        rex_loading: true
      };
    case FETCH_TIPOS_USUARIOS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_tiposUsuarios: action.payload.tipos_usuarios,
        rex_meta: action.payload.meta
      };
    case FETCH_TIPOS_USUARIOS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.error
      };
    case SET_TYPE_USUARIOS_PAGE_USERS:
      return {
        ...state,
        rex_meta: {
          ...state.rex_meta,
          page: action.payload,
        },
      };
    case SET_TYPE_USUARIOS_SORT_USERS:
      return {
        ...state,
        rex_sortColumn: action.payload.sortColumn,
        rex_sortOrder: action.payload.sortOrder,
      };
    case CREATE_TYPE_USER_REQUEST:
      return {
        ...state,
        rex_loading: true
      };
    case CREATE_TYPE_USER_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_tiposUsuarios: action.payload
      };
    case CREATE_TYPE_USER_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.error
      };
    case DELETE_TYPE_USER_REQUEST_USERS:
      return {
        ...state,
        rex_loading: true
      };
    case DELETE_TYPE_USER_SUCCESS_USERS:
      return {
        ...state,
        rex_loading: false,
        rex_tiposUsuarios: state.rex_tiposUsuarios.filter(
          (tipoUsuario: any) => tipoUsuario.id !== action.payload.id
        )
      };
    case DELETE_TYPE_USER_FAILURE_USERS:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.error
      };
    default:
      return state;
  }
};

export default TiposUsuarios