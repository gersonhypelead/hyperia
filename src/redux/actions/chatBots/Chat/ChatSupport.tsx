import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import {
  GET_CONVERSATION_TAB_CHAT
} from '../../../../constantes/chatBots/chat/Chat';
import config from '../../../../config';
import fetchWithIP from '../../utils/fetchHeaders';
import { FETCH_CONVERSATIONS_SUPPORT_SUCCESS } from '../../../../constantes/chatBots/Conversation/Conversation';

export const CreateConversationSupportReducer = (
  mensaje: string
): ThunkAction<
  Promise<string>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {

  console.log("CHAT SOPORTE")

  let id_conversacion = localStorage.getItem("SUPPORT_CONVERSACION_ID");
  const idChatBotSupport = 1;

  if (!id_conversacion) {
    await fetchWithIP('chatbots/' + idChatBotSupport + '/conversaciones', {
      method: 'POST',
    }).then(async res => {
      return res.json()
    })
      .then(data => {
        const rpta = data.data[0]
        // console.log(data);
        localStorage.setItem("SUPPORT_CONVERSACION_ID", rpta.id)
        id_conversacion = rpta.id

      }).catch((error) => {
        console.log(error)
      });
  }

  let mensaje_bot = "";

  await fetchWithIP('chatbots/' + idChatBotSupport + '/conversaciones/' + id_conversacion + '/mensajes', {
    method: 'POST'
  },
    {
      contenido: mensaje,
      emisor: "USUARIO"
    }
  ).then(async res => {
    return res.json()
  })
    .then(data => {
      console.log(data);
      mensaje_bot = data;
      // localStorage.setItem("TAB_CHAT_CONVERSACION_ID", data.id)
    }).catch((error) => {
      console.log(error)
    });

  return mensaje_bot;
}

export const GetConversationSupportReducer = (
  id_conversation: any = 0,
  save_conversation_redux = true
): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  const idChatBotSupport = 1;
  let chat_converation: any = [];
  if (id_conversation === 0) id_conversation = localStorage.getItem("SUPPORT_CONVERSACION_ID");

  if (id_conversation) {
    await fetchWithIP('chatbots/' + idChatBotSupport + '/conversaciones/' + id_conversation + '/mensajes',
      {
        method: 'GET',
      }
    )
      .then(async res => {
        return res.json()
      })
      .then(data => {

        data.map((dat: any) => {
          chat_converation.push({
            "id": dat.id,
            "sender": dat.emisor == "LLM" ? "receptor" : "emisor",
            "text": dat.contenido,
            "date": "17/7/2024 12:26:33",
            "time": "17/7/2024 12:26:33"
          })
        })

        if (save_conversation_redux) {
          dispatch({
            type: FETCH_CONVERSATIONS_SUPPORT_SUCCESS,
            payload: chat_converation
          })
        }

      }).catch((error) => {
        console.log(error)
      });
  }

  return chat_converation;
}