import { selectChatSeleccionado, selectTokenChatSeleccionado } from "../../reducers/selectors/selectors";
import { AppThunk } from "../../store/store";
import fetchWithIP from "../utils/fetchHeaders";

export const GetIntegrationWhatsAppReducer = (): AppThunk<
  Promise<any>
> => async (dispatch, getState) => {

  try {
    const chatSeleccionado = selectChatSeleccionado(getState());
    const tokenChatSeleccionado = selectTokenChatSeleccionado(getState());

    if (!tokenChatSeleccionado) {
      return {
        response: false
      }
    }

    const data = await fetchWithIP(`chatbots/${tokenChatSeleccionado}/integraciones/WHATSAPP`,
      { method: 'POST' }, {}).then(response => response.json());

    return {
      response: true,
      data: data
    }

  } catch (error) {
    console.error('Error al cargar los chatbots', error);

  }
};

export const SendTokenAppWhatsappReducer = (
  idIntegration: number,
  token: string
): AppThunk<
  Promise<any>
> => async (dispatch, getState) => {

  try {


    const chatSeleccionado =  selectChatSeleccionado(getState());
    const tokenChatSeleccionado = selectTokenChatSeleccionado(getState());

    if (!tokenChatSeleccionado) {
      return {
        response: false
      }
    }

    const data = await fetchWithIP(`chatbots/${tokenChatSeleccionado}/integraciones/${idIntegration}/token-acceso`,
      { method: 'PUT' }, {
        tokenAcceso: token
      }).then(response => response.json());

    
    // return {
    //   response: true,
    //   data: data
    // }

  } catch (error) {
    console.error('Error al cargar los chatbots', error);

  }
};