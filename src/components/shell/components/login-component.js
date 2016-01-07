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
                        <div className="panel-title centerText">
                            Sign in
                        </div>
                    </div>
                    <div className="panel-body">
                        <div className="leftCol">
                            <div className="form-group credentialsGroup">
                                <input type="text" className="form-control" placeholder="Email"/>
                                <input type="text" className="form-control marginTop" placeholder="Password"/>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-info">Log In</button>
                                <span className="pull-right textRight">
                                    <a href="#">Forgot Password?</a>
                                </span>
                            </div>
                        </div>
                        <div className="rightCol">
                            <button className="btn btn-success  signInUpButtons">Sign Up</button>
                            <button className="btn btn-info  signInUpButtons">Login with FaceBook</button>
                            <button className="btn btn-warning  signInUpButtons">Login with Google</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = LoginModal;