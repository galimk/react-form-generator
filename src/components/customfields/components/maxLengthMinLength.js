import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class MaxLengthMinLength extends React.Component {
    constructor(props) {
        super(props);
        this.modelChanged = this.modelChanged.bind(this);
        this.maxChanged = this.maxChanged.bind(this);
        this.minChanged = this.minChanged.bind(this);
        this.invokeValidation = this.invokeValidation.bind(this);
        this.state = this.composeState();
    }

    componentDidMount() {
        this.props.template.on('change', this.modelChanged, this);
    }

    componentWillUnmount() {
        this.props.template.off('change', this.modelChanged, this);
    }

    composeState() {
        return {
            minLength: this.props.template.get('minLength'),
            maxLength: this.props.template.get('maxLength'),
            errorMinLength: this.props.template.get('minLength_error'),
            errorMaxLength: this.props.template.get('maxLength_error')
        };
    }

    modelChanged() {
        this.setState(this.composeState());
    }

    maxChanged(e) {
        this.props.template.set('maxLength', e.target.value);
        this.invokeValidation();
    }

    minChanged(e) {
        this.props.template.set('minLength', e.target.value);
        this.invokeValidation();
    }

    invokeValidation() {
        var maxLengthErrorMessage = this.props.template.preValidate('maxLength', this.props.template.get('maxLength'));
        var minLengthErrorMessage = this.props.template.preValidate('minLength', this.props.template.get('minLength'));
        this.props.template.set('maxLength_error', maxLengthErrorMessage ? maxLengthErrorMessage : undefined);
        this.props.template.set('minLength_error', minLengthErrorMessage ? minLengthErrorMessage : undefined);
    }

    render() {
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
    }

    getValidationErrorBlock(validationErrorMessage) {
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
}

MaxLengthMinLength.propTypes = {
    template: PropTypes.object.isRequired
};

export default MaxLengthMinLength;
