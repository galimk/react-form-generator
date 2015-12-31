/**
 * Created by amirkaudinov on 12/29/15.
 */
var React = require('react');

var LoginModal = React.createClass({
    render: function () {
        return (
            <div className="modal-dialog" id="loginModal">
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
                            <button className="btn btn-primary btn-sm btn-block">Log in</button>
                        </div>
                    </form>
                    <div>
                        <span className="pull-left">
                                <button className="btn btn-primary btn-sm">Forgot Password</button>
                        </span>
                        <span className="pull-right">
                            <button className="btn btn-success btn-sm">Sign up</button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = LoginModal;