import React from 'react';

import { connect } from 'react-redux';

import Modal from '../reusable/Modal.jsx';
import Button from '../reusable/Button.jsx';
import SmartForm from '../reusable/SmartForm.jsx';
import { FormInput } from '../reusable/Form.jsx';
import { action } from '../../store/actions/api.js';

const STATE_TO_PROPS_KEYS = [ 'isAuthenticating', 'isLoggedIn', 'error',
                              'attemptCreateSession', 'isInLoginingError',
                              'attemptCreateAccount', 'isLogining'];

class _ModalLogIn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      handleRegistrationBtnClick,
      isLogining,
      isInLoginingError
    } = this.props;

    return (
      <Modal ref={ modal => this.modal = modal }
             { ..._.omit(this.props, STATE_TO_PROPS_KEYS) }>
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SmartForm ref={ form => this.loginForm = form }
                     spec={[
                       { 'name': 'email',
                         'label': 'Email',
                         'type': 'text',
                         'placeholder': '@itesm.mx' },
                       { 'name': 'password',
                         'label': 'Password',
                         'type': 'password' }
                     ]} />
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary"
                  onClick={ this.handleLoginBtnClick.bind(this) }>Login</Button>
          <Button bsStyle="default">Cancel</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  handleLoginBtnClick(e) {
    const options = {};

    const attributes = this.loginForm.getValues();

    options.payload = {
      'data': {
        'type': 'account',
        attributes
      }
    };
    this.props.attemptCreateSession(options);
  }

  show() {
    this.modal.show();
  }
}

function mapStateToProps(state) {
  return {
    isLogining: state.session.isLogining,
    isInLoginingError: state.session.isInLoginingError
  };
}

function mapDispatchToProps(dispatch) {
  return {
    attemptCreateSession: (options) => {
      dispatch(action('attemptCreateSession')(options));
    }
  };
}

const ModalLogIn = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_ModalLogIn);

export default ModalLogIn;
