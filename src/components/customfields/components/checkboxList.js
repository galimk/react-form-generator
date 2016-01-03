var React = require('React');
var Checkbox = require('../../common/checkbox');
var _ = require('underscore');
var classNames = require('classnames');

var CheckboxList = React.createClass({
    propTypes: {
        template: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func,
        values: React.PropTypes.array.isRequired,
        error: React.PropTypes.string,
        name: React.PropTypes.string.isRequired
    },

    componentDidMount: function () {
        this.props.template.on('change', this.templateChanged, this);
    },

    componentWillUnmount: function () {
        this.props.template.off('change', this.templateChanged, this);
    },

    composeState: function () {
        var itemsArray = [];
        var modelOptions = this.props.template.get('options');
        var checkedItems = this.props.values;

        for (var i = 0; i < modelOptions.length; i++) {
            var id = 'chk_' + i;
            itemsArray.push({
                id: id,
                checked: checkedItems.indexOf(modelOptions[i]) !== -1,
                text: modelOptions[i]
            });
        }

        return {
            items: itemsArray,
            label: this.props.template.get('name'),
            checkedItems: checkedItems
        };
    },

    templateChanged: function () {
        this.setState(this.composeState());
    },

    getInitialState: function () {
        return this.composeState();
    },

    onItemCheckedChanged: function (val, id) {
        var checkedItems = this.state.checkedItems;
        var value = this.getValueById(id);
        var itemIndex = checkedItems.indexOf(value);

        if (itemIndex === -1) {
            checkedItems.push(value);
        } else {
            checkedItems.splice(itemIndex, 1);
        }

        this.setState({
            checkedItems: checkedItems
        });

        this.props.onChange({
            target: {
                name: this.props.name,
                value: checkedItems
            }
        }, this.props.name);

        this.setState(this.composeState());
    },

    getValueById: function (id) {
        var found = _.findWhere(this.state.items, {id: id});
        if (found) {
            return found.text;
        }
        return null;
    },

    render: function () {
        var showItem = function (item) {
            return (
                <Checkbox key={item.id} name={item.id} checked={item.checked} label={item.text}
                          onChange={this.onItemCheckedChanged}/>
            )
        };

        var wrapperClass = classNames({
            'form-group': true,
            'has-error': [null, undefined, ''].indexOf(this.props.error) === -1
        });

        return (
            <div className={wrapperClass}>
                <label className="control-label">{this.state.label}</label>

                <div>
                    {this.state.items.map(showItem, this)}
                </div>

                <div className="help-block">
                    <ul className="list-unstyled">
                        <li>{this.props.error}</li>
                    </ul>
                </div>

            </div>

        );
    }
});

module.exports = CheckboxList;
