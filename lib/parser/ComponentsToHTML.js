var ComponentsToHTML = /** @class */ (function () {
    function ComponentsToHTML() {
    }
    ComponentsToHTML.createHTMLString = function (components) {
        var html = '';
        components.forEach(function (component) { return html += ComponentsToHTML.parseComponent(component); });
        return html;
    };
    ComponentsToHTML.parseComponent = function (component) {
        if (component.type === 'text') {
            return component.content;
        }
        var tagContent = '';
        component.content.forEach(function (child) { return tagContent += ComponentsToHTML.parseComponent(child); });
        return "<".concat(component.type, ">").concat(tagContent, "</").concat(component.type, ">");
    };
    return ComponentsToHTML;
}());
export default ComponentsToHTML;
