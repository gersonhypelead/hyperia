import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import {
  FETCH_CONVERSATIONS_REQUEST,
  FETCH_CONVERSATIONS_SUCCESS,
  FETCH_CONVERSATIONS_FAILURE,
  FETCH_CONVERSATIONS_DELETE,
  ConversationsActionTypes,
  SET_LIMIT_CONVERSATIONS,
  SET_PAGE_CONVERSATIONS,
  SET_TOTAL_CONVERSATIONS
} from '../../../../../src/constantes/chatBots/Conversation/Conversation'; // Ajusta la ruta según corresponda
import config from '../../../../config'
import fetchWithIP from '../../utils/fetchHeaders';
import { selectChatSeleccionado, selectTokenChatSeleccionado } from '../../../reducers/selectors/selectors';

export const fetchConversationsRequestReducer = (): ConversationsActionTypes => ({
  type: FETCH_CONVERSATIONS_REQUEST
});

export const fetchConversationsSuccessReducer = (data: any[]): ConversationsActionTypes => ({
  type: FETCH_CONVERSATIONS_SUCCESS,
  payload: data
});

export const fetchConversationsFailureReducer = (error: string): ConversationsActionTypes => ({
  type: FETCH_CONVERSATIONS_FAILURE,
  payload: error
});

export const GetDataConversationsReducer = (page:number = 0, limit: number = 5): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (dispatch, getState) => {
  //console.log("((((((((((((((((((((((((((((((((((((((((((((((((")
  dispatch(fetchConversationsRequestReducer());
  try {
    const chatSeleccionado = selectChatSeleccionado(getState());
    const tokenChatSeleccionado = selectTokenChatSeleccionado(getState());

    const response = await fetchWithIP('chatbots/' + tokenChatSeleccionado+ `/conversaciones?limit=${limit}&page=${page}`, { method: "GET" });
    const data = await response.json();
    dispatch(setTotal(data.meta.total));  
    dispatch(fetchConversationsSuccessReducer(data.data));
    console.log(data.data)
  } catch (error) {
    dispatch(fetchConversationsFailureReducer('Failed to fetch conversations'));
  }
};


export const DeleteDataConversationsReducer = (conversacionId:number): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (dispatch , getState) => {
  try {
    const chatSeleccionado = selectChatSeleccionado(getState());
    const tokenChatSeleccionado = selectTokenChatSeleccionado(getState());

    const response = await fetchWithIP('chatbots/' + tokenChatSeleccionado + '/conversaciones/'+conversacionId, { method: "DELETE" });
    const data = await response.json();
    dispatch({
      type: 'FETCH_CONVERSATIONS_DELETE',
      payload: data
    });
  } catch (error) {
    console.error('Error  , delete conversaciones', error);
  }
};

export const setCurrentPage = (page: number) => ({
  type: SET_PAGE_CONVERSATIONS,
  payload: page,
});

export const setTotal = (total: number) => ({
  type: SET_TOTAL_CONVERSATIONS,
  payload: total,
});

export const setLimit = (limit: number) => ({
  type: SET_LIMIT_CONVERSATIONS,
  payload: limit,
});