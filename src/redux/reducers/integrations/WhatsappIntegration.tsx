import {
  GET_DATA_CHATSBOTS_HOME,
  BOT_SELECTED,
} from "../../../constantes/Home/Home";

interface ChatbotState {

}

const INIT_STATE: ChatbotState = {
  
};

const whatsappIntegration = (state = INIT_STATE, action: any): ChatbotState => {
  switch (action.type) {
    
    default:
      return state;
  }
};

export default whatsappIntegration;
