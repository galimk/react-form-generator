/**
 * Created by amirkaudinov on 12/24/15.
 */
var ReactDom = require('react-dom');
var React = require('react');
var App = require('./components/app.js');

window.onload = function() {
    ReactDom.render(<App />, document.getElementById('app'));
}