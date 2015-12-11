var React = require('react');
var PubSub = require('../../../pubsub-simple');
var classNames = require('classnames');
var TemplatePanelBody = require('./templatePanelBody');


var TemplatePanel = React.createClass({
    propTypes: {
        template: React.PropTypes.object.isRequired,
        onRemove: React.PropTypes.func.isRequired
    },

    getInitialState: function () {
        return {
            isEditing: false,
            fieldName: this.props.template.get('field_name')
        };
    },

    componentDidMount: function () {
        var component = this;
        this.subscriptionToken = PubSub.subscribe('turn_off_editing', function (topic, triggeringComponent) {
            if (triggeringComponent == component) {
                return;
            }

            component.setState({
                isEditing: false
            });
        });
        this.props.template.on('change', this.fieldLabelChanged, this);
    },

    componentWillUnmount: function () {
        PubSub.unsubscribe(this.subscriptionToken);
        this.props.template.off('change', this.fieldLabelChanged, this);
    },

    fieldLabelChanged: function () {
        this.setState({fieldName: this.props.template.get('field_name')});
    },

    switchToEdit: function () {
        PubSub.publish('turn_off_editing', this);
        this.setState({
            isEditing: true
        });
    },

    switchFromEdit: function () {
        this.setState({
            isEditing: false
        });
    },

    invokeRemove: function() {
      this.props.onRemove(this.props.template);
    },

    render: function () {
        var templateClass = "template-header";

        var header = (
            <span>
                {this.props.template.get('field_name')}
            </span>
        );

        var editCloseLink = (
            <button className="btn btn-xs btn-default" href="#" onClick={this.switchToEdit}>
                <i className="fa fa-pencil fa-fw"></i>
            </button>
        );

        if (this.state.isEditing) {
            templateClass += ' template-header-editing';

            header = (
                <span>
                    {this.state.fieldName} - Editing
                </span>
            );

            editCloseLink = (
                <button href="#" className="btn btn-xs btn-default" onClick={this.switchFromEdit}>
                    <i className="fa fa-close fa-fw"></i>
                </button>
            );
        }

        var panelClasses = classNames({
            'panel-success': this.state.isEditing,
            'panel-primary': !this.state.isEditing,
            'panel': true
        });

        var panelBodyClasses = classNames({
            'panel-body': true,
            'hidden': !this.state.isEditing
        });

        return (
            <div className={panelClasses}>
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
                <div className={panelBodyClasses}>
                    <TemplatePanelBody template={this.props.template}/>
                </div>
            </div>
        );
    }
});


module.exports = TemplatePanel;