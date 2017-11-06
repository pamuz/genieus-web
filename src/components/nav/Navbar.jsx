/*
 * The Navbar component manages the navigation bar that appears on the top of the site.
 * This component is special as it does it's own thing, and appears regardless of
 * the route the user is currently at.
 *
 * The Navbar component is mainly concerned with the login status of the user, displaying
 * a number of different links if they have authenticated and other links if they
 * haven't.
 */

import _ from 'lodash';
import React from 'react';
import DOM from 'react-dom-factories';

import ModalLogIn from '../modal/ModalLogIn.jsx'
import ModalSignUp from '../modal/ModalRegister.jsx'

import { connect } from 'react-redux';
import { Link } from '@curi/react';

import { logout } from '../../store/actions/account.js';

const not = (callable) => {
  return () => {
    return !callable();
  }
}

export class _Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginModalShown: false,
      registerModalShown: false
    };

    this.NAVIGATION_ITEMS = [
      {
        wrapper: Link,
        text: "Collection",
        to: "Collection",
        icon: "fa fa-folder-open",
        isShown: this.userIsLoggedIn.bind(this),
      },
      {
        wrapper: Link,
        text: "Quizzes",
        to: "Quiz",
        icon: "fa fa-trophy",
        isShown: this.userIsLoggedIn.bind(this),
      },
      {
        wrapper: Link,
        text: "Community",
        to: "Community",
        icon: "fa fa-users",
        isShown: () => true, // always show
      },
      {
        wrapper: "a",
        text: "Logout",
        to: "Logout",
        icon: "fa fa-sign-out",
        onClick: this.handleLogout.bind(this),
        isShown: this.userIsLoggedIn.bind(this),
      },
      {
        wrapper: "a",
        text: "Login",
        to: "Login",
        icon: "fa fa-sign-in",
        onClick: () => { this.setState({ loginModalShown: true }) },
        isShown: not(this.userIsLoggedIn.bind(this)),
      },
      {
        wrapper: "a",
        text: "Register",
        to: "Register",
        icon: "fa fa-file",
        onClick: () => { this.setState({ registerModalShown: true }) },
        isShown: not(this.userIsLoggedIn.bind(this)),
      },
    ];

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isLoggingIn !== nextProps.isLoggingIn &&
        nextProps.isLoggingIn === false) {
      this.setState({
        loginModalShown: false
      });
    }

    if (this.props.isRegistering !== nextProps.isRegistering &&
        nextProps.isRegistering === false) {
      this.setState({
        registerModalShown: false
      });
    }
  }

  render() {
    const {
      registerModalShown,
      loginModalShown
    } = this.state;

    const {
      session
    } = this.props;

    return (
      <aside className="bg-primary aside-sm" id="nav">
        <section className="vbox">
          <ModalSignUp show={registerModalShown} onHide={() => this.setState({
              registerModalShown: false
          })} />
          <ModalLogIn show={loginModalShown} onHide={() => this.setState({
              loginModalShown: false
          })} />

      <header className="dker nav-bar nav-bar-fixed-top">
        <a className="btn btn-link visible-xs" data-toggle="class:nav-off-screen" data-target="#nav">
          <i className="fa fa-bars"></i>
        </a>
        <a href="#" className="nav-brand" data-toggle="fullscreen">Genieus</a>
        <a className="btn btn-link visible-xs" data-toggle="class:show" data-target=".nav-user">
          <i className="fa fa-comment-o"></i>
        </a>
      </header>
      <section className="bg-primary dker">
        <div className="bg-success nav-user hidden-xs pos-rlt">
          <div className="nav-avatar pos-rlt">
            <a href="#" className="thumb-sm avatar animated rollIn" data-toggle="dropdown">
              <img src="images/avatar.jpg" alt="" className=""/>
              <span className="caret caret-white"></span>&nbsp;
      { _.get(session, 'data.account.username', '') }
            </a>
            <ul className="dropdown-menu m-t-sm animated fadeInLeft">
              <span className="arrow top"></span>
              <li>
                <a href="#">Settings</a>
              </li>
              <li>
                <a href="profile.html">Profile</a>
              </li>
              <li>
                <a href="#">
                  <span className="badge bg-danger pull-right">3</span>
                  Notifications
                </a>
              </li>
              <li className="divider"></li>
              <li>
                <a href="docs.html">Help</a>
              </li>
              <li>
                <a href="signin.html">Logout</a>
              </li>
            </ul>
            <div className="visible-xs m-t m-b">
              <a href="#" className="h3">John.Smith</a>
              <p><i className="fa fa-map-marker"></i> London, UK</p>
            </div>
          </div>
          <div className="nav-msg">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              {/* <b className="badge badge-white count-n">2</b> */}
            </a>
            <section className="dropdown-menu m-l-sm pull-left animated fadeInRight">
              <div className="arrow left"></div>
              <section className="panel bg-white">
                <header className="panel-heading">
                  <strong>You have <span className="count-n">2</span> notifications</strong>
                </header>
                <div className="list-group">
                  <a href="#" className="media list-group-item">
                    <span className="pull-left thumb-sm">
                      <img src="images/avatar.jpg" alt="John said" className="img-circle"/>
                    </span>
                    <span className="media-body block m-b-none">
                      Use awesome animate.css<br/>
                      <small className="text-muted">28 Aug 13</small>
                    </span>
                  </a>
                  <a href="#" className="media list-group-item">
                    <span className="media-body block m-b-none">
                      1.0 initial released<br/>
                      <small className="text-muted">27 Aug 13</small>
                    </span>
                  </a>
                </div>
                <footer className="panel-footer text-sm">
                  <a href="#" className="pull-right"><i className="fa fa-cog"></i></a>
                  <a href="#">See all the notifications</a>
                </footer>
              </section>
            </section>
          </div>
        </div>


        <nav className="nav-primary hidden-xs">
          <ul className="nav dker">
            { this.renderNavigationItems() }
          </ul>
        </nav>
      </section>
      <footer className="footer bg-gradient dker hidden-xs">
        <a href="modal.lockme.html" data-toggle="ajaxModal" className="btn btn-sm btn-link m-r-n-xs pull-right">
          <i className="fa fa-power-off"></i>
        </a>
        <a href="#nav" data-toggle="class:nav-vertical" className="btn btn-sm btn-link m-l-n-sm">
          <i className="fa fa-bars"></i>
        </a>
      </footer>
        </section>
    </aside>
    );
  }

  /* Handlers */
  handleLogout(e) {
    this.props.onLogout();
  }

  userIsLoggedIn() {
    return this.props.session.isLoggedIn;
  }

  renderNavigationItems() {
    return this.NAVIGATION_ITEMS.map( (item, i) => {
      const Wrapper = item.wrapper;

      return (
        item.isShown() ?
        <li key={ i }>{/* has class=active */}
          <Wrapper to={ item.to } onClick={ item.onClick }>
            <i className={ item.icon }></i>
            <span>{ item.text }</span>
          </Wrapper>
        </li>
        : null
      );
    }
    );
  }
}

const mapStateToProps = state => {
  return _.pick(state, ['session']);
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
