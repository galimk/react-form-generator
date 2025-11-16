import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/app';

window.onload = function() {
    var container = document.getElementById('app');
    if (container) {
        var root = createRoot(container);
        root.render(<App />);
    }
};
