export function normalizeHtml(str) {
    return str && str.replace(/&nbsp;|\u202F|\u00A0/g, ' ').replace(/<br \/>/g, '<br>');
}
export function replaceCaret(el) {
    // Place the caret at the end of the element
    const target = document.createTextNode('');
    el.appendChild(target);
    // do not move caret if element was not focused
    const isTargetFocused = document.activeElement === el;
    if (target !== null && target.nodeValue !== null && isTargetFocused) {
        var sel = window.getSelection();
        if (sel !== null) {
            var range = document.createRange();
            range.setStart(target, target.nodeValue.length);
            range.collapse(true);
            sel.removeAllRanges();
            sel.addRange(range);
        }
        if (el instanceof HTMLElement)
            el.focus();
    }
}
export function getFormatFromCaretLocation(selection) {
    const formats = [];
    const validNodeNames = ['B', 'U', 'I'];
    const getFormats = (node) => {
        if (!node || node.nodeName === 'DIV') {
            return;
        }
        if (validNodeNames.includes(node.nodeName))
            formats.push(node.nodeName);
        getFormats(node.parentNode);
    };
    getFormats(selection.anchorNode);
    return formats;
}
export function deepEqualStyles(objA, objB) {
    const objAKeys = Object.keys(objA);
    if (Object.keys(objB).length !== objAKeys.length)
        return false;
    for (let key in objAKeys) {
        if (objA[key] !== objB[key])
            return false;
    }
    return true;
}
export const keyToFormatMap = {
    b: 'bold',
    i: 'italic',
    u: 'underline'
};
export const formatToNodeNameMap = {
    bold: 'B',
    italic: 'I',
    underline: 'U'
};
