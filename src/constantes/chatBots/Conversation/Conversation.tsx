export const FETCH_CONVERSATIONS_REQUEST = 'FETCH_CONVERSATIONS_REQUEST';
export const FETCH_CONVERSATIONS_SUCCESS = 'FETCH_CONVERSATIONS_SUCCESS';
export const FETCH_CONVERSATIONS_FAILURE = 'FETCH_CONVERSATIONS_FAILURE';

interface FetchConversationsRequestAction {
  type: typeof FETCH_CONVERSATIONS_REQUEST;
}

interface FetchConversationsSuccessAction {
  type: typeof FETCH_CONVERSATIONS_SUCCESS;
  payload: any; // Ajusta el tipo según la estructura de tu API
}

interface FetchConversationsFailureAction {
  type: typeof FETCH_CONVERSATIONS_FAILURE;
  payload: string;
}

export type ConversationsActionTypes = 
  | FetchConversationsRequestAction 
  | FetchConversationsSuccessAction 
  | FetchConversationsFailureAction;
