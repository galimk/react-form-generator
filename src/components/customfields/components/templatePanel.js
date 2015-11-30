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
                    <ul className="nav nav-pills nav-stacked">
                        {this.props.templates.models.map(showItem, this)}
                    </ul>
                </div>

                <div className="action-button-panel">
                    <div className="col-md-6  action-button left">
                        <button className="btn btn-default">Create Custom Field</button>
                    </div>
                    <div className="col-md-6 action-button right">
                        <button className="btn btn-default ">Used Saved Fields</button>
                    </div>
                </div>

            </div>
        );
    }
});

module.exports = TemplatePanel;