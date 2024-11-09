import ComponentsToHTML from "./ComponentsToHTML.js";
import HTMLToComponents from "./HTMLToComponents.js";
var HTMLTextParser = /** @class */ (function () {
    function HTMLTextParser() {
        this.toComponents = new HTMLToComponents();
    }
    HTMLTextParser.prototype.parseToHtml = function (components) {
        return ComponentsToHTML.createHTMLString(components);
    };
    HTMLTextParser.prototype.parseToComponents = function (htmlString) {
        var dom = new DOMParser().parseFromString(htmlString, 'text/html');
        var doc = dom.children[0].children[1];
        var parsed = this.toComponents.parse(doc);
        return parsed;
    };
    return HTMLTextParser;
}());
export default HTMLTextParser;
