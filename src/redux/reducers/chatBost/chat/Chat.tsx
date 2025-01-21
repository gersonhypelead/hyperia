import {
  GET_CONVERSATION_TAB_CHAT,
  DELETE_MESSAGE_REQUEST,
  DELETE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_FAILURE,
} from '../../../../constantes/chatBots/chat/Chat';

interface ChatTabState {
  rex_conversation_chat: any[]; // Lista de mensajes en la conversación
  rex_loading: boolean; // Estado de carga
  rex_error: string | null; // Manejo de errores
}

const INIT_STATE: ChatTabState = {
  rex_conversation_chat: [],
  rex_loading: false,
  rex_error: null,
};

const Chat = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GET_CONVERSATION_TAB_CHAT:
      return {
        ...state,
        rex_conversation_chat: action.payload,
      };

    case DELETE_MESSAGE_REQUEST:
      return {
        ...state,
        rex_loading: true,
        rex_error: null,
      };

    case DELETE_MESSAGE_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_conversation_chat: state.rex_conversation_chat.filter(
          (mensaje) => mensaje.id !== action.payload
        ), // Filtra el mensaje eliminado
      };

    case DELETE_MESSAGE_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.payload, // Guarda el mensaje de error
      };

    default:
      return state;
  }
};

export default Chat;
