/**
 * Created by amirkaudinov on 12/29/15.
 */
var React = require('react');

var LoginModal = React.createClass({
    render: function () {
        var mainPanel = {
            margin: '150px auto 20px',
            maxWidth: '600px'
        };
        var forgotPassword = {
            marginTop: '10px'
        };
        var formLeft = {
            float: 'left',
            width: '280px',
            paddingRight: '30px',
        };
        var formRight = {
            float: 'right',
            borderLeft: '1px solid #bbb',
            width: '280px',
            padding: '0 35px 35px'
        };
        return (
            <div id="loginBox" style={mainPanel}>
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <div className="panel-title">
                            Sign in
                        </div>
                    </div>
                    <div className="panel-body">
                        <div style={formLeft}>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Email"/>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Password"/>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-info">Sign In</button>
                                <span className="pull-right" style={forgotPassword}>
                                    <a href="#">Forgot Password?</a>
                                </span>
                            </div>
                        </div>
                        <div className="form-group" style={formRight}>
                            <h7>Do not have an account?</h7>
                            <div className="form-group">
                                <button className="btn btn-success">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = LoginModal;