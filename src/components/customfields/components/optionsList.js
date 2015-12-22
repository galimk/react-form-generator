var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var classNames = require('classnames');
var OptionListItem = require('./optionsListItem');

var OptionsList = React.createClass({
    propTypes: {
        options: React.PropTypes.array.isRequired,
        onAdded: React.PropTypes.func.isRequired,
        onRemoved: React.PropTypes.func.isRequired,
        error: React.PropTypes.string
    },

    getInitialState: function () {
        return {
            value: '',
            addValidationError: null
        }
    },

    onRemove: function (index) {

    },

    onChange: function (e) {
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
    },

    addBtnHandler: function(e) {
        e.preventDefault();
        this.internalOnAdd();
    },

    inputKeyDownHandler: function (e) {
        if (this.state.addValidationError !== null) {
            return;
        }
        if (e.keyCode == 13) {
            this.internalOnAdd();
        }
    },

    internalOnAdd: function() {
        this.props.onAdded(this.state.value);
        this.setState({
            value: ''
        });
    },

    onRemove: function (index) {

    },

    render: function () {
        function renderOption(option, index) {
            return (
                <div key={option} className="form-group">
                    <OptionListItem index={index} options={this.props.options} onRemove={this.onRemove}/>
                </div>
            );
        }

        var wrapperClass = classNames({
            'form-group': true,
            'has-error': this.props.error && this.props.error.length > 0 || this.state.addValidationError !== null
        });

        var disabled = this.state.addValidationError !== null;

        return (
            <div className={wrapperClass}>
                <label className="control-label">
                    Select List Options
                </label>

                <div>
                    {this.props.options.map(renderOption, this)}
                </div>

                <div className="select-item-add">
                    <div className="input-group">
                        <input type="text"
                               name="listItem"
                               ref="listItem"
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
});


module.exports = OptionsList;