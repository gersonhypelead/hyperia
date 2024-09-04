import {
  GET_DATA_CHATSBOTS_HOME,
  BOT_SELECTED,
  EDIT_VAR_MUNDO_HOME,
  GET_COUNT_CONVERSATIONS_HOME,
  GET_COUNT_MESSAGES_HOME,
  GET_COUNT_MESSAGES_BY_USER_CHAT,
  GET_COUNT_CONVERSATIONS_BY_USER_CHAT,
  GET_AVERAGE_CONVERSATIONS_MESSAGES,
  GET_AVERAGE_CONVERSATIONS_MESSAGES_BY_USER_CHAT
} from "../../../constantes/Home/Home";

interface Chatbot {
  nombre: string;
  descripcion: string;
}

interface ChatbotState {
  rex_chatsbots: Chatbot[];
  rex_chatbot_seleccionado: Chatbot | null;
  rex_mundo: string;
  rex_loading: boolean;
  rex_error: string | null;
  rex_count_conversations: number;
  rex_count_messages: number;
  rex_average: number;
}

const INIT_STATE: ChatbotState = {
  rex_chatsbots: [],
  rex_chatbot_seleccionado: null,
  rex_mundo: "Hola",
  rex_loading: false,
  rex_error: null,
  rex_count_conversations: 0,
  rex_count_messages: 0,
  rex_average: 0
};

const homeReducer = (state = INIT_STATE, action: any): ChatbotState => {
  switch (action.type) {
    case 'FETCH_CHATBOT_REQUEST': {
      return {
        ...state,
        rex_loading: true,
        rex_error: null,
      };
    }

    case 'FETCH_CHATBOT_SUCCESS': {
      return {
        ...state,
        rex_chatsbots: action.payload,
        rex_loading: false,
        rex_error: null,
      };
    }

    case BOT_SELECTED: {
      return {
        ...state,
        rex_chatbot_seleccionado: action.payload
      };
    }

    case 'FETCH_CHATBOT_FAILURE': {
      return {
        ...state,
        rex_loading: false,
        rex_error: action.error,
      };
    }

    case EDIT_VAR_MUNDO_HOME: {
      return {
        ...state,
        rex_mundo: action.payload,
      };
    }

    case GET_COUNT_CONVERSATIONS_HOME: {
      return {
        ...state,
        rex_count_conversations: action.payload,
      };
    }

    case GET_COUNT_MESSAGES_HOME: {
      return {
        ...state,
        rex_count_messages: action.payload,
      };
    }

    case GET_COUNT_MESSAGES_BY_USER_CHAT: {
      return {
        ...state,
        rex_count_messages: action.payload,
      };
    }

    case GET_COUNT_CONVERSATIONS_BY_USER_CHAT: {
      return {
        ...state,
        rex_count_conversations: action.payload,
      };
    }

    case GET_AVERAGE_CONVERSATIONS_MESSAGES: {
      return {
        ...state,
        rex_average: action.payload,
      };
    }

    case GET_AVERAGE_CONVERSATIONS_MESSAGES_BY_USER_CHAT: {
      return {
        ...state,
        rex_average: action.payload,
      };
    }

    default:
      return state;
  }
};

export default homeReducer;
