import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { AppThunk, RootState } from '../../store/store';
import {
  GET_DATA_CHATSBOTS_HOME,
  DELETE_CHATBOT_REQUEST,
  DELETE_CHATBOT_SUCCESS,
  DELETE_CHATBOT_FAILURE,
  BOT_SELECTED
} from '../../../constantes/Home/Home';
import config from '../../../config';
import fetchWithIP from '../utils/fetchHeaders';
import { selectChatSeleccionado } from '../../reducers/selectors/selectors';

// Acción asíncrona para obtener los datos de los chatbots
export const GetDataChatsBotsHomeReducer = (): AppThunk => async (dispatch, getState) => {
  const rex_chatsbots: any = getState().home.rex_chatsbots;
  const { rex_user_auth } = getState().auth;

  const chatSeleccionado = selectChatSeleccionado(getState());
  let id_usuario = 0;
  if (rex_user_auth) id_usuario = rex_user_auth.id;
  dispatch({ type: 'FETCH_CHATBOT_REQUEST' });
  try {
    const data = await fetchWithIP(`usuarios/chatbots`,
      { method: 'GET' }).then(response => response.json());
    dispatch({
      type: 'FETCH_CHATBOT_SUCCESS',
      payload: data,
    });
    const id_chat_selected = chatSeleccionado;
    if (id_chat_selected) {
      const bot_selected = data.find((option: any) => option.id == parseInt(id_chat_selected.toString()))
      dispatch({
        type: BOT_SELECTED,
        payload: bot_selected
      })
    }
  } catch (error) {
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
> => async (dispatch, getState) => {
  const { rex_user_auth } = getState().auth;

  let id_usuario = 0;
  if (rex_user_auth) id_usuario = rex_user_auth.id;

  try {
    const response = await fetchWithIP('usuarios/chatbots');
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

  let bots: any = getState().home.rex_chatsbots;
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
> => async (dispatch, getState) => {

  const { rex_user_auth } = getState().auth;

  let id_usuario = 0;
  if (rex_user_auth) id_usuario = rex_user_auth.id;

  try {
    const response = await fetchWithIP('general/usuarios/countConversationsUser', { method: "GET" });
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
> => async (dispatch, getState) => {

  const { rex_user_auth } = getState().auth;

  let id_usuario = 0;
  if (rex_user_auth) id_usuario = rex_user_auth.id;

  try {
    const response = await fetchWithIP('general/usuarios/countMessagesUser', { method: "GET" });
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
> => async (dispatch, getState) => {

  const { rex_user_auth } = getState().auth;

  let id_usuario = 0;
  if (rex_user_auth) id_usuario = rex_user_auth.id;

  try {
    const response = await fetchWithIP('general/usuarios/countMessagesByUserAndChatbot/' + chat_seleccionado, { method: "GET" });
    const data = await response.json();
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
> => async (dispatch, getState) => {

  const { rex_user_auth } = getState().auth;

  let id_usuario = 0;
  if (rex_user_auth) id_usuario = rex_user_auth.id;

  try {
    const response = await fetchWithIP('general/usuarios/countConversationsUserByChatbot/' + chat_seleccionado, { method: "GET" });
    const data = await response.json();
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
> => async (dispatch, getState) => {

  const { rex_user_auth } = getState().auth;

  let id_usuario = 0;
  if (rex_user_auth) id_usuario = rex_user_auth.id;

  try {
    const response = await fetchWithIP('general/usuarios/averageConversationsMessages', { method: "GET" });
    const data = await response.json();
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
> => async (dispatch, getState) => {

  const { rex_user_auth } = getState().auth;

  let id_usuario = 0;
  if (rex_user_auth) id_usuario = rex_user_auth.id;

  try {
    const response = await fetchWithIP('general/usuarios/averageConversationsMessagesByUserAndChatbot/' + chat_seleccionado, { method: "GET" });
    const data = await response.json();
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

    const response = await fetchWithIP(`chatbot/duplicate`, { method: "POST" }, { "usuarioId": usuarioId, "chatbotId": chatbotId });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to duplicate chatbot');
    }

    const newChatbot = await response.json();

    // Refresh the chatbots list after successful duplication
    dispatch(GetDataChatsBotsHomeReducer());
  } catch (error) {
    console.error('Error duplicating chatbot:', error);
    // Dispatch an error action if needed
  }
};

export const deleteChatbotReducer = (chatbotId: number): AppThunk => async (dispatch) => {
  dispatch({ type: DELETE_CHATBOT_REQUEST });

  try {
    const response = await fetchWithIP(`chatbot/${chatbotId}`, {
      method: 'DELETE'
    },
      { estado: false },);

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

export const GetUserMessagesInfoReducer = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {

  const { rex_user_auth } = getState().auth;

  let id_usuario = 0;
  if (rex_user_auth) id_usuario = rex_user_auth.id;

  try {
    const response = await fetchWithIP('planes-usuarios/messages-info',
      { method: "GET" });
    const data = await response.json();
    dispatch({
      type: 'GET_USER_MESSAGES_INFO_HOME',
      payload: data
    });
  } catch (error) {
    console.error('Failed to fetch chatbots:', error);
  }
};

/* token */
export const GetCountTokensByChatbotHomeReducer = (chat_seleccionado: string): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {

  const { rex_user_auth } = getState().auth;

  let id_usuario = 0;
  if (rex_user_auth) id_usuario = rex_user_auth.id;

  try {
    const response = await fetchWithIP('general/usuarios/tokenCountConversationsUserByChatbot/' + chat_seleccionado, { method: "GET" });
    const result = await response.json();

    if (result.respuesta && result.data && result.data.length > 0) {
      const tokens = result.data[0]._sum?.tokens ?? 0;

      dispatch({
        type: 'GET_COUNT_TOKENS_BY_USER_CHAT',
        payload: tokens,
      });
    } else {
      console.warn('No se encontro data');
    }
  } catch (error) {
    console.error('Failed to fetch chatbots:', error);
  }
};


export const GetCountTokensHomeReducer = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {

  const { rex_user_auth } = getState().auth;

  let id_usuario = 0;
  if (rex_user_auth) id_usuario = rex_user_auth.id;

  try {
    const response = await fetchWithIP('general/usuarios/tokensCountTokensUser', { method: "GET" });
    const result = await response.json();

    if (result.respuesta && result.data && result.data.length > 0) {
      const tokens = result.data[0]._sum?.tokens ?? 0;

      dispatch({
        type: 'GET_COUNT_TOKENS_BY_USER',
        payload: tokens,
      });
    } else {
      console.warn('No se encontro data');
    }
  } catch (error) {
    console.error('Failed to fetch chatbots:', error);
  }
};

export const UpdateChatSeccionadoHome = (chat_seleccionado: string): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  try {
    const response = await fetchWithIP('auth', { method: "PUT" }, { select_chat: parseInt(chat_seleccionado) });
    const result = await response.json();
    console.log(chat_seleccionado, "CHAT_SELECCIONADO=")

    if (result.respuesta && result.data && result.data.length > 0) {
      const selectChat = result.data[0]?.select_chat ?? 0;
      const tokenChat = result.data[0]?.chatToken ?? "";

      console.log(selectChat, "===r===", tokenChat)
      dispatch({
        type: 'GET_CHAT_SELECCIONADO_BY_USER',
        payload: selectChat,
      });
      dispatch({
        type: 'SET_TOKEN_CHAT_BY_USER',
        payload: tokenChat,
      });
    } else {
      console.warn('No se encontro data');
    }
  } catch (error) {
    console.error('Failed to fetch chatbots:', error);
  }
};



export const UpdateConversacionSeleccionadaChatbotHome = (conversacion_id: string): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  try {
    //const response = await fetchWithIP('auth', { method: "PUT" } , {conversacion_id:parseInt(conversacion_id)});
    const response = await fetchWithIP(`chatbot/token123`, {
      method: 'PUT',
    }, {
      conversacion_id: parseInt(conversacion_id)
    });

    const result = await response.json();
    if (result.respuesta && result.data && result.data.length > 0) {
      const token = result.data[0]?.token ?? 0;
      const conversacionChat = result.data[0]?.conversacion_id ?? "";

      //console.log(selectChat , "===r===" , conversacionChat)
      dispatch({
        type: 'SET_CONVERSACION_ID_BY_USER',
        payload: conversacionChat,
      });
      dispatch({
        type: 'SET_TOKEN_CHAT_BY_USER',
        payload: token,
      });
    } else {
      console.warn('No se encontro data');
    }
  } catch (error) {
    console.error('Failed to fetch chatbots:', error);
  }
};
export const GetChatSeccionadoHome = (chat_seleccionado: string): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  try {
    const response = await fetchWithIP('auth', { method: "PUT" }, { select_chat: parseInt(chat_seleccionado) });
    const result = await response.json();

    if (result.respuesta && result.data && result.data.length > 0) {
      const selectChat = result.data[0]?.select_chat ?? 0;
      const token = result.data[0]?.token ?? "";

      dispatch({
        type: 'GET_CHAT_SELECCIONADO_BY_USER',
        payload: selectChat,
      });
      dispatch({
        type: 'SET_TOKEN_CHAT_BY_USER',
        payload: token,
      });
    } else {
      console.warn('No se encontro data');
    }
  } catch (error) {
    console.error('Failed to fetch chatbots:', error);
  }
};
export const SetConversacionSeleccionadaHome = (conversacion_id: string): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  dispatch({
    type: 'SET_CONVERSACION_ID_BY_USER',
    payload: conversacion_id,
  });
};
export const UpdateSupportSeleccionadoHome = (support_seleccionado: string): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  try {
    console.log(support_seleccionado, "chat -- seleccionado")
    const response = await fetchWithIP('auth', { method: "PUT" }, { select_support: parseInt(support_seleccionado) });
    const result = await response.json();
    if (result.respuesta && result.data && result.data.length > 0) {
      const support = result.data[0]?.select_support ?? 0;

      dispatch({
        type: 'SET_SUPPORT_CONVERSACION_BY_USER',
        payload: support,
      });
    } else {
      console.warn('No se encontro data');
    }
  } catch (error) {
    console.error('Failed to fetch chatbots:', error);
  }
};

export const SetSupportSeleccionadoHome = (support_id: string): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  dispatch({
    type: 'SET_SUPPORT_CONVERSACION_BY_USER',
    payload: support_id,
  });
};
