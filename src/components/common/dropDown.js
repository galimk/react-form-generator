"use strict";

var React = require('react');

var DropDown = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        value: React.PropTypes.any,
        error: React.PropTypes.string,
        list: React.PropTypes.array.isRequired,
        itemKey: React.PropTypes.string.isRequired,
        itemText: React.PropTypes.string.isRequired,
        keyType: React.PropTypes.string
    },

    internalChange: function (e) {
        var onChangeObject = {
            target: {
                name: this.props.name,
                value: this.props.keyType === 'string' ? e.target.value : parseInt(e.target.value)
            }
        };

        var value = parseInt(e.target.value);
        if (value === -1) {
            onChangeObject.target.value = null;
        }

        this.props.onChange(onChangeObject, this.props.name);
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

        var defaultOption = null;
        if (this.props.placeholder !== 'undefined' &&
            this.props.placeholder !== null &&
            this.props.placeholder !== '') {
            defaultOption = <option value="-1">{this.props.placeholder}</option>
        }

        return (
            <div className={wrapperClass}>
                <label htmlFor={this.props.name} className="control-label">{this.props.label}</label>
                <div className="field">
                    <select name={this.props.name}
                            className="form-control"
                            placeholder={this.props.placeholder}
                            ref={this.props.value}
                            onChange={this.internalChange}
                            value={this.props.value}>
                        {defaultOption}
                        {this.props.list.map(renderItem, this)}
                    </select>
                    <div className="help-block">
                        <ul className="list-unstyled">
                            <li>{this.props.error}</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = DropDown;