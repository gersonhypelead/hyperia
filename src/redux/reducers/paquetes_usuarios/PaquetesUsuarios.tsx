import { 
    FETCH_PAQUETES_USUARIOS_REQUEST,
    FETCH_PAQUETES_USUARIOS_SUCCESS,
    FETCH_PAQUETES_USUARIOS_FAILURE
} from "../../../constantes/admin/users/Users";
  const initialState = {
    rex_paquetes_usuarios: [],
    rex_loading: false,
    rex_error: null,
  };
  
  const PaquetesUsuarios= (state = initialState, action: any) => {
    switch (action.type) {
      case FETCH_PAQUETES_USUARIOS_REQUEST:
        return {
          ...state,
          rex_loading: true,
        };
      case FETCH_PAQUETES_USUARIOS_SUCCESS:
        return {
          ...state,
          rex_loading: false,
          rex_paquetes_usuarios: action.payload.rex_paquetes_usuarios,
        };
      case FETCH_PAQUETES_USUARIOS_FAILURE:
        return {
          ...state,
          rex_loading: false,
          rex_error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default PaquetesUsuarios;