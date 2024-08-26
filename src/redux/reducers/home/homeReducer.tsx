import { SUBMIT_FORM_DATA } from '../../actions/home/homeActions';

const initialState = {
  formData: {},
};

const homeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SUBMIT_FORM_DATA:
      return {
        ...state,
        formData: action.payload,
      };
    default:
      return state;
  }
};

export default homeReducer;



















