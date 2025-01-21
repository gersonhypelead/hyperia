import config from '../../../config';
import { selectChatSeleccionado, selectTokenChatSeleccionado } from '../../reducers/selectors/selectors';
import fetchWithIP from '../utils/fetchHeaders';

export const SUBMIT_FORM_DATA = 'SUBMIT_FORM_DATA';
export const UPDATE_FORM_DATA = 'UPDATE_FORM_DATA';

export const submitFormData = (formData: any) => ({
  type: SUBMIT_FORM_DATA,
  payload: formData,
});

export const updateFormData = (formData: any) => ({
  type: UPDATE_FORM_DATA,
  payload: formData,
});

export const sendFormDataToEndpoint = (formData: any) => {
  return async (dispatch: any, getState: any) => {

    const { rex_user_auth } = getState().auth;
    let id_usuario = 0;
    if (rex_user_auth) id_usuario = rex_user_auth.id;

    try {

      const chatbot = {
        nombre: formData.chatName,
        descripcion: formData.chatbotDescription,
        mensajeInicial: formData.welcomeMessage,
        retrasoRespuesta: parseInt(formData.retrasoRespuesta, 10),
        animacionEscribir: formData.typingAnimation,
        comportamiento: formData.comportamiento,
      }

      const horarios = [
        { dia: 'lunes', horario: formData.mondayHours },
        { dia: 'martes', horario: formData.tuesdayHours },
        { dia: 'miércoles', horario: formData.wednesdayHours },
        { dia: 'jueves', horario: formData.thursdayHours },
        { dia: 'viernes', horario: formData.fridayHours },
        { dia: 'sábado', horario: formData.saturdayHours },
        { dia: 'domingo', horario: formData.sundayHours },
      ].filter(h => h.horario);

      const nuevo = { chatbot, horarios };

      const response = await fetchWithIP('usuarios/chatbots', {
        method: 'POST',
      },
        nuevo,
      );

      if (response.ok) {
        const result = await response.json();
        return true;
      } else {
        return false;
      }

    } catch (error) {
      console.error('eror', error);
    }
  };
};


export const updateChatbotAndSchedules = (formData: any, chatbotId: number) => {
  return async (dispatch: any, getState: any) => {
    try {
      const chatSeleccionado = selectChatSeleccionado(getState());
      const tokenChatSeleccionado = selectTokenChatSeleccionado(getState());

      const id_chatbot = chatSeleccionado;

      const chatbot = {
        nombre: formData.chatName,
        descripcion: formData.chatbotDescription,
        mensajeInicial: formData.welcomeMessage,
        comportamiento: formData.comportamiento,

      };

      const horarios = [
        { dia: 'lunes', horario: formData.mondayHours, chatbotId: id_chatbot },
        { dia: 'martes', horario: formData.tuesdayHours, chatbotId: id_chatbot },
        { dia: 'miércoles', horario: formData.wednesdayHours, chatbotId: id_chatbot },
        { dia: 'jueves', horario: formData.thursdayHours, chatbotId: id_chatbot },
        { dia: 'viernes', horario: formData.fridayHours, chatbotId: id_chatbot },
        { dia: 'sábado', horario: formData.saturdayHours, chatbotId: id_chatbot },
        { dia: 'domingo', horario: formData.sundayHours, chatbotId: id_chatbot },
      ].filter(h => h.horario);

      const nuevo = {
        ...chatbot,  // Incluir los campos del chatbot
        horarios
      };

      const response = await fetchWithIP(`chatbot/${tokenChatSeleccionado}`, {
        method: 'PUT',
      }, nuevo);

      if (response.ok) {
        const result = await response.json();
        return true;
      } else {
        return false;
      }

    } catch (error) {
      console.error('Error updating chatbot and schedules:', error);
    }
  };
};

export const updateChatbotBehavior = (comportamiento: string, chatbotId: number) => {
  return async (dispatch: any, getState: any) => {
    try {
      const chatSeleccionado = selectChatSeleccionado(getState());
      const id_chatbot = chatSeleccionado || chatbotId;

      const body = {
        comportamiento: comportamiento,
      };

      const tokenChatSeleccionado = selectTokenChatSeleccionado(getState());

      const response = await fetchWithIP(`chatbot/${tokenChatSeleccionado}`, {
        method: 'PUT',
      }, body);

      if (response.ok) {
        const result = await response.json();
        return true;
      } else {
        return false;
      }

    } catch (error) {
      console.error('Error updating chatbot behavior:', error);
    }
  };
};
export const updateChatbotSeleccionadoHome = (chatbot_seleccionado: string) => {
  return async (dispatch: any) => {
    try {
      // Convertimos el valor de chatbot_seleccionado a número
      const select_chat = Number(chatbot_seleccionado);

      // Validación: verificamos si el valor es un número válido
      if (isNaN(select_chat)) {
        throw new Error('chatbot_seleccionado must be a valid number');
      }

      // Hacemos la solicitud PUT
      const response = await fetchWithIP(`auth`, {
        method: 'PUT'
      },
        { select_chat });
      if (response.ok) {
        const result = await response.json();
        return true;
      } else {
        console.error('Failed to update chatbot behavior:', response.statusText);
        return false;
      }

    } catch (error) {
      console.error('Error updating chatbot behavior:', error);
      return false;
    }
  };
};