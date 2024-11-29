import ComponentsToHTML from "./ComponentsToHTML.js";
import HTMLToComponents from "./HTMLToComponents.js";
class HTMLTextParser {
    constructor(configOptions) {
        this.toComponents = new HTMLToComponents(configOptions);
    }
    parseToHtml(components) {
        return ComponentsToHTML.createHTMLString(components);
    }
    parseToReactElements(reactLibrary, components) {
        return components.map(component => createParsedComponent(reactLibrary, component, -1));
    }
    parseToComponents(htmlString) {
        const dom = new DOMParser().parseFromString(htmlString, 'text/html');
        const doc = dom.children[0].children[1];
        const parsed = this.toComponents.parse(doc);
        return parsed;
    }
}
const createParsedComponent = (reactLibrary, component, index) => {
    if (component.type === 'text') {
        return component.content;
    }
    const childrenComponents = Array.isArray(component.content) ?
        component.content.map((childComponent, i) => createParsedComponent(reactLibrary, childComponent, i))
        : component.content ? createParsedComponent(reactLibrary, component.content, index)
            : null;
    return reactLibrary.createElement(component.type, { key: component.type + index + Math.random() }, childrenComponents);
};
export default HTMLTextParser;
