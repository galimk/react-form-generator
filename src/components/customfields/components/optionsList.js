import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import classNames from 'classnames';
import OptionListItem from './optionsListItem';

class OptionsList extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.addBtnHandler = this.addBtnHandler.bind(this);
        this.inputKeyDownHandler = this.inputKeyDownHandler.bind(this);
        this.internalOnAdd = this.internalOnAdd.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.state = {
            value: '',
            addValidationError: null
        };
    }

    onChange(e) {
        var validationError = null;

        if (e.target.value.length > 255) {
            validationError = 'Option List Item cannot exceed 255 characters';
        }

        var matchedElements = _.filter(this.props.options, function (term) {
            return term.toLowerCase() === e.target.value.toLowerCase();
        });

        if (matchedElements.length > 0) {
            validationError = 'Cannot add duplicate option list item';
        }

        this.setState({
            value: e.target.value,
            addValidationError: validationError
        });
    }

    addBtnHandler(e) {
        e.preventDefault();
        this.internalOnAdd();
    }

    inputKeyDownHandler(e) {
        if (this.state.addValidationError !== null || this.state.value.trim().length === 0) {
            return;
        }
        if (e.keyCode == 13) {
            this.internalOnAdd();
        }
    }

    internalOnAdd() {
        this.props.onAdded(this.state.value);
        this.setState({
            value: ''
        });
    }

    onRemove(index) {
        this.props.onRemoved(index);
    }

    render() {
        function renderOption(option, index) {
            return (
                <li key={option} className="list-group-item list-group-item-default">
                    <OptionListItem index={index} options={this.props.options} onRemove={this.onRemove}/>
                </li>
            );
        }

        var wrapperClass = classNames({
            'form-group': true,
            'has-error': this.props.error && this.props.error.length > 0 || this.state.addValidationError !== null
        });

        var disabled = this.state.addValidationError !== null || this.state.value.trim().length === 0;

        return (
            <div className={wrapperClass}>
                <label className="control-label">
                    Select List Options
                </label>

                <div>
                    <ul className="list-group">
                        {this.props.options.map(renderOption, this)}
                    </ul>
                </div>

                <div className="select-item-add">
                    <div className="input-group">
                        <input type="text"
                               name="listItem"
                               className="form-control"
                               placeholder="New List Option"
                               onKeyDown={this.inputKeyDownHandler}
                               value={this.state.value}
                               onChange={this.onChange}
                            />
                        <span className="input-group-btn">
                            <button className="btn btn-default" disabled={disabled} onClick={this.addBtnHandler} type="button">Add</button>
                        </span>
                    </div>
                    <div className="help-block">
                        <ul className="list-unstyled">
                            <li>{this.props.error}</li>
                            <li>{this.state.addValidationError}</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

OptionsList.propTypes = {
    options: PropTypes.array.isRequired,
    onAdded: PropTypes.func.isRequired,
    onRemoved: PropTypes.func.isRequired,
    error: PropTypes.string
};

export default OptionsList;
