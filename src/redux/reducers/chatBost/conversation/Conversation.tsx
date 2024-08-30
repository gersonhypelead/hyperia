import {
  FETCH_CONVERSATIONS_REQUEST,
  FETCH_CONVERSATIONS_SUCCESS,
  FETCH_CONVERSATIONS_FAILURE,
  FETCH_CONVERSATIONS_SUPPORT_REQUEST,
  FETCH_CONVERSATIONS_SUPPORT_SUCCESS,
  ConversationsActionTypes
} from '../../../../../src/constantes/chatBots/Conversation/Conversation';

interface ConversationsState {
  rex_loading: boolean;
  rex_loading_support_chat: boolean;
  rex_conversations: any[];
  rex_conversation_support_chat: any[];
  rex_error: string | null;
}

const INIT_STATE: ConversationsState = {
  rex_loading: false,
  rex_loading_support_chat: false,
  rex_conversations: [],
  rex_conversation_support_chat: [],
  rex_error: null,
};

export default (state = INIT_STATE, action: ConversationsActionTypes): ConversationsState => {
  switch (action.type) {
    case FETCH_CONVERSATIONS_REQUEST:
      return {
        ...state,
        rex_loading: true,
      };
    case FETCH_CONVERSATIONS_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_conversations: action.payload,
      };
    case FETCH_CONVERSATIONS_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload,
      };
    case FETCH_CONVERSATIONS_SUPPORT_REQUEST:
      return {
        ...state,
        rex_loading_support_chat: true,
      };
    case FETCH_CONVERSATIONS_SUPPORT_SUCCESS:
      return {
        ...state,
        rex_loading_support_chat: false,
        rex_conversation_support_chat: action.payload,
      };
    default:
      return state;
  }
};
