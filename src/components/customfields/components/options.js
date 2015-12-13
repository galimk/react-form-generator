var React = require('react');


var Options = React.createClass({
    propTypes: {
        options: React.PropTypes.array.isRequired,
        onAdded: React.PropTypes.func.isRequired,
        onRemoved: React.PropTypes.func.isRequired
    },

    getInitialState: function () {
        return {
            value: ''
        }
    },

    onChange: function (e) {
        this.setState({
            value: e.target.value
        });
    },

    removeOption: function (option) {
        this.props.onRemoved(option);
    },

    addOption: function () {
        this.props.onAdded(this.state.value);
        this.setState({
            value: ''
        });
    },

    render: function () {
        var wrapperClass = 'form-group';
        if (this.props.error && this.props.error.length > 0) {
            wrapperClass += ' ' + 'has-error';
        }

        function renderOption(option) {
            return (
                <span key={option} className="select-item label label-large label-primary">
                    {option} <a href="#" onClick={this.removeItem}> <i className="fa fa-close fa-fw"></i> </a>
                </span>
            );
        }

        return (
            <div className="{wrapperClass}">
                <label>
                    Select List Options
                </label>

                <div>
                    {this.props.options.map(renderOption, this)}
                </div>
                <div className="select-item-add">
                    <div className="input-group">
                        <input type="text"
                               name="listItem"
                               className="form-control"
                               placeholder="New List Option"
                               value={this.state.value}
                               onChange={this.onChange}
                            />
                        <span className="input-group-btn">
                            <button className="btn btn-default" type="button">Add</button>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
});


module.exports = Options;