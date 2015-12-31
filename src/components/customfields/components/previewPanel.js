var React = require('react');
var previewModel = require('../models/previewModel');
var InputTypes = require('../models/inputTypes');

var PreviewPanel = React.createClass({
    propTypes: {
        templates: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return {
            templates: this.props.templates,
            model: previewModel.createModel(this.props.templates)
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
            var component = InputTypes.getComponent(template, this.state.model);
            return <div key={template.get('id')}>{component}</div>
        };

        return (
            <div className="panel panel-primary">
                <div className="panel-heading">
                    Preview
                </div>
                <div className="panel-body">
                    {this.props.templates.map(getComponent, this)}
                </div>
            </div>
        );
    }
});

module.exports = PreviewPanel;