var MainControllerView = require('./components/mainControllerView');
var React = require('react');
var ReactDom = require('react-dom');
window.onload = function() {
    ReactDom.render(<MainControllerView/>, document.getElementById('app'));
};