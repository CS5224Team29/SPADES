import React from 'react';
const Tooltip = ({ message, visible }) => {
    const tooltipStyle = {
        position: 'absolute',
        backgroundColor: 'white',
        color: 'black',
        textAlign: 'center',
        borderRadius: '6px',
        padding: '10px',
        zIndex: 100,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        border: '1px solid #ccc',
        top: 'calc(100% + 10px)',
        left: '5%',
        fontSize: '13px',
        transition: 'opacity 0.3s, visibility 0.3s',
        opacity: visible ? 1 : 0,
        visibility: visible ? 'visible' : 'hidden',
    };

    const tooltipIconStyle = {
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: '#E87A2A',
        borderRadius: '15%',
        padding: '2px 8px',
        marginRight: '5px',
        border: '1px solid #E87A2A',
    };

    // Return the component with inline styles
    return visible ? (
        <div style={tooltipStyle}>
            <span style={tooltipIconStyle}>!</span> {message}
        </div>
    ) : null;
};

export default Tooltip;
