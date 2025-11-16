var TemplateModel = require('./templateModel');
var Backbone = require('backbone');

var TemplatesCollectionModel = Backbone.Collection.extend({
    model: TemplateModel
});

module.exports = TemplatesCollectionModel;