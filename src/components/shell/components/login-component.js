/**
 * Created by amirkaudinov on 12/29/15.
 */
var React = require('react');

var LoginModal = React.createClass({
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
                                <a className="btn loginButton">Log In</a>
                                <span className="pull-right textRight">
                                    <a href="#">Forgot Password?</a>
                                </span>
                            </div>
                        </div>
                        <div className="rightCol">
                            <a href="#" className="btn signInUpButtons suButton">Sign Up</a>
                            <a href="#" className="btn signInUpButtons fb">Login with FaceBook</a>
                            <a href="#" className="btn signInUpButtons google">Login with Google</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = LoginModal;