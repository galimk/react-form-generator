var React = require('react');

var PreviewPanelRowWrapper = React.createClass({
    propTypes: {
        title: React.PropTypes.string.isRequired
    },

    render: function () {
        return (
            <div className="panel panel-success">
                <div className="panel-heading">
                    {this.props.title}
                </div>
                <div className="panel-body">
                    {this.props.children}
                </div>
            </div>
        )
    }
});

module.exports = PreviewPanelRowWrapper;