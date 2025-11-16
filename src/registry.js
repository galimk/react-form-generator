import React from 'react';
import { createRoot } from 'react-dom/client';
import CustomFieldsWizard from './components/customfields/components/mainControllerView';

var registry = [];
var mountedRoots = new WeakMap();

registry.push({
    name: 'CustomFieldsWizard',
    component: function (data) {
      return <CustomFieldsWizard data={data} />
    }
});

window.initReactComponent = function (componentName, jsonData, dataOutputCallback, domElement) {
    var component = null;

    for (var i = 0; i < registry.length; ++i) {
        var entry = registry[i];
        if (entry.name === componentName) {
            component = entry.component(jsonData);
        }
    }

    if (!component || !domElement) {
        return;
    }

    var root = mountedRoots.get(domElement);
    if (!root) {
        root = createRoot(domElement);
        mountedRoots.set(domElement, root);
    }

    root.render(component);
};
