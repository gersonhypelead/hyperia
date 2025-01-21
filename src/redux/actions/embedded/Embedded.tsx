import { ThunkAction } from "redux-thunk";
import { GET_DESING_CHAT_SUCCESS } from "../../../constantes/chatBots/designChat/Design";
import fetchWithIP from "../utils/fetchHeaders";
import { RootState } from "../../store/store";
import { Action } from "redux";
import { selectChatSeleccionado, selectConversacionSeleccionada, selectTokenChatSeleccionado } from "../../reducers/selectors/selectors";
import { SetConversacionSeleccionadaHome } from "../home/Home";
import { GET_CONVERSATION_TAB_CHAT } from "../../../constantes/chatBots/chat/Chat";

export const SearchBotReducer = (chatbotId: number) => {


  return async (dispatch: any) => {
    try {
      const response = await fetchWithIP(`chatbot/${chatbotId}`, { method: 'GET' });
      if (response.ok) {
        const result = await response.json();
        dispatch({
          type: GET_DESING_CHAT_SUCCESS,
          payload: result
        })
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error updating chatbot behavior:', error);
    }
  };
};

export const SearchBotReducer2 = (token: string): ThunkAction<
  Promise<boolean>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  const tokenChat = selectTokenChatSeleccionado(getState());

  console.log("retornando un token", tokenChat);

  try {
    const response = await fetchWithIP(`chatbot/token/${token}`, { method: 'GET' });

    if (response.ok) {
      const result = await response.json();
      console.log(result, "RESULTADO ----->>>>>>")
      dispatch({
        type: GET_DESING_CHAT_SUCCESS,
        payload: result
      });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error updating chatbot behavior:', error);
    return false;
  }
};

export const CreateConversationEmbeddedReducer = (
  mensaje: string,
  token: string
): ThunkAction<
  Promise<string>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  const conversacionSeleccionada = localStorage.getItem("conversacion_embedded")
  let tokenChatSeleccionado = selectTokenChatSeleccionado(getState());

  let id_conversacion = conversacionSeleccionada
  const local_identificador = localStorage.getItem("conversacion_embedded")


  if (token) {
    tokenChatSeleccionado = token
  }
  if (conversacionSeleccionada) {
    
  }
  if (!id_conversacion) {

    await fetchWithIP('chatbots/' + tokenChatSeleccionado + '/conversaciones', {
      method: 'POST',
    }).then(async res => {
      return res.json()
    })
      .then(data => {
        const rpta = data.data[0]

        dispatch(SetConversacionSeleccionadaHome(rpta.id))
        localStorage.setItem("conversacion_embedded", rpta.identificador)
        id_conversacion = rpta.identificador

      }).catch((error) => {
        console.log(error)
      });
  }
  let mensaje_bot = "";
  const resultado = await fetchWithIP('chatbots/' + tokenChatSeleccionado + '/conversaciones/' + id_conversacion + '/mensajes/identificador', {
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
  console.log(resultado, "mesanej enviado")
  return mensaje_bot;
}



export const GetConversationEmbeddedReducer = (
  token: string,
  save_conversation_redux = true
): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  console.log("OBTENER DATOS ---------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>-")
  const conversacionSeleccionada = localStorage.getItem("conversacion_embedded")
  let chat_converation: any = [];
  if (token && conversacionSeleccionada) {
    await fetchWithIP('chatbots/' + token + '/conversaciones/' + conversacionSeleccionada + '/mensajes/identificador',
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
  //console.log(chat_converation , " 00000000-" , conversacionSeleccionada)
  return chat_converation;

}


export const GetConversationSupportReducer = (
  token: string,
  save_conversation_redux = true
): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  console.log("OBTENER DATOS ---------------- >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>- TTTTTYYY")
  const conversacionSeleccionada = localStorage.getItem("conversacion_support")
  let chat_converation: any = [];
  if (conversacionSeleccionada) {
    await fetchWithIP('chatbots/token123/conversaciones/' + conversacionSeleccionada + '/mensajes/identificador',
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
  //console.log(chat_converation , " 00000000-" , conversacionSeleccionada)
  return chat_converation;

}


