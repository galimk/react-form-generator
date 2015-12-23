var React = require('react');
var InputTypes = require('../models/inputTypes');

var PreviewPanel = React.createClass({
    propTypes: {
        templates: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return {
            templates: this.props.templates
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
            templates: this.props.templates
        });
    },

    render: function () {
        var getComponent = function (model) {
            var component = InputTypes.getComponent(model);
            return <div key={model.get('id')}>{component}</div>
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