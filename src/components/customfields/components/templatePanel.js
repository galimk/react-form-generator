var React = require('react');
var Template = require('./template');

var TemplatePanel = React.createClass({

    propTypes: {
        templates: React.PropTypes.object.isRequired
    },

    render: function () {
        var showItem = function (template) {
            return (
                <Template key={template.get('field_label')} template={template}/>
            );
        };

        return (
            <div>
                <div>
                    {this.props.templates.models.map(showItem, this)}
                </div>
                <div className="action-button-panel">
                    <button className="btn btn-default action-button">add new field</button>
                </div>

            </div>
        );
    }
});

module.exports = TemplatePanel;