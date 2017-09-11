import { INITIAL_STATE } from '../constants.js';
import {
  GET_DECK_DETAIL_INITIATED,
  GET_DECK_DETAIL_SUCCESS,
  GET_DECK_DETAIL_FAILURE,
  CREATE_FLASHCARD_INITIATED,
  CREATE_FLASHCARD_SUCCESS,
  CREATE_FLASHCARD_FAILURE,
  DELETE_FLASHCARD_INITIATED,
  DELETE_FLASHCARD_SUCCESS,
  DELETE_FLASHCARD_FAILURE,
  UPDATE_FLASHCARD_INITIATED,
  UPDATE_FLASHCARD_SUCCESS,
  UPDATE_FLASHCARD_FAILURE
} from '../actions/deck-detail.js';

export default function deckDetail(state=INITIAL_STATE.deckDetail, action) {
  let newFlashcards = undefined;

  switch(action.type) {
    case GET_DECK_DETAIL_INITIATED:
      return Object.assign({}, state, {
        isFetching: true
      });
      break;
    case GET_DECK_DETAIL_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isInError: false,
        deck: action.payload.data,
        flashcards: action.payload.data.include.data
      });
      break;
    case GET_DECK_DETAIL_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isInError: true,
        error: action.error
      });
      break;
    case CREATE_FLASHCARD_INITIATED:
      return Object.assign({}, state, {
        isFetching: true
      });
      break;
    case CREATE_FLASHCARD_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isInError: false,
        flashcards: state.flashcards.concat([action.payload.data])
      });
      break;
    case CREATE_FLASHCARD_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isInError: true,
        error: action.error
     });
      break;
    case DELETE_FLASHCARD_INITIATED:
      return Object.assign({}, state, {
        isFetching: true
      });
      break;
    case DELETE_FLASHCARD_SUCCESS:
      const deleteIndex = _.findIndex(state.flashcards, f => f.id === action.payload.id);
      newFlashcards = state.flashcards.concat();
      newFlashcards.splice(deleteIndex, 1);

      return Object.assign({}, state, {
        isFetching: false,
        isInError: false,
        flashcards: newFlashcards
      });
      break;
    case DELETE_FLASHCARD_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isInError: true,
        error: action.error
     });
      break;
    case UPDATE_FLASHCARD_INITIATED:
      return Object.assign({}, state, {
        isFetching: true
      });
      break;
    case UPDATE_FLASHCARD_SUCCESS:
      let flashcardIndex = _.findIndex(state.flashcards, f => f.id === action.payload.data.id);
      newFlashcards = state.flashcards.concat();
      newFlashcards[flashcardIndex] = action.payload.data;
      
      return Object.assign({}, state, {
        isFetching: false,
        isInError: false,
        flashcards: newFlashcards
      });
      break;
    case UPDATE_FLASHCARD_FAILURE:
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
