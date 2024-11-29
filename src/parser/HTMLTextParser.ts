import { iComponent } from "../types/component"
import ComponentsToHTML from "./ComponentsToHTML"
import HTMLToComponents from "./HTMLToComponents"

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

  parseToComponents(htmlString: string): iComponent[] {
    const dom = new DOMParser().parseFromString(htmlString, 'text/html')
    const doc = dom.children[0].children[1]
    const parsed = this.toComponents.parse(doc as HTMLElement)
    return parsed
  }
}

export default HTMLTextParser