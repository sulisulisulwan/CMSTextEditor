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
        if (component.content) {
            let tagContent = '';
            if (Array.isArray(component.content)) {
                component.content.forEach((child) => tagContent += ComponentsToHTML.parseComponent(child));
                return `<${component.type}>${tagContent}</${component.type}>`;
            }
            tagContent += ComponentsToHTML.parseComponent(component.content);
        }
        return `<${component.type}/>`;
    }
}
export default ComponentsToHTML;
