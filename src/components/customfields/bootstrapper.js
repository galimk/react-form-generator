var MainControllerView = require('./components/mainControllerView');
var React = require('react');
var ReactDom = require('react-dom');

// test data...

var templates = [
    {
        id: 1,
        field_label: 'Shirt Size',
        field_name: 'Shirt Size',
        type: 'options',
        placeholder: 'Choose',
        options: 'SMALL,MEDIUM,LARGE,XLARGE',
        is_required: true
    },
    {
        id: 3,
        field_label: 'Dog Name',
        field_name: 'Dog Name',
        type: 'text',
        placeholder: 'Doc Name',
        is_required: false
    }
];


var saved_templates = [
    {
        id: 1,
        field_label: 'Shirt Size',
        field_name: 'Shirt Size',
        type: 'options',
        placeholder: 'Choose',
        options: ['SMALL','MEDIUM','LARGE','XLARGE'],
        is_required: true
    },
    {
        id: 2,
        field_label: 'Shoe Size',
        field_name: 'Shoe Size',
        placeholder: 'Choose',
        type: 'options',
        options: ['11','12','12.5','13'],
        is_required: true
    },
    {
        id: 3,
        field_label: 'Dog Name',
        field_name: 'Dog Name',
        type: 'text',
        placeholder: 'Doc Name',
        is_required: false
    },
    {
        id: 2,
        field_label: 'Shirt Color',
        field_name: 'Shirt Color',
        placeholder: 'Choose',
        type: 'options',
        options: ['Red','Green','Blue'],
        is_required: true
    }
];


window.onload = function () {
    ReactDom.render(<MainControllerView templates={templates} saved_templates={saved_templates} />, document.getElementById('app'));
};