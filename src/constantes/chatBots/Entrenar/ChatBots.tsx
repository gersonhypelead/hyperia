export const FETCH_CHATBOTS_REQUEST = 'FETCH_CHATBOTS_REQUEST';
export const FETCH_CHATBOTS_SUCCESS = 'FETCH_CHATBOTS_SUCCESS';
export const FETCH_CHATBOTS_FAILURE = 'FETCH_CHATBOTS_FAILURE';
export const FETCH_LIST_TRAINS = 'FETCH_LIST_TRAINS';
export const FETCH_TRAIN_CONVERSATION = 'FETCH_TRAIN_CONVERSATION';
export const DELETE_TRAIN_REQUEST = 'DELETE_TRAIN_REQUEST';
export const DELETE_TRAIN_SUCCESS = 'DELETE_TRAIN_SUCCESS';
export const DELETE_TRAIN_FAILURE = 'DELETE_TRAIN_FAILURE';
export const EDIT_TRAIN_REQUEST = 'EDIT_TRAIN_REQUEST';
export const EDIT_TRAIN_SUCCESS = 'EDIT_TRAIN_SUCCESS';
export const EDIT_TRAIN_FAILURE = 'EDIT_TRAIN_FAILURE';

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

interface DeleteTrainRequestAction {
  type: typeof DELETE_TRAIN_REQUEST;
}

interface DeleteTrainSuccessAction {
  type: typeof DELETE_TRAIN_SUCCESS;
  payload: number; // ID del entrenamiento eliminado
}

interface DeleteTrainFailureAction {
  type: typeof DELETE_TRAIN_FAILURE;
  payload: string; // Mensaje de error
}

interface EditTrainRequestAction {
  type: typeof EDIT_TRAIN_REQUEST;
}

interface EditTrainSuccessAction {
  type: typeof EDIT_TRAIN_SUCCESS;
  payload: {
    id: number; // ID del entrenamiento actualizado
    nombre: string; // Nuevo nombre del entrenamiento
  };
}

interface EditTrainFailureAction {
  type: typeof EDIT_TRAIN_FAILURE;
  payload: string; // Mensaje de error
}

export type ChatBotsActionTypes = 
  FetchChatBotsRequestAction 
  | FetchChatBotsSuccessAction 
  | FetchChatBotsFailureAction 
  | FetchListTrainsAction 
  | FetchTrainConversationAction 
  | DeleteTrainRequestAction
  | DeleteTrainSuccessAction
  | DeleteTrainFailureAction
  | EditTrainRequestAction
  | EditTrainSuccessAction
  | EditTrainFailureAction;

