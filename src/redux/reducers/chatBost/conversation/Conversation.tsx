import {
    FETCH_CONVERSATIONS_REQUEST,
    FETCH_CONVERSATIONS_SUCCESS,
    FETCH_CONVERSATIONS_FAILURE,
    ConversationsActionTypes
} from '../../../../../src/constantes/chatBots/Conversation/Conversation';

interface ConversationsState {
    rex_loading: boolean;
    rex_conversations: any[]; // Ajusta el tipo según la estructura de tu API
    rex_error: string | null;
}

const INIT_STATE: ConversationsState = {
    rex_loading: false,
    rex_conversations: [],
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
        default:
            return state;
    }
};
