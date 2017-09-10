import { INITIAL_STATE } from '../constants.js';
import {
  LOGIN_INITIATED,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  REGISTRATION_FAILURE,
  REGISTRATION_INITIATED,
  REGISTRATION_SUCCESS
} from '../actions/account.js';

export default function account(state=INITIAL_STATE.account, action) {
  switch(action.type) {
    case LOGIN_INITIATED:
      return Object.assign({}, state, {
        isAuthenticating: true,
      });
      break;
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isInError: false,
        isLoggedIn: true,
        data: {
          email: action.email,
          name: action.name,
          jwt: action.jwt,
        },
      });
      break;
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isInError: true,
        isLoggedIn: false,
        data: {},
      });
      break;
    case LOGOUT:
      return Object.assign({}, state, {
        isAuthenticating: false,
        isInError: false,
        isLoggedIn: false,
        data: {},
      });
      break;
    case REGISTRATION_INITIATED:
      return Object.assign({}, state, {
        isRegistering: true,
      });
      break;
    case REGISTRATION_SUCCESS:
      return Object.assign({}, state, {
        isRegistering: false,
      });
    case REGISTRATION_FAILURE:
      return Object.assign({}, state, {
        isRegistering: false,
        isInRegistrationFailure: true
      });
    default:
      return state;
  }
}
