var React = require('react');
var previewModel = require('../models/previewModel');
var InputTypes = require('../models/inputTypes');
var _ = require('underscore');

var PreviewPanel = React.createClass({
    propTypes: {
        templates: React.PropTypes.object.isRequired
    },

    model: null,

    getInitialState: function () {
        this.model = previewModel.createModel(this.props.templates);
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
        this.props.templates.on('change rest add remove', this.templatesCollectionChanged, this);
    },

    componentWillUnmount: function () {
        this.props.templates.off('change rest add remove', this.templatesCollectionChanged, this);
    },

    templatesCollectionChanged: function () {
        this.setState({
            templates: this.props.templates,
            model: previewModel.createModel(this.props.templates)
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
                        <button className="btn btn-default">Clear</button>
                        <button className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </div>
        );
    },

    onModelValueChanged: function (value, inputName) {


    },
});

module.exports = PreviewPanel;