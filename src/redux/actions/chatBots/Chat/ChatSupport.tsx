import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import {
  GET_CONVERSATION_TAB_CHAT
} from '../../../../constantes/chatBots/chat/Chat';
import config from '../../../../config';
import fetchWithIP from '../../utils/fetchHeaders';
import { FETCH_CONVERSATIONS_SUPPORT_SUCCESS } from '../../../../constantes/chatBots/Conversation/Conversation';
import { selectConversacionSeleccionada, selectSupportConversacionSeleccionado } from '../../../reducers/selectors/selectors';
import { SetSupportSeleccionadoHome, UpdateSupportSeleccionadoHome } from '../../home/Home';

export const CreateConversationSupportReducer = (
  mensaje: string
): ThunkAction<
  Promise<string>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {

  console.log("CONVERSACION-SUPPORT & ----- == ")

  //const support_seleccionado = selectSupportConversacionSeleccionado(getState())
  const support_seleccionado = localStorage.getItem("conversacion_support")
  
  let id_conversacion = support_seleccionado;
  const idChatBotSupport = 1;
  console.log(id_conversacion , "/////////////)))))))))))))))))))))))))))000")
  if (id_conversacion ===  null) {
    console.log("NI SI QUIER ENTRO AQUI ----")
    await fetchWithIP('chatbots/token123/conversaciones', {
      method: 'POST',
    }).then(async res => {
      return res.json()
    })
      .then(data => {
        const rpta = data.data[0]
        dispatch(UpdateSupportSeleccionadoHome(rpta.id))
        id_conversacion = rpta.identificador
        localStorage.setItem("conversacion_support" , rpta.identificador)
      }).catch((error) => {
        console.log(error)
      });
  }
  console.log(id_conversacion , "/////////////)))))))))))))))))))))))))))000 22222222222")

  let mensaje_bot = "";
  await fetchWithIP('chatbots/token123/conversaciones/' + id_conversacion + '/mensajes/identificador', {
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

  const conversacionSeleccionada = selectConversacionSeleccionada(getState());
  if (id_conversation === 0) id_conversation = conversacionSeleccionada

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