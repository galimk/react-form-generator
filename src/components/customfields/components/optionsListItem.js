import React from 'react';
import PropTypes from 'prop-types';

function OptionsListItem({ index, options, onRemove }) {
    var onRemoveInternal = function () {
        onRemove(index);
    };

    return (
        <div className="select-item-option">
            <div className="pull-left">
                <span className="dont-break-out">{options[index]}</span>
            </div>

            <div className="pull-right">
                <button className="btn btn-default btn-xs" onClick={onRemoveInternal}><i className="fa fa-close fa-fw"></i> </button>
            </div>

            <div className="clearfix"></div>
        </div>
    );
}

OptionsListItem.propTypes = {
    index: PropTypes.number.isRequired,
    options: PropTypes.array.isRequired,
    onRemove: PropTypes.func.isRequired
};

export default OptionsListItem;
