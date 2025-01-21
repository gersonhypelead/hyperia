import config from '../../../config';
import {
  FETCH_CHATS_BOTS_HORARIO_REQUEST,
  FETCH_CHATS_BOTS_HORARIO_SUCCESS,
  FETCH_CHATS_BOTS_HORARIO_FAILURE
} from '../../../constantes/Horario/ChatBotHorario';
import { AppDispatch } from '../../store/store';
import fetchWithIP from '../utils/fetchHeaders';

export const fetchChatbotHorarios = (
) => async (dispatch: AppDispatch) => {

  dispatch({ type: FETCH_CHATS_BOTS_HORARIO_REQUEST });
  try {
    const response = await fetchWithIP(`chatbot-horario`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    if (data) {
      dispatch({
        type: FETCH_CHATS_BOTS_HORARIO_SUCCESS,
        payload: {
          rex_data: data.data
        }
      });

    } else {
      dispatch({
        type: FETCH_CHATS_BOTS_HORARIO_FAILURE,
        error: 'Error en la respuesta del servidor',
      });
    }
  } catch (error) {
    dispatch({
      type: FETCH_CHATS_BOTS_HORARIO_FAILURE,
      error: 'Error de red o en la solicitud',
    });
  }
}

