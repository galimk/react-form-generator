var React = require('react');
var previewModel = require('../models/previewModel');
var InputTypes = require('../models/inputTypes');
var _ = require('underscore');

var PreviewPanel = React.createClass({
    propTypes: {
        templates: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        var modelValues = [];
        _.each(this.props.templates.models, function (template) {
            modelValues['input_' + template.get('id')] = template.getDefaultValue();
        });

        return {
            templates: this.props.templates,
            modelValues: modelValues,
            modelErrors: []
        };
    },

    componentDidMount: function () {
        this.createValidatableModel();
        this.props.templates.on('change rest add remove', this.templatesCollectionChanged, this);
    },

    componentWillUnmount: function () {
        this.props.templates.off('change rest add remove', this.templatesCollectionChanged, this);
        this.model.off('change', this.modelChanged, this);
    },

    createValidatableModel: function () {
        var modelClass = previewModel.createModel(this.props.templates);
        this.model = new modelClass();
        this.model.on('change', this.modelChanged, this);
    },

    modelChanged: function () {
        this.setState({
            modelValues: this.composeModelValues()
        });
    },

    composeModelValues: function () {
        var modelValues = [];
        var that = this;
        _.each(this.props.templates.models, function (template) {
            var inputId = 'input_' + template.get('id');
            modelValues[inputId] = that.model.get(inputId);
        });
        return modelValues;
    },

    runValidationHandler: function () {
        this.setState({
            modelErrors: this.composeModelErrors()
        });
    },

    clearValidationHandler: function () {
        this.setState({
            modelErrors: []
        })
    },

    composeModelErrors: function () {
        var modelErrors = [];
        var that = this;
        _.each(this.props.templates.models, function (template) {
            var inputId = 'input_' + template.get('id');
            var value = that.model.get(inputId);
            var error = that.model.preValidate(inputId, value);
            modelErrors[inputId] = error;
        });
        return modelErrors;
    },

    templatesCollectionChanged: function () {
        this.clearValidationHandler();
        this.model.off('change', this.modelChanged, this);
        this.createValidatableModel();
        this.setState({
            templates: this.props.templates,
        });
    },

    render: function () {
        var getComponent = function (template) {
            var templateId = 'input_' + template.get('id');
            var component = InputTypes.getComponent(template,
                this.state.modelValues[templateId], this.onModelValueChanged,
                this.state.modelErrors[templateId]);

            return <div key={template.get('id')}>{component}</div>
        };
        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    Preview
                </div>
                <div className="panel-body">
                    {this.props.templates.map(getComponent, this)}

                    <div className="text-center preview-panel-buttons">
                        <button className="btn btn-default" onClick={this.clearValidationHandler}>Clear</button>
                        <button className="btn btn-primary" onClick={this.runValidationHandler}>Validate</button>
                    </div>
                </div>
            </div>
        );
    },

    onModelValueChanged: function (e, inputName) {
        var value = null;
        if (typeof e === 'boolean') {
            value = e;
        } else {
            value = e.target.value;
        }

        var setter = {};
        setter[inputName] = value;
        this.model.set(setter);
        var modelErrors = this.state.modelErrors;
        var error = this.model.preValidate(inputName, value);
        modelErrors[inputName] = error;
        this.setState({
            modelErrors: modelErrors
        });
    }
});

module.exports = PreviewPanel;