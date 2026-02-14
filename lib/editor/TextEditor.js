import * as React from 'react';
import ContentEditable from './ContentEditable.js';
import Toolbar from './toolbar/Toolbar.js';
import { formatToNodeNameMap, getFormatFromCaretLocation, keyToFormatMap } from './helpers/helpers.js';
import defaultIconSrcs from './toolbar/defaultToolbarIconMap.js';
const TextEditor = ({ html, setHtml, style, toolbar }) => {
    const contentEditable = React.useRef();
    let toolbarOptions = {
        disabled: false,
        orientation: 'vertical',
        icons: [
            'bold',
            'italic',
            'underline',
            'justifyLeft',
            'justifyCenter',
            'justifyRight',
            'orderedList',
            'unorderedList'
        ],
        iconImages: defaultIconSrcs,
        iconStyle: {
            height: 15,
            width: 15,
            border: 'solid gray 1px',
            padding: 10,
            onHover: {
                backgroundColor: 'white'
            }
        }
    };
    if (toolbar) {
        toolbarOptions = Object.assign({}, toolbar);
    }
    const [toolbarStatus, setToolbarStatus] = React.useState(toolbarOptions.icons.reduce((status, iconName) => {
        status[iconName] = {
            selected: false,
        };
        return status;
    }, {}));
    return (React.createElement("div", { id: 'textEditor' },
        React.createElement(Toolbar, { toolbarOptions: toolbarOptions, toolbarStatus: toolbarStatus, setToolbarStatus: setToolbarStatus }),
        React.createElement(ContentEditable, { style: style, innerref: contentEditable, html: html, disabled: false, onChange: (e) => {
                setHtml(e.target.value);
            }, afterChangeEmit: (e) => {
                //This scope WILL contain the most updated DOM data from contenteditable (window.getSelection, document, etc.)
                if (isValidMetaKeyCombo(e)) {
                    return setToolbarStatus((prevStatus) => (Object.assign(Object.assign({}, prevStatus), { [keyToFormatMap[e.key]]: { selected: !prevStatus[keyToFormatMap[e.key]].selected } })));
                }
                if (userMovedCaret(e)) {
                    return updateToolbarStatusToCaretLocation(toolbarStatus, setToolbarStatus);
                }
            } })));
};
const userMovedCaret = (e) => {
    return ['keyup', 'keydown', 'click'].includes(e.type)
        && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)
        || e.type === 'click';
};
const updateToolbarStatusToCaretLocation = (toolbarStatus, setToolbarStatus) => {
    const currentFormatInCaret = getFormatFromCaretLocation(window.getSelection());
    const newToolbarStatus = Object.assign({}, toolbarStatus);
    for (let format in toolbarStatus) {
        newToolbarStatus[format].selected = currentFormatInCaret.includes(formatToNodeNameMap[format]);
    }
    setToolbarStatus(newToolbarStatus);
};
const isValidMetaKeyCombo = (e) => {
    return e.type === 'keydown' && ['b', 'i', 'u'].includes(e.key) && e.metaKey;
};
export default TextEditor;
