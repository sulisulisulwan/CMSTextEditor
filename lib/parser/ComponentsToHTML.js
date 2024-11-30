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
                component.content.reduce((childrenString, child) => childrenString += ComponentsToHTML.parseComponent(child), tagContent);
                const toReturn = `<${component.type}>${tagContent}</${component.type}>`;
                return toReturn;
            }
            return `<${component.type}>${tagContent += ComponentsToHTML.parseComponent(component.content)}</${component.type}>`;
        }
        return `<${component.type}/>`;
    }
}
export default ComponentsToHTML;
