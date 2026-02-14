const onClickBold = (toggled) => {
    document.execCommand('bold');
};
const onClickUnderline = () => {
    document.execCommand('underline');
};
const onClickItalic = () => {
    document.execCommand('italic');
};
const onClickJustifyLeft = () => {
    document.execCommand('justifyLeft');
};
const onClickJustifyRight = () => {
    document.execCommand('justifyRight');
};
const onClickJustifyCenter = () => {
    document.execCommand('justifyCenter');
};
const onClickUnorderedList = () => {
    document.execCommand('insertUnorderedList');
};
const onClickOrderedList = () => {
    document.execCommand('insertOrderedList');
};
const iconClickFuncs = {
    'bold': onClickBold,
    'italic': onClickItalic,
    'underline': onClickUnderline,
    'unorderedList': onClickUnorderedList,
    'orderedList': onClickOrderedList,
    'justifyLeft': onClickJustifyLeft,
    'justifyRight': onClickJustifyRight,
    'justifyCenter': onClickJustifyCenter
};
export default iconClickFuncs;
