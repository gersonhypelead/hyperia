import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../store/store';
import {
  EDIT_VAR_MUNDO_HOME,
  GET_DATA_CHATSBOTS_HOME
} from '../../../constantes/Home/Home';
import config from '../../../config';
import fetchWithIP from '../utils/fetchHeaders';

// Acción asíncrona para obtener los datos de los chatbots
export const GetDataChatsBotsHomeReducer = (): ThunkAction<
  Promise<void>,
  RootState,
  unknown,
  Action<string>
> => async (dispatch: Dispatch) => {
  dispatch({ type: 'FETCH_CHATBOT_REQUEST' }); // Acción para iniciar la carga

  try {

    const id_usuario = localStorage.getItem('id_usuario');

    const data = await fetchWithIP('usuarios/' + id_usuario + '/chatbots', {method: 'GET'}).then(response => response.json())

    dispatch({
      type: 'FETCH_CHATBOT_SUCCESS',
      payload: data,
    });

  } catch (error) {
    console.error('Error al cargar los chatbots', error);
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
> => async (dispatch) => {
  try {
    const id_usuario = localStorage.getItem('id_usuario');
    const response = await fetchWithIP('usuarios/'+id_usuario+'/chatbots');
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

  const bots: any = getState().home.rex_chatsbots;
  bots[index]['select'] = true;

  dispatch({
    type: GET_DATA_CHATSBOTS_HOME,
    payload: bots
  });
}