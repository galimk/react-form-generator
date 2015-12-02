var React = require('react');
var TemplatePanel = require('./templatePanel');

var TemplateView = React.createClass({

    propTypes: {
        templates: React.PropTypes.object.isRequired
    },

    render: function () {
        var showItem = function (template) {
            return (
                <TemplatePanel key={template.get('id')} template={template}/>
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

module.exports = TemplateView;