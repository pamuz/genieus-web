import React from 'react';

import { connect } from 'react-redux';

import { attemptRegistration } from '../../store/actions/account.js';

class _Registration extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { handleRegistrationBtnClick, isRegistering, isInRegisteringError } = this.props;

        return (
            <div className="container">
                <h4 className="mt-3">Sign Up</h4>
                <div className="row justify-content-center">
                    <form className="col-sm-6"
                          style={registrationFormStyle}>
                        <div className="form-group mt-3">
                            <label htmlFor="emailInput">Email</label>
                            <input className="form-control"
                                   id="emailInput"
                                   placeholder="@itesm.mx"
                                   ref={ (input) => this.emailInput = input } 
                                   type="text"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="passwordInput">
                                Password
                            </label>
                            <input className="form-control"
                                   id="passwordInput"
                                   ref={ (input) => this.passwordInput = input } 
                                   type="text"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassInput">
                                Confirm Password
                            </label>
                            <input className="form-control"
                                   id="confirmPassInput"
                                   ref={ (input) => this.confirmPassInput = input } 
                                   type="text"/>
                            <div className="invalid-feedback">
                                The passwords don't match
                            </div>
                        </div>
                        <button className="btn btn-primary mb-3"
                                onClick = {this.onRegisterClick.bind(this)}>
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    onRegisterClick() {
        const { handleRegistrationBtnClick } = this.props;
    
        handleRegistrationBtnClick(this.emailInput.value, 
                                   this.passwordInput.value,
                                   this.confirmPassInput.value);
    }
}

const registrationFormStyle = { // This might be a global class
    border: '2px solid #ededed',
    borderRadius: '10px'
}

function mapStateToProps(state){
    return {
        isRegistering: state.account.isRegistering,
        isInRegisteringError: state.account.isInRegisteringError
    };
}

function mapDispatchToProps(dispatch){
    return {
        handleRegistrationBtnClick: (email, password, passwordConf) => {
            dispatch(attemptRegistration(email, password, passwordConf));
        }
    };
}

const Registration = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_Registration);

export default Registration;