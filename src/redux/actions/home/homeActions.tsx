import config from '../../../config';
import fetchWithIP from '../utils/fetchHeaders';

export const SUBMIT_FORM_DATA = 'SUBMIT_FORM_DATA';

export const submitFormData = (formData: any) => ({
  type: SUBMIT_FORM_DATA,
  payload: formData,
});

export const sendFormDataToEndpoint = (formData: any) => {
  return async (dispatch: any) => {
    try {

      const nuevo = {
        nombre: formData.chatName,
        descripcion: formData.chatbotDescription,
        mensajeInicial: formData.welcomeMessage,
        retrasoRespuesta: parseInt(formData.retrasoRespuesta, 10),
        animacionEscribir: formData.typingAnimation,
        comportamiento: formData.comportamiento,
        horarioActividad: formData.horarioActividad,
      }

      const id_usuario = localStorage.getItem('id_usuario');

      const response = await fetchWithIP('usuarios/' + id_usuario + '/chatbots', {
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
