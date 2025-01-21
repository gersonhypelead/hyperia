import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import {
  FETCH_CHATBOTS_REQUEST,
  FETCH_CHATBOTS_SUCCESS,
  FETCH_CHATBOTS_FAILURE,
  ChatBotsActionTypes,
  FETCH_LIST_TRAINS,
  FETCH_TRAIN_CONVERSATION,
  DELETE_TRAIN_REQUEST,
  DELETE_TRAIN_SUCCESS,
  DELETE_TRAIN_FAILURE,
  EDIT_TRAIN_REQUEST,
  EDIT_TRAIN_SUCCESS,
  EDIT_TRAIN_FAILURE,
} from '../../../../../src/constantes/chatBots/Entrenar/ChatBots'; // Ajusta la ruta según corresponda
import config from '../../../../config';
import fetchWithIP from '../../utils/fetchHeaders';
import { selectChatSeleccionado, selectTokenChatSeleccionado } from '../../../reducers/selectors/selectors';

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

export const deleteTrainRequestReducer = (): ChatBotsActionTypes => ({
  type: DELETE_TRAIN_REQUEST,
});

export const deleteTrainSuccessReducer = (id: number): ChatBotsActionTypes => ({
  type: DELETE_TRAIN_SUCCESS,
  payload: id,
});

export const deleteTrainFailureReducer = (error: string): ChatBotsActionTypes => ({
  type: DELETE_TRAIN_FAILURE,
  payload: error,
});

export const editTrainRequestReducer = (): ChatBotsActionTypes => ({
  type: EDIT_TRAIN_REQUEST,
});

// Acción para el éxito en la edición
export const editTrainSuccessReducer = (id: number, nombre: string): ChatBotsActionTypes => ({
  type: EDIT_TRAIN_SUCCESS,
  payload: { id, nombre },
});

// Acción para un fallo en la edición
export const editTrainFailureReducer = (error: string): ChatBotsActionTypes => ({
  type: EDIT_TRAIN_FAILURE,
  payload: error,
});


export const GetDataChatBotsReducer = (): ThunkAction<Promise<void>,
  RootState,
  unknown,
  Action<string>> => async (dispatch, getState) => {

    const { rex_user_auth } = getState().auth;

    let id_usuario = 0;
    if (rex_user_auth) id_usuario = rex_user_auth.id;

    dispatch(fetchChatBotsRequestReducer());
    try {

      const response = await fetchWithIP('usuarios/chatbots',
        { method: "GET" });

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

  const chatSeleccionado = selectChatSeleccionado(getState());
  const tokenChatSeleccionado = selectTokenChatSeleccionado(getState());

  dispatch({
    type: FETCH_LIST_TRAINS,
    payload: []
  })
  await fetchWithIP('chatbots/' + tokenChatSeleccionado+ '/entrenamientos', { method: "GET" })
    .then(async res => {
      return res.json()
    })
    .then(data => {
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
  const chatSeleccionado = selectChatSeleccionado(getState());
  const tokenChatSeleccionado = selectTokenChatSeleccionado(getState());

  await fetchWithIP('chatbots/' + tokenChatSeleccionado + '/entrenamientos/pregunta',
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


    }).catch((error) => {
      console.log(error)
    });


}


export const DeleteTrainReducer = (
  trainId: number
): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (
  dispatch,
  getState
) => {
  const tokenChatSeleccionado = selectTokenChatSeleccionado(getState());

  dispatch(deleteTrainRequestReducer());

  try {
    const response = await fetchWithIP(
      `chatbots/${tokenChatSeleccionado}/entrenamientos/${trainId}`,
      { method: 'DELETE' }
    );

    if (!response.ok) {
      throw new Error('Failed to delete training');
    }

    dispatch(deleteTrainSuccessReducer(trainId));
  } catch (error) {
    dispatch(deleteTrainFailureReducer('Failed to delete training'));
  }
};

export const EditTrainReducer = (
  trainId: number,
  nuevoNombre: string
): ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (
  dispatch,
  getState
) => {
  const tokenChatSeleccionado = selectTokenChatSeleccionado(getState());

  dispatch(editTrainRequestReducer());

  try {
    const response = await fetchWithIP(
      `chatbots/${tokenChatSeleccionado}/entrenamientos/${trainId}`,
      {
        method: 'PATCH'},
        { nombre: nuevoNombre },
    );

    if (!response.ok) {
      throw new Error('Failed to update training name');
    }

    const data = await response.json();

    dispatch(editTrainSuccessReducer(trainId, data.descripcion)); // data.descripcion es el nuevo nombre del entrenamiento
  } catch (error) {
    dispatch(editTrainFailureReducer('Failed to update training name'));
  }
};