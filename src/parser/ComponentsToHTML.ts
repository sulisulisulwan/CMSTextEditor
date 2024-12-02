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

    if (component.content && Array.isArray(component.content)) {
      let tagContent = (component.content as iComponent[]).reduce((childrenString, child: iComponent) => childrenString += ComponentsToHTML.parseComponent(child), '')
      return `<${component.type}>${tagContent}</${component.type}>`
    }

    if (component.content) {
      return `<${component.type}>${ComponentsToHTML.parseComponent(component.content as unknown as iComponent)}</${component.type}>`
    }

    return `<${component.type}/>`
  }

}

export default ComponentsToHTML