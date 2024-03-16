import './Tooltip.css';
const Tooltip = ({ message, visible }) => {
    return visible ? (
        <div className="tooltip visible">
            <span className="tooltip-icon">!</span> {message}
        </div>
    ) : null;
};


export default Tooltip;
