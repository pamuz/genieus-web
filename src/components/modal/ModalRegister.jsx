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

    return <Modal ref={modal => (this.modal = modal)} {..._.omit(this.props, STATE_TO_PROPS_KEYS)}>
        <Modal.Header style={ modalHeaderStyle }>
          <Modal.Title>
            Register
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row justify-content-center">
            <div className="col-sm-8">
              <SmartForm ref={form => (this.registerForm = form)} spec={[{ name: "email", label: "Email", type: "text", placeholder: "@itesm.mx" }, { name: "password", label: "Password", type: "password" }, { name: "passwordConfirmation", label: "Password Confirmation", type: "password" }]} />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button style={ {backgroundColor: "#AB2EE6", color: 'white' } }  onClick={this.handleRegisterBtnClick.bind(this)}>
            Register
          </Button>
          <Button style={ cancelBtnStyle }>Cancel</Button>
        </Modal.Footer>
      </Modal>;
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

/* Styles */
const modalHeaderStyle = {
   backgroundColor: "#AB2EE6",
   color: 'white' 
}

const cancelBtnStyle = {
  color: "#AB2EE6",
  backgroundColor: "white",
  border: "1.4px solid #AB2EE6"
};

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