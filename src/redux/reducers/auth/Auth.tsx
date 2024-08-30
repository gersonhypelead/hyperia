import {
  GET_DATA_USER_AUTH
} from "../../../constantes/auth/Auth";

interface UserState {
  rex_user_auth: {
    id: number;
    usuario: string;
    estado: boolean;
    personas?: {
      id: number;
      nombre: string;
      apellido_paterno: string;
      apellido_materno: string;
    };
  };
}


const INIT_STATE: UserState = {
  rex_user_auth: {
    id: 0,
    usuario: "",
    estado: true
  },
  
};

export default (state = INIT_STATE, action: any): UserState => {
  switch (action.type) {
    case GET_DATA_USER_AUTH: {
      return {
        ...state,
        rex_user_auth: action.payload,
        
      };
    }

    default:
      return state;
  }
}
