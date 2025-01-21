import {
  VALIDATE_CODE_REQUEST,
  VALIDATE_CODE_SUCCESS,
  VALIDATE_CODE_FAILURE,
  RESEND_CODE_REQUEST,
  RESEND_CODE_SUCCESS,
  RESEND_CODE_FAILURE,
} from '../../../constantes/auth/ValidateCode';

interface ValidateCodeState {
  isValidating: boolean;
  validationError: string | null;
  validationSuccess: boolean;
  isResending: boolean;  // Nuevo estado para manejar el reenvío de código
  resendError: string | null;  // Nuevo error para el reenvío de código
  resendSuccess: boolean;  // Nuevo estado de éxito para el reenvío de código
}

const INIT_STATE: ValidateCodeState = {
  isValidating: false,
  validationError: null,
  validationSuccess: false,
  isResending: false,  // Inicializamos el estado de reenvío
  resendError: null,  // Inicializamos el error de reenvío
  resendSuccess: false,  // Inicializamos el éxito de reenvío
};

export default (state = INIT_STATE, action: any): ValidateCodeState => {
  switch (action.type) {
    case VALIDATE_CODE_REQUEST:
      return {
        ...state,
        isValidating: true,
        validationError: null,
        validationSuccess: false,
      };
    case VALIDATE_CODE_SUCCESS:
      return {
        ...state,
        isValidating: false,
        validationSuccess: true,
        validationError: null,
      };
    case VALIDATE_CODE_FAILURE:
      return {
        ...state,
        isValidating: false,
        validationError: action.payload,
        validationSuccess: false,
      };

    // Nuevos casos para el reenvío de código
    case RESEND_CODE_REQUEST:
      return {
        ...state,
        isResending: true,
        resendError: null,
        resendSuccess: false,
      };
    case RESEND_CODE_SUCCESS:
      return {
        ...state,
        isResending: false,
        resendSuccess: true,
        resendError: null,
      };
    case RESEND_CODE_FAILURE:
      return {
        ...state,
        isResending: false,
        resendError: action.payload,
        resendSuccess: false,
      };
    default:
      return state;
  }
};
