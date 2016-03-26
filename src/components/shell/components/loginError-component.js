/**
 * Created by amirkaudinov on 3/25/16.
 */
var React = require('react');
var classnames = require('classnames');
var _ = require('underscore');
var ModelMixin = require('./ModelStateMixin.js');

//function setUpErrModelState(){
//    var errModel = {
//        eModel:{
//            emailError: this.props.modelE.get('email_error'),
//            passwordError: this.props.modelE.get('password_error')
//        }
//    };
//    return errModel;
//}

function notNullUndefinedOrEmpty(prop) {
    return [null, undefined, ''].indexOf(prop) === -1
}

var LoginErrorComponent = React.createClass({
    //mixins:[ModelMixin(this.props.modelE, setUpErrModelState)],
    render: function(){
        var errorClassName = classnames({
            'alert': notNullUndefinedOrEmpty(this.props.modelE.get('email_error')) ||
            notNullUndefinedOrEmpty(this.props.modelE.get('password_error')),

            'alert-dismissible': notNullUndefinedOrEmpty(this.props.modelE.get('email_error')) ||
            notNullUndefinedOrEmpty(this.props.modelE.get('password_error')),

            'alert-danger': notNullUndefinedOrEmpty(this.props.modelE.get('email_error')) ||
                notNullUndefinedOrEmpty(this.props.modelE.get('password_error'))
        });
        return(
            <div className={errorClassName}>
                <strong>
                    {this.props.modelE.get('email_error')}<br/>
                    {this.props.modelE.get('password_error')}
                </strong>
            </div>
        )
    }
});

module.exports = LoginErrorComponent;