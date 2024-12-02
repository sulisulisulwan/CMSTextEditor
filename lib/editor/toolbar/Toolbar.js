import * as React from 'react';
import ToolbarIcon from './ToolbarIcon.js';
const Toolbar = ({ toolbarOptions, setToolbarStatus, toolbarStatus }) => {
    return (React.createElement(React.Fragment, null, toolbarOptions.icons.map((iconName, i) => {
        return (React.createElement(ToolbarIcon, { key: iconName + i, src: toolbarOptions.iconImages[iconName], style: toolbarOptions.iconStyle, iconOnClick: () => {
                setToolbarStatus((prevStatus) => (Object.assign(Object.assign({}, prevStatus), { [iconName]: {
                        selected: !prevStatus[iconName].selected,
                    } })));
            }, isActivated: toolbarStatus[iconName].selected }));
    })));
};
export default Toolbar;
