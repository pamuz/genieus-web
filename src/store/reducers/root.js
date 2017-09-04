import { combineReducers } from 'redux';
import account from './account.js';
import quiz from './quiz.js';

const rootReducer = combineReducers({
  account,
  quiz
});

export default rootReducer;

