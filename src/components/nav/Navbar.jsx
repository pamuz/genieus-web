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
import ModalSignUp from '../modal/ModalRegister.jsx'

import { connect } from 'react-redux';
import { Link } from '@curi/react';

import { logout } from '../../store/actions/account.js';

export class _Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginModalShown: false,
      registerModalShown: false
    };
  }

  render() {
    const { isLoggedIn, onLogout, name } = this.props;
    const {
      loginModalShown,
      registerModalShown
    } = this.state;

    return (
      <nav className="navbar navbar-expand-sm navbar-light container">
        <Link className="navbar-brand" to="Home">Genieus</Link>
        <nav className="navbar-nav ml-auto">
          {isLoggedIn
            ? <a className="nav-link" href="#" onClick={this.handleLogout.bind(this)}>Logout</a>
            : <button className="btn mr-3"
                      onClick={ () => { this.setState({ loginModalShown: true }) } }
                      style={ loginBtnStyle }
                      type="button">
                      Log In
            </button>}
          { this.renderTakeQuizLink()}
          { this.renderCollectionLink()}
          {isLoggedIn
            ? <a className="nav-link" href="#">({name}) My account</a>
            : <button className="btn"
                      onClick={ () => this.setState({ registerModalShown: true }) }
                      style={ signUpBtnStyle }
                      type="button">
                      Sign Up
              </button>
          }
        </nav> 

        <ModalSignUp show={ registerModalShown }
                     onHide={ () => this.setState({ registerModalShown: false }) }/>
        <ModalLogIn show={ loginModalShown }
                    onHide={ () => this.setState({ loginModalShown: false }) }/>
      </nav>
    );
  }

  /* Handlers */

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
  backgroundColor: "#AB2EE6",
  color: 'white'
}

const signUpBtnStyle = {
  color: "#AB2EE6",
  backgroundColor: "white",
  border: "1.4px solid #AB2EE6"
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.session.isLoggedIn,
    isAuthenticating: state.session.isAuthenticating,
    isInError: state.session.isInError
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
