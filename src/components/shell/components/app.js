/**
 * Created by amirkaudinov on 12/24/15.
 */
var React = require('React');
var LoginComponent = require('./login-component.js');

var App = React.createClass({
    render: function(){
        return <LoginComponent />
    }
});

module.exports = App;