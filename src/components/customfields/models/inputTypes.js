var _ = require('underscore');
var React = require('react');
var InputText = require('../../common/inputText');
var DropDown = require('../../common/dropDown');
var Checkbox = require('../../common/checkBox');
var CheckboxList = require('../components/checkboxList');
var InputTextArea = require('../../common/inputTextArea');

var inputTypes = [
    {text: 'Text Box', key: 1, createComponent: createTextBox},
    {text: 'Select List', key: 2, createComponent: createSelectList},
    {text: 'Checkbox', key: 3, createComponent: createCheckBox},
    {text: 'Text Area', key: 4, createComponent: createTextArea},
    {text: 'Checkbox List', key: 5, createComponent: createCheckBoxList}
];

function createTextBox(template, value, onChangeCallback, error) {
    return <InputText name={'input_' + template.get('id')}
                      label={template.get('name')}
                      placeholder={template.get('placeholder')}
                      value={value}
                      onChange={onChangeCallback}
                      error={error}/>
}

function createSelectList(template, value, onChangeCallback, error) {
    var options = [];
    var modelOptions = template.get('options');
    _.each(modelOptions, function (option) {
        options.push({key: option, text: option});
    });

    return <DropDown name={'input_' + template.get('id')}
                     label={template.get('name')}
                     placeholder={template.get('placeholder')}
                     list={options}
                     keyType="string"
                     value={value}
                     itemKey="key"
                     itemText="text"
                     onChange={onChangeCallback}
                     error={error}/>
}

function createCheckBox(template, value, onChangeCallback, error) {
    return <div className="bold-checkbox"><Checkbox
        name={'input_' + template.get('id')} label={template.get('name')}
        checked={value}
        onChange={onChangeCallback}
        error={error}/>
    </div>
}

function createTextArea(template, value, onChangeCallback, error) {
    return <InputTextArea name={'input_' + template.get('id')}
                          label={template.get('name')}
                          placeholder={template.get('placeholder')}
                          value={value}
                          onChange={onChangeCallback}
                          error={error}/>
}

function createCheckBoxList(model, value, onChangeCallback, error) {
    return <CheckboxList template={model} values={value} onChange={onChangeCallback} error={error}/>
}

module.exports = {
    getInputTypes: function () {
        return inputTypes;
    },
    supportsMinMax: function (type) {
        return type === 1 || type === 4;
    },
    supportsListItems: function (type) {
        return type === 2 || type === 5;
    },
    supportsPlaceholder: function (type) {
        return  [1,2,4,5].indexOf(type) !== -1;
    },
    getComponent: function (template, value, onChangeCallback, error) {
        var type = template.get('type');
        var found = _.filter(inputTypes, function (term) {
            return term.key === type;
        });
        if (found.length === 0) {
            return null;
        } else {
            return found[0].createComponent(template, value, onChangeCallback, error);
        }
    }
};

