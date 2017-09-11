const INITIAL_STATE = {
  account: {
    isAuthenticating: false,
    isLogedIn: false,
    isInError: false,
    data: {
      // email: ...,
      // name: ...,
      // jwt: ...,
    },
  },
  quiz: {
    flashcards: [],
    currentFlashcardIndex: -1,
    isLoading: false,
    isReady: false,
    isInError: false,
    isFinished: false
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
  }
};

export { INITIAL_STATE };
