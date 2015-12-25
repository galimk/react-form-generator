var React = require('react');

var MaxLengthMinLength = React.createClass({
    propTypes: {
        template: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return {

        };
    },

    render: function () {
        return (
            <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="minLength">Min Length</label>
                        <input type="number" id="minLength" className="form-control"/>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label htmlFor="maxLength">Max Length</label>
                        <input type="number" id="maxLength" className="form-control"/>
                    </div>
                </div>
            </div>
        );
    },


});

module.exports = MaxLengthMinLength;