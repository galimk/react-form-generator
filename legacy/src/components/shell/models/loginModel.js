/**
 * Created by amirkaudinov on 12/30/15.
 */
var Backbone = require('backbone');
var Validation = require('backbone-validation');
var _ = require('underscore');
_.extend(Backbone.Model.prototype, Validation.mixin);

var LoginModel = Backbone.Model.extend({
    defaults: {
        email: '',
        password: ''
    },
    validation: {
        email: [
            {
                required: true,
                msg: 'Email is required'
            }
        ],
        password: [
            {
                required: true,
                msg: 'Password is required'
            }
        ]
    }
});

module.exports = LoginModel;