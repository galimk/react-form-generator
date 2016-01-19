/**
 * Created by amirkaudinov on 12/29/15.
 */
var React = require('react');
var _ = require('underscore');
var LoginModel = require('../models/loginModel');

var LoginComponent = React.createClass({
    getInitialState: function(){
        return this.setUpModelState();
    },

    setUpModelState: function(){
      var loginModelState = {
            model:{
            email:{
                value: LoginModel.get('email'),
                error: LoginModel.get('email_error')
            },
            password:{
                value: LoginModel.get('password'),
                error: LoginModel.get('password_error')
            }
        }
      };
        return loginModelState;
    },

    componentDidMount: function(){
        LoginModel.on('change', this.loginModelChanged(), this)
    },

    componentWillUnmount: function(){
        LoginModel.on('change', this.loginModelChanged(), this)
    },

    loginModelChanged: function(){
        this.setState(this.setUpModelState())
    },

    onSubmit: function(e){
        var setter = {};
        var errorMessages = LoginModel.preValidate(e.target.name, e.target.value);
        setter[e.target.name + '_error'] = errorMessages ? errorMessages : undefined;
        setter[e.target.name] = e.target.value;
        LoginModel.set(setter);
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
                                <input type="text" className="form-control" placeholder="Email"/>
                                <input type="password" className="form-control marginTop" placeholder="Password"/>
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