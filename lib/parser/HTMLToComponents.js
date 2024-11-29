class HTMLToComponents {
    constructor(configOptions) {
        let config = {
            groupParagraphsAsDiv: false
        };
        if (configOptions) {
            config = Object.assign({}, configOptions);
        }
        this.config = config;
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
            '#text': (node) => this.handleTextComponent.bind(this)(node),
            'I': (node) => this.handleItalicComponent.bind(this)(node),
            'B': (node) => this.handleBoldComponent.bind(this)(node),
            'U': (node) => this.handleUnderlineComponent.bind(this)(node),
            'DIV': (node) => this.handleDiv.bind(this)(node),
            'P': (node) => this.handleParagraphComponent.bind(this)(node),
            'BR': () => this.handleLineBreak.bind(this)()
        };
    }
    resetParser() {
        this.parsed = [];
        this.currParagraph = null;
    }
    parse(textDiv) {
        this.resetParser();
        const nodesArray = this.wrapFirstTextNodes(textDiv);
        this.parseChildren(nodesArray);
        return this.parsed;
    }
    wrapFirstTextNodes(textDiv) {
        let nodesArray = [].slice.call(textDiv.childNodes);
        if (nodesArray.length) {
            if (!['P', 'DIV'].includes(nodesArray[0].nodeName)) {
                const initialParagraph = document.createElement('p');
                nodesArray = nodesArray.reduce((accum, curr) => {
                    if (!['P', 'DIV'].includes(curr.nodeName)) {
                        initialParagraph.appendChild(curr);
                    }
                    else {
                        accum.push(curr);
                    }
                    return accum;
                }, [initialParagraph]);
            }
        }
        return nodesArray;
    }
    parseChildren(children) {
        children.forEach(child => {
            let nodeHandler = this.nodeHandlers[child.nodeName];
            if (nodeHandler) {
                const newComponent = nodeHandler(child);
                if (newComponent)
                    this.parsed.push(newComponent);
            }
        });
    }
    handleLineBreak() {
        if (this.config.groupParagraphsAsDiv) {
            return {
                type: 'br',
                content: null
            };
        }
        return null;
    }
    handleItalicComponent(htmlNode) {
        const content = [];
        htmlNode.childNodes.forEach(child => {
            const childComponent = this.nodeHandlers[child.nodeName](child);
            if (childComponent)
                content.push(childComponent);
        });
        return {
            type: 'i',
            content
        };
    }
    handleBoldComponent(htmlNode) {
        const content = [];
        htmlNode.childNodes.forEach(child => {
            const childComponent = this.nodeHandlers[child.nodeName](child);
            if (childComponent)
                content.push(childComponent);
        });
        return {
            type: 'b',
            content
        };
    }
    handleUnderlineComponent(htmlNode) {
        const content = [];
        htmlNode.childNodes.forEach(child => {
            const childComponent = this.nodeHandlers[child.nodeName](child);
            if (childComponent)
                content.push(childComponent);
        });
        return {
            type: 'u',
            content
        };
    }
    handleParagraphComponent(htmlNode) {
        const content = [];
        htmlNode.childNodes.forEach(child => {
            const childComponent = this.nodeHandlers[child.nodeName](child);
            if (childComponent)
                content.push(childComponent);
        });
        if (!content.length)
            return null;
        return {
            type: this.config.groupParagraphsAsDiv ? 'div' : 'p',
            content: content
        };
    }
    handleTextComponent(textNode) {
        return {
            type: 'text',
            content: textNode.textContent
        };
    }
    handleDiv(node) {
        const newComponent = this.handleParagraphComponent(node);
        return newComponent;
    }
}
export default HTMLToComponents;
