import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import TemplateView from './templateView';
import TemplateCollectionModel from '../models/templateCollectionModel';
import TemplateModel from '../models/templateModel';
import PreviewPanel from './previewPanel';

var TemplatesCollection = new TemplateCollectionModel();

class MainControllerView extends React.Component {
    constructor(props) {
        super(props);
        this.populateTemplateCollection = this.populateTemplateCollection.bind(this);
        this.state = {templates: TemplatesCollection};
        this.populateTemplateCollection();
    }

    populateTemplateCollection() {
        _.each(this.props.templates, function (template) {
            var templateModel = new TemplateModel(template);
            TemplatesCollection.add(templateModel);
        });
    }

    render() {
        return (
            <div className="container-fluid custom-fields-component">
                <div className="row">
                    <div className="col-md-3">
                        <TemplateView templates={TemplatesCollection}/>
                    </div>
                    <div className="col-md-9 when-collapsed">
                        <PreviewPanel templates={TemplatesCollection}/>
                    </div>
                </div>
            </div>
        );
    }
}

MainControllerView.propTypes = {
    templates: PropTypes.array.isRequired,
    saved_templates: PropTypes.array.isRequired
};

export default MainControllerView;