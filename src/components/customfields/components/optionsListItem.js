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
        return (
            <div className="select-item-option">
                <div className="pull-left">
                    <span className="dont-break-out">{this.state.value}</span>
                </div>

                <div className="pull-right">
                    <button className="btn btn-default btn-xs" onClick={this.onRemove}><i className="fa fa-close fa-fw"></i> </button>
                </div>

                <div className="clearfix"></div>
            </div>
        );
    }
});

module.exports = OptionsListItem;