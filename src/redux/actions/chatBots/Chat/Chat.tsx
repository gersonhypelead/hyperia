import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import {
  GET_CONVERSATION_TAB_CHAT
} from '../../../../constantes/chatBots/chat/Chat';
import config from '../../../../config';
import fetchWithIP from '../../utils/fetchHeaders';
import { BOT_SELECTED, GET_DATA_CHATSBOTS_HOME } from '../../../../constantes/Home/Home';

export const CreateConversationReducer = (
  mensaje: string
): ThunkAction<
  Promise<string>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {

  console.log("entrenamiento", localStorage.getItem("TAB_CHAT_CONVERSACION_ID"))

  let id_conversacion = localStorage.getItem("TAB_CHAT_CONVERSACION_ID");
  if (!id_conversacion) {
    console.log("entro en el undifendslfnñladjsfk")
    await fetchWithIP('chatbots/' + localStorage.getItem("chat_seleccionado") + '/conversaciones', {
      method: 'POST',
    }).then(async res => {
      return res.json()
    })
      .then(data => {
        const rpta = data.data[0]

        localStorage.setItem("TAB_CHAT_CONVERSACION_ID", rpta.id)
        id_conversacion = rpta.id

      }).catch((error) => {
        console.log(error)
      });
  }

  let mensaje_bot = "";

  await fetchWithIP('chatbots/' + localStorage.getItem("chat_seleccionado") + '/conversaciones/' + id_conversacion + '/mensajes', {
    method: 'POST',

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
    }).catch((error) => {
      console.log(error)
    });

  return mensaje_bot;
}

export const CreateMessageTrainReducer = (
  sender: string,
  idConversation: number,
  mensaje: string
): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  console.log("llego aqui ,c raetemessage train reducee")

  if (sender == "emisor") {
    sender = "USUARIO";
  } else {
    sender = "LLM";
  }

  const body = [
    {
      "emisor": sender,
      "contenido": mensaje
    },
  ]

  await fetchWithIP('entrenamientos/' + idConversation + '/mensajes',
    {
      method: 'POST',

    },
    body
  )
    .then(async res => {
      return res.json()
    })
    .then(data => {

    }).catch((error) => {
      console.log(error)
    });

}

export const GetConversationReducer = (
  id_conversation: any = 0,
  save_conversation_redux = true
): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {

  let chat_converation: any = [];
  if (id_conversation === 0) id_conversation = localStorage.getItem("TAB_CHAT_CONVERSACION_ID");

  if (id_conversation) {
    await fetchWithIP('chatbots/' + localStorage.getItem("chat_seleccionado") + '/conversaciones/' + id_conversation + '/mensajes',
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
            type: GET_CONVERSATION_TAB_CHAT,
            payload: chat_converation
          })
        }

      }).catch((error) => {
        console.log(error)
      });
  }

  return chat_converation;

}

export const ResetConversationReducer = (

): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  dispatch({
    type: GET_CONVERSATION_TAB_CHAT,
    payload: []
  })
}

export const ResetBotSelectedReducer = (

): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {

  const bots: any = getState().home.rex_chatsbots;
  const updatedArray = bots.map((item: any) => ({
    ...item,
    selected: false
  }));
  localStorage.removeItem('chat_seleccionado');

  dispatch({
    type: GET_DATA_CHATSBOTS_HOME,
    payload: updatedArray
  });

  dispatch({
    type: BOT_SELECTED,
    payload: null
  })

}