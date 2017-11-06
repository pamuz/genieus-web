import { INITIAL_STATE } from '../constants.js';
import { actionType } from '../actions/api.js';

export default function collection(state=INITIAL_STATE.community, action) {
  switch(action.type) {
    case actionType('startSearchPublicDecks'):
    case actionType('startGetPublicDecksOfAuthor'):
      return Object.assign({}, state, {
        isFetching: true,
        isInError: false
      });

    case actionType('doneSearchPublicDecks'):
    case actionType('doneGetPublicDecksOfAuthor'):
      return Object.assign({}, state, {
        isFetching: false,
        isInError: false,
        decks: action.response.data
      });

    case actionType('failSearchPublicDecks'):
    case actionType('failGetPublicDecksOfAuthor'):
      return Object.assing({}, state, {
        isFetching: false,
        isInError: true,
        error: action.response.error
      });

    default:
      return state;
  }
}
