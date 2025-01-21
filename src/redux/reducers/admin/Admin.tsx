import { 
  FETCH_ADMIN_REQUEST_USERS,
  FETCH_ADMIN_SUCCESS_USERS,
  FETCH_ADMIN_FAILURE_USERS,
  SET_ADMIN_PAGE_USERS,
  SET_ADMIN_SORT_USERS
} from '../../../constantes/admin/ChatBot/Bot';

const initialState = {
  rex_admins: [],
  rex_loading: false,
  rex_error: null,
  rex_meta: {
    total: 0,
    page: 1,
    limit: 10,
  },
  rex_sortColumn: 'nombre',
  rex_sortOrder: 'asc',
  filters:{},
};

const Admin = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_ADMIN_REQUEST_USERS:
      return {
        ...state,
        rex_loading: true,
      };
    case FETCH_ADMIN_SUCCESS_USERS:
      return {
        ...state,
        rex_loading: false,
        rex_admins: action.payload.admin,
        rex_meta: action.payload.meta,
      };
    case FETCH_ADMIN_FAILURE_USERS:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.error,
      };
    case SET_ADMIN_PAGE_USERS:
      return {
        ...state,
        rex_meta: {
          ...state.rex_meta,
          page: action.payload,
        },
      };
    case SET_ADMIN_SORT_USERS:
      return {
        ...state,
        rex_sortColumn: action.payload.sortColumn,
        rex_sortOrder: action.payload.sortOrder,
      };
    default:
      return state;
  }
};

export default Admin;