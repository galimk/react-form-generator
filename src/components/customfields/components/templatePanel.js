import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DragSource, DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import PubSub from '../../../pubsub-simple';
import TemplatePanelBody from './templatePanelBody';

var panelSource = {
    beginDrag: function (props) {
        return {
            targetId: props.template.get('id'),
            id: props.template.get('id'),
            index: props.index
        };
    }
};

var panelTarget = {
    hover: function (props, monitor, component) {
        var dragIndex = monitor.getItem().index;
        var hoverIndex = props.index;

        if (dragIndex === hoverIndex) {
            return;
        }

        var hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
        var hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        var clientOffset = monitor.getClientOffset();
        var hoverClientY = clientOffset.y - hoverBoundingRect.top;

        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }

        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }
        props.movePanel(dragIndex, hoverIndex);
        monitor.getItem().index = hoverIndex;
    }
};

class TemplatePanel extends React.Component {
    constructor(props) {
        super(props);
        this.modelChanged = this.modelChanged.bind(this);
        this.validationTriggered = this.validationTriggered.bind(this);
        this.switchToEdit = this.switchToEdit.bind(this);
        this.switchFromEdit = this.switchFromEdit.bind(this);
        this.invokeRemove = this.invokeRemove.bind(this);
        this.state = {
            isEditing: false,
            name: this.props.template.get('name'),
            isValid: true
        };
    }

    componentDidMount() {
        var component = this;
        this.subscriptionToken = PubSub.subscribe('turn_off_editing', function (topic, triggeringComponent) {
            if (triggeringComponent === component) {
                return;
            }

            component.setState({
                isEditing: false
            });
        });
        this.props.template.on('change', this.modelChanged, this);
        this.props.template.on('validated', this.validationTriggered, this);
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.subscriptionToken);
        this.props.template.off('change', this.modelChanged, this);
        this.props.template.off('validated', this.validationTriggered, this);
    }

    modelChanged() {
        this.props.template.validate();
        this.setState({
            name: this.props.template.get('name')
        });
    }

    validationTriggered(isValid) {
        this.setState({
            isValid: isValid
        });
    }

    switchToEdit() {
        PubSub.publish('turn_off_editing', this);
        this.setState({
            isEditing: true
        });
    }

    switchFromEdit() {
        this.setState({
            isEditing: false
        });
    }

    invokeRemove() {
        this.props.onRemove(this.props.template);
    }

    render() {
        var header = (
            <span>
               {this.state.name}
            </span>
        );

        var editCloseLink = (
            <button className="btn btn-xs btn-default" href="#" onClick={this.switchToEdit}>
                <i className="fa fa-pencil fa-fw"></i>
            </button>
        );

        if (this.state.isEditing) {
            header = (
                <span>
                    {this.state.name} - Editing
                </span>
            );

            editCloseLink = (
                <button href="#" className="btn btn-xs btn-default" onClick={this.switchFromEdit}>
                    <i className="fa fa-minus fa-fw"></i>
                </button>
            );
        }

        var panelClasses = classNames({
            'panel-success': this.state.isEditing && this.state.isValid,
            'panel-danger': !this.state.isValid,
            'panel-primary': !this.state.isEditing && this.state.isValid,
            'panel': true,
            'no-opacity': this.props.isDragging
        });

        var panelBodyClasses = classNames({
            'panel-body': true,
            'hidden': !this.state.isEditing
        });

        var connectDragSource = this.props.connectDragSource;
        var connectDropTarget = this.props.connectDropTarget;
        var connectDragPreview = this.props.connectDragPreview;

        return connectDragPreview(connectDropTarget((
            <div className={panelClasses}>
                {connectDragSource(
                    <div className="panel-heading">
                        <div className="pull-left">{header}</div>
                        <div className="pull-right">
                            <div className="btn-group">
                                {editCloseLink}
                                <button onClick={this.invokeRemove} href="#" className="btn btn-xs btn-default">
                                    <i className="fa fa-trash fa-fw"></i>
                                </button>
                            </div>
                        </div>
                        <div className="clearfix"/>
                    </div>
                )}

                <div className={panelBodyClasses}>
                    <TemplatePanelBody template={this.props.template}/>
                </div>
            </div>
        )));
    }
}

TemplatePanel.propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    template: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
    movePanel: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
};

var DroppableTemplatePanel = DropTarget('TemplatePanel', panelTarget, function (connect) {
    return {connectDropTarget: connect.dropTarget()};
})(TemplatePanel);

var DraggableTemplatePanel = DragSource('TemplatePanel', panelSource, function (connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        connectDragPreview: connect.dragPreview(),
        isDragging: monitor.isDragging()
    };
})(DroppableTemplatePanel);

export default DraggableTemplatePanel;
