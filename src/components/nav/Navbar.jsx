/*
 * The Navbar component manages the navigation bar that appears on the top of the site.
 * This component is special as it does it's own thing, and appears regardless of
 * the route the user is currently at.
 *
 * The Navbar component is mainly concerned with the login status of the user, displaying
 * a number of different links if they have authenticated and other links if they
 * haven't.
 */

import React from 'react';
import ModalLogIn from '../modal/ModalLogIn.jsx'
import ModalSignUp from '../modal/ModalSignUp.jsx'

import { connect } from 'react-redux';
import { Link } from '@curi/react';

import { logout } from '../../store/actions/account.js';

export class _Navbar extends React.Component {

  render() {
    const { isLoggedIn, onLogout, name } = this.props;

    return (
      <nav className="navbar navbar-expand-sm navbar-light container">
        <Link className="navbar-brand" to="Home">Genieus</Link>
        <nav className="navbar-nav ml-auto">
          {isLoggedIn
            ? <a className="nav-link" href="#" onClick={this.handleLogout.bind(this)}>Logout</a>
            : <button className="btn btn-primary"
                      data-toggle="modal" 
                      data-target="#login"
                      style={ loginBtnStyle }
                      type="button">
                      Log In
            </button>}
          <ModalLogIn id="login" />
          { this.renderTakeQuizLink()}
          { this.renderCollectionLink()}
          {isLoggedIn
            ? <a className="nav-link" href="#">({name}) My account</a>
            : null}
          <button className="btn btn-light"
                  data-toggle="modal"
                  data-target="#signup"
                  style={signUpBtnStyle}
                  type="button">
                  Sign Up
          </button>
          <ModalSignUp id="signup" />
        </nav> 
      </nav>
    );
  }

  handleLogIn(e){
    e.preventDefault();
  } 

  handleLogout(e) {
    const { onLogout } = this.props;
    e.preventDefault();
    onLogout();
  }

  renderTakeQuizLink() {
    if (this.props.isLoggedIn) {
      return (
        <Link className="nav-link" to="Quiz">Take quiz</Link>
      );
    }
    return null;
  }

  renderCollectionLink() {
    if (this.props.isLoggedIn) {
      return (
        <Link className="nav-link" to="Collection">Collection</Link>
      );
    }
    return null;
  }
}

/* Styles */

const loginBtnStyle = {
  color: 'white'
}

const signUpBtnStyle = {
  color: '#007bff'
}

const mapStateToProps = state => {
  return {
    name: state.account.data.name,
    isLoggedIn: state.account.isLoggedIn,
    isAuthenticating: state.account.isAuthenticating,
    isInError: state.account.isInError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(logout())
  }
};

const Navbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Navbar);

export default Navbar;
