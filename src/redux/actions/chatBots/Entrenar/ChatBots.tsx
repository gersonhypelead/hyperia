import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import {
  FETCH_CHATBOTS_REQUEST,
  FETCH_CHATBOTS_SUCCESS,
  FETCH_CHATBOTS_FAILURE,
  ChatBotsActionTypes,
  FETCH_LIST_TRAINS,
  FETCH_TRAIN_CONVERSATION
} from '../../../../../src/constantes/chatBots/Entrenar/ChatBots'; // Ajusta la ruta según corresponda
import config from '../../../../config';

export const fetchChatBotsRequestReducer = (): ChatBotsActionTypes => ({
  type: FETCH_CHATBOTS_REQUEST
});

export const fetchChatBotsSuccessReducer = (data: any): ChatBotsActionTypes => ({
  type: FETCH_CHATBOTS_SUCCESS,
  payload: data
});

export const fetchChatBotsFailureReducer = (error: string): ChatBotsActionTypes => ({
  type: FETCH_CHATBOTS_FAILURE,
  payload: error
});

export const GetDataChatBotsReducer = (): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (dispatch) => {
  dispatch(fetchChatBotsRequestReducer());
  try {
    const id_usuario = localStorage.getItem('id_usuario');
    const response = await fetch(config.API_URL + 'usuarios/'+id_usuario+'/chatbots');
    const data = await response.json();
    dispatch(fetchChatBotsSuccessReducer(data));
  } catch (error) {
    dispatch(fetchChatBotsFailureReducer('Failed to fetch chatbots'));
  }
};

export const GetDataTrainsReducer = (

): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {
  dispatch({
    type: FETCH_LIST_TRAINS,
    payload: []
  })
  await fetch(config.API_URL +
    'chatbots/' + localStorage.getItem("chat_seleccionado") + '/entrenamientos',
    {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        // 'usutoken': localStorage.getItem("usutoken"),
      },
    }
  )
    .then(async res => {
      return res.json()
    })
    .then(data => {
      console.log(data);
      dispatch({
        type: FETCH_LIST_TRAINS,
        payload: data
      })

    }).catch((error) => {
      console.log(error)
    });
}

export const GetConversacionReducer = (
  trainID: number
): ThunkAction<
  Promise<any>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {

  let chat_converation: any = [];

  await fetch(config.API_URL +
    'entrenamientos/' + trainID + '/mensajes',
    {
      mode: 'cors',
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        // 'usutoken': localStorage.getItem("usutoken"),
      },
    }
  )
    .then(async res => {
      return res.json()
    })
    .then(data => {
      console.log(data);

      data.map((dat: any) => {
        chat_converation.push({
          "id": dat.id,
          "sender": dat.emisor == "LLM" ? "receptor" : "emisor",
          "text": dat.contenido,
          "date": "17/7/2024 12:26:33",
          "time": "17/7/2024 12:26:33"
        })
      })

      dispatch({
        type: FETCH_TRAIN_CONVERSATION,
        payload: data
      })



    }).catch((error) => {
      console.log(error)
    });

  return chat_converation;
}

export const AddCaseTrainReducer = (
  typeCase: string
): ThunkAction<
  Promise<any>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch, getState) => {

  await fetch(config.API_URL +
    'chatbots/' + localStorage.getItem("chat_seleccionado") + '/entrenamientos/pregunta',
    {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        // 'usutoken': localStorage.getItem("usutoken"),
      },
      body: JSON.stringify({
        "descripcion": typeCase
      })
    }
  )
    .then(async res => {
      return res.json()
    })
    .then(data => {
      console.log(data);


    }).catch((error) => {
      console.log(error)
    });


}