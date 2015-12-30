var React = require('react');
var TemplatePanel = require('./templatePanel');
var TemplateModel = require('../models/templateModel');
var HTML5Backend = require('react-dnd-html5-backend');
var DragDropContext = require('react-dnd').DragDropContext;

function _getLastModel(models){
    var maxId = 0;
    for(var tModel in models){
        var modelId = models[tModel].get('id');
        if (modelId > maxId){
            maxId = modelId;
        }
    }
    return maxId + 1;
}

var TemplateView = React.createClass({
    propTypes: {
        templates: React.PropTypes.object.isRequired
    },

    addNewField: function () {
        var templates = this.props.templates;

        if (templates.length > 0) {
            var latestId = _getLastModel(templates.models);
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

    onMovePanel: function (dragIndex, hoverIndex) {
        var templatesCollection = this.props.templates;
        var dragCard = templatesCollection.models[hoverIndex];
        templatesCollection.remove(dragCard, {silent: true});
        templatesCollection.add(dragCard, {at: dragIndex});
    },

    render: function () {
        var showItem = function (template, index) {
            return (
                <TemplatePanel index={index} onRemove={this.onRemove} movePanel={this.onMovePanel}
                               key={template.get('id')} template={template}/>
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

module.exports = DragDropContext(HTML5Backend)(TemplateView);