var React = require('react');
var classNames = require('classnames');
var _ = require('underscore');
var LoginModel = require('../models/loginModel.js');
var validator = require('./validator');
var ModelMixin = require('./ModelStateMixin.js');

var loginModel = new LoginModel();

function setUpModelState(){
    var loginModelState = {
        lModel: {
            email:{
                value: loginModel.get('email')
            },
            password:{
                value: loginModel.get('password')
            }
        }
    };
    return loginModelState;
}

var LoginComponent = React.createClass({
    mixins:[ModelMixin(loginModel,setUpModelState)],

    onSubmit: function () {
        var isValid = validator.validate(loginModel, ['password', 'email']);
        var stateSetter = {
            emailError: loginModel.get('email_error'),
            passwordError: loginModel.get('password_error')
        };

        this.setState(stateSetter);

        if(isValid){
            alert('do login!');
        }
    },

    onChange: function (e) {
        var modelSetter = {};
        modelSetter[e.target.name.toLowerCase()] = e.target.value;
        loginModel.set(modelSetter);

        var stateSetter = {};
        if(e.target.value.match(/\w/)){
            stateSetter[e.target.name.toLowerCase() + 'Error'] = null;
            this.setState(stateSetter);
        }
        else {
            stateSetter[e.target.name.toLowerCase() + 'Error'] = 1;
            this.setState(stateSetter);
        }
    },

    render: function () {
        var emailGroupClasses = classNames({
            'credentialsGroup': true,
            'has-error': [null, undefined, ''].indexOf(this.state.emailError) === -1,
            'form-group': true
        });

        var passwordGroupClasses = classNames({
            'credentialsGroup': true,
            'has-error': [null, undefined, ''].indexOf(this.state.passwordError) === -1,
            'form-group': true,
            'passwordTopMargin': true
        });

        return (
            <div id="loginBox" className="mainLoginPanel">
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <div className="panel-title">
                            <i className="fa fa-sign-in fa-fw"/>
                            Sign in
                        </div>
                    </div>
                    <div className="panel-body">
                        <div className="leftCol">
                            <div className={emailGroupClasses}>
                                <input type="text" value={this.state.lModel.email.value} onChange={this.onChange}
                                       name="Email" id="Email"
                                       className="has-error form-control" id="Email" placeholder="Email"/>
                            </div>

                            <div className={passwordGroupClasses}>
                                <input type="password" value={this.state.lModel.password.value} onChange={this.onChange}
                                       name="Password" id="Password"
                                       className="form-control passwordTopMargin" placeholder="Password"/>
                            </div>

                            <div className="form-group">
                                <a className="btn loginButton" onClick={this.onSubmit}>Log In</a>
                                <span className="pull-right ForgotPswdTextRight">
                                    <a href="#">Forgot Password?</a>
                                </span>
                            </div>
                        </div>
                        <div className="rightCol">
                            <a href="#" className="btn rightColButtons signUpButton">Sign Up</a>
                            <a href="#" className="btn rightColButtons fbButton">
                                <i className="fa fa-facebook-official buttonIcon"/>Login with Facebook</a>
                            <a href="#" className="btn rightColButtons googleButton">
                                <i className="fa fa-google buttonIcon"/>Login with Google</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = LoginComponent;