export const FETCH_CHATBOTS_REQUEST = 'FETCH_CHATBOTS_REQUEST';
export const FETCH_CHATBOTS_SUCCESS = 'FETCH_CHATBOTS_SUCCESS';
export const FETCH_CHATBOTS_FAILURE = 'FETCH_CHATBOTS_FAILURE';
export const FETCH_LIST_TRAINS = 'FETCH_LIST_TRAINS';
export const FETCH_TRAIN_CONVERSATION = 'FETCH_TRAIN_CONVERSATION';

interface FetchChatBotsRequestAction {
  type: typeof FETCH_CHATBOTS_REQUEST;
}

interface FetchChatBotsSuccessAction {
  type: typeof FETCH_CHATBOTS_SUCCESS;
  payload: any; // Ajusta el tipo según la estructura de tu API
}

interface FetchChatBotsFailureAction {
  type: typeof FETCH_CHATBOTS_FAILURE;
  payload: string;
}

interface FetchListTrainsAction {
  type: typeof FETCH_LIST_TRAINS;
  payload: any;
}

interface FetchTrainConversationAction {
  type: typeof FETCH_TRAIN_CONVERSATION;
  payload: any;
}

export type ChatBotsActionTypes = FetchChatBotsRequestAction | FetchChatBotsSuccessAction | FetchChatBotsFailureAction | FetchListTrainsAction | FetchTrainConversationAction;
