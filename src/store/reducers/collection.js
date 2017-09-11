import { INITIAL_STATE } from '../constants.js';
import {
  GET_ALL_DECKS_INITIATED,
  GET_ALL_DECKS_SUCCESS,
  GET_ALL_DECKS_FAILURE,
  CREATE_DECK_INITIATED,
  CREATE_DECK_SUCCESS,
  CREATE_DECK_FAILURE,
  DELETE_DECK_INITIATED,
  DELETE_DECK_SUCCESS,
  DELETE_DECK_FAILURE,
} from '../actions/collection.js';

export default function collection(state=INITIAL_STATE.collection, action) {
  switch(action.type) {
    case GET_ALL_DECKS_INITIATED:
      return Object.assign({}, state, {
        isFetching: true,
        isInError: false
      });
    case GET_ALL_DECKS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isInError: false,
        decks: action.payload
      });
    case GET_ALL_DECKS_FAILURE:
      return Object.assing({}, state, {
        isFetching: false,
        isInError: true,
        error: error
      });
    case CREATE_DECK_SUCCESS:
      return Object.assign({}, state, {
        decks: state.decks.concat([action.payload])
      });
    case CREATE_DECK_FAILURE:
      return Object.assign({}, state, {
        isInError: true
      });
    case DELETE_DECK_SUCCESS:
      const deckId = action.payload;
      const deletedDeckIndex = _.findIndex(state.decks, deck => deck.id == deckId);
      const newDecks = state.decks.concat();
      newDecks.splice(deletedDeckIndex, 1);

      return Object.assign({}, state, {
        decks: newDecks
      });
    default:
      return state;
  }
}
