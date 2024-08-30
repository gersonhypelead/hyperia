import { AppDispatch } from "../../store/store";
import config from "../../../config";
import {
    FETCH_PERMISOS_TIPO_USUARIO_REQUEST,
    FETCH_PERMISOS_TIPO_USUARIO_SUCCESS,
    FETCH_PERMISOS_TIPO_USUARIO_FAILURE,
    CREATE_UPDATE_PERMISOS_USUARIO_REQUEST,
    CREATE_UPDATE_PERMISOS_USUARIO_SUCCESS,
    CREATE_UPDATE_PERMISOS_USUARIO_FAILURE,
} from "../../../constantes/admin/permissions/PermisssionUser";

interface CreatePermisosUsuario {
  permiso_id: number[];
  tipo_usuario_id: number;
}

export const FetchPermisosTipoUsuario = (userId: number) => async (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_PERMISOS_TIPO_USUARIO_REQUEST });
  
    try {
      const response = await fetch(`${config.API_URL}permisos/permisos-tipos-usuario/${userId}`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.respuesta) {
        dispatch({
          type: FETCH_PERMISOS_TIPO_USUARIO_SUCCESS,
          payload: data.data,
        });
        console.log('Permisos obtenidos:', data.data);
      } else {
        dispatch({
          type: FETCH_PERMISOS_TIPO_USUARIO_FAILURE,
          error: 'Error en la respuesta del servidor',
        });
      }
    } catch (error) {
      dispatch({
        type: FETCH_PERMISOS_TIPO_USUARIO_FAILURE,
        error: 'Error de red o en la solicitud',
      });
    }
  };

  export const createOrUpdatePermisosUsuario = (create: CreatePermisosUsuario) => async (dispatch: AppDispatch) => {
    dispatch({ type: CREATE_UPDATE_PERMISOS_USUARIO_REQUEST });

    try {
        const response = await fetch(`${config.API_URL}permisos/createPermisoTipoUsuario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(create),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.respuesta) {
            dispatch({
                type: CREATE_UPDATE_PERMISOS_USUARIO_SUCCESS,
                payload: data.data,
            });
            console.log('Permisos actualizados:', data.data);
        } else {
            dispatch({
                type: CREATE_UPDATE_PERMISOS_USUARIO_FAILURE,
                error: 'Error en la respuesta del servidor',
            });
        }
    } catch (error) {
        dispatch({
            type: CREATE_UPDATE_PERMISOS_USUARIO_FAILURE,
            error: 'Error de red o en la solicitud',
        });
    }
};