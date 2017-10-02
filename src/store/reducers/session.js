import { INITIAL_STATE } from '../constants.js';
import { actionType } from '../actions/api.js';

const initialState = Object.assign({}, INITIAL_STATE.session);
const previousSessionData = window.localStorage.getItem('sessionData');

if (previousSessionData !== null) {
  initialState.isLoggedIn = true;
  initialState.data = JSON.parse(previousSessionData);
}

export default function session(state=initialState, action) {
  switch(action.type) {

    case actionType('startCreateSession'):
      return Object.assign({}, state, {
        isAuthenticating: true,
      });
      break;

    case actionType('doneCreateSession'):
      const sessionAttributes = action.response.data.attributes;
      console.log(sessionAttributes);

      window.localStorage.setItem('sessionData', JSON.stringify(sessionAttributes));

      return Object.assign({}, state, {
        isAuthenticating: false,
        isInError: false,
        isLoggedIn: true,
        data: sessionAttributes,
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
      window.localStorage.removeItem('sessionData');

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
