import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import classNames from 'classnames';
import Checkbox from '../../common/checkbox';

class CheckboxList extends React.Component {
    constructor(props) {
        super(props);
        this.templateChanged = this.templateChanged.bind(this);
        this.onItemCheckedChanged = this.onItemCheckedChanged.bind(this);
        this.getValueById = this.getValueById.bind(this);
        this.state = this.composeState();
    }

    componentDidMount() {
        this.props.template.on('change', this.templateChanged, this);
    }

    componentWillUnmount() {
        this.props.template.off('change', this.templateChanged, this);
    }

    composeState() {
        var itemsArray = [];
        var modelOptions = this.props.template.get('options');
        var checkedItems = this.props.values.slice();

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
    }

    templateChanged() {
        this.setState(this.composeState());
    }

    onItemCheckedChanged(val, id) {
        var checkedItems = this.state.checkedItems.slice();
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

        if (this.props.onChange) {
            this.props.onChange({
                target: {
                    name: this.props.name,
                    value: checkedItems
                }
            }, this.props.name);
        }

        this.setState(this.composeState());
    }

    getValueById(id) {
        var found = _.findWhere(this.state.items, {id: id});
        if (found) {
            return found.text;
        }
        return null;
    }

    render() {
        var showItem = function (item) {
            return (
                <Checkbox key={item.id} name={item.id} checked={item.checked} label={item.text}
                          onChange={this.onItemCheckedChanged}/>
            );
        }.bind(this);

        var wrapperClass = classNames({
            'form-group': true,
            'has-error': [null, undefined, ''].indexOf(this.props.error) === -1
        });

        return (
            <div className={wrapperClass}>
                <label className="control-label">{this.state.label}</label>

                <div>
                    {this.state.items.map(showItem)}
                </div>

                <div className="help-block">
                    <ul className="list-unstyled">
                        <li>{this.props.error}</li>
                    </ul>
                </div>

            </div>

        );
    }
}

CheckboxList.propTypes = {
    template: PropTypes.object.isRequired,
    onChange: PropTypes.func,
    values: PropTypes.array.isRequired,
    error: PropTypes.string,
    name: PropTypes.string.isRequired
};

export default CheckboxList;
