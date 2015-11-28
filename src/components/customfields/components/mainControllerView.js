var React = require('React');
var TemplatePanel = require('./templatePanel');
var TemplateCollectionModel = require('../models/templateCollectionModel');
var TemplateModel = require('../models/templateModel');
var _ = require('underscore');

var TemplatesCollection = new TemplateCollectionModel();

var MainControllerView = React.createClass({
    propTypes: {
        templates: React.PropTypes.array.isRequired,
        saved_templates: React.PropTypes.array.isRequired
    },

    getInitialState: function () {
        this.populateTemplateCollection();

        return { templates: TemplatesCollection };
    },

    populateTemplateCollection: function() {
        _.each(this.props.templates, function (template) {
            var templateModel = new TemplateModel(template);
            TemplatesCollection.add(templateModel);
        });
    },

    componentWillMount: function () {

    },

    render: function () {
        return (
            <div className="container custom-fields-component">
                <div className="row">
                    <div className="col-md-6">
                        <TemplatePanel templates={TemplatesCollection} />
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = MainControllerView;