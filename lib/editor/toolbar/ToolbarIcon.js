import * as React from 'react';
const ToolbarIcon = ({ src, style, iconOnClick, isActivated }) => {
    const [isHovering, setIsHovering] = React.useState(false);
    let computedStyle = Object.assign({}, style);
    if (isHovering || isActivated) {
        if (style.onHover) {
            computedStyle = Object.assign(Object.assign({}, computedStyle), style.onHover);
        }
        else {
            computedStyle = Object.assign(Object.assign({}, computedStyle), { backgroundColor: 'aliceblue' });
        }
    }
    delete style.onHover;
    return (React.createElement("button", { style: {
            background: 'none',
            padding: 0,
            margin: 0,
            border: 0
        } },
        React.createElement("img", { onClick: iconOnClick, onMouseEnter: () => { setIsHovering(true); }, onMouseLeave: () => { setIsHovering(false); }, src: src, style: computedStyle })));
};
export default ToolbarIcon;
