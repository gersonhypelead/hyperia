import {
  GET_DATA_USER_AUTH,
  VALIDATE_USER_AUTH
} from "../../../constantes/auth/Auth";

interface UserState {
  rex_user_auth: {
    id: number;
    usuario: string;
    estado: boolean;
    email: string;
    planes?:  Array<{
      plan: string;
      planes_usuarios?: Array<{
        id: number;
        plan_id: number;
        fecha_inicio: string;
        fecha_fin: string;
        dias_restantes: number; // Nueva propiedad
        dias_transcurridos: number; // Nueva propiedad
        duracion_total: number; // Nueva propiedad
      }>;
    }>;
    personas?: {
      id: number;
      nombre: string;
      apellido_paterno: string;
      apellido_materno: string;
    };
    plan_id: number;
  } | null;
  rex_validate_user: boolean;
}

const INIT_STATE: UserState = {
  rex_user_auth: null,
  rex_validate_user: false
};

export default (state = INIT_STATE, action: any): UserState => {
  switch (action.type) {
    case GET_DATA_USER_AUTH: {
      return {
        ...state,
        rex_user_auth: action.payload,
      };
    }
    case VALIDATE_USER_AUTH: {
      return {
        ...state,
        rex_validate_user: action.payload
      };
    }
    default:
      return state;
  }
};
