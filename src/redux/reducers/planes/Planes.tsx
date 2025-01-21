import {
  FETCH_PLANES_REQUEST,
  FETCH_PLANES_SUCCESS,
  FETCH_PLANES_FAILURE,
  SET_PLANES_PAGE,
  SET_PLANES_SORT,
  SET_PLANES_FILTERS,
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

const initialState = {
  rex_planes: [],
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

const Planes = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_PLANES_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case FETCH_PLANES_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_planes: action.payload.planes,
        rex_meta: action.payload.meta,
      };
    case FETCH_PLANES_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.error,
      };
    case SET_PLANES_PAGE:
      return {
        ...state,
        rex_meta: {
          ...state.rex_meta,
          page: action.payload,
        },
      };
    case SET_PLANES_SORT:
      return {
        ...state,
        rex_sortColumn: action.payload.sortColumn,
        rex_sortOrder: action.payload.sortOrder,
      };
    case SET_PLANES_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };
    case UPDATE_TYPE_PLANES_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case UPDATE_TYPE_PLANES_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_planes: state.rex_planes.map(user =>
          user === action.payload.id ? action.payload : user
        ),
      };
    case UPDATE_TYPE_PLANES_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.error,
      };
    case CREATE_TYPE_PLANES_REQUEST:
      return {
        ...state,
        rex_loading: true
      };
    case CREATE_TYPE_PLANES_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_planes: action.payload
      };
    case CREATE_TYPE_PLANES_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.error
      };
    case DELETE_TYPE_PLANES_REQUEST:
      return {
        ...state,
        rex_loading: true
      };
    case DELETE_TYPE_PLANES_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_planes: state.rex_planes.filter(
          (tipoUsuario: any) => tipoUsuario.id !== action.payload.id
        )
      };
    case DELETE_TYPE_PLANES_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.error
      };
    default:
      return state;
  }
};

export default Planes;