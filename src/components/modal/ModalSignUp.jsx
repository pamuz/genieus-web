import React from 'react';

import { connect } from 'react-redux';

import { attemptRegistration} from '../../store/actions/account.js';

class _ModalLogIn extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { handleRegistrationBtnClick, isRegistering, isInRegisteringError } = this.props;
        return (
            <div className="modal fade show"
                id={this.props.id}
                tabIndex="-1"
                role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel"> Log In</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div> {/*Modal Header*/}
                        <div className="modal-body">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <form className="col-sm-6">
                                        <div className="form-group mt-3">
                                            <label htmlFor="emailInput">Email</label>
                                            <input className="form-control"
                                                id="emailInput"
                                                placeholder="@itesm.mx"
                                                ref={(input) => this.emailInput = input}
                                                type="text" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="passwordInput">
                                                Password
                                            </label>
                                            <input className="form-control"
                                                id="passwordInput"
                                                ref={(input) => this.passwordInput = input}
                                                type="text" />
                                            </div>
                                        <div className="form-group">
                                            <label htmlFor="confirmPassInput">
                                                Confirm Password
                                            </label>
                                            <input className="form-control"
                                                id="confirmPassInput"
                                                ref={(input) => this.confirmPassInput = input}
                                                type="text" />
                                            <div className="invalid-feedback">
                                                The passwords don't match
                                            </div>
                                        </div>
                                    </form>
                                </div>{/*Row*/}
                            </div> {/*Container*/}
                        </div> {/*Modal Body*/}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button className="btn btn-primary"
                                onClick={this.onRegisterClick.bind(this)}>
                                Sign Up!
                            </button>
                        </div> {/*Modal Footer*/}
                    </div> {/*Modal Content*/}
                </div>{/*Modal Dialog*/}
            </div>
        );
    }

    onRegisterClick(e) {
        const { handleRegistrationBtnClick } = this.props;
        e.preventDefault();
        handleRegistrationBtnClick(this.emailInput.value,
            this.passwordInput.value,
            this.confirmPassInput.value);
    }
}

function mapStateToProps(state) {
    return {
        isRegistering: state.account.isRegistering,
        isInRegisteringError: state.account.isInRegisteringError
    };
}

function mapDispatchToProps(dispatch) {
    return {
        handleRegistrationBtnClick: (email, password, passwordConf) => {
            dispatch(attemptRegistration(email, password, passwordConf));
        }
    };
}

const ModalLogIn = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_ModalLogIn);

export default ModalLogIn;