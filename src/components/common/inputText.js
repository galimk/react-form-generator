import React from 'react';
import PropTypes from 'prop-types';

function InputText({ name, label, onChange, placeholder, value, error }) {
    var internalOnChange = function (e) {
        onChange(e, name);
    };

    var wrapperClass = 'form-group';
    if (error && error.length > 0) {
        wrapperClass += ' has-error';
    }

    return (
        <div className={wrapperClass}>
            <label className="control-label" htmlFor={name}>{label}</label>

            <div className="field">
                <input type="text"
                       name={name}
                       className="form-control"
                       placeholder={placeholder}
                       ref={name}
                       value={value}
                       onChange={internalOnChange}
                    />

                <div className="help-block">
                    <ul className="list-unstyled">
                        <li>{error}</li>
                    </ul>
                </div>

            </div>
        </div>
    );
}

InputText.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string
};

export default InputText;