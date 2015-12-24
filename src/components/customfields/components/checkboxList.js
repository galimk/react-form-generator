var React = require('React');
var Checkbox = require('../../common/checkbox');
var _ = require('underscore');

var CheckboxList = React.createClass({
    propTypes: {
        template: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func
    },

    checkedItems: [],

    componentDidMount: function () {
        this.props.template.on('change', this.templateChanged, this);
    },

    componentWillUnmount: function () {
        this.props.template.off('change', this.templateChanged, this);
    },

    composeState: function () {
        var itemsArray = [];
        var modelOptions = this.props.template.get('options');

        for (var i = 0; i < modelOptions.length; i++) {
            var id = 'chk_' + i;
            itemsArray.push({
                id: id,
                checked: this.checkedItems.indexOf(id) !== -1,
                text: modelOptions[i]
            });
        }

        return {
            items: itemsArray,
            label: this.props.template.get('name')
        };
    },

    templateChanged: function () {
        this.setState(this.composeState());
    },

    getInitialState: function () {
        return this.composeState();
    },

    onItemCheckedChanged: function (id) {
        var itemIndex = this.checkedItems.indexOf(id);

        if (itemIndex === -1) {
            this.checkedItems.push(id);
        } else {
            this.checkedItems.splice(itemIndex, 1);
        }

        this.setState(this.composeState());
    },

    render: function () {
        var showItem = function (item) {
            return (
                <Checkbox key={item.id} name={item.id} checked={item.checked} label={item.text}
                          onChange={this.onItemCheckedChanged}/>
            )
        };

        return (
            <div className="form-group">
                <label>{this.state.label}</label>

                <div>
                    {this.state.items.map(showItem, this)}
                </div>

            </div>

        );
    }
});

module.exports = CheckboxList;
