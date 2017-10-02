import React from 'react';

import { connect } from 'react-redux';

import Modal from '../reusable/Modal.jsx';
import Button from '../reusable/Button.jsx';
import SmartForm from '../reusable/SmartForm.jsx';
import { action } from '../../store/actions/api.js';

const STATE_TO_PROPS_KEYS = [ 'isAuthenticating', 'isLoggedIn', 'error',
                              'attemptCreateSession', 'isInRegisteringError', 'attemptCreateAccount', 'isRegistering'];

class _ModalLogIn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      handleRegistrationBtnClick,
      isRegistering,
      isInRegisteringError
    } = this.props;

    return (
      <Modal ref={ modal => this.modal = modal }
             { ..._.omit(this.props, STATE_TO_PROPS_KEYS) }>
        <Modal.Header>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SmartForm ref={ form => this.registerForm = form }
                     spec={[
                       { 'name': 'email',
                         'label': 'Email',
                         'type': 'text',
                         'placeholder': '@itesm.mx' },
                       { 'name': 'password',
                         'label': 'Password',
                         'type': 'password' },
                       { 'name': 'passwordConfirmation',
                         'label': 'Password Confirmation',
                         'type': 'password' }
                     ]} />
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary"
                  onClick={ this.handleRegisterBtnClick.bind(this) }>Register</Button>
          <Button bsStyle="default">Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  handleRegisterBtnClick(e) {
    const options = {};

    const attributes = _.pick(this.registerForm.getValues(), ['email', 'password']);

    options.payload = {
      'data': {
        'type': 'account',
        attributes
      }
    };

    this.props.attemptCreateAccount(options);
  }

  show() {
    this.modal.show();
  }
}

function mapStateToProps(state) {
  return {
    isRegistering: state.session.isRegistering,
    isInRegisteringError: state.session.isInRegisteringError
  };
}

function mapDispatchToProps(dispatch) {
  return {
    attemptCreateAccount: (options) => {
      dispatch(action('attemptCreateAccount')(options));
    }
  };
}

const ModalLogIn = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_ModalLogIn);

export default ModalLogIn;
