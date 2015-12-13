"use strict";

var React = require('react');

var DropDown = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        value: React.PropTypes.number,
        error: React.PropTypes.string,
        list: React.PropTypes.array.isRequired,
        itemKey: React.PropTypes.string.isRequired,
        itemText: React.PropTypes.string.isRequired
    },

    internalChange: function (e) {
        this.props.onChange({
            target: {
                name: this.props.name,
                value: parseInt(e.target.value)
            }
        });
    },

    render: function () {
        var wrapperClass = 'form-group';
        if (this.props.error && this.props.error.length > 0) {
            wrapperClass += ' ' + 'has-error';
        }

        var renderItem = function (item) {
            return (
                <option key={item[this.props.itemKey]}
                        value={item[this.props.itemKey]}>{item[this.props.itemText]}</option>
            );
        };

        return (
            <div className={wrapperClass}>
                <label htmlFor={this.props.name}>{this.props.label}</label>

                <div className="field">
                    <select name={this.props.name}
                            className="form-control"
                            placeholder={this.props.placeholder}
                            ref={this.props.value}
                            onChange={this.internalChange}
                            value={this.props.value}>
                        {this.props.list.map(renderItem, this)}
                    </select>

                    <div className="input"></div>
                </div>
            </div>
        );
    }
});

module.exports = DropDown;