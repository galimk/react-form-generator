var CustomFieldsWizard = require('./components/customfields/components/mainControllerView');
var ReactDOM = require('react-dom');
var React = require('React');

var registry = [];

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

    ReactDOM.render(component, domElement);
};
