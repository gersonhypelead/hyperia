import {
  GET_CONVERSATION_TAB_CHAT
} from '../../../../constantes/chatBots/chat/Chat';

interface ChatTabState {
  rex_conversation_chat: any[];
}

const INIT_STATE: ChatTabState = {
  rex_conversation_chat: []
};

const Chat = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case GET_CONVERSATION_TAB_CHAT:
      return {
        ...state,
        rex_conversation_chat: action.payload,
      };
    default:
      return state;
  }
};

export default Chat;