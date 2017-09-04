import { INITIAL_STATE } from '../constants.js';
import {
  QUIZ_INITIATED,
  QUIZ_INITIATED_SUCCESS,
  QUIZ_INITIATED_FAILURE,
  RATE_FLASCHARD_REVIEW,
} from '../actions/quiz.js';

export default function account(state=INITIAL_STATE.quiz, action) {
  switch(action.type) {
    case QUIZ_INITIATED:
      return Object.assign({}, state, {
        isLoading: true,
      });
      break;
    case QUIZ_INITIATED_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        isInError: false,
        isReady: true,
        flashcards: action.flashcardsToShowInQuiz,
        currentFlashcardIndex: 0
      });
      break;
    case QUIZ_INITIATED_FAILURE:
      return Object.assign({}, state, {
        isLoading: false,
        isInError: true,
        isReady: false,
        flashcards: [],
        currentFlashcardIndex: -1
      });
      break;
    case RATE_FLASCHARD_REVIEW:
      let nextIndex = state.currentFlashcardIndex;
      let nextIsFinished = true;

      if (state.currentFlashcardIndex < state.flashcards.length - 1) {
        nextIndex++;
        nextIsFinished = false;
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
