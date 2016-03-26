/**
 * Created by amirkaudinov on 3/25/16.
 */
var React = require('react');
var classnames = require('classnames');
var _ = require('underscore');

function listContainsErrors(list){
    return list.some(function(item){return item != null})
}

var LoginErrorComponent = React.createClass({
    render: function(){
        var errorClassNames = classnames({
            'alert-danger': listContainsErrors(this.props.errorList),
            'alert-dismissible': listContainsErrors(this.props.errorList),
            'errorTrans': true
        });

        var errors = this.props.errorList.map(function(error, i){
            return(
                <h5 key={i}>{error} </h5>
            )
        }, this);

        return(
            <div className={errorClassNames}>
                {errors}
            </div>
        )
    }
});

module.exports = LoginErrorComponent;