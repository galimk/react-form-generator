import Backbone from 'backbone';
import TemplateModel from './templateModel';

const TemplatesCollectionModel = Backbone.Collection.extend({
    model: TemplateModel
});

export default TemplatesCollectionModel;