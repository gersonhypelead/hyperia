import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import {
  GET_CONVERSATION_TAB_CHAT,
  DELETE_MESSAGE_REQUEST,
  DELETE_MESSAGE_SUCCESS,
  DELETE_MESSAGE_FAILURE,
} from '../../../../constantes/chatBots/chat/Chat';
import config from '../../../../config';
import fetchWithIP from '../../utils/fetchHeaders';
import { BOT_SELECTED, GET_DATA_CHATSBOTS_HOME } from '../../../../constantes/Home/Home';
import { selectChatSeleccionado, selectConversacionSeleccionada, selectTokenChatSeleccionado } from '../../../reducers/selectors/selectors';
import { GetChatSeccionadoHome, SetConversacionSeleccionadaHome } from '../../home/Home';

export const SUBMIT_FORM_DATA_ENTRENAMIENTO = 'SUBMIT_FORM_DATA_ENTRENAMIENTO';

export const submitFormDataEntrenamiento = (formData: any) => ({
  type: SUBMIT_FORM_DATA_ENTRENAMIENTO,
  payload: formData,
});
export const CreateConversationReducer = (
  mensaje: string
): ThunkAction<
  Promise<string>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {

  const chatSeleccionado = selectChatSeleccionado(getState());
  const conversacionSeleccionada = selectConversacionSeleccionada(getState());
  const tokenChatSeleccionado = selectTokenChatSeleccionado(getState());

  let id_conversacion = conversacionSeleccionada;
  console.log("aqunh no de 111", tokenChatSeleccionado, "-----")
  if (id_conversacion == 0) {
    await fetchWithIP('chatbots/' + tokenChatSeleccionado + '/conversaciones', {
      method: 'POST',
    }).then(async res => {
      return res.json()
    })
      .then(data => {
        const rpta = data.data[0]

        dispatch(SetConversacionSeleccionadaHome(rpta.id))
        id_conversacion = rpta.id

      }).catch((error) => {
        console.log(error)
      });
  }

  let mensaje_bot = "";

  await fetchWithIP('chatbots/' + tokenChatSeleccionado + '/conversaciones/' + id_conversacion + '/mensajes', {
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
export const CreateConversationReducer2 = (
  mensaje: string
): ThunkAction<
  Promise<string>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  console.log("CONVERSACION-NORMAL ----- == ")

  const chatSeleccionado = selectChatSeleccionado(getState());
  const conversacionSeleccionada = selectConversacionSeleccionada(getState());
  const tokenChatSeleccionado = selectTokenChatSeleccionado(getState());

  let id_conversacion = conversacionSeleccionada;
  //console.log("aqunh no de 111 //////////$$$$$$$$$$$$$$$$$$$$$$$$$$$--->")
  if (id_conversacion == 0) {
    //await fetchWithIP('chatbots/' + tokenChatSeleccionado + '/conversaciones', {
    await fetchWithIP('chatbots/token123/conversaciones', {

      method: 'POST',
    }).then(async res => {
      return res.json()
    })
      .then(data => {
        const rpta = data.data[0]

        dispatch(SetConversacionSeleccionadaHome(rpta.id))
        id_conversacion = rpta.id

      }).catch((error) => {
        console.log(error)
      });
  }

  let mensaje_bot = "";
  await fetchWithIP('chatbots/token123/conversaciones/' + id_conversacion + '/mensajes', {
    //await fetchWithIP('chatbots/' + tokenChatSeleccionado + '/conversaciones/' + id_conversacion + '/mensajes', {
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

  const conversacionSeleccionada = selectConversacionSeleccionada(getState());
  const tokenChatSeleccionado = selectTokenChatSeleccionado(getState());

  let chat_converation: any = [];
  if (id_conversation === 0) id_conversation = conversacionSeleccionada

  const chatSeleccionado = selectChatSeleccionado(getState());
  if (id_conversation) {
    await fetchWithIP('chatbots/' + tokenChatSeleccionado + '/conversaciones/' + id_conversation + '/mensajes',
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

export const ResetBotSelectedReducer = (): ThunkAction<
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

  dispatch(GetChatSeccionadoHome("0"))

  dispatch({
    type: GET_DATA_CHATSBOTS_HOME,
    payload: updatedArray
  });

  dispatch({
    type: BOT_SELECTED,
    payload: null
  })

}


export const UploadTrainingData = (
  formData: FormData
): ThunkAction<Promise<boolean | void>, RootState, unknown, Action<string>> => async (
  dispatch,
  getState
) => {

    const tokenChatSeleccionado = selectTokenChatSeleccionado(getState());
    try {
      const id_chatbot = selectChatSeleccionado(getState());
      if (!id_chatbot) {
        console.error("ID de chatbot no encontrado en el estado");
        return;
      }
      const response = await fetchWithIP(`chatbots/${tokenChatSeleccionado}/entrenamientos/archivo`, {

        method: 'POST',

      }, formData);


      if (response.ok) {
        console.log("Archivo subido correctamente");
        return true;
      } else {
        console.error("Error al subir el archivo");
        return false;
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

// Actualizar mensajes de entrenamiento
export const UploadMessagesTrainReducer = (
  sender: string,
  idConversation: number,
  mensaje: string,
  idMessage: number,
): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {

  if (sender == "emisor") {
    sender = "USUARIO";
  } else {
    sender = "LLM";
  }

  const body = {
    "emisor": sender,
    "contenido": mensaje,
  }

  await fetchWithIP('entrenamientos/' + idConversation + '/mensajes/' + idMessage,
    {
      method: 'PUT',

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

export const DeleteMessageTrainReducer = (
  entrenamientoId: number,
  mensajeId: number
): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (
  dispatch,
  getState
) => {
  dispatch({ type: DELETE_MESSAGE_REQUEST }); // Notificar que se inició la petición

  const tokenChatSeleccionado = selectTokenChatSeleccionado(getState());

  try {
    // Realiza la solicitud DELETE
    const response = await fetchWithIP(
      `entrenamientos/${entrenamientoId}/mensajes/${mensajeId}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error('Error al eliminar el mensaje');
    }

    // Notificar éxito
    dispatch({
      type: DELETE_MESSAGE_SUCCESS,
      payload: mensajeId,
    });

    console.log(`Mensaje con ID ${mensajeId} eliminado correctamente.`);
  } catch (error) {
    console.error('Error al eliminar el mensaje:', error);

    // Notificar error
    dispatch({
      type: DELETE_MESSAGE_FAILURE,
      payload: 'No se pudo eliminar el mensaje',
    });
  }
};