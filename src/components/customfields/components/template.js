var React = require('react');
var InputText = require('../../common/inputText');
var PubSub = require('../../../pubsub-simple');
var classNames = require('classnames');

var _subscriptionToken = null;

var Template = React.createClass({

    propTypes: {
        template: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return {
            isEditing: false
        };
    },

    componentDidMount: function () {
        var component = this;
        _subscriptionToken = PubSub.subscribe('turn_off_editing', function (topic, triggeringComponent) {
            if (triggeringComponent == component) {
                return;
            }

            component.setState({
                isEditing: false
            });
        });
    },

    componentWillUnmount() {
        PubSub.unsubscribe(_subscriptionToken);
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

    onChange: function () {

    },


    render: function () {
        var templateClass = "template-header";
        var header = (
            <span>
                {this.props.template.get('field_label')}
            </span>
        );
        var editCloseLink = (
            <button className="btn btn-xs btn-default" href="#" onClick={this.switchToEdit}>
                <i className="fa fa-pencil fa-fw"></i>
            </button>
        );
        var editHiddenSyle

        if (this.state.isEditing) {

            templateClass += ' template-header-editing';
            header = (
                <span>
                    {this.props.template.get('field_label')} - Editing
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
            'panel-body-animation': true,
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
                            <button href="#" className="btn btn-xs btn-default">
                                <i className="fa fa-trash fa-fw"></i>
                            </button>
                        </div>
                    </div>
                    <div className="clearfix"/>
                </div>
                <div className={panelBodyClasses}>
                    Panel content
                </div>
            </div>
        );
    }
});


module.exports = Template;