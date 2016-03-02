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

function notNullUndefinedOrEmpty(prop){
    return [null, undefined, ''].indexOf(prop) === -1
}

var LoginComponent = React.createClass({
    mixins:[ModelMixin(loginModel,setUpModelState)],

    onSubmit: function () {
        var isValid = validator.validate(loginModel, ['password', 'email']);
        var stateSetter = {
            emailError: loginModel.get('email_error'),
            passwordError: loginModel.get('password_error')
        };

        if(!isValid) {
            this.setState(stateSetter);
        }
        else {
            alert('do login!');
        }
    },

    onChange: function (e) {
        var modelSetter = {};
        modelSetter[e.target.name] = e.target.value;
        loginModel.set(modelSetter);

        var stateSetter = {};
        if(e.target.value.match(/\w/) && notNullUndefinedOrEmpty(this.state[e.target.name + 'Error'])){
            stateSetter[e.target.name + 'Error'] = null;
            console.log(this);
            this.setState(stateSetter);
        }
    },

    render: function () {
        var emailGroupClasses = classNames({
            'credentialsGroup': true,
            'has-error': notNullUndefinedOrEmpty(this.state.emailError),
            'form-group': true
        });

        var passwordGroupClasses = classNames({
            'credentialsGroup': true,
            'has-error': notNullUndefinedOrEmpty(this.state.passwordError),
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
                                       name="email" id="Email"
                                       className="form-control" id="Email" placeholder="Email"/>
                            </div>

                            <div className={passwordGroupClasses}>
                                <input type="password" value={this.state.lModel.password.value} onChange={this.onChange}
                                       name="password" id="Password"
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