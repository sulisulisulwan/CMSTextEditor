import { iComponent } from "../types/component"
import ComponentsToHTML from "./ComponentsToHTML.js"
import HTMLToComponents from "./HTMLToComponents.js"

export interface iHTMLTextParserConfig {
  groupParagraphsAsDiv?: boolean
}

class HTMLTextParser {

  private toComponents: HTMLToComponents

  constructor(configOptions: iHTMLTextParserConfig) {
    this.toComponents = new HTMLToComponents(configOptions)
  }

  parseToHtml(components: iComponent[]): string {
    return ComponentsToHTML.createHTMLString(components)
  }

  parseToReactElements(reactLibrary: any, components: iComponent[]) {
    return components.map(component => createParsedComponent(reactLibrary, component, -1))
  }

  parseToComponents(htmlString: string): iComponent[] {
    const dom = new DOMParser().parseFromString(htmlString, 'text/html')
    const doc = dom.children[0].children[1]
    const parsed = this.toComponents.parse(doc as HTMLElement)
    return parsed
  }
}

const createParsedComponent = (reactLibrary: any, component: iComponent, index: number): any => {

  if (component.type === 'text') {
    return component.content
  }
  
  const childrenComponents = Array.isArray(component.content) ? 
    component.content.map((childComponent: any, i: number): any => createParsedComponent(reactLibrary, childComponent, i)) 
    : component.content ? createParsedComponent(reactLibrary, component.content as unknown as iComponent, index)
    : null
  
  return reactLibrary.createElement(component.type, { key: component.type + index + Math.random() }, childrenComponents)
}

export default HTMLTextParser