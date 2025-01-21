export const FETCH_CONVERSATIONS_REQUEST = 'FETCH_CONVERSATIONS_REQUEST';
export const FETCH_CONVERSATIONS_SUCCESS = 'FETCH_CONVERSATIONS_SUCCESS';
export const FETCH_CONVERSATIONS_FAILURE = 'FETCH_CONVERSATIONS_FAILURE';
export const FETCH_CONVERSATIONS_SUPPORT_REQUEST = 'FETCH_CONVERSATIONS_SUPPORT_REQUEST';
export const FETCH_CONVERSATIONS_SUPPORT_SUCCESS = 'FETCH_CONVERSATIONS_SUPPORT_SUCCESS';
export const FETCH_CONVERSATIONS_DELETE = 'FETCH_CONVERSATIONS_DELETE';
export const SET_PAGE_CONVERSATIONS = "SET_PAGE_CONVERSATIONS"
export const SET_LIMIT_CONVERSATIONS = "SET_LIMIT_CONVERSATIONS"
export const SET_TOTAL_CONVERSATIONS = "SET_TOTAL_CONVERSATIONS"

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
interface SetPageConversationsAction {
  type: typeof SET_PAGE_CONVERSATIONS;
  payload: number; // El número de la página que se va a establecer
}

interface SetLimitConversationsAction {
  type: typeof SET_LIMIT_CONVERSATIONS;
  payload: number; // El límite de elementos por página que se va a establecer
}
interface SetTotalConversationsAction {
  type: typeof SET_TOTAL_CONVERSATIONS;
  payload: number; // El límite de elementos por página que se va a establecer
}
export type ConversationsActionTypes = 
  | FetchConversationsRequestAction 
  | FetchConversationsSuccessAction 
  | FetchConversationsSupportRequestAction
  | FetchConversationsSupportSuccessAction
  | FetchConversationsFailureAction
  | SetPageConversationsAction
  | SetLimitConversationsAction
  | SetTotalConversationsAction
  
  ;
