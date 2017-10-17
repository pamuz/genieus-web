import { combineReducers } from 'redux';
import session from './session.js';
import quiz from './quiz.js';
import collection from './collection.js';
import deckDetail from './deck-detail.js';
import INITIAL_STATE from '../constants.js';

const appReducer = combineReducers({
  session,
  quiz,
  collection,
  deckDetail
});

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = Object.assign({}, INITIAL_STATE);
    window.location = '/'; // Redirect home
  }

  return appReducer(state, action);
}

export default rootReducer;

