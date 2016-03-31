/**
 * Created by amirkaudinov on 3/25/16.
 */
var React = require('react');
var classnames = require('classnames');
var _ = require('underscore');
var ConstantFuncs = require('./Constants/ConstantFuncs.js');


var LoginErrorComponent = React.createClass({
    render: function () {
        var errorClassNames = classnames({
            'errorTrans': true,
            'alert': true,
            'alert-danger': true
        });

        var nonErrorClassNames = classnames({
            'nonErrorTrans': true,
            'alert': true,
            'alert-danger': true
        });

        var errors = this.props.errorList.map(function (error, i) {
            debugger;
            if(ConstantFuncs.notNullUndefinedOrEmpty(error)) {
                return (
                    <div className={errorClassNames} key={i}>
                        <strong>{error}</strong>
                    </div>
                )
            }
            else if(error === null || error == ""){
                return (
                    <div className={nonErrorClassNames} key={i}>
                        <strong>{error}</strong>
                    </div>
                )
            }
        }, this);

        return (
            <div className="errorDivStyle">
                {errors}
            </div>
        )
    }
});

module.exports = LoginErrorComponent;