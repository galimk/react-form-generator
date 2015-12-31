var React = require('react');

var CheckBox = React.createClass({
    propTypes: {
        label: React.PropTypes.string.isRequired,
        name: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        checked: React.PropTypes.bool.isRequired,
        error: React.PropTypes.string
    },

    onChangeInternal: function (e) {
        this.props.onChange(e.target.checked, this.props.name);
    },

    render: function () {
        return (
            <div className="checkbox checkbox-success">
                <input type="checkbox"
                       id={this.props.name}
                       name={this.props.name}
                       checked={this.props.checked}
                       onChange={this.onChangeInternal}
                       className="styled styled-success"/>
                <label htmlFor={this.props.name}>{this.props.label}</label>
            </div>
        );
    }
});

module.exports = CheckBox;