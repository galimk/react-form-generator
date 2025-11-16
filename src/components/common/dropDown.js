import React from 'react';
import PropTypes from 'prop-types';

function DropDown({
    name,
    label,
    onChange,
    placeholder,
    value,
    error,
    list,
    itemKey,
    itemText,
    keyType
}) {
    var internalChange = function (e) {
        var incomingValue = keyType === 'string' ? e.target.value : parseInt(e.target.value, 10);
        if (incomingValue === -1) {
            incomingValue = null;
        }

        var onChangeObject = {
            target: {
                name: name,
                value: incomingValue
            }
        };

        onChange(onChangeObject, name);
    };

    var wrapperClass = 'form-group';
    if (error && error.length > 0) {
        wrapperClass += ' has-error';
    }

    var renderItem = function (item) {
        return (
            <option key={item[itemKey]}
                    value={item[itemKey]}>{item[itemText]}</option>
        );
    };

    var defaultOption = null;
    if (placeholder !== 'undefined' && placeholder !== null && placeholder !== '') {
        defaultOption = <option value="-1">{placeholder}</option>;
    }

    return (
        <div className={wrapperClass}>
            <label htmlFor={name} className="control-label">{label}</label>
            <div className="field">
                <select name={name}
                        className="form-control"
                        placeholder={placeholder}
                        ref={value}
                        onChange={internalChange}
                        value={value}>
                    {defaultOption}
                    {list.map(renderItem)}
                </select>
                <div className="help-block">
                    <ul className="list-unstyled">
                        <li>{error}</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

DropDown.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.any,
    error: PropTypes.string,
    list: PropTypes.array.isRequired,
    itemKey: PropTypes.string.isRequired,
    itemText: PropTypes.string.isRequired,
    keyType: PropTypes.string
};

export default DropDown;