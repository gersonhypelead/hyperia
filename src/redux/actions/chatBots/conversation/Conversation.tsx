import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import {
  FETCH_CONVERSATIONS_REQUEST,
  FETCH_CONVERSATIONS_SUCCESS,
  FETCH_CONVERSATIONS_FAILURE,
  ConversationsActionTypes
} from '../../../../../src/constantes/chatBots/Conversation/Conversation'; // Ajusta la ruta según corresponda
import config from '../../../../config'

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

export const GetDataConversationsReducer = (): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (dispatch) => {
  dispatch(fetchConversationsRequestReducer());
  try {
    const response = await fetch(config.API_URL+'chatbots/'+localStorage.getItem("chat_seleccionado")+'/conversaciones');
    const data = await response.json();
    dispatch(fetchConversationsSuccessReducer(data));
  } catch (error) {
    dispatch(fetchConversationsFailureReducer('Failed to fetch conversations'));
  }
};
