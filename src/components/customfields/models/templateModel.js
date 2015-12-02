var Backbone = require('backbone');
var Validation = require('backbone-validation');
var _ = require('underscore');
_.extend(Backbone.Model.prototype, Validation.mixin);

var TemplateModel = Backbone.Model.extend({
    defaults: {
        id: 0,
        field_label: '',
        field_name: '',
        type: 'text',
        placeholder: '',
        is_required: false
    },

    validation: {
        field_name: [
            {
                required: true,
                msg: 'Field Name is required'
            },
            {
                maxLength: 255,
                msg: 'Field Name cannot exceed 255 characters'
            }
        ]
    }
});

module.exports = TemplateModel;