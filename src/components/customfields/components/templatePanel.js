var React = require('react');


var TemplatePanel = React.createClass({

    propTypes: {
        templates: React.PropTypes.object.isRequired
    },

    render: function () {

        var showItem = function (item) {
            return (<li href="#">{item.get('field_label')}</li>)
        };


        return (
            <div>
                <div>
                    <ul className="nav nav-pills nav-stacked">
                        {this.props.templates.models.map(showItem, this)}
                    </ul>
                </div>

                <div className="col-md-6">
                    <button className="btn btn-default action-button">Create Custom Field</button>
                </div>

                <div className="col-md-6">
                    <button className="btn btn-default action-button">Used Saved Fields</button>
                </div>
            </div>
        );
    }
});

module.exports = TemplatePanel;