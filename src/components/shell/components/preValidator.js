var _ = require('underscore');

module.exports = {
    preValidate: function (model, propertyNames) {
        _.each(propertyNames, function (propertyName) {
            var errorMessage = model.preValidate(propertyName, model.get(propertyName));
            var setter = {};
            setter[propertyName + '_error'] = errorMessage;
            model.set(setter);
        });
    }
};