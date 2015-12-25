var React = require('react');
var InputText = require('../../common/inputText');
var DropDown = require('../../common/dropDown');
var CheckBox = require('../../common/checkbox');
var InputTypes = require('../models/inputTypes');
var Options = require('./optionsList');
var MaxLengthMinLength = require('./maxLengthMinLength');

var TemplatePanelBody = React.createClass({
    propTypes: {
        template: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return this.composeTemplateState();
    },

    composeTemplateState: function () {
        var panelBodyState = {
            template: {
                name: {
                    value: this.props.template.get('name'),
                    error: this.props.template.get('name_error')
                },
                type: {
                    value: this.props.template.get('type'),
                    error: this.props.template.get('type_error')
                },
                placeholder: {
                    value: this.props.template.get('placeholder'),
                    error: this.props.template.get('placeholder_error')
                },
                required: this.props.template.get('required')
            }
        };

        var type = this.props.template.get('type');
        if (type === 2 || type === 5) {
            panelBodyState.template.options = {
                value: this.props.template.get('options'),
                error: this.props.template.get('options_error')
            }
        }

        return panelBodyState;
    },

    componentDidMount: function () {
        this.props.template.on('change', this.templateModelChanged, this)
    },

    componentWillUnmount: function () {
        this.props.template.off('change', this.templateModelChanged, this);
    },

    templateModelChanged: function () {
        this.setState(this.composeTemplateState());
    },

    onChange: function (e) {
        var setter = {};
        var errorMessages = this.props.template.preValidate(e.target.name, e.target.value);
        setter[e.target.name + '_error'] = errorMessages ? errorMessages : undefined;
        setter[e.target.name] = e.target.value;
        this.props.template.set(setter);
    },

    onOptionAdded: function (newOption) {
        var options = this.props.template.get('options');
        this.props.template.set({'options_error': null});
        options.push(newOption);
        this.props.template.trigger('change', this.props.template, {});
    },

    onOptionRemoved: function (index) {
        var options = this.props.template.get('options');
        options.splice(index, 1);
        var error = this.props.template.preValidate('options', options);
        this.props.template.set({'options_error': error});
        this.props.template.trigger('change', this.props.template);
    },

    onRequiredChanged: function () {
        var required = !this.state.template.required;
        this.props.template.set('required', required);
    },

    render: function () {
        var options = null;
        var minMax = null;
        var type = this.state.template.type.value;

        if (InputTypes.supportsListItems(type)) {
            options = <Options onAdded={this.onOptionAdded}
                               onRemoved={this.onOptionRemoved}
                               error={this.state.template.options.error}
                               options={this.state.template.options.value}/>;
        }

        if (InputTypes.supportsMinMax(type)) {
            minMax = <MaxLengthMinLength template={this.props.template} />
        }

        return (
            <div>

                <InputText name="name"
                           label="Input Name"
                           placeholder="Input Name"
                           value={this.state.template.name.value}
                           error={this.state.template.name.error}
                           onChange={this.onChange}/>

                <DropDown name="type"
                          label="Input Type"
                          placeholder="Select Input Type"
                          value={this.state.template.type.value}
                          error={this.state.template.type.error}
                          onChange={this.onChange}
                          list={InputTypes.getInputTypes()}
                          itemKey="key"
                          itemText="text"
                    />

                <InputText name="placeholder"
                           label="Placeholder"
                           value={this.state.template.placeholder.value}
                           error={this.state.template.placeholder.error}
                           onChange={this.onChange}
                    />

                <div>
                    {options}
                </div>

                <div>
                    {minMax}
                </div>

                <div className="bold-checkbox">
                    <CheckBox label="Required"
                              onChange={this.onRequiredChanged}
                              checked={this.state.template.required}
                              name={"required_" + this.props.template.get("id")}/>
                </div>
            </div>
        );
    }
});


module.exports = TemplatePanelBody;