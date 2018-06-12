/*
 * The home component manages the homepage of the application.
 */

import _ from 'lodash';
import React from 'react';
import { action } from '../../store/actions/api.js';
import { connect } from 'react-redux';

const API_ACTIONS = [
  'attemptChangePassword',
];

class _PasswordChange extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordChangedSuccesfully: false
    };
  }

  render() {
    const { passwordChangedSuccesfully } = this.state;

    if (passwordChangedSuccesfully === false) {
      return (
        <div className="container">
          <div className="col-md-4">
          </div>
          <div className="col-md-4">
            <form onSubmit={ this.attemptPasswordChange.bind(this) }>
              <div className="form-group">
                <input ref={ input => this.newPasswordInput = input }
                       className="form-control" type="password"/>
                <label>New password</label>
                <input ref={ input => this.newPasswordConfirmationInput = input }
                       className="form-control" type="password"/>
                <label>Confirm new password</label>
              </div>
              <div className="form-group">
                <button className="btn btn-primary">Change Password</button>
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container text-center">
          Password changed succesfully
        </div>
      );
    }
  }

  attemptPasswordChange(event) {
    event.preventDefault();

    const $newPasswordInput = $(this.newPasswordInput);
    const $newPasswordConfirmationInput = $(this.newPasswordConfirmationInput);

    const newPassword = $newPasswordInput.val();
    const newPasswordConfirmation = $newPasswordConfirmationInput.val();

    if (newPassword !== newPasswordConfirmation) {
      alert('New passwords do not match');
      return;
    }

    const token = window.location.pathname.split("/")[2];

    this.props.attemptChangePassword({
      payload: {
        token,
        newPassword,
      }
    }, (error, result) => {
      console.log('wee');
      if (error) return;

      this.setState({
        passwordChangedSuccesfully: true
      });
    });
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  const mapper = {};

  API_ACTIONS.forEach( actionName => {
    mapper[actionName] = (options, callback) => {
      dispatch(action(actionName)(options, callback));
    }
  });

  return mapper;
};

const PasswordChange = connect(
  mapStateToProps,
  mapDispatchToProps
)(_PasswordChange);

export default PasswordChange;
