import React from 'react';
import PropTypes from 'prop-types';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TemplatePanel from './templatePanel';
import TemplateModel from '../models/templateModel';

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

class TemplateView extends React.Component {
    constructor(props) {
        super(props);
        this.addNewField = this.addNewField.bind(this);
        this.templatesCollectionChanged = this.templatesCollectionChanged.bind(this);
        this.onRemove = this.onRemove.bind(this);
        this.onMovePanel = this.onMovePanel.bind(this);
        this.state = {templates: this.props.templates};
    }

    addNewField() {
        var templates = this.props.templates;
        var latestId = undefined;
        if (templates.length > 0) {
            latestId = _getLastModel(templates.models);
        }
        templates.add(new TemplateModel({
            id: latestId,
            name: 'New Input'
        }));
    }

    componentDidMount() {
        this.props.templates.on('change rest add remove', this.templatesCollectionChanged, this);
    }

    componentWillUnmount() {
        this.props.templates.off('change rest add remove', this.templatesCollectionChanged, this);
    }

    templatesCollectionChanged() {
        this.setState({templates: this.props.templates});
    }

    onRemove(template) {
        this.props.templates.remove(template);
        this.templatesCollectionChanged();
    }

    onMovePanel(dragIndex, hoverIndex) {
        var templatesCollection = this.props.templates;
        var dragCard = templatesCollection.models[hoverIndex];
        templatesCollection.remove(dragCard, {silent: true});
        templatesCollection.add(dragCard, {at: dragIndex});
    }

    render() {
        var showItem = function (template, index) {
            return (
                <TemplatePanel index={index} onRemove={this.onRemove} movePanel={this.onMovePanel}
                               key={template.get('id')} template={template}/>
            );
        }.bind(this);

        return (
            <div>
                <div>
                    {this.state.templates.map(showItem)}
                </div>
                <div className="action-button-panel">
                    <button className="btn btn-default action-button" onClick={this.addNewField}>
                        add new input
                    </button>
                </div>
            </div>
        );
    }
}

TemplateView.propTypes = {
    templates: PropTypes.object.isRequired
};

export default DragDropContext(HTML5Backend)(TemplateView);