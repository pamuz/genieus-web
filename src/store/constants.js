const INITIAL_STATE = {
  account: {
    isAuthenticating: false,
    isRegistering: false,
    isInRegisteringError: false,
    isLoggedIn: false,
    isInAuthenticateError: false,
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
