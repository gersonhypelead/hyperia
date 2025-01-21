import {
  FETCH_CHATBOTS_REQUEST,
  FETCH_CHATBOTS_SUCCESS,
  FETCH_CHATBOTS_FAILURE,
  FETCH_LIST_TRAINS,
  FETCH_TRAIN_CONVERSATION,
  DELETE_TRAIN_REQUEST,
  DELETE_TRAIN_SUCCESS,
  DELETE_TRAIN_FAILURE,
  ChatBotsActionTypes,
} from '../../../../constantes/chatBots/Entrenar/ChatBots';

interface ChatBotsState {
  rex_loading: boolean;
  rex_chatbots: any[];
  rex_error: string | null;
  rex_list_trains: any[];
  rex_conversation: any[];
}

const INIT_STATE: ChatBotsState = {
  rex_loading: false,
  rex_chatbots: [],
  rex_error: null,
  rex_list_trains: [],
  rex_conversation: [],
};

export default (state = INIT_STATE, action: ChatBotsActionTypes): ChatBotsState => {
  switch (action.type) {
    case FETCH_CHATBOTS_REQUEST:
    case DELETE_TRAIN_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case FETCH_CHATBOTS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_chatbots: action.payload,
      };
    case FETCH_CHATBOTS_FAILURE:
    case DELETE_TRAIN_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case FETCH_LIST_TRAINS:
      return {
        ...state,
        rex_list_trains: action.payload,
      };
    case FETCH_TRAIN_CONVERSATION:
      return {
        ...state,
        rex_conversation: action.payload,
      };
    case DELETE_TRAIN_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_list_trains: state.rex_list_trains.filter(
          (train) => train.id !== action.payload
        ),
      };
    default:
      return state;
  }
};
