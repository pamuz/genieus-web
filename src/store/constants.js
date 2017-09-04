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
  }
};

export { INITIAL_STATE };
