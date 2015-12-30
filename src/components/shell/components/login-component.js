/**
 * Created by amirkaudinov on 12/29/15.
 */
var React = require('react');

var LoginModal = React.createClass({
    render: function () {
        return (
            <div className="modal-dialog" id="loginModal">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="text-center">Login</h1>
                    </div>
                    <div className="modal-body">
                        <form className="center-block">
                            <div className="form-group">
                                <input type="text" id="loginInputEmail" className="form-control input-lg"
                                       placeholder="Email"/>
                            </div>
                            <div className="form-group">
                                <input type="text" id="loginInputPassword" className="form-control input-lg"
                                       placeholder="Password"/>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-lg btn-block">Sign In</button>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <span className="pull-right"><a href="#">Register</a></span>
                        <span className="pull-left"><a href="#">Forgot Password</a></span>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = LoginModal;