import Backbone from 'backbone';
import Validation from 'backbone-validation';
import _ from 'underscore';

_.extend(Backbone.Model.prototype, Validation.mixin);

const LoginModel = Backbone.Model.extend({
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

export default LoginModel;
