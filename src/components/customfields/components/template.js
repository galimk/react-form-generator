var React = require('react');

var Template = React.createClass({

    propTypes: {
        template: React.PropTypes.object.isRequired
    },

    render: function () {
        return (
            <li className="template">
                <div className="template-header">
                    <span>
                         {this.props.template.get('field_label')}
                    </span>
                    <a href="#">
                        <i className="fa fa-inverse fa-pencil fa-fw edit"></i>
                    </a>
                    <a href="#">
                        <i className="fa fa-inverse fa-trash fa-fw delete"></i>
                    </a>
                </div>


            </li>
        )
    }
});


module.exports = Template;