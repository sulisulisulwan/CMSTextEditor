import * as React from 'react';
import { deepEqualStyles, normalizeHtml, replaceCaret } from './helpers/helpers.js';
const shouldComponentUpdate = (props, nextProps) => {
    //Returning false in this function actually means YES the component should update
    //Why? because the return boolean here actually represents whether or not previous props equal current props.
    const { innerref } = props;
    const element = innerref.current;
    // We need not rerender if the change of props simply reflects the user's edits.
    // Rerendering in this case would make the cursor/caret jump
    // Rerender if there is no element yet... (somehow?)
    if (!element)
        return false;
    // ...or if html really changed... (programmatically, not by user edit)
    if (normalizeHtml(nextProps.html) !== normalizeHtml(element.innerHTML)) {
        return false;
    }
    // Handle additional properties
    return props.disabled === nextProps.disabled ||
        props.tagName === nextProps.tagName ||
        props.className === nextProps.className ||
        props.innerref === nextProps.innerref ||
        props.placeholder === nextProps.placeholder ||
        deepEqualStyles(props.style, nextProps.style);
};
const ContentEditableFunction = React.memo((props) => {
    const { html, innerref, tagName, style } = props;
    let lastHtml = html;
    // el will 
    let el = typeof innerref === 'function' ? { current: null } : React.createRef();
    const componentDidMount = React.useRef(false);
    React.useEffect(() => {
        if (!componentDidMount.current) {
            componentDidMount.current = true;
            return;
        }
        //componentDidUpdate function here
        const element = (innerref && typeof innerref !== 'function' ? innerref : el).current;
        if (!element)
            return;
        // Perhaps React (whose VDOM gets outdated because we often prevent
        // rerendering) did not update the DOM. So we update it manually now.
        if (props.html !== element.innerHTML) {
            element.innerHTML = props.html;
        }
        lastHtml = props.html;
        replaceCaret(element);
    }, []);
    const emitChange = (originalEvt) => {
        if (props.beforeChangeEmit) {
            props.beforeChangeEmit(originalEvt);
        }
        const element = (innerref && typeof innerref !== 'function' ? innerref : el).current;
        if (!element)
            return;
        const currInnerHtml = element.innerHTML;
        if (props.onChange && currInnerHtml !== lastHtml) {
            // Clone event with Object.assign to avoid "Cannot assign to read only property 'target' of object"
            const evt = Object.assign({}, originalEvt, { target: { value: currInnerHtml } });
            props.onChange(evt);
        }
        lastHtml = currInnerHtml;
        if (props.afterChangeEmit) {
            props.afterChangeEmit(originalEvt);
        }
    };
    const copiedProps = Object.assign({}, props);
    delete copiedProps.afterChangeEmit;
    delete copiedProps.beforeChangeEmit;
    return React.createElement(tagName || 'div', Object.assign(Object.assign({}, copiedProps), { style, ref: typeof innerref === 'function' ? (current) => {
            innerref(current);
            el.current = current;
        } : innerref || el, onInput: emitChange, onChange: emitChange, onClick: emitChange, onBlur: props.onBlur || emitChange, onKeyUp: props.onKeyUp || emitChange, onKeyDown: props.onKeyDown || emitChange, contentEditable: !props.disabled, dangerouslySetInnerHTML: { __html: html } }), props.children);
}, shouldComponentUpdate);
export default ContentEditableFunction;
