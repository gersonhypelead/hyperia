import { configureStore } from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import createRootReducer from '../reducers/index';

export const history = createBrowserHistory();

const store = configureStore({
  reducer: createRootReducer(history),
  // El middleware thunk ya está incluido por defecto
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;