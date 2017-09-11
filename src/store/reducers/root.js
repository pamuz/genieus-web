import { combineReducers } from 'redux';
import account from './account.js';
import quiz from './quiz.js';
import collection from './collection.js';
import deckDetail from './deck-detail.js';

const rootReducer = combineReducers({
  account,
  quiz,
  collection,
  deckDetail
});

export default rootReducer;

