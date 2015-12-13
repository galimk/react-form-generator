var React = require('react');
var TemplatePanel = require('./templatePanel');
var TemplateModel = require('../models/templateModel');

var TemplateView = React.createClass({
    propTypes: {
        templates: React.PropTypes.object.isRequired
    },

    addNewField: function () {
        var templates = this.props.templates;

        var lastId = 1;

        if (templates.length > 0) {
            latestId = templates.models[templates.length - 1].get('id');
            latestId += 1;
        }

        templates.add(new TemplateModel({
            id: latestId,
            name: 'New Input'
        }));
    },

    getInitialState: function () {
        return {templates: this.props.templates};
    },

    componentDidMount: function () {
        this.props.templates.on('change rest add remove', this.templatesCollectionChanged, this);
    },

    componentWillUnmount: function () {
        this.props.templates.off('change rest add remove', this.templatesCollectionChanged, this);
    },

    templatesCollectionChanged: function () {
        this.setState({templates: this.props.templates});
    },

    onRemove: function (template) {
        this.props.templates.remove(template);
        this.templatesCollectionChanged();
    },

    render: function () {
        var showItem = function (template) {
            return (
                <TemplatePanel onRemove={this.onRemove} key={template.get('id')} template={template}/>
            );
        };

        return (
            <div>
                <div>
                    {this.state.templates.map(showItem, this)}
                </div>
                <div className="action-button-panel">
                    <button className="btn btn-default action-button" onClick={this.addNewField}>
                        add new input
                    </button>
                </div>
            </div>
        );
    }
});

module.exports = TemplateView;