/**
 * Created by amirkaudinov on 12/29/15.
 */
var React = require('react');

var LoginModal = React.createClass({
    render: function () {
        var modalStyle = {
            marginLeft: '-175px',
            marginTop: '-150px',
            left: '50%',
            top: '50%',
            position: 'absolute'
        };
        var PswdButtonStyle = {
            margin: '45px'
        };
        var signUpButtonStyle = {
            marginLeft: '-5px'
        };
        return (
            <div>
                <div className="modal-dialog" id="loginModal" style={modalStyle}>
                    <div className="modal-body col-md-7">
                        <form className="center-block">
                            <div className="form-group">
                                <input type="text" id="loginInputEmail" className="form-control input-sm"
                                       placeholder="Email"/>
                            </div>
                            <div className="form-group">
                                <input type="text" id="loginInputPassword" className="form-control input-sm"
                                       placeholder="Password"/>
                            </div>
                            <div className="form-group">
                            <span className="pull-left">
                                <button className="btn btn-primary btn-sm">Log in</button>
                            </span>
                                <span className="-align-center" style={PswdButtonStyle}>
                                    <button className="btn btn-danger btn-sm">Forgot password</button>
                                </span>
                            <span className="pull-right">
                                <button className="btn btn-warning btn-sm" style={signUpButtonStyle}>Sign up</button>
                            </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = LoginModal;