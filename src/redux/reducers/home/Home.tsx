import {
  GET_DATA_CHATSBOTS_HOME,
  EDIT_VAR_MUNDO_HOME,
} from "../../../constantes/Home/Home";

interface Chatbot {
  nombre: string;
  descripcion: string;
}

interface ChatbotState {
  rex_chatsbots: Chatbot[];
  rex_mundo: string;
  rex_loading: boolean;
  rex_error: string | null;
}

const INIT_STATE: ChatbotState = {
  rex_chatsbots: [],
  rex_mundo: "Hola asdasd asd",
  rex_loading: false,
  rex_error: null,
};

export default (state = INIT_STATE, action: any): ChatbotState => {
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

    default:
      return state;
  }
}
