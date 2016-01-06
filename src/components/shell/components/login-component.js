/**
 * Created by amirkaudinov on 12/29/15.
 */
var React = require('react');

var LoginModal = React.createClass({
    render: function () {
        var modalStyle = {
            marginTop: '100px',
        };
        var verticalLine = {
            height: '150px',
            width:'1px',
            backgroundColor:'black',
            margin: '0 auto'
        };
        var forgotPassword = {
            marginTop: '10px'
        };
        return (
            <div id="loginBox" className="col-md-6 col-md-offset-3" style={modalStyle}>
                <div className="panel panel-info">
                    <div className="panel-heading">
                        <div className="panel-title">
                            Sign in
                        </div>
                    </div>
                    <div className="panel-body">
                        <form className="col-md-5">
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
                        </form>
                        <div style={verticalLine}/>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = LoginModal;