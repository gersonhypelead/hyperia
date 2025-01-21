import {
  FETCH_CONVERSATIONS_REQUEST,
  FETCH_CONVERSATIONS_SUCCESS,
  FETCH_CONVERSATIONS_FAILURE,
  FETCH_CONVERSATIONS_SUPPORT_REQUEST,
  FETCH_CONVERSATIONS_SUPPORT_SUCCESS,
  ConversationsActionTypes,
  SET_PAGE_CONVERSATIONS,
  SET_LIMIT_CONVERSATIONS,
  SET_TOTAL_CONVERSATIONS
} from '../../../../../src/constantes/chatBots/Conversation/Conversation';

interface ConversationsState {
  rex_loading: boolean;
  rex_loading_support_chat: boolean;
  rex_conversations: any[];
  rex_conversation_support_chat: any[];
  rex_error: string | null;
  rex_page: number,
  rex_limit: number,
  rex_total: number
}

const INIT_STATE: ConversationsState = {
  rex_loading: false,
  rex_loading_support_chat: false,
  rex_conversations: [],
  rex_conversation_support_chat: [],
  rex_error: null,
  rex_page: 1,
  rex_limit: 5,
  rex_total: 0

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
    /* paginate  */
    case SET_PAGE_CONVERSATIONS:
      return {
        ...state,
        rex_page: action.payload,
      };
    case SET_LIMIT_CONVERSATIONS:
      return {
        ...state,
        rex_limit: action.payload,
      };
    case SET_TOTAL_CONVERSATIONS:
      return {
        ...state,
        rex_total: action.payload,
      };
    default:
      return state;
  }
};
