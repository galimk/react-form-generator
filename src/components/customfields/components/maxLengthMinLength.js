var React = require('react');

var MaxLengthMinLength = React.createClass({
    propTypes: {
        template: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return this.composeState();
    },

    composeState: function () {
        return {
            minLength: this.props.template.get('minLength'),
            maxLength: this.props.template.get('maxLength')

        };
    },

    maxChanged: function (e) {

    },

    minChanged: function (e) {
        this.template.set('')
    },

    render: function () {
        return (
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="minLength">Min Length</label>
                        <input type="number" id="minLength" value={this.state.minLength}
                               onChange={this.minChanged}
                               className="form-control"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="maxLength">Max Length</label>
                        <input type="number" id="maxLength" value={this.state.maxLength}
                               onChange={this.maxChanged}
                               className="form-control"/>
                    </div>
                </div>
            </div>
        );
    },


});

module.exports = MaxLengthMinLength;