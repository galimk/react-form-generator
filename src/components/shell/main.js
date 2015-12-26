/**
 * Created by amirkaudinov on 12/24/15.
 */
var React = require('react');
var App = require('./components/app.js');

window.onload = function() {
    React.render(<App />, document.getElementById('app'));
}