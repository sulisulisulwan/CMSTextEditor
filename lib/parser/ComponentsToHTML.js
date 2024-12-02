class ComponentsToHTML {
    static createHTMLString(components) {
        let html = '';
        components.forEach((component) => html += ComponentsToHTML.parseComponent(component));
        return html;
    }
    static parseComponent(component) {
        if (component.type === 'text') {
            return component.content;
        }
        if (component.content && Array.isArray(component.content)) {
            let tagContent = component.content.reduce((childrenString, child) => childrenString += ComponentsToHTML.parseComponent(child), '');
            return `<${component.type}>${tagContent}</${component.type}>`;
        }
        if (component.content) {
            return `<${component.type}>${ComponentsToHTML.parseComponent(component.content)}</${component.type}>`;
        }
        return `<${component.type}/>`;
    }
}
export default ComponentsToHTML;
