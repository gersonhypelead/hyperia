// src/redux/reducers/usuarios/tiposUsuariosReducer.ts
import { FETCH_TIPOS_USUARIOS_REQUEST,
  FETCH_TIPOS_USUARIOS_SUCCESS,
  FETCH_TIPOS_USUARIOS_FAILURE, } from "../../actions/tipo_usuarios/tiposUsuariosActions";

interface TiposUsuariosState {
  rex_loading: boolean;
  rex_tiposUsuarios: Array<{ id: number; tipo_usuario: string }>;
  rex_error: string | null;
}

const initialState: TiposUsuariosState = {
  rex_loading: false,
  rex_tiposUsuarios: [],
  rex_error: null,
};

const TiposUsuarios = (state = initialState, action: any): TiposUsuariosState => {
  switch (action.type) {
    case FETCH_TIPOS_USUARIOS_REQUEST:
      return { ...state, rex_loading: true };
    case FETCH_TIPOS_USUARIOS_SUCCESS:
      return { ...state, rex_loading: false, rex_tiposUsuarios: action.payload };
    case FETCH_TIPOS_USUARIOS_FAILURE:
      return { ...state, rex_loading: false, rex_error: action.error };
    default:
      return state;
  }
};

export default TiposUsuarios