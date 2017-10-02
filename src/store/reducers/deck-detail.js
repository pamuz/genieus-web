import { INITIAL_STATE } from '../constants.js';
import { actionType } from '../actions/api.js';

export default function deckDetail(state=INITIAL_STATE.deckDetail, action) {
  let newFlashcards = undefined;

  switch(action.type) {
    case actionType('startRetrieveDeck'):
      return Object.assign({}, state, {
        isFetching: true
      });
      break;

    case actionType('doneRetrieveDeck'):
      return Object.assign({}, state, {
        isFetching: false,
        isInError: false,
        deck: action.response.data,
        flashcards: _.get(action.response, 'relationships.flashcard.data', [])
      });
      break;

    case actionType('failRetrieveDeck'):
      return Object.assign({}, state, {
        isFetching: false,
        isInError: true,
        error: action.error
      });
      break;

    case actionType('startCreateFlashcard'):
      return Object.assign({}, state, {
        isFetching: true
      });
      break;

    case actionType('doneCreateFlashcard'):
      return Object.assign({}, state, {
        isFetching: false,
        isInError: false,
        flashcards: state.flashcards.concat([action.response.data])
      });
      break;

    case actionType('failCreateFlashcard'):
      return Object.assign({}, state, {
        isFetching: false,
        isInError: true,
        error: action.error
     });
      break;

    case actionType('startDeleteFlashcard'):
      return Object.assign({}, state, {
        isFetching: true
      });
      break;

    case actionType('doneDeleteFlashcard'):
      const deleteIndex = _.findIndex(state.flashcards, f => f.id === action.response.data.id);
      newFlashcards = state.flashcards.concat();
      newFlashcards.splice(deleteIndex, 1);

      return Object.assign({}, state, {
        isFetching: false,
        isInError: false,
        flashcards: newFlashcards
      });
      break;

    case actionType('failDeleteFlashcard'):
      return Object.assign({}, state, {
        isFetching: false,
        isInError: true,
        error: action.error
      });
      break;

    case actionType('startPatchFlashcard'):
      return Object.assign({}, state, {
        isFetching: true
      });
      break;

    case actionType('donePatchFlashcard'):
      let flashcardIndex = _.findIndex(state.flashcards, f => f.id === action.response.data.id);
      newFlashcards = state.flashcards.concat();
      newFlashcards[flashcardIndex] = action.response.data;
      
      return Object.assign({}, state, {
        isFetching: false,
        isInError: false,
        flashcards: newFlashcards
      });
      break;

    case actionType('failPatchFlashcard'):
      return Object.assign({}, state, {
        isFetching: false,
        isInError: true,
        error: action.error
     });
      break;

    default:
      return state;
  }
}
