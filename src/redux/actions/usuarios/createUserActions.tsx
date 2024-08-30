// src/store/actions/userActions.ts
import config from '../../../config';
import { createAction } from '@reduxjs/toolkit';
import fetchWithIP from '../utils/fetchHeaders';

export const CREATE_USER_REQUEST = createAction('CREATE_USER_REQUEST');
export const CREATE_USER_SUCCESS = createAction<any>('CREATE_USER_SUCCESS');
export const CREATE_USER_FAILURE = createAction<string>('CREATE_USER_FAILURE');

export const createUser = (userData: any) => async (dispatch: any) => {
  dispatch(CREATE_USER_REQUEST());

  try {
    const data = await fetchWithIP(`auth`, {
      method: 'POST'
    },
      userData,
    );
  if (data.ok) {
    console.log("nuevo")
    dispatch(CREATE_USER_SUCCESS(data));
  } else {
    dispatch(CREATE_USER_FAILURE('Error al crear el usuario'));
  }
} catch (error) {
  dispatch(CREATE_USER_FAILURE('Error de red al crear el usuario'));
}
};