var _ = require('underscore');
var React = require('react');
var InputText = require('../../common/inputText');
var DropDown = require('../../common/dropDown');
var CheckboxList = require('../components/checkboxList');

var inputTypes = [
    {text: 'Text Box', key: 1, createComponent: createTextBox},
    {text: 'Select List', key: 2, createComponent: createSelectList},
    {text: 'Checkbox', key: 3, createComponent: createCheckBox},
    {text: 'Text Area', key: 4, createComponent: createTextArea},
    {text: 'Checkbox List', key: 5, createComponent: createCheckBoxList}
];

function createTextBox(model) {
    return <InputText name={model.get('Id')}
                      label={model.get('name')}
                      placeholder={model.get('placeholder')} value=""/>
}

function createSelectList(model) {
    var options = [];
    var modelOptions = model.get('options');
    _.each(modelOptions, function (option) {
        options.push({key: option, text: option});
    });

    return <DropDown name={model.get('Id')}
                     label={model.get('name')}
                     placeholder={model.get('placeholder')}
                     list={options}
                     itemKey="key"
                     itemText="text"
                     value=""/>
}

function createCheckBox(model) {
    return <div> check box component </div>
}

function createTextArea(model) {
    return <div> text area component </div>
}

function createCheckBoxList(model) {
    return <CheckboxList template={model}/>
}

module.exports = {
    getInputTypes: function () {
        return inputTypes;
    },
    getComponent: function (model) {
        var type = model.get('type');
        var found = _.filter(inputTypes, function (term) {
            return term.key === type;
        });
        if (found.length === 0) {
            return null;
        } else {
            return found[0].createComponent(model);
        }
    }
};

