import createSagaMiddleware from "redux-saga";
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { thunk } from 'redux-thunk'; // Importación corregida
import createRootReducer from '../reducers';

const createBrowserHistory = require('history').createBrowserHistory;
export const history = createBrowserHistory();
const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const middlewares = [thunk, sagaMiddleware, routeMiddleware];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(
    createRootReducer(history),
    composeEnhancers(
      applyMiddleware(
        routeMiddleware, // for dispatching history actions
        ...middlewares
      ),
    )
  );
  return store;
}
