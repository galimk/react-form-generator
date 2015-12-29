var React = require('react');
var classNames = require('classnames');

var MaxLengthMinLength = React.createClass({
    propTypes: {
        template: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return this.composeState();
    },

    composeState: function () {
        return {
            minLength: this.props.template.get('minLength'),
            maxLength: this.props.template.get('maxLength'),
            errorMinLength: this.props.template.get('minLength_error'),
            errorMaxLength: this.props.template.get('maxLength_error')
        };
    },

    componentDidMount: function () {
        this.props.template.on('change', this.modelChanged, this);
    },

    componentWillUnmount: function () {
        this.props.template.off('change', this.modelChanged, this);
    },

    modelChanged: function () {
        this.setState(this.composeState());
    },

    maxChanged: function (e) {
        this.props.template.set('maxLength', e.target.value);
    this.invokeValidation();``
    },

    minChanged: function (e) {
        this.props.template.set('minLength', e.target.value);
        this.invokeValidation();
    },

    invokeValidation: function () {
        var maxLengthErrorMessage = this.props.template.preValidate('maxLength', this.props.template.get('maxLength'));
        var minLengthErrorMessage = this.props.template.preValidate('minLength', this.props.template.get('minLength'));
        this.props.template.set('maxLength_error', maxLengthErrorMessage ? maxLengthErrorMessage : undefined);
        this.props.template.set('minLength_error', minLengthErrorMessage ? minLengthErrorMessage : undefined);
    },

    render: function () {
        var minLengthClassNames = classNames({
            'form-group': true,
            'has-error': this.state.errorMinLength !== undefined
        });

        var maxLengthClassNames = classNames({
            'form-group': true,
            'has-error': this.state.errorMaxLength !== undefined
        });

        var validationForMinSection = null;
        if (this.state.errorMinLength !== undefined) {
            validationForMinSection = this.getValidationErrorBlock(this.state.errorMinLength);
        }

        var validationForMaxSection = null;
        if (this.state.errorMaxLength !== undefined) {
            validationForMaxSection = this.getValidationErrorBlock(this.state.errorMaxLength);
        }

        return (
            <div className="row">
                <div className="col-md-6">
                    <div className={minLengthClassNames}>
                        <label className="control-label" htmlFor="minLength">Min Length</label>
                        <input type="number" id="minLength" value={this.state.minLength}
                               onChange={this.minChanged}
                               className="form-control"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className={maxLengthClassNames}>
                        <label className="control-label" htmlFor="maxLength">Max Length</label>
                        <input type="number" id="maxLength" value={this.state.maxLength}
                               onChange={this.maxChanged}
                               className="form-control"/>
                    </div>
                </div>

                {validationForMinSection}
                {validationForMaxSection}
            </div>

        );
    },

    getValidationErrorBlock: function (validationErrorMessage) {
        return (
            <div className="col-md-12 has-error">
                <div className="help-block">
                    <ul className="list-unstyled">
                        <li>{validationErrorMessage}</li>
                    </ul>
                </div>
            </div>
        );
    }
});

module.exports = MaxLengthMinLength;