export const LOGIN_INITIATED = 'LOGIN_INITIATED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

function loginInitiated() {
  return {
    type: LOGIN_INITIATED
  };
}

function loginSuccess(userObj) {
  return Object.assign({}, {
    type: LOGIN_SUCCESS
  }, userObj.data);
}

function loginFailure(reasons) {
  return {
    type: LOGIN_FAILURE,
    reasons
  };
}

export function attemptLogin(email, password) {
  return dispatch => {
    dispatch({
      type: LOGIN_INITIATED
    });

    $.ajax('http://localhost:5000/api/v0/account/authenticate', {
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        'data': {
          'type': 'account',
          'attributes': {
            email,
            password
          }
        }
      })
    }).done((response, status, xhr) => {
      dispatch(loginSuccess(response));
    }).fail((xhr, status, error) => {
      dispatch(loginFailure(error.message));
    });
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}
