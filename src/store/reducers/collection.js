import { INITIAL_STATE } from '../constants.js';
import { actionType } from '../actions/api.js';

export default function collection(state=INITIAL_STATE.collection, action) {
  switch(action.type) {
    case actionType('startListDecks'):
      return Object.assign({}, state, {
        isFetching: true,
        isInError: false
      });

    case actionType('doneListDecks'):
      return Object.assign({}, state, {
        isFetching: false,
        isInError: false,
        decks: action.response.data
      });

    case actionType('failListDecks'):
      return Object.assing({}, state, {
        isFetching: false,
        isInError: true,
        error: action.response.error
      });

    case actionType('doneCreateDeck'):
      return Object.assign({}, state, {
        decks: state.decks.concat([action.response.data])
      });

    case actionType('failCreateDeck'):
      return Object.assign({}, state, {
        isInError: true
      });

    case actionType('doneDeleteDeck'):
      const deckId = action.response.data.id;
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
