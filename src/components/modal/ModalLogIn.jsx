import React from 'react'

import { connect } from 'react-redux';

import { attemptLoginNA } from '../../store/actions/account.js';

class _ModalLogIn extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { isAuthenticating, isInError } = this.props;
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
                                                type="text"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="passwordInput">Password</label>
                                            <input className="form-control"
                                                id="passwordInput"
                                                placeholder="Password"
                                                ref={(input) => this.passwordInput = input}
                                                type="password" id="passwordInput" />
                                        </div>   
                                    </form>
                                    {isInError
                                        ? <div>The username or password provided do not exist</div>
                                        : null
                                    } </div>{/*Row*/}
                            </div> {/*Container*/}
                        </div> {/*Modal Body*/}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button className="btn btn-primary"
                                onClick={this.handleSignInBtnClick.bind(this)}
                                type="submit">
                                Sign in!
                            </button>
                        </div> {/*Modal Footer*/}
                    </div> {/*Modal Content*/}
                </div>{/*Modal Dialog*/}
            </div>
        );
    }

    handleSignInBtnClick(e) {
        e.preventDefault();
        const { onSignInBtnClick } = this.props;
        onSignInBtnClick(this.emailInput.value, this.passwordInput.value);
        this.emailInput.value = "";
        this.passwordInput.value = "";

    }
}

const mapStateToProps = state => {
    return {
        isAuthenticating: state.account.isAuthenticating,
        isInError: state.account.isInError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSignInBtnClick: (name, password) => {
            dispatch(attemptLoginNA(name, password));
        }
    }
}

const ModalLogIn = connect(
    mapStateToProps,
    mapDispatchToProps,
)(_ModalLogIn);

export default ModalLogIn;