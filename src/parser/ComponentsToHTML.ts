import { iComponent } from "../types/component"

class ComponentsToHTML {

  static createHTMLString(components: iComponent[]): string {
    let html = ''
    components.forEach((component: iComponent) => html += ComponentsToHTML.parseComponent(component))
    return html
  }

  static parseComponent(component: iComponent): string | iComponent[] {
    if (component.type === 'text') {
      return component.content
    }

    if (component.content) {
      let tagContent = '';
      (component.content as iComponent[]).forEach((child: iComponent) => tagContent += ComponentsToHTML.parseComponent(child))
      return `<${component.type}>${tagContent}</${component.type}>`
    }

    return `<${component.type}/>`
  }

}

export default ComponentsToHTML