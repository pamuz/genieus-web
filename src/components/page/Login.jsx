/*
 * The Login component manages the login page, where users can input their emails
 * and password to be given authorized access to the app.
 */

import React from 'react';

import { connect } from 'react-redux';

import { attemptLoginNA } from '../../store/actions/account.js';

export class _Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isAuthenticating, isInError } = this.props;

    return (
      <div className="container">  
        <div className="row justify-content-center">
          <form className="col-sm-6"
                style={logInFormStyle}>
            <div className="form-group mt-3">
              <label htmlFor="emailInput">Email</label>
              <input className="form-control"
                id="emailInput"
                placeholder="@itesm.mx"
                ref={(input) => this.emailInput = input}
                type="text"
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordInput">Password</label>
              <input className="form-control"
                id="passwordInput"
                placeholder="Password"
                ref={(input) => this.passwordInput = input}
                type="password" id="passwordInput" />
            </div>
            <button className="btn btn-primary mb-3"
              onClick={ this.handleSignInBtnClick.bind(this) }
              type="submit">
              Sign in!
            </button>
            {isAuthenticating
              ? <div>Logging in...</div>
              : null
            }
            {isInError
              ? <div>The username or password provided do not exist</div>
              : null
            }
          </form>
        </div>
      </div>
    );
  }

  handleSignInBtnClick(e) {
    e.preventDefault();
    { console.log("email: " + this.emailInput.value +
                  "password: "+ this.passwordInput.value )}
    const { onSignInBtnClick } = this.props;
    onSignInBtnClick(this.emailInput.value, this.passwordInput.value);
    this.emailInput.value = "";
    this.passwordInput.value = "";
    
  }
}

/* Styles */
const logInFormStyle = { // This might be a global class
  border: '2px solid #ededed',
  borderRadius: '10px'
}

/* Functions */
const mapStateToProps = state => {
  return {
    isAuthenticating: state.account.isAuthenticating,
    isInError: state.account.isInError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignInBtnClick: (name, password) => {
      dispatch(attemptLoginNA(name, password));
    }
  }
}

const Login = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Login);

export default Login;
