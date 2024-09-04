export const FETCH_CONVERSATIONS_REQUEST = 'FETCH_CONVERSATIONS_REQUEST';
export const FETCH_CONVERSATIONS_SUCCESS = 'FETCH_CONVERSATIONS_SUCCESS';
export const FETCH_CONVERSATIONS_FAILURE = 'FETCH_CONVERSATIONS_FAILURE';
export const FETCH_CONVERSATIONS_SUPPORT_REQUEST = 'FETCH_CONVERSATIONS_SUPPORT_REQUEST';
export const FETCH_CONVERSATIONS_SUPPORT_SUCCESS = 'FETCH_CONVERSATIONS_SUPPORT_SUCCESS';
export const FETCH_CONVERSATIONS_DELETE = 'FETCH_CONVERSATIONS_DELETE';

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

interface FetchConversationsSupportRequestAction {
  type: typeof FETCH_CONVERSATIONS_SUPPORT_REQUEST;
  payload: any; // Ajusta el tipo según la estructura de tu API
}

interface FetchConversationsSupportSuccessAction {
  type: typeof FETCH_CONVERSATIONS_SUPPORT_SUCCESS;
  payload: any; // Ajusta el tipo según la estructura de tu API
}

export type ConversationsActionTypes = 
  | FetchConversationsRequestAction 
  | FetchConversationsSuccessAction 
  | FetchConversationsSupportRequestAction
  | FetchConversationsSupportSuccessAction
  | FetchConversationsFailureAction;
