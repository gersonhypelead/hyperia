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
import fetchWithIP from '../../utils/fetchHeaders';

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
    const response = await fetchWithIP('usuarios/' + id_usuario + '/chatbots', { method: "GET" });
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
  await fetchWithIP('chatbots/' + localStorage.getItem("chat_seleccionado") + '/entrenamientos', { method: "GET" })
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

  await fetchWithIP('entrenamientos/' + trainID + '/mensajes', { method: "GET" }
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
  console.log("===============================================================&&")

  await fetchWithIP('chatbots/' + localStorage.getItem("chat_seleccionado") + '/entrenamientos/pregunta',
    {
      method: 'POST',
    },
    {
      descripcion: typeCase
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