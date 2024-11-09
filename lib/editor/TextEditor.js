import * as React from 'react';
import ContentEditable from 'react-contenteditable';
var TextEditor = function (_a) {
    var html = _a.html, setHtml = _a.setHtml, style = _a.style;
    var contentEditable = React.useRef();
    return (React.createElement("div", { id: 'textEditor' },
        React.createElement(ContentEditable, { style: style, innerRef: contentEditable, html: html, disabled: false, onChange: function (e) { setHtml(e.target.value); } })));
};
export default TextEditor;
