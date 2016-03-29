/**
 * Created by amirkaudinov on 3/25/16.
 */
var React = require('react');
var classnames = require('classnames');
var _ = require('underscore');

var LoginErrorComponent = React.createClass({
    render: function () {
        var errorClassNames = classnames({
            'errorBackground': true,
            'errorTrans': true
        });

        var errors = this.props.errorList.map(function (error, i) {
            debugger;
            if ([null,"",undefined].indexOf(error) ===-1) {
                return (
                    <div className={errorClassNames} key={i}>
                        <strong className='loginErrorText'>{error}</strong>
                    </div>
                )
            }
        }, this);

        return (
            <div>
                {errors}
            </div>
        )
    }
});

module.exports = LoginErrorComponent;