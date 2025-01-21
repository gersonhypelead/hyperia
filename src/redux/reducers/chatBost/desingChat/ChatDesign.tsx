import { DesingChatActionTypes,  GET_DESING_CHAT_FAILURE, GET_DESING_CHAT_REQUEST, GET_DESING_CHAT_SUCCESS, UPDATE_DESING_CHAT_FAILURE, UPDATE_DESING_CHAT_REQUEST, UPDATE_DESING_CHAT_SUCCESS } from "../../../../constantes/chatBots/designChat/Design";



interface ChatTabState {
  rex_state_update_desing: boolean;
  rex_design_chat: any[];
  rex_design_status:boolean
  rex_error:string

  rex_styles: any,
  rex_loading_styles: boolean,
  rex_error_styles: string,
}

const INIT_STATE: ChatTabState = {
  rex_state_update_desing: false,
  rex_design_chat: [],
  rex_design_status:false,
  rex_error: "",
  rex_styles: {},
  rex_loading_styles: false,
  rex_error_styles: "",
};

const Desing = (state = INIT_STATE, action: DesingChatActionTypes) => {
  switch (action.type) {
    case UPDATE_DESING_CHAT_REQUEST:
      return {
        ...state,
        rex_state_update_desing: false
      };

    case UPDATE_DESING_CHAT_FAILURE:
      return {
        ...state,
        rex_state_update_desing: false
      };

    case UPDATE_DESING_CHAT_SUCCESS:
      return {
        ...state,
        rex_state_update_desing: true
      };
    /* desing ONE */
    case GET_DESING_CHAT_REQUEST:
      return {
        ...state,
        rex_design_status : true
      };

    case GET_DESING_CHAT_FAILURE:
      return {
        ...state,
        rex_design_status : false

      };

    case GET_DESING_CHAT_SUCCESS:
      return {
        ...state,
        rex_design_chat:action.payload,
        rex_design_status : false

      };
   
    default:
      return state;
  }
};

export default Desing;