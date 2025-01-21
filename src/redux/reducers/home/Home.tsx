import {
  GET_DATA_CHATSBOTS_HOME,
  BOT_SELECTED,
  EDIT_VAR_MUNDO_HOME,
  GET_COUNT_CONVERSATIONS_HOME,
  GET_COUNT_MESSAGES_HOME,
  GET_COUNT_MESSAGES_BY_USER_CHAT,
  GET_COUNT_CONVERSATIONS_BY_USER_CHAT,
  GET_AVERAGE_CONVERSATIONS_MESSAGES,
  GET_AVERAGE_CONVERSATIONS_MESSAGES_BY_USER_CHAT,
  GET_USER_MESSAGES_INFO_HOME,
  GET_COUNT_TOKENS_BY_USER_CHAT,
  GET_COUNT_TOKENS_BY_USER,
  GET_CHAT_SELECCIONADO_BY_USER,
  SET_CONVERSACION_ID_BY_USER , 
  SET_SUPPORT_CONVERSACION_BY_USER , 
  SET_TOKEN_CHAT_BY_USER
} from "../../../constantes/Home/Home";

interface Chatbot {
  nombre: string;
  descripcion: string;
}

interface Messages {
  mensajes_disponibles: string;
  mensajes_enviados: string;
  mensajes_recibidos: string;
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
  rex_messages: Messages[];
  rex_tokens:number;
  rex_chat_selecccionado : number;
  rex_conversacion_seleccionada:number;
  rex_support_seleccionado:number;
  rex_token_chat:string

}

const INIT_STATE: ChatbotState = {
  rex_chatsbots: [],
  rex_chatbot_seleccionado: null,
  rex_mundo: "Hola",
  rex_loading: false,
  rex_error: null,
  rex_count_conversations: 0,
  rex_count_messages: 0,
  rex_average: 0,
  rex_messages: [],
  rex_tokens:0,
  rex_chat_selecccionado:0,
  rex_conversacion_seleccionada:0,
  rex_support_seleccionado:0 , 
  rex_token_chat :""
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

    case GET_USER_MESSAGES_INFO_HOME: {
      return {
        ...state,
        rex_messages: action.payload,
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
    case GET_COUNT_TOKENS_BY_USER_CHAT: {
      return {
        ...state,
        rex_tokens: action.payload,
      };
    }
    case GET_COUNT_TOKENS_BY_USER: {
      return {
        ...state,
        rex_tokens: action.payload,
      };
    }
    case GET_CHAT_SELECCIONADO_BY_USER: {
      return {
        ...state,
        rex_chat_selecccionado: action.payload,
      };
    }
    case SET_CONVERSACION_ID_BY_USER: {
      return {
        ...state,
        rex_conversacion_seleccionada: action.payload,
      };
    }
    case SET_SUPPORT_CONVERSACION_BY_USER: {
      return {
        ...state,
        rex_support_seleccionado: action.payload,
      };
    }
    case SET_TOKEN_CHAT_BY_USER: {
      return {
        ...state,
        rex_token_chat: action.payload,
      };
    }
    default:
      return state;
  }
};

export default homeReducer;
