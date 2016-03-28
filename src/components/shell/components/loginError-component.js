/**
 * Created by amirkaudinov on 3/25/16.
 */
var React = require('react');
var classnames = require('classnames');
var _ = require('underscore');

function listContainsErrors(list) {
    return list.some(function (item) {
        return item != null
    })
}

var LoginErrorComponent = React.createClass({
    render: function () {
        var errorClassNames = classnames({
            'errorBackground': true,
            'errorTrans': true
        });

        var nonErrorClassNames = classnames({
            'nonErrorTrans': true,
            'errorBackground': true
        });

        var errors = this.props.errorList.map(function (error, i) {
            if (error != null || error != undefined) {
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