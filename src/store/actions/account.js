export const LOGIN_INITIATED = 'LOGIN_INITIATED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const REGISTRARION_INITIATED = 'REGISTRARION_INITIATED';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRARION_FAILURE = 'REGISTRARION_FAILURE';

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
  return Object.assign({},{
    type: LOGIN_FAILURE},
    reasons
  );
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
      dispatch(loginFailure(error));
    });
  };
}

export function logout() {
  return {
    type: LOGOUT
  };
}

function registerInitiated() {
  return {
    type: REGISTRATION_INITIATED
  };
}

function registerSucces(response) {
  return {
    type: REGISTRATION_SUCCESS
  };
} 

function registerFailure(error) {
  return Object.assign({},{
    type: REGISTRATION_FAILURE
  }, error);
}

export function attemptRegistration(email, password, passwordConf) {
  return dispatch => {
    dispatch(loginInitiated());
    
    $.ajax('http://localhost:5000/api/v0/account', {
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        'data': {
          'type': 'account',
          'attributes': {
            email,
            password,
            passwordConf
          }
        }
      })
    }).done((response, status, xhr) => {
      dispatch(registrationSuccess(response));
    }).fail((xhr, status, error) => {
      dispatch(registrationFailure(error));
    });
  }
}
