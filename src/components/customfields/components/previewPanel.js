import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import classnames from 'classnames';
import previewModel from '../models/previewModel';
import InputTypes from '../models/inputTypes';
import PreviewPanelRowWrapper from './previewPanelRowWrapper';

class PreviewPanel extends React.Component {
    constructor(props) {
        super(props);
        this.templatesCollectionChanged = this.templatesCollectionChanged.bind(this);
        this.modelChanged = this.modelChanged.bind(this);
        this.runValidationHandler = this.runValidationHandler.bind(this);
        this.clearValidationHandler = this.clearValidationHandler.bind(this);
        this.switchLayout = this.switchLayout.bind(this);
        this.onModelValueChanged = this.onModelValueChanged.bind(this);
        this.state = this.getInitialStateValues();
    }

    componentDidMount() {
        this.createValidatableModel();
        this.props.templates.on('change rest add remove', this.templatesCollectionChanged, this);
    }

    componentWillUnmount() {
        this.props.templates.off('change rest add remove', this.templatesCollectionChanged, this);
        if (this.model) {
            this.model.off('change', this.modelChanged, this);
        }
    }

    getInitialStateValues() {
        var modelValues = [];
        _.each(this.props.templates.models, function (template) {
            modelValues['input_' + template.get('id')] = template.getDefaultValue();
        });

        return {
            templates: this.props.templates,
            modelValues: modelValues,
            modelErrors: [],
            layoutEditable: false
        };
    }

    createValidatableModel() {
        var modelClass = previewModel.createModel(this.props.templates);
        this.model = new modelClass();
        this.model.on('change', this.modelChanged, this);
    }

    modelChanged() {
        this.setState({
            modelValues: this.composeModelValues()
        });
    }

    composeModelValues() {
        var modelValues = [];
        var that = this;
        _.each(this.props.templates.models, function (template) {
            var inputId = 'input_' + template.get('id');
            modelValues[inputId] = that.model.get(inputId);
        });
        return modelValues;
    }

    runValidationHandler() {
        this.setState({
            modelErrors: this.composeModelErrors()
        });
    }

    clearValidationHandler() {
        this.setState({
            modelErrors: []
        });
    }

    composeModelErrors() {
        var modelErrors = [];
        var that = this;
        _.each(this.props.templates.models, function (template) {
            var inputId = 'input_' + template.get('id');
            var value = that.model.get(inputId);
            var error = that.model.preValidate(inputId, value);
            modelErrors[inputId] = error;
        });
        return modelErrors;
    }

    templatesCollectionChanged() {
        this.clearValidationHandler();
        if (this.model) {
            this.model.off('change', this.modelChanged, this);
        }
        this.createValidatableModel();
        this.setState({
            templates: this.props.templates
        });
    }

    switchLayout() {
        this.setState({layoutEditable: !this.state.layoutEditable});
    }

    render() {
        var getComponent = function (template, index) {
            var templateId = 'input_' + template.get('id');
            var component = InputTypes.getComponent(template,
                this.state.modelValues[templateId], this.onModelValueChanged,
                this.state.modelErrors[templateId]);

            if (!this.state.layoutEditable) {
                return <div key={template.get('id')}>{component}</div>;
            } else {
                return <PreviewPanelRowWrapper title={'Row ' + index}
                                               key={template.get('id')}>{component}</PreviewPanelRowWrapper>;
            }

        };

        var switchButtonClass = classnames({
            'btn-warning': this.state.layoutEditable,
            'active': this.state.layoutEditable,
            'btn': true,
            'btn-xs': true,
            'btn-default': true
        });

        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    <div className="pull-left">Preview</div>
                    <div className="pull-right">
                        <button onClick={this.switchLayout} className={switchButtonClass}>
                            <i className="fa fa-table fa-fw"></i>
                        </button>
                    </div>
                    <div className="clearfix"/>
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
    }

    onModelValueChanged(e, inputName) {
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
}

PreviewPanel.propTypes = {
    templates: PropTypes.object.isRequired
};

export default PreviewPanel;
