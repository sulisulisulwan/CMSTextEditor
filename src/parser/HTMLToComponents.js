"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HTMLToComponents = /** @class */ (function () {
    function HTMLToComponents() {
        var _this = this;
        this.parsed = [];
        this.currParagraph = null;
        this.componentTypeMap = {
            '#text': 'text',
            'I': 'i',
            'B': 'b',
            'DIV': 'div',
            'U': 'u',
            'P': 'p',
            'BR': 'br'
        };
        this.nodeHandlers = {
            '#text': function (node) { return _this.handleTextComponent.bind(_this)(node); },
            'I': function (node) { return _this.handleItalicComponent.bind(_this)(node); },
            'B': function (node) { return _this.handleBoldComponent.bind(_this)(node); },
            'U': function (node) { return _this.handleUnderlineComponent.bind(_this)(node); },
            'DIV': function (node) { return _this.handleDiv.bind(_this)(node); },
            'P': function (node) { return _this.handleParagraphComponent.bind(_this)(node); },
            'BR': function () { return _this.handleLineBreak.bind(_this)(); }
        };
    }
    HTMLToComponents.prototype.resetParser = function () {
        this.parsed = [];
        this.currParagraph = null;
    };
    HTMLToComponents.prototype.parse = function (textDiv) {
        this.resetParser();
        var nodesArray = this.wrapFirstTextNodes(textDiv);
        this.parseChildren(nodesArray);
        return this.parsed;
    };
    HTMLToComponents.prototype.wrapFirstTextNodes = function (textDiv) {
        var nodesArray = [].slice.call(textDiv.childNodes);
        if (nodesArray.length) {
            if (!['P', 'DIV'].includes(nodesArray[0].nodeName)) {
                var initialParagraph_1 = document.createElement('p');
                nodesArray = nodesArray.reduce(function (accum, curr) {
                    if (!['P', 'DIV'].includes(curr.nodeName)) {
                        initialParagraph_1.appendChild(curr);
                    }
                    else {
                        accum.push(curr);
                    }
                    return accum;
                }, [initialParagraph_1]);
            }
        }
        return nodesArray;
    };
    HTMLToComponents.prototype.parseChildren = function (children) {
        var _this = this;
        children.forEach(function (child) {
            var nodeHandler = _this.nodeHandlers[child.nodeName];
            if (nodeHandler) {
                var newComponent = nodeHandler(child);
                if (newComponent)
                    _this.parsed.push(newComponent);
            }
        });
    };
    HTMLToComponents.prototype.handleLineBreak = function () {
        return null;
    };
    HTMLToComponents.prototype.handleItalicComponent = function (htmlNode) {
        var _this = this;
        var content = [];
        htmlNode.childNodes.forEach(function (child) {
            var childComponent = _this.nodeHandlers[child.nodeName](child);
            if (childComponent)
                content.push(childComponent);
        });
        return {
            type: 'i',
            content: content
        };
    };
    HTMLToComponents.prototype.handleBoldComponent = function (htmlNode) {
        var _this = this;
        var content = [];
        htmlNode.childNodes.forEach(function (child) {
            var childComponent = _this.nodeHandlers[child.nodeName](child);
            if (childComponent)
                content.push(childComponent);
        });
        return {
            type: 'b',
            content: content
        };
    };
    HTMLToComponents.prototype.handleUnderlineComponent = function (htmlNode) {
        var _this = this;
        var content = [];
        htmlNode.childNodes.forEach(function (child) {
            var childComponent = _this.nodeHandlers[child.nodeName](child);
            if (childComponent)
                content.push(childComponent);
        });
        return {
            type: 'u',
            content: content
        };
    };
    HTMLToComponents.prototype.handleParagraphComponent = function (htmlNode) {
        var _this = this;
        var content = [];
        htmlNode.childNodes.forEach(function (child) {
            var childComponent = _this.nodeHandlers[child.nodeName](child);
            if (childComponent)
                content.push(childComponent);
        });
        if (!content.length)
            return null;
        return {
            type: 'p',
            content: content
        };
    };
    HTMLToComponents.prototype.handleTextComponent = function (textNode) {
        return {
            type: 'text',
            content: textNode.textContent
        };
    };
    HTMLToComponents.prototype.handleDiv = function (node) {
        var newComponent = this.handleParagraphComponent(node);
        return newComponent;
    };
    return HTMLToComponents;
}());
exports.default = HTMLToComponents;
