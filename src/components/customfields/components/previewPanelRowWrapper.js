import React from 'react';
import PropTypes from 'prop-types';

function PreviewPanelRowWrapper({ title, children }) {
    return (
        <div className="panel panel-success">
            <div className="panel-heading">
                {title}
            </div>
            <div className="panel-body">
                {children}
            </div>
        </div>
    );
}

PreviewPanelRowWrapper.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node
};

export default PreviewPanelRowWrapper;
