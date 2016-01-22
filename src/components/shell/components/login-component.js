/**
 * Created by amirkaudinov on 12/29/15.
 */
var React = require('react');
var _ = require('underscore');
var LoginModel = require('../models/loginModel.js');

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
        loginModel.on('change', this.loginModelChanged(), this)
    },

    componentWillUnmount: function () {
        loginModel.off('change', this.loginModelChanged(), this)
    },

    loginModelChanged: function () {
        this.setState(this.setUpModelState())
    },

    onSubmit: function () {
        var name = document.getElementById("Email");
        var setter = {};
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
                                <input type="text" className="form-control" id="Email" placeholder="Email"/>
                                <input type="password" className="form-control marginTop" name="Password" placeholder="Password"/>
                            </div>
                            <div className="form-group">
                                <a className="btn loginButton" onclick={this.onSubmit}>Log In</a>
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