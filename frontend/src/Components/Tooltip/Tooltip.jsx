
import React from 'react';
import './Tooltip.css';

const Tooltip = ({ message, visible }) => {
    // The component now uses class names instead of inline styles
    return visible ? (
        <div className="tooltip">
            <span className="tooltip-icon">!</span> {message}
        </div>
    ) : null;
};

export default Tooltip;
