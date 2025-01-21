import {
  FETCH_ANALYTICS_FAILURE,
  FETCH_ANALYTICS_REQUEST,
  FETCH_ANALYTICS_SUCCESS,
  FETCH_GENERAL_FAILURE,
  FETCH_GENERAL_REQUEST,
  FETCH_GENERAL_SUCCESS
} from "../../../constantes/analytics/analytics";


const initialState = {
  rex_analytics: [],
  rex_general: [],
  rex_loading: false,
  rex_error: null,
  rex_meta: {
    total: 0,
    page: 1,
    limit: 10,
  },
  rex_sortColumn: 'bot',
  rex_sortOrder: 'asc',
  filters: {},
};

const analytics = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_ANALYTICS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case FETCH_ANALYTICS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_analytics: action.payload.data,
        rex_meta: action.payload.pagination,
      };
    case FETCH_ANALYTICS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.error,
      };
    case FETCH_GENERAL_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case FETCH_GENERAL_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_general: action.payload,
      };
    case FETCH_GENERAL_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.error,
      };
    default:
      return state;
  }
};

export default analytics;