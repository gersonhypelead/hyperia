import {
  GET_DATA_USER_AUTH
} from "../../../constantes/auth/Auth";

interface UserState {
  rex_user_auth: {
    id: number,
    usuario: string,
    estado: boolean
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
        rex_user_auth: action.payload
      };
    }

    default:
      return state;
  }
}
