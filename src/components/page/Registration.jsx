import React from 'react';

import { connect } from 'react-redux';

import { attemptRegistration } from '../../store/actions/account.js';

class _Registration extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { handleRegistrationBtnClick } = this.props;

        return (
            <div>
                <label>Email</label>
                <input ref={ (input) => this.emailInput = input } type="text"/>
                <label>Contraseña</label>
                <input ref={ (input) => this.passwordInput = input } type="text" type="password"/>
                <label>Confirmar Contraseña</label>
                <input ref={ (input) => this.confirmPassInput = input } type="text" type="password"/>
                <button onClick = { 
                    handleRegistrationBtnClick(this.emailInput.value,
                                               this.passwordInput.value, 
                                               this.confirmPassInput.vale) }
                >Register</button>
            </div>
        );
    }

    onRegisterClick() {
        console.log("Email: " + this.emailInput.value);
        console.log("Contraseña: " + this.passwordInput.value);
        console.log("Confirmar: " + this.confirmPassInput.value);
    } 
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