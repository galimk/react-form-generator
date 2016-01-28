/**
 * Created by amirkaudinov on 12/29/15.
 */
var React = require('react');
var _ = require('underscore');
var LoginModel = require('../models/loginModel.js');
var preValidator = require('./preValidator');

var loginModel = new LoginModel();


var LoginComponent = React.createClass({
    getInitialState: function () {
        return this.setUpModelState();
    },

    setUpModelState: function () {
        var loginModelState = {
            lModel: {
                email: {
                    value: loginModel.get('email'),
                    error: loginModel.get('email_error')
                },
                password: {
                    value: loginModel.get('password'),
                    error: loginModel.get('password_error')
                }
            }
        };
        return loginModelState;
    },

    componentDidMount: function () {
        loginModel.on('change', this.loginModelChanged, this)
    },

    componentWillUnmount: function () {
        loginModel.off('change', this.loginModelChanged, this)
    },

    loginModelChanged: function () {
        this.setState(this.setUpModelState())
    },

    onSubmit: function () {
        console.log('here!');
        if (loginModel.name.error && loginModel.name.error.length > 0){
            this.setClassName();
        }
        //loginModel.validate();
        ////preValidator.preValidate(loginModel, ['email', 'password']);
    },

    onChange: function (e) {
        var setter = {};
        var errorMessages = loginModel.preValidate(e.target.name.toLowerCase(),e.target.value);
        setter[e.target.name.toLowerCase() + '_error'] = errorMessages ? errorMessages : undefined;
        setter[e.target.name.toLowerCase()] = e.target.value;
        console.log(setter);
        loginModel.set(setter);
    },

    setClassName: function () {
        var emailClass = 'form-control has-error';
        var passWordClass = 'form-control marginTop has-error';
        document.getElementById('Email').className = emailClass;
        document.getElementById('Password').className = passWordClass;
        //if (name === 'Email') {
        //    if (loginModel.error && loginModel.error.length > 0) {
        //        return formGroupClass += ' ' + 'has-error';
        //    }
        //    return formGroupClass;
        //}
        //else {
        //    if (loginModel.error && loginModel.error.length > 0) {
        //        return formGroupClass += ' ' + 'marginTop' + ' ' + 'has-error';
        //    }
        //    return formGroupClass += ' ' + 'marginTop';
        //}
    },

    render: function () {
        return (
            <div id="loginBox" className="mainPanel">
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <div className="panel-title">
                            <i className="fa fa-sign-in fa-fw"/>
                            Sign in
                        </div>
                    </div>
                    <div className="panel-body">
                        <div className="leftCol">
                            <div className="form-group credentialsGroup">
                                <input type="text" value={this.state.lModel.email.value} onChange={this.onChange}
                                       name="Email" id="Email"
                                       className="form-control"id="Email" placeholder="Email"/>
                                <input type="password" value={this.state.lModel.password.value} onChange={this.onChange}
                                       name="Password" id="Password"
                                       className="form-control marginTop" placeholder="Password"/>
                            </div>
                            <div className="form-group">
                                <a className="btn loginButton" onClick={this.onSubmit}>Log In</a>
                                <span className="pull-right textRight">
                                    <a href="#">Forgot Password?</a>
                                </span>
                            </div>
                        </div>
                        <div className="rightCol">
                            <a href="#" className="btn signInUpButtons suButton">Sign Up</a>
                            <a href="#" className="btn signInUpButtons fb">
                                <i className="fa fa-facebook-official buttonIcon"/>Login with Facebook</a>
                            <a href="#" className="btn signInUpButtons google">
                                <i className="fa fa-google buttonIcon"/>Login with Google</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = LoginComponent;