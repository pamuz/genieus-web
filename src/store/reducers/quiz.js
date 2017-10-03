import { INITIAL_STATE } from '../constants.js';
import { actionType } from '../actions/api.js';

export default function account(state=INITIAL_STATE.quiz, action) {
  switch(action.type) {

    case actionType('startRetrieveQuizFlashcards'):
      return Object.assign({}, state, {
        isLoading: true,
      });
      break;

    case actionType('doneRetrieveQuizFlashcards'):
      return Object.assign({}, state, {
        isLoading: false,
        isInError: false,
        isReady: true,
        flashcards: action.response.data,
        currentFlashcardIndex: 0
      });
      break;

    case actionType('failRetrieveQuizFlashcards'):
      return Object.assign({}, state, {
        isLoading: false,
        isInError: true,
        isReady: false,
        flashcards: [],
        currentFlashcardIndex: -1
      });
      break;

    case 'RATE_FLASHCARD_REVIEW':
      let nextIndex = state.currentFlashcardIndex;
      let nextIsFinished = true;

      if (state.currentFlashcardIndex < state.flashcards.length - 1) {
        nextIndex++;
        nextIsFinished = false;
      } else {
        console.log('getting out');
      }

      return Object.assign({}, state, {
        currentFlashcardIndex: nextIndex,
        isFinished: nextIsFinished
      });
      break;

    default:
      return state;
  }
}
