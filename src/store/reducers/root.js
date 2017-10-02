import { combineReducers } from 'redux';
import session from './session.js';
import quiz from './quiz.js';
import collection from './collection.js';
import deckDetail from './deck-detail.js';

const rootReducer = combineReducers({
  session,
  quiz,
  collection,
  deckDetail
});

export default rootReducer;

