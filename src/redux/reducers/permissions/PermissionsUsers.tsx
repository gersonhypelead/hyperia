import { 
    FETCH_PERMISOS_TIPO_USUARIO_REQUEST,
    FETCH_PERMISOS_TIPO_USUARIO_SUCCESS,
    FETCH_PERMISOS_TIPO_USUARIO_FAILURE 
} from "../../../constantes/admin/permissions/PermisssionUser";

interface Permiso {
    id: number;
    permiso: string;
    seleccionado: boolean;
}

interface TipoPermiso {
    id: number;
    tipo_permiso: string;
    permisos: Permiso[];
}

interface PermisosTipoUsuarioState {
    loading: boolean;
    permisos: TipoPermiso[];
    error: string | null;
}

const initialState: PermisosTipoUsuarioState = {
    loading: false,
    permisos: [],
    error: null,
};

const PermisosTipoUsuario= (state = initialState, action: any): PermisosTipoUsuarioState => {
    switch (action.type) {
        case FETCH_PERMISOS_TIPO_USUARIO_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_PERMISOS_TIPO_USUARIO_SUCCESS:
            return {
                ...state,
                loading: false,
                permisos: action.payload,
            };
        case FETCH_PERMISOS_TIPO_USUARIO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export default PermisosTipoUsuario;
