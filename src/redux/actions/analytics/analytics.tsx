import { Dispatch } from 'redux';
import { 
  FETCH_ANALYTICS_FAILURE, 
  FETCH_ANALYTICS_REQUEST, 
  FETCH_ANALYTICS_SUCCESS, 
  FETCH_GENERAL_FAILURE, 
  FETCH_GENERAL_REQUEST, 
  FETCH_GENERAL_SUCCESS, 
  SET_ANALYTICS_PAGE, 
  SET_ANALYTICS_SORT 
} from '../../../constantes/analytics/analytics';
import fetchWithIP from '../utils/fetchHeaders';

export const FetchAnalyticsReducer = (
  page: number = 1,
  limit: number = 10,
  sortColumn: string,
  sortOrder: string,
) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_ANALYTICS_REQUEST });
    try {
      const queryParams = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        sortColumn,
        sortOrder,
      });

      const response = await fetchWithIP(`analitics/user/chatbots-statistics?${queryParams.toString()}`,{method:'GET'});
      const data = await response.json();

      if (data.success) {
        dispatch({
          type: FETCH_ANALYTICS_SUCCESS,
          payload: {
            data: data.data,
            pagination: {
              ...data.pagination,
              page: page,
              limit: limit
            }
          }
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch({
        type: FETCH_ANALYTICS_FAILURE,
        error: 'Error de red o en la solicitud',
      });
    }
  };
}

export const FetchGeneralAnalyticsReducer = (chatbotIds: number[] = []) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_GENERAL_REQUEST });
    try {
      const response = await fetchWithIP(`analitics/user-general`, {
        method: 'POST',
      },{chatbotsIds: chatbotIds});
      const data = await response.json();
      
      if (data.respuesta) {
        dispatch({
          type: FETCH_GENERAL_SUCCESS,
          payload: data.data[0] // Assuming the API returns an array with a single object
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      dispatch({
        type: FETCH_GENERAL_FAILURE,
        error: 'Error de red o en la solicitud',
      });
    }
  };
}

// Acción para cambiar la página de usuarios
export const setUsuariosPage = (page: number) => ({
  type: SET_ANALYTICS_PAGE,
  payload: page,
});
// Acción para cambiar el orden de los usuarios
export const setUsuariosSort = (sortColumn: string, sortOrder: string) => ({
  type: SET_ANALYTICS_SORT,
  payload: { sortColumn, sortOrder },
});

