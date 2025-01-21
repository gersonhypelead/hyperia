import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../../../store/store';
import fetchWithIP from "../../utils/fetchHeaders";
import { DesingChatActionTypes, GET_DESING_CHAT_FAILURE, GET_DESING_CHAT_REQUEST, GET_DESING_CHAT_SUCCESS, UPDATE_DESING_CHAT_FAILURE, UPDATE_DESING_CHAT_REQUEST, UPDATE_DESING_CHAT_SUCCESS } from '../../../../constantes/chatBots/designChat/Design';
import { selectChatSeleccionado, selectTokenChatSeleccionado } from '../../../reducers/selectors/selectors';


export const updateDesingChatRequestReducer = (): DesingChatActionTypes => ({
  type: UPDATE_DESING_CHAT_REQUEST
});

export const updateDesingChatSuccessReducer = (): DesingChatActionTypes => ({
  type: UPDATE_DESING_CHAT_SUCCESS,
  /* payload: data */
});

export const updateDesingChatFailureReducer = (error: string): DesingChatActionTypes => ({
  type: UPDATE_DESING_CHAT_FAILURE,
  payload: error
});

/* GET-ONE */
export const getDesingChatRequestReducer = (): DesingChatActionTypes => ({
  type: GET_DESING_CHAT_REQUEST
});

export const getDesingChatSuccessReducer = (data: any): DesingChatActionTypes => ({
  type: GET_DESING_CHAT_SUCCESS,
  payload: data
});

export const getDesingChatFailureReducer = (error: string): DesingChatActionTypes => ({
  type: GET_DESING_CHAT_FAILURE,
  payload: error
});




export const UpdateDesingChatReducer = (
  objeto: any,
  iconoFile: File | null,
  logoFile: File | null
): ThunkAction<Promise<boolean>, RootState, unknown, Action<string>> => async (dispatch, getState) => {
  dispatch(updateDesingChatRequestReducer());
  try {
    const formData = new FormData();
    if (iconoFile !== null) formData.append('icono', iconoFile);
    if (logoFile !== null) formData.append('logo', logoFile);
    formData.append('tamanoLetra', objeto.fontSize);
    formData.append('fuente', objeto.fontFamily);
    formData.append('placeholder', objeto.inputPlaceholder);
    formData.append('colorCabecera', objeto.colorHeader);
    formData.append('colorTitulo', objeto.colorTitulo);
    formData.append('colorTextoEmisor', objeto.colorEmisor);
    formData.append('colorTextoReceptor', objeto.colorReceptor);
    formData.append('nombre', objeto.nombreChat);
    formData.append('estado', String(objeto.estado ? "true" : "false"));
    formData.append('colorEstado', objeto.colorEstado);

    const chatSeleccionado = selectChatSeleccionado(getState());

    const tokenChatSeleccionado = selectTokenChatSeleccionado(getState());

    const response = await fetchWithIP(
      'usuarios/chatbots/' + tokenChatSeleccionado + '/diseno',
      { method: "PUT" },
      formData
    );

    const data = await response.json();

    dispatch(updateDesingChatSuccessReducer());

    // Retorna true si `data` existe, indicando éxito
    return true;

  } catch (error) {
    dispatch(updateDesingChatFailureReducer("error al actualizar el diseño del chatbot"));
    // Retorna false en caso de error
    return false;
  }
};

export const GetOneDesingChatReducer = (token?: string):
  ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (dispatch, getState) => {
    dispatch(getDesingChatRequestReducer());
    const tokenChatSeleccionado = token ?? selectTokenChatSeleccionado(getState());
    if (!tokenChatSeleccionado) {
      return;
    }
    try {
      const result = await fetchWithIP(
        `usuarios/chatbots/${tokenChatSeleccionado}`,
        { method: "GET" }
      );

      const data = await result.json();
      dispatch(getDesingChatSuccessReducer(data));
    } catch (error) {
      console.error("Error al obtener el chatbot:", error);
      dispatch(getDesingChatFailureReducer("Error al obtener el chatbot"));
    }
  }



export const GetOneDesingChatSupportReducer = (token?: string):
  ThunkAction<Promise<void>, RootState, unknown, Action<string>> => async (dispatch, getState) => {
    dispatch(getDesingChatRequestReducer());
    /* const tokenChatSeleccionado = token ?? selectTokenChatSeleccionado(getState());
    if (!tokenChatSeleccionado) {
      return;
    } */
    try {
      const result = await fetchWithIP(
        `usuarios/chatbots/token123`,
        { method: "GET" }
      );

      const data = await result.json();
      console.log(data , "datos ..")
      dispatch(getDesingChatSuccessReducer(data));
    } catch (error) {
      console.error("Error al obtener el chatbot:", error);
      dispatch(getDesingChatFailureReducer("Error al obtener el chatbot"));
    }
  }