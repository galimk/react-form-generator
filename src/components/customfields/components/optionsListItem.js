var React = require('react');
var classNames = require('classnames');
var _ = require('underscore');

var OptionsListItem = React.createClass({
    propTypes: {
        index: React.PropTypes.number.isRequired,
        options: React.PropTypes.array.isRequired,
        onRemove: React.PropTypes.func.isRequired
    },

    populateState: function () {
        return {
            value: this.props.options[this.props.index]
        }
    },

    getInitialState: function () {
        return this.populateState();
    },

    onRemove: function () {
        this.props.onRemove(this.props.index);
    },

    render: function () {
        var wrapperClasses = classNames({
            'has-error': [null, undefined].indexOf(this.props.error) === -1,
            'form-group': true
        });

        return (
            <div className={wrapperClasses}>
                <div>
                    <span>{this.state.value}</span>
                </div>
            </div>
        );
    }
});

module.exports = OptionsListItem;