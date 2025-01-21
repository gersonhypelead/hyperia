import { AppDispatch } from "../../store/store";
import config from "../../../config";
import {
    FETCH_PERMISOS_TIPO_USUARIO_REQUEST,
    FETCH_PERMISOS_TIPO_USUARIO_SUCCESS,
    FETCH_PERMISOS_TIPO_USUARIO_FAILURE,
    CREATE_UPDATE_PERMISOS_USUARIO_REQUEST,
    CREATE_UPDATE_PERMISOS_USUARIO_SUCCESS,
    CREATE_UPDATE_PERMISOS_USUARIO_FAILURE,
    CREATE_PERMISO_REQUEST,
    CREATE_PERMISO_SUCCESS,
    CREATE_PERMISO_FAILURE,
} from "../../../constantes/admin/permissions/PermisssionUser";
import fetchWithIP from "../utils/fetchHeaders";

interface CreatePermisosUsuario {
  permiso_id: number[];
  tipo_usuario_id: number;
}

interface CreatePermisoFormData {
  slug: string;
  ruta: string;
  descripcion: string;
  tipo_permiso_id: number;
}

export const FetchPermisosTipoUsuario = (userId: number) => async (dispatch: AppDispatch) => {
    dispatch({ type: FETCH_PERMISOS_TIPO_USUARIO_REQUEST });
  
    try {
      const response = await fetchWithIP(`permisos/permisos-tipos-usuario/${userId}` , { method:"GET"});
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      if (data.respuesta) {
        dispatch({
          type: FETCH_PERMISOS_TIPO_USUARIO_SUCCESS,
          payload: data.data,
        });
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
        const response = await fetchWithIP(`permisos/createPermisoTipoUsuario`, {
            method: 'POST'},
            create,
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.respuesta) {
            dispatch({
                type: CREATE_UPDATE_PERMISOS_USUARIO_SUCCESS,
                payload: data.data,
            });
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

export const CreatePermisoReducer = (formData: CreatePermisoFormData) => async (dispatch: AppDispatch) => {
  dispatch({ type: CREATE_PERMISO_REQUEST });

  try {
      const response = await fetchWithIP(`permisos/submit-form`, {
          method: 'POST'},
          formData,
      );

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.respuesta) {
          dispatch({
              type: CREATE_PERMISO_SUCCESS,
              payload: data.data[0],
          });
          return data.data[0]; 
      } else {
          dispatch({
              type: CREATE_PERMISO_FAILURE,
              error: data.mensaje || 'Error en la respuesta del servidor',
          });
          throw new Error(data.mensaje || 'Error en la respuesta del servidor');
      }
  } catch (error) {
      dispatch({
          type: CREATE_PERMISO_FAILURE,
          error: 'Error de red o en la solicitud',
      });
      throw error;
  }
};