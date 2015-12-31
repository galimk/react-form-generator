var Backbone = require('backbone');
var _ = require('underscore');
var InputTypes = require('./inputTypes');

var self = {
    createModel: function (templates) {
        var model = Backbone.Model.extend({
            validation: self.createValidatorObject(templates)
        });
        return model;
    },

    createValidatorObject: function (templates) {
        var validationObject = {};
        _.each(templates.models, function (template) {
            var validationRules = self.createValidationRulesArray(template.get('type'));
            validationObject['input_' + template.get('id')] = function (value, attr, computedState) {
                var validationMessage = undefined;
                _.each(validationRules, function (validationRule) {
                    if (validationMessage !== undefined && validationMessage !== null && validationMessage !== '') {
                        validationMessage = validationRule(value, attr, computedState, template);
                    }
                });
                return validationMessage;
            };
        });
        return validationObject;
    },

    createValidationRulesArray: function (type) {
        var validationRules = [];

        if (InputTypes.supportsListItems(type)) {
            validationRules.push(self.validateSelectList);
        } else if (InputTypes.supportsMinMax(type)) {
            validationRules.push(self.validateTextInputs);
        }
        validationRules.push(self.validateRequired);

        return validationRules;
    },

    validateSelectList: function (value, attr, computedState, template) {


    },

    validateTextInputs: function (value, attr, computedState, template) {


    },

    validateRequired: function (value, attr, computedState, template) {
        if (template.get('required') === true && (value === undefined || value === null || value === '')) {
            return template.get('name') + ' is required';
        }
    }
};


module.exports = self;

