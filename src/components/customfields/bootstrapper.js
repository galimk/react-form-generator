import React from 'react';
import { createRoot } from 'react-dom/client';
import MainControllerView from './components/mainControllerView';

var templates = [
    {
        id: 1,
        name: 'Shirt Size',
        type: 2,
        placeholder: 'Choose',
        options: ['SMALL','MEDIUM','LARGE','XLARGE'],
        is_required: true
    },
    {
        id: 2,
        name: 'Shoe Size',
        placeholder: 'Choose',
        type: 2,
        options: ['11','12','12.5','13'],
        is_required: true
    },
    {
        id: 3,
        name: 'Dog Name',
        type: 1,
        placeholder: 'Doc Name',
        is_required: false
    },
    {
        id: 4,
        name: 'Shirt Color',
        placeholder: 'Choose',
        type: 2,
        options: ['Red','Green','Blue'],
        is_required: true
    }
];


var saved_templates = [

];


window.onload = function () {
    var container = document.getElementById('app');
    if (!container) {
        return;
    }
    var root = createRoot(container);
    root.render(<MainControllerView templates={templates} saved_templates={saved_templates} />);
};
