export const UPDATE_DESING_CHAT_REQUEST = 'UPDATE_DESING_CHAT_REQUEST';
export const UPDATE_DESING_CHAT_SUCCESS = 'UPDATE_DESING_CHAT_SUCCESS';
export const UPDATE_DESING_CHAT_FAILURE = 'UPDATE_DESING_CHAT_FAILURE';

export const GET_DESING_CHAT_REQUEST = 'GET_DESING_CHAT_REQUEST';
export const GET_DESING_CHAT_SUCCESS = 'GET_DESING_CHAT_SUCCESS';
export const GET_DESING_CHAT_FAILURE = 'GET_DESING_CHAT_FAILURE';

export const FETCH_STYLES_REQUEST = 'FETCH_STYLES_REQUEST';
export const FETCH_STYLES_SUCCESS = 'FETCH_STYLES_SUCCESS';
export const FETCH_STYLES_FAILURE = 'FETCH_STYLES_FAILURE';

interface UpdateDesingChatRequestAction {
    type: typeof UPDATE_DESING_CHAT_REQUEST;
}

interface UpdateDesingChatSuccessAction {
    type: typeof UPDATE_DESING_CHAT_SUCCESS;
    /* payload: any; */
}

interface UpdateDesingChatFailureAction {
    type: typeof UPDATE_DESING_CHAT_FAILURE;
    payload: string;
}
/* design - one-------------------------------------------------- */
interface GetDesingChatRequestAction {
    type: typeof GET_DESING_CHAT_REQUEST;
}

interface GetDesingChatSuccessAction {
    type: typeof GET_DESING_CHAT_SUCCESS;
    payload: any;
}

interface GetDesingChatFailureAction {
    type: typeof GET_DESING_CHAT_FAILURE;
    payload: string;
}
/* styles */
interface FetchStylesRequestAction {
    type: typeof FETCH_STYLES_REQUEST;
  }
  
interface FetchStylesSuccessAction {
    type: typeof FETCH_STYLES_SUCCESS;
    payload:any;
  }
  
 interface FetchStylesFailureAction {
    type: typeof FETCH_STYLES_FAILURE;
    payload: string; 
  }
export type DesingChatActionTypes =  
UpdateDesingChatFailureAction | 
UpdateDesingChatRequestAction | 
UpdateDesingChatSuccessAction |
GetDesingChatRequestAction  |
GetDesingChatSuccessAction  |
GetDesingChatFailureAction  | 
FetchStylesRequestAction  |
FetchStylesSuccessAction  |
FetchStylesFailureAction;