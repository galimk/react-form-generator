var React = require('react');
var InputText = require('../../common/inputText');
var DropDown = require('../../common/dropDown');
var InputTypes = require('../models/inputTypes');
var Options = require('./options');

var TemplatePanelBody = React.createClass({
    propTypes: {
        template: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return this.composeTemplateState();
    },

    composeTemplateState: function () {
        return {
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
                options: {
                    value: this.props.template.get('options'),
                    error: this.props.template.get('options_error')
                }
            }
        };
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

    onOptionAdded: function () {

    },

    onOptionRemoved: function () {

    },

    render: function () {
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
                    {(() => {
                        if (this.state.template.type.value === 2) {
                            return <Options onAdded={this.onOptionAdded}
                                            onRemoved={this.onOptionRemoved}
                                            options={this.state.template.options.value}/>;
                        }
                        return null;
                    })()}
                </div>
            </div>
        );
    }
});


module.exports = TemplatePanelBody;