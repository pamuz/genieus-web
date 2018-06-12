/*
 * The home component manages the homepage of the application.
 */

import _ from 'lodash';
import React from 'react';
import { action } from '../../store/actions/api.js';
import { connect } from 'react-redux';

const API_ACTIONS = [
  'attemptSendPasswordChangeEmail',
];

class _PasswordReset extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      passwordEmailSent: false
    };
  }

  render() {
    const { passwordEmailSent } = this.state;

    if (passwordEmailSent === false) {
      return (
        <div className="container">
          <div className="col-md-4">
          </div>
          <div className="col-md-4">
            <form onSubmit={ this.attemptPasswordChange.bind(this) }>
              <div className="form-group">
                <input ref={ input => this.accountEmailInput = input }
                       className="form-control" type="text"/>
                <label>Email</label>
              </div>
              <div className="form-group">
                <button className="btn btn-primary">Send password reset email</button>
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container text-center">
          Password reset email sent.
        </div>
      );
    }
  }

  attemptPasswordChange(event) {
    event.preventDefault();

    const $accountEmailInput = $(this.accountEmailInput);

    const email = $accountEmailInput.val();

    console.log(this.props);

    this.props.attemptSendPasswordChangeEmail(
      {
        payload: {
          email,
        }
      }, (error, result) => {
        if (error) return;
        this.setState({
          passwordEmailSent: true
        });
      }
    );
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

const PasswordReset = connect(
  mapStateToProps,
  mapDispatchToProps
)(_PasswordReset);

export default PasswordReset;
