import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppThunk, RootState } from '../../store/store';
import {
  EDIT_VAR_MUNDO_HOME,
  GET_DATA_CHATSBOTS_HOME,
  GET_COUNT_CONVERSATIONS_HOME,
  GET_COUNT_MESSAGES_BY_USER_CHAT,
  GET_COUNT_CONVERSATIONS_BY_USER_CHAT,
  DELETE_CHATBOT_REQUEST,
  DELETE_CHATBOT_SUCCESS,
  DELETE_CHATBOT_FAILURE,
  BOT_SELECTED
} from '../../../constantes/Home/Home';
import config from '../../../config';
import fetchWithIP from '../utils/fetchHeaders';

// Acción asíncrona para obtener los datos de los chatbots
export const GetDataChatsBotsHomeReducer = (): AppThunk => async (dispatch, getState) => {
  const rex_chatsbots: any = getState().home.rex_chatsbots;

  dispatch({ type: 'FETCH_CHATBOT_REQUEST' });

  try {
    const id_usuario = localStorage.getItem('id_usuario');
    const data = await fetchWithIP(`usuarios/${id_usuario}/chatbots`,
      { method: 'GET' }).then(response => response.json());

    dispatch({
      type: 'FETCH_CHATBOT_SUCCESS',
      payload: data,
    });

    const id_chat_selected = localStorage.getItem('chat_seleccionado');
    if (id_chat_selected) {
      console.log("CHAT SELECCIONADO: -------------------");
      console.log(id_chat_selected);
      
      const bot_selected = data.find((option: any) => option.id == parseInt(id_chat_selected.toString()))
      console.log("bot_selected: --------------------------");
      console.log(bot_selected);
      
      dispatch({
        type: BOT_SELECTED,
        payload: bot_selected
      })
    }

  } catch (error) {
    console.error('Error al cargar los chatbots', error);
    dispatch({
      type: 'FETCH_CHATBOT_FAILURE',
      error: 'Error al cargar los chatbots',
    });
  }
};

// Acción asíncrona para actualizar una variable (ejemplo)
export const UpdateVarMundoReducer = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  try {
    const id_usuario = localStorage.getItem('id_usuario');
    const response = await fetchWithIP('usuarios/' + id_usuario + '/chatbots');
    const data = await response.json();

    dispatch({
      type: GET_DATA_CHATSBOTS_HOME,
      payload: data
    });
  } catch (error) {
    console.error('Failed to fetch chatbots:', error);
  }
};

export const SelectBotReducer = (index: number, select: boolean = true): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {

  const bots: any = getState().home.rex_chatsbots;
  bots[index]['select'] = true;

  dispatch({
    type: GET_DATA_CHATSBOTS_HOME,
    payload: bots
  });

  dispatch({
    type: BOT_SELECTED,
    payload: bots[index]
  })
}

export const GetCountConversacionesHomeReducer = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  try {
    const id_usuario = localStorage.getItem('id_usuario');
    const response = await fetchWithIP('general/usuarios/' + id_usuario + '/countConversationsUser', { method: "GET" });
    const data = await response.json();

    dispatch({
      type: 'GET_COUNT_CONVERSATIONS_HOME',
      payload: data
    });
  } catch (error) {
    console.error('Failed to fetch chatbots:', error);
  }
};

export const GetCountMessagesHomeReducer = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  try {
    const id_usuario = localStorage.getItem('id_usuario');
    const response = await fetchWithIP('general/usuarios/' + id_usuario + '/countMessagesUser', { method: "GET" });
    const data = await response.json();

    dispatch({
      type: 'GET_COUNT_MESSAGES_HOME',
      payload: data
    });
  } catch (error) {
    console.error('Failed to fetch chatbots:', error);
  }
};

export const GetCountMessagesByUserAndChatHomeReducer = (chat_seleccionado: string): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  try {
    const id_usuario = localStorage.getItem('id_usuario');
    const response = await fetchWithIP('general/usuarios/' + id_usuario + '/countMessagesByUserAndChatbot/' + chat_seleccionado, { method: "GET" });
    const data = await response.json();
    console.log(data.count, "mesnajes , numero ----")
    dispatch({
      type: 'GET_COUNT_MESSAGES_BY_USER_CHAT',
      payload: data
    });
  } catch (error) {
    console.error('Failed to fetch chatbots:', error);
  }
};

export const GetCountConversationsByUserAndChatHomeReducer = (chat_seleccionado: string): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  try {
    const id_usuario = localStorage.getItem('id_usuario');
    const response = await fetchWithIP('general/usuarios/' + id_usuario + '/countConversationsUserByChatbot/' + chat_seleccionado, { method: "GET" });
    const data = await response.json();
    console.log(data.count, "CONVERSACIONES , numero ----")

    dispatch({
      type: 'GET_COUNT_CONVERSATIONS_BY_USER_CHAT',
      payload: data
    });
  } catch (error) {
    console.error('Failed to fetch chatbots:', error);
  }
};

export const GetaverAgeConversationsMessagesHomeReducer = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  try {
    const id_usuario = localStorage.getItem('id_usuario');
    const response = await fetchWithIP('general/usuarios/' + id_usuario + '/averageConversationsMessages', { method: "GET" });
    const data = await response.json();
    console.log(data, "CONVERSACIONES , numero ----")

    dispatch({
      type: 'GET_AVERAGE_CONVERSATIONS_MESSAGES',
      payload: data
    });
  } catch (error) {
    console.error('Failed to fetch chatbots:', error);
  }
};
export const GetaverAgeConversationsMessagesByUserAndChatHomeReducer = (chat_seleccionado: string): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch) => {
  try {
    const id_usuario = localStorage.getItem('id_usuario');
    const response = await fetchWithIP('general/usuarios/' + id_usuario + '/averageConversationsMessagesByUserAndChatbot/' + chat_seleccionado, { method: "GET" });
    const data = await response.json();
    console.log(data, "CONVERSACIONES , numero ----")

    dispatch({
      type: 'GET_AVERAGE_CONVERSATIONS_MESSAGES_BY_USER_CHAT',
      payload: data
    });
  } catch (error) {
    console.error('Failed to fetch chatbots:', error);
  }
};

export const duplicateChatbotReducer = (usuarioId: number, chatbotId: number): AppThunk => async (dispatch) => {
  try {

    const response = await fetchWithIP(`chatbot/duplicate`, { method: "POST" }, { "usuarioId": 1, "chatbotId": 1 });
    console.log('id:', response, usuarioId, chatbotId)

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to duplicate chatbot');
    }

    const newChatbot = await response.json();

    // Refresh the chatbots list after successful duplication
    dispatch(GetDataChatsBotsHomeReducer());
    console.log('Chatbot duplicado:', newChatbot);
  } catch (error) {
    console.error('Error duplicating chatbot:', error);
    // Dispatch an error action if needed
  }
};

export const deleteChatbotReducer = (chatbotId: number): AppThunk => async (dispatch) => {
  dispatch({ type: DELETE_CHATBOT_REQUEST });

  try {
    const response = await fetch(`${config.API_URL}chatbot/${chatbotId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ estado: false }), // or any status indicating deletion
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete chatbot');
    }

    // Refresh the chatbots list after successful deletion
    dispatch(GetDataChatsBotsHomeReducer());
    dispatch({ type: DELETE_CHATBOT_SUCCESS, payload: chatbotId });
  } catch (error) {
    console.error('Error deleting chatbot:', error);
    dispatch({ type: DELETE_CHATBOT_FAILURE, error: 'Error deleting chatbot' });
  }
};
