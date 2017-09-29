const INITIAL_STATE = {
  account: {
    isAuthenticating: false,
    isInRegisteringError: false,
    isInAuthenticateError: false,
    isLoggedIn: false,
    isRegistering: false,
    data: {
      // email: ...,
      // name: ...,
      // jwt: ...,
    },
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

export { INITIAL_STATE };
