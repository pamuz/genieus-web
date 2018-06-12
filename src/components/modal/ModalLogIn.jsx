import React from 'react';

import { connect } from 'react-redux';

import Modal from '../reusable/Modal.jsx';
import Button from '../reusable/Button.jsx';
import SmartForm from '../reusable/SmartForm.jsx';
import { FormInput } from '../reusable/Form.jsx';
import { action } from '../../store/actions/api.js';
import { Link } from '@curi/react';

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

    return <Modal ref={modal => (this.modal = modal)} bsSize="small"
                  {..._.omit(this.props, STATE_TO_PROPS_KEYS)}>
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SmartForm ref={form => (this.loginForm = form)}
                     spec={[
                       {
                         name: "email",
                         label: "Email",
                         type: "text",
                         placeholder: "@itesm.mx"
                       },
                       {
                         name: "password",
                         label: "Password",
                         type: "password"
                       }]} />
          <Link to="PasswordReset">Forgot password?</Link>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.handleLoginBtnClick.bind(this)}>
            Login
          </Button>
          <Button bsStyle="danger">Cancel</Button>
        </Modal.Footer>
      </Modal>;
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

/* Styles */

/* const modalHeaderStyle = {
 *    backgroundColor: "#AB2EE6",
 *    color: 'white' 
 * }
 * 
 * const cancelBtnStyle = {
 *   color: "#AB2EE6",
 *   backgroundColor: "white",
 *   border: "1.4px solid #AB2EE6"
 * };*/


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
