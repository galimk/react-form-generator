var React = require('react');
var Input = require('../../common/inputText');


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
                field_name: {
                    value: this.props.template.get('field_name'),
                    error: this.props.template.get('field_name_error')
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

    render: function () {
        return (
            <div>
                <Input name="field_name"
                       label="Field Name"
                       placeholder="Field Name"
                       value={this.state.template.field_name.value}
                       error={this.state.template.field_name.error}
                       onChange={this.onChange}/>
            </div>
        );
    }
});


module.exports = TemplatePanelBody;