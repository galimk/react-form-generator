import React from 'react';
import PropTypes from 'prop-types';
import InputText from '../../common/inputText';
import DropDown from '../../common/dropDown';
import CheckBox from '../../common/checkbox';
import InputTypes from '../models/inputTypes';
import Options from './optionsList';
import MaxLengthMinLength from './maxLengthMinLength';

class TemplatePanelBody extends React.Component {
    constructor(props) {
        super(props);
        this.templateModelChanged = this.templateModelChanged.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onOptionAdded = this.onOptionAdded.bind(this);
        this.onOptionRemoved = this.onOptionRemoved.bind(this);
        this.setOptions = this.setOptions.bind(this);
        this.onRequiredChanged = this.onRequiredChanged.bind(this);
        this.state = this.composeTemplateState();
    }

    componentDidMount() {
        this.props.template.on('change', this.templateModelChanged, this);
    }

    componentWillUnmount() {
        this.props.template.off('change', this.templateModelChanged, this);
    }

    templateModelChanged() {
        this.setState(this.composeTemplateState());
    }

    composeTemplateState() {
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
            };
        }

        return panelBodyState;
    }

    onChange(e) {
        var setter = {};
        var errorMessages = this.props.template.preValidate(e.target.name, e.target.value);
        setter[e.target.name + '_error'] = errorMessages ? errorMessages : undefined;
        setter[e.target.name] = e.target.value;
        this.props.template.set(setter);
        if (e.target.name === 'type' && InputTypes.supportsListItems(e.target.value)) {
            this.setOptions(this.props.template.get('options'));
        }
    }

    onOptionAdded(newOption) {
        var options = this.props.template.get('options');
        this.props.template.set({'options_error': null});
        options.push(newOption);
        this.setOptions(options);
    }

    onOptionRemoved(index) {
        var options = this.props.template.get('options');
        options.splice(index, 1);
        this.setOptions(options);
    }

    setOptions(options) {
        options = options ? options : [];
        var error = this.props.template.preValidate('options', options);
        this.props.template.set({'options_error': error});
        this.props.template.trigger('change', this.props.template);
    }

    onRequiredChanged() {
        var required = !this.state.template.required;
        this.props.template.set('required', required);
    }

    render() {
        var options = null;
        var minMax = null;
        var type = this.state.template.type.value;
        var placeHolder = null;

        if (InputTypes.supportsListItems(type)) {
            options = <Options onAdded={this.onOptionAdded}
                               onRemoved={this.onOptionRemoved}
                               error={this.state.template.options.error}
                               options={this.state.template.options.value}/>;
        }

        if (InputTypes.supportsMinMax(type)) {
            minMax = <MaxLengthMinLength template={this.props.template}/>;
        }

        if (InputTypes.supportsPlaceholder(type)) {
            placeHolder = <InputText name="placeholder"
                                     label="Placeholder"
                                     value={this.state.template.placeholder.value}
                                     error={this.state.template.placeholder.error}
                                     onChange={this.onChange}/>;
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

                {placeHolder}

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
}

TemplatePanelBody.propTypes = {
    template: PropTypes.object.isRequired
};

export default TemplatePanelBody;
