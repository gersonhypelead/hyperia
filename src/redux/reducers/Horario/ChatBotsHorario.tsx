import {
  FETCH_CHATS_BOTS_HORARIO_REQUEST,
  FETCH_CHATS_BOTS_HORARIO_FAILURE,
  FETCH_CHATS_BOTS_HORARIO_SUCCESS
} from '../../../constantes/Horario/ChatBotHorario';

const initialState = {
  rex_data: [],
  loading: false,
  error: null,
}

const ChatsBotsHorario = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_CHATS_BOTS_HORARIO_REQUEST:
      return {
        ...state,
        rex_loading: true
      };
    case FETCH_CHATS_BOTS_HORARIO_SUCCESS:
      return {
        ...state,
        rex_loading: false,
        rex_data: action.payload.rex_data,
      };
    case FETCH_CHATS_BOTS_HORARIO_FAILURE:
      return {
        ...state,
        rex_loading: false,
        rex_error: action.error
      };
    default:
      return state;
  }
};

export default ChatsBotsHorario
