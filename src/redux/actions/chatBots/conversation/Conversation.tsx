import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import {
  FETCH_CONVERSATIONS_REQUEST,
  FETCH_CONVERSATIONS_SUCCESS,
  FETCH_CONVERSATIONS_FAILURE,
  FETCH_CONVERSATIONS_DELETE,
  ConversationsActionTypes
} from '../../../../../src/constantes/chatBots/Conversation/Conversation'; // Ajusta la ruta según corresponda
import config from '../../../../config'
import fetchWithIP from '../../utils/fetchHeaders';

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
  console.log("Conversaciones: -----------------------");
  
  dispatch(fetchConversationsRequestReducer());
  try {
    const response = await fetchWithIP('chatbots/' + localStorage.getItem("chat_seleccionado") + '/conversaciones', { method: "GET" });
    const data = await response.json();
    //console.log(data , "llllllllllllllllllll")
    /* dispatch({
      type: 'FETCH_CONVERSATIONS_GET',
      payload: data
    }); */
    dispatch(fetchConversationsSuccessReducer(data));
  } catch (error) {
    dispatch(fetchConversationsFailureReducer('Failed to fetch conversations'));
    
    /* console.error('Error  , get conversacion', error); */
  }
};


export const DeleteDataConversationsReducer = (conversacionId:number): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (dispatch) => {
  console.log("delete conversacion");
  
 /*  dispatch(fetchConversationsRequestReducer()); */
  try {
    const response = await fetchWithIP('chatbots/' + localStorage.getItem("chat_seleccionado") + '/conversaciones/'+conversacionId, { method: "DELETE" });
    const data = await response.json();
    /* dispatch(fetchConversationsSuccessReducer(data)); */
    dispatch({
      type: 'FETCH_CONVERSATIONS_DELETE',
      payload: data
    });
  } catch (error) {
    /* dispatch(fetchConversationsFailureReducer('Failed to fetch conversations')); */

    console.error('Error  , delete conversaciones', error);
  }
};