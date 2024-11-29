import * as React from 'react';
import iconSrcs from './defaultToolbarIconMap.js';
import ToolbarIcon from './ToolbarIcon.js';
const Toolbar = ({ toolbarOptions, setToolbarStatus, toolbarStatus }) => {
    return (React.createElement(React.Fragment, null, toolbarOptions.icons.map((iconName, i) => {
        return (iconSrcs[iconName] ?
            React.createElement(ToolbarIcon, { key: iconName + i, src: iconSrcs[iconName], style: toolbarOptions.iconStyle, iconOnClick: () => {
                    setToolbarStatus((prevStatus) => (Object.assign(Object.assign({}, prevStatus), { [iconName]: {
                            selected: !prevStatus[iconName].selected,
                        } })));
                }, isActivated: toolbarStatus[iconName].selected })
            : null);
    })));
};
export default Toolbar;
