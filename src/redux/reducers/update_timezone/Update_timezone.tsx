import {
    UPDATE_TIMEZONE_REQUEST,
    UPDATE_TIMEZONE_SUCCESS,
    UPDATE_TIMEZONE_FAILURE
  } from '../../../constantes/update_timezone/Update_timezone';
  
  const initialState = {
    rex_timezone: null,
    rex_loading: false,
    rex_error: null,
  };
  
  const updateTimezoneReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case UPDATE_TIMEZONE_REQUEST:
        return {
          ...state,
          rex_loading: true,
        };
      case UPDATE_TIMEZONE_SUCCESS:
        return {
          ...state,
          rex_loading: false,
          rex_timezone: action.payload.timezone,
        };
      case UPDATE_TIMEZONE_FAILURE:
        return {
          ...state,
          rex_loading: false,
          rex_error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default updateTimezoneReducer;
  