var Backbone = require('backbone');

var TemplateModel = Backbone.Model.extend({
    defaults: {
        id: 3,
        field_label: '',
        field_name: '',
        type: 'text',
        placeholder: '',
        is_required: false
    }
});

module.exports = TemplateModel;