"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ComponentsToHTML_1 = require("./ComponentsToHTML");
var HTMLToComponents_1 = require("./HTMLToComponents");
var HTMLTextParser = /** @class */ (function () {
    function HTMLTextParser() {
        this.toComponents = new HTMLToComponents_1.default();
    }
    HTMLTextParser.prototype.parseToHtml = function (components) {
        return ComponentsToHTML_1.default.createHTMLString(components);
    };
    HTMLTextParser.prototype.parseToComponents = function (htmlString) {
        var dom = new DOMParser().parseFromString(htmlString, 'text/html');
        var doc = dom.children[0].children[1];
        var parsed = this.toComponents.parse(doc);
        return parsed;
    };
    return HTMLTextParser;
}());
exports.default = HTMLTextParser;
