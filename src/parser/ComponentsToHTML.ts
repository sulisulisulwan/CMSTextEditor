import { iComponent } from "../types/component"

class ComponentsToHTML {

  static createHTMLString(components: iComponent[]): string {
    let html = ''
    components.forEach((component: iComponent) => html += ComponentsToHTML.parseComponent(component))
    return html
  }

  static parseComponent(component: iComponent): string | iComponent | iComponent[] {
    if (component.type === 'text') {
      return component.content
    }

    if (component.content) {
      let tagContent = '';

      if (Array.isArray(component.content)) {
        (component.content as iComponent[]).forEach((child: iComponent) => tagContent += ComponentsToHTML.parseComponent(child))
        return `<${component.type}>${tagContent}</${component.type}>`
      }
      
      tagContent += ComponentsToHTML.parseComponent(component.content as unknown as iComponent)
    }

    return `<${component.type}/>`
  }

}

export default ComponentsToHTML