var React = require('react');
var classNames = require('classnames');

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
        var wrapperClass = classNames({
            'form-group': true,
            'has-error': [null, undefined, ''].indexOf(this.props.error) === -1
        });

        return (
            <div className={wrapperClass}>
                <div className="checkbox checkbox-success">
                    <input type="checkbox"
                           id={this.props.name}
                           name={this.props.name}
                           checked={this.props.checked}
                           onChange={this.onChangeInternal}
                           className="styled styled-success"/>
                    <label htmlFor={this.props.name}>{this.props.label}</label>
                </div>
                <div className="help-block">
                    <ul className="list-unstyled">
                        <li>{this.props.error}</li>
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = CheckBox;