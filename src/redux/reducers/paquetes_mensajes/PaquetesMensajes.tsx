import {
  PAQUETES_MENSAJES_REQUEST,
  PAQUETES_MENSAJES_SUCCESS,
  PAQUETES_MENSAJES_FAILURE,
  CREATE_PAQUETES_MENSAJES_REQUEST,
  CREATE_PAQUETES_MENSAJES_SUCCESS,
  CREATE_PAQUETES_MENSAJES_FAILURE,
  UPDATE_PAQUETES_MENSAJES_REQUEST,
  UPDATE_PAQUETES_MENSAJES_SUCCESS,
  UPDATE_PAQUETES_MENSAJES_FAILURE,
  SET_PAQUETES_MENSAJES_PAGE,
  SET_PAQUETES_MENSAJES_SORT,
  SET_PAQUETES_MENSAJES_FILTERS

} from "../../../constantes/paquetes_mensajes/PaquetesMensajes";

const initialState = {
  rex_paquetes_mensajes: [],
  rex_loading: false,
  rex_error: null,
  rex_meta: {
    total: 0,
    page: 1,
    limit: 10,
  },
  rex_sortColumn: 'id',
  rex_sortOrder: 'asc',
  filters: {},
};

const PaquetesMensajes = (state = initialState, action: any) => {
  switch (action.type) {
    case PAQUETES_MENSAJES_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case PAQUETES_MENSAJES_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_paquetes_mensajes: action.payload.rex_paquetes_mensajes,
        rex_meta: action.payload.meta,
      };
    case PAQUETES_MENSAJES_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.error,
      };
    case SET_PAQUETES_MENSAJES_PAGE:
      return {
        ...state,
        rex_meta: {
          ...state.rex_meta,
          page: action.payload,
        },
      };
    case SET_PAQUETES_MENSAJES_SORT:
      return {
        ...state,
        rex_sortColumn: action.payload.sortColumn,
        rex_sortOrder: action.payload.sortOrder,
      };
    case SET_PAQUETES_MENSAJES_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };
    case UPDATE_PAQUETES_MENSAJES_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case UPDATE_PAQUETES_MENSAJES_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_paquetes_mensajes: state.rex_paquetes_mensajes.map(paquetes_mensajes =>
          paquetes_mensajes === action.payload.id ? action.payload : paquetes_mensajes
        ),
      };
    case UPDATE_PAQUETES_MENSAJES_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.error,
      };
    case CREATE_PAQUETES_MENSAJES_REQUEST:
      return {
        ...state,
        loading: true
      };
    case CREATE_PAQUETES_MENSAJES_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload
      };
    case CREATE_PAQUETES_MENSAJES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default PaquetesMensajes;