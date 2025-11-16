import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function CheckBox({ label, name, onChange, checked, error }) {
    var onChangeInternal = function (e) {
        onChange(e.target.checked, name);
    };

    var wrapperClass = classNames({
        'form-group': true,
        'has-error': [null, undefined, ''].indexOf(error) === -1
    });

    return (
        <div className={wrapperClass}>
            <div className="checkbox checkbox-success">
                <input type="checkbox"
                       id={name}
                       name={name}
                       checked={checked}
                       onChange={onChangeInternal}
                       className="styled styled-success"/>
                <label htmlFor={name}>{label}</label>
            </div>
            <div className="help-block">
                <ul className="list-unstyled">
                    <li>{error}</li>
                </ul>
            </div>
        </div>
    );
}

CheckBox.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    checked: PropTypes.bool.isRequired,
    error: PropTypes.string
};

export default CheckBox;