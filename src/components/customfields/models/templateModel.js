var Backbone = require('backbone');
var Validation = require('backbone-validation');
var _ = require('underscore');
_.extend(Backbone.Model.prototype, Validation.mixin);

var TemplateModel = Backbone.Model.extend({
    defaults: {
        id: 0,
        name: '',
        type: 1,
        placeholder: '',
        is_required: false,
        options: []
    },

    validation: {
        name: [
            {
                required: true,
                msg: 'Field Name is required'
            },
            {
                maxLength: 255,
                msg: 'Field Name cannot exceed 255 characters'
            }
        ],

        options: function (value, attr, computedState) {
            if (value.length === 0) {
                return 'Must have at least one select list option';
            }
        }
    }
});

module.exports = TemplateModel;