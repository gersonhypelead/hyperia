// src/store/actions/userActions.ts
import config from '../../../config';
import { createAction } from '@reduxjs/toolkit';

export const CREATE_USER_REQUEST = createAction('CREATE_USER_REQUEST');
export const CREATE_USER_SUCCESS = createAction<any>('CREATE_USER_SUCCESS');
export const CREATE_USER_FAILURE = createAction<string>('CREATE_USER_FAILURE');

export const createUser = (userData: any) => async (dispatch: any) => {
  dispatch(CREATE_USER_REQUEST());

  try {
    const response = await fetch(`${config.API_URL}auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (response.ok) {
      dispatch(CREATE_USER_SUCCESS(data));
    } else {
      dispatch(CREATE_USER_FAILURE('Error al crear el usuario'));
    }
  } catch (error) {
    dispatch(CREATE_USER_FAILURE('Error de red al crear el usuario'));
  }
};