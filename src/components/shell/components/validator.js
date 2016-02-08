var _ = require('underscore');

module.exports = {
    validate: function (model, propertyNames) {
        var isValid = true;
        _.each(propertyNames, function (propertyName) {
            var errorMessage = model.preValidate(propertyName, model.get(propertyName));
            var setter = {};
            if (errorMessage !== null && errorMessage !== '') {
                isValid = false;
            }
            setter[propertyName + '_error'] = errorMessage;
            model.set(setter);
        });
        return isValid;
    }
};