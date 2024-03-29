var React = require('react');

var InputTextArea = React.createClass({

    propTypes: {
        name: React.PropTypes.string.isRequired,
        label: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.string,
        value: React.PropTypes.string,
        error: React.PropTypes.string
    },

    internalOnChange: function (e) {
        this.props.onChange(e, this.props.name);
    },

    render: function () {
        var wrapperClass = 'form-group';

        if (this.props.error && this.props.error.length > 0) {
            wrapperClass += ' ' + 'has-error';
        }

        return (
            <div className={wrapperClass}>
                <label className="control-label" htmlFor={this.props.name}>{this.props.label}</label>
                <div className="field">
                    <textarea name={this.props.name}
                              className="form-control"
                              placeholder={this.props.placeholder}
                              ref={this.props.name}
                              value={this.props.value}
                              onChange={this.props.internalOnChange}>

                    </textarea>
                    <div className="help-block">
                        <ul className="list-unstyled">
                            <li>{this.props.error}</li>
                        </ul>
                    </div>

                </div>
            </div>
        );
    }

});

module.exports = InputTextArea;