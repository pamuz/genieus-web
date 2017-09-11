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

import { connect } from 'react-redux';
import { Link } from '@curi/react';

import { logout } from '../../store/actions/account.js';

export class _Navbar extends React.Component {
  render() {
    const { isLoggedIn, onLogout, name } = this.props;

    return (
      <div>
        <Link to="Home">Home</Link>
        { isLoggedIn
          ? <a href="#" onClick={ this.handleLogout.bind(this) }>Logout</a>
          : <Link to="Login">Login</Link> }
        { isLoggedIn
          ? this.renderLoggedInOnlyLinks()
          : null }
        { isLoggedIn
          ? <a href="#">({ name }) My account</a>
          : null }
      </div>
    );
  }

  handleLogout(e) {
    const { onLogout } = this.props;
    e.preventDefault();
    onLogout();
  }

  renderLoggedInOnlyLinks() {
    return (
      <span>
        <Link to="Quiz">Take quiz</Link>
        <Link to="Collection">Collection</Link>
      </span>
    );
  }
}

const mapStateToProps = state => {
  return {
    name: state.account.data.name,
    isLoggedIn: state.account.isLoggedIn
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
