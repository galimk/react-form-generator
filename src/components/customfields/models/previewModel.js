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
                    if (validationMessage === undefined || validationMessage === null || validationMessage === '') {
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
        if ([null, undefined, ''].indexOf(value) !== -1) {
            return;
        }

        var minLength = template.get('minLength');
        var maxLength = template.get('maxLength');

        if (minLength && value.length < minLength) {
            return 'Minimum ' + minLength + ' characters are required for ' + template.get('name');
        }

        if (maxLength && value.length > maxLength) {
            return 'Maximum ' + maxLength + ' characters are allowed for ' + template.get('name');
        }
    },

    validateRequired: function (value, attr, computedState, template) {
        if (template.get('required') && (value === undefined || value === null || value === '' || value.length === 0 || value === false)) {
            if (template.get('type') === InputTypes.getInputTypesEnum().CheckboxList) {
                return 'Selection required';
            } else if (template.get('type') === InputTypes.getInputTypesEnum().Checkbox) {
                return template.get('name') + ' must be checked';
            } else {
                return template.get('name') + ' is required';
            }
        }
    }
};


module.exports = self;

