import { INITIAL_STATE } from '../constants.js';
import { actionType } from '../actions/account.js';

export default function account(state=INITIAL_STATE.session, action) {
  switch(action.type) {
    case actionType('startCreateSession'):
      return Object.assign({}, state, {
        isLoggingIn: true,
        isAuthenticating: true,
      });
      break;

    case actionType('doneCreateSession'):
      return Object.assign({}, state, {
        isAuthenticating: false,
        isInError: false,
        isLoggedIn: true,
        isLoggingIn: false,
        isRegistering: false,
        data: {
          email: action.email,
          name: action.name,
          jwt: action.jwt,
        },
      });
      break;

    case actionType('failCreateSession'):
      return Object.assign({}, state, {
        isAuthenticating: false,
        isInError: true,
        isLoggedIn: false,
        data: {},
      });
      break;

    case 'LOGOUT':
      return Object.assign({}, state, {
        isAuthenticating: false,
        isInError: false,
        isLoggedIn: false,
        data: {},
      });
      break;

    case actionType('startCreateAccount'):
      return Object.assign({}, state, {
        isRegistering: true,
      });
      break;

    case actionType('doneCreateAccount'):
      return Object.assign({}, state, {
        isRegistering: false,
      });

    case actionType('failCreateAccount'):
      return Object.assign({}, state, {
        isRegistering: false,
        isInRegistrationFailure: true
      });

    default:
      return state;
  }
}
