export const GET_CONVERSATION_TAB_CHAT = 'GET_CONVERSATION_TAB_CHAT';
export const DELETE_MESSAGE_REQUEST = 'DELETE_MESSAGE_REQUEST';
export const DELETE_MESSAGE_SUCCESS = 'DELETE_MESSAGE_SUCCESS';
export const DELETE_MESSAGE_FAILURE = 'DELETE_MESSAGE_FAILURE';

interface DeleteMessageRequestAction {
    type: typeof DELETE_MESSAGE_REQUEST;
  }
  
  interface DeleteMessageSuccessAction {
    type: typeof DELETE_MESSAGE_SUCCESS;
    payload: number; // ID del mensaje eliminado
  }
  
  interface DeleteMessageFailureAction {
    type: typeof DELETE_MESSAGE_FAILURE;
    payload: string;
  }


  export type ChatBotsActionTypes =
  | DeleteMessageRequestAction
  | DeleteMessageSuccessAction
  | DeleteMessageFailureAction;