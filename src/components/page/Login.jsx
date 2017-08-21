/*
 * The Login component manages the login page, where users can input their emails
 * and password to be given authorized access to the app.
 */

import React from 'react';

import { connect } from 'react-redux';

import { attemptLogin } from '../../store/actions/account.js';

export class _Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isAuthenticating, isInError } = this.props;

    return (
      <div>
        <div action="">
          <label htmlFor="">Email</label>
          <input ref={ (input) => this.emailInput = input } type="text" />
          <label htmlFor="">Password</label>
          <input ref={ (input) => this.passwordInput = input } type="password" />
          <button onClick={ this.handleSignInBtnClick.bind(this) }>Sign in</button>
        </div>

        { isAuthenticating
          ? <div>Logging in...</div>
          : null
        }

        { isInError
          ? <div>The username or password provided do not exist</div>
          : null
        }
      </div>
    );
  }

  handleSignInBtnClick() {
    const { onSignInBtnClick } = this.props;
    onSignInBtnClick(this.emailInput.value, this.passwordInput.value);
    this.emailInput.value = "";
    this.passwordInput.value = "";
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticating: state.account.isAuthenticating,
    isInError: state.account.isInError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignInBtnClick: (name, password) => {
      dispatch(attemptLogin(name, password));
    }
  }
}

const Login = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_Login);

export default Login;
