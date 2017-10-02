const API_BASE = 'http://localhost:5000';

const INITIAL_STATE = {
  session: {
    isInRegisteringError: false,
    isRegistering: false,
    isAuthenticating: false,
    isLoggedIn: false,
    error: undefined,
    data: {
      // email
      // json_web_token
    }
  },

  collection: {
    decks: [],
    isFetching: false,
    isInError: false,
    error: {}
  },

  deckDetail: {
    deck: {},
    flashcards: [],
    isFetching: false,
    isInError: false,
    error: {}
  },

  quiz: {
    flashcards: [],
    currentFlashcardIndex: -1,
    isLoading: false,
    isReady: false,
    isInError: false,
    isFinished: false
  }
};

export {
  INITIAL_STATE,
  API_BASE
};
