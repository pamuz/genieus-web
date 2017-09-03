import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/root.js';
import { INITIAL_STATE } from './constants.js'

const loggerMiddleware = createLogger();

let store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);


export function getJSONWebToken() {
  const storeState = store.getState();
  if (storeState.account.isLoggedIn) {
    return storeState.account.data.jwt;
  } else {
    return undefined;
  }
}

export { store };
