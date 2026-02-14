import * as React from 'react';
import ToolbarIcon from './ToolbarIcon.js';
import iconClickFuncs from './defaultToolbarIconClick.js';
const Toolbar = ({ toolbarOptions, setToolbarStatus, toolbarStatus }) => {
    return (React.createElement(React.Fragment, null, toolbarOptions.icons.map((iconName, i) => {
        return (React.createElement(ToolbarIcon, { key: iconName + i, src: toolbarOptions.iconImages[iconName], style: toolbarOptions.iconStyle, iconOnClick: () => {
                const onClickAction = iconClickFuncs[iconName];
                onClickAction(!toolbarStatus[iconName].selected);
                setToolbarStatus((prevStatus) => {
                    return Object.assign(Object.assign({}, prevStatus), { [iconName]: {
                            selected: !prevStatus[iconName].selected,
                        } });
                });
            }, isActivated: toolbarStatus[iconName].selected }));
    })));
};
export default Toolbar;
