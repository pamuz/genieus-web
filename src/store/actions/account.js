export const LOGIN_INITIATED = 'LOGIN_INITIATED';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const REGISTRATION_INITIATED = 'REGISTRATION_INITIATED';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';

function loginInitiated() {
  return {
    type: LOGIN_INITIATED
  };
}

function loginSuccess(userObj) {
  return Object.assign({}, {
    type: LOGIN_SUCCESS
  }, userObj.data.attributes);
}

function loginSuccessNA(){
  return {
    type: LOGIN_SUCCESS
  };
}

function loginFailure(reasons) {
  return Object.assign({},{
    type: LOGIN_FAILURE},
    reasons
  );
}

function loginFailureNA() {
  return {
    type: LOGIN_FAILURE
  };
}

export function attemptLogin(email, password) {
  return dispatch => {
    dispatch(loginInitiated());

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

export function attemptLoginNA(email, password){
  return dispatch => {
    dispatch(loginInitiated());
    console.log(typeof(email) + " : " + typeof(password))
    if(email === "success" && password === "success"){
      console.log("WHAT?")
      dispatch(loginSuccessNA());
    }else{
      dispatch(loginFailureNA());
    }
  }
}
export function logout() {
  return {
    type: LOGOUT
  };
}

function registrationInitiated() {
  return {
    type: REGISTRATION_INITIATED
  };
}

function registrationSuccess(response) {
  return {
    type: REGISTRATION_SUCCESS
  };
} 

function registrationFailure(error) {
  return Object.assign({},{
    type: REGISTRATION_FAILURE
  }, error);
}

export function attemptRegistration(email, password, passwordConf) {
  return dispatch => {
    dispatch(registrationInitiated());
    
    $.ajax('http://localhost:5000/api/v0/account', {
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        'data': {
          'type': 'account',
          'attributes': {
            email,
            password,
            passwordConfirmation: passwordConf
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
