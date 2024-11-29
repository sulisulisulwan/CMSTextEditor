import { iComponent } from "../types/component"
import { iHTMLTextParserConfig } from "./HTMLTextParser"



class HTMLToComponents {

  private parsed: iComponent[]
  private nodeHandlers: Record<string, Function>
  protected currParagraph: null | iComponent
  protected componentTypeMap: Record<string, string>
  protected config: iHTMLTextParserConfig

  constructor(configOptions?: iHTMLTextParserConfig) {
    let config: iHTMLTextParserConfig = {
      groupParagraphsAsDiv: false
    }

    if (configOptions) {
      config = {
        ...configOptions
      }
    }
    
    this.config = config
    this.parsed = []
    this.currParagraph = null
    this.componentTypeMap = {
      '#text': 'text',
      'I': 'i',
      'B': 'b',
      'DIV': 'div',
      'U': 'u',
      'P': 'p',
      'BR': 'br'
    }
    
    this.nodeHandlers = {
      '#text': (node: HTMLElement): iComponent => this.handleTextComponent.bind(this)(node),
      'I': (node: HTMLElement): iComponent => this.handleItalicComponent.bind(this)(node),
      'B': (node: HTMLElement): iComponent => this.handleBoldComponent.bind(this)(node),
      'U': (node: HTMLElement): iComponent => this.handleUnderlineComponent.bind(this)(node),
      'DIV': (node: HTMLElement): iComponent | null => this.handleDiv.bind(this)(node),
      'P': (node: HTMLElement): iComponent | null => this.handleParagraphComponent.bind(this)(node),
      'BR': (): null => this.handleLineBreak.bind(this)()
    }
    

  }
  resetParser(): void {
    this.parsed = []
    this.currParagraph = null
  }

  parse(textDiv: HTMLElement): iComponent[] {
    this.resetParser()
    const nodesArray = this.wrapFirstTextNodes(textDiv)
    this.parseChildren(nodesArray)
    return this.parsed
  }
  
  wrapFirstTextNodes(textDiv: HTMLElement): HTMLElement[] {
    let nodesArray = [].slice.call(textDiv.childNodes)
    
    if (nodesArray.length) {
  
      if (!['P', 'DIV'].includes(nodesArray[0].nodeName)) {
        const initialParagraph = document.createElement('p')
        nodesArray = nodesArray.reduce((accum: HTMLElement[], curr: HTMLElement) => {
          if (!['P', 'DIV'].includes(curr.nodeName)) {
            initialParagraph.appendChild(curr)
          } else {
            accum.push(curr)
          }
          return accum
        }, [initialParagraph])
  
      }
    }

    return nodesArray
  }



  parseChildren(children: HTMLElement[]) {
    children.forEach(child => {
      let nodeHandler = this.nodeHandlers[child.nodeName]
      if (nodeHandler) {
        const newComponent = nodeHandler(child)
        if (newComponent) this.parsed.push(newComponent)
      }
    })
  }

  handleLineBreak(): iComponent | null {
    if (this.config.groupParagraphsAsDiv) {
      return {
        type: 'br',
        content: null
      }
    }
    return null
  }

  handleItalicComponent(htmlNode: HTMLElement): iComponent {
    const content: iComponent[] = []
    htmlNode.childNodes.forEach(child => {
      const childComponent = this.nodeHandlers[child.nodeName](child)
      if (childComponent) content.push(childComponent)
    })
    return {
      type: 'i',
      content
    }
  }

  handleBoldComponent(htmlNode: HTMLElement): iComponent {
    const content: iComponent[] = []
    htmlNode.childNodes.forEach(child => {
      const childComponent = this.nodeHandlers[child.nodeName](child)
      if (childComponent) content.push(childComponent)
    })
    return {
      type: 'b',
      content
    }
  }

  handleUnderlineComponent(htmlNode: HTMLElement): iComponent {
    const content: iComponent[] = []
    htmlNode.childNodes.forEach(child => {
      const childComponent = this.nodeHandlers[child.nodeName](child)
      if (childComponent) content.push(childComponent)
    })
    return {
      type: 'u',
      content
    }
  }

  handleParagraphComponent(htmlNode: HTMLElement): iComponent | null {

    const content: iComponent[] = []
    htmlNode.childNodes.forEach(child => {
      const childComponent = this.nodeHandlers[child.nodeName](child)
      if (childComponent) content.push(childComponent)
    })

    if (!content.length) return null

    return {
      type: this.config.groupParagraphsAsDiv ? 'div' : 'p',
      content: content
    }
  }
  
  handleTextComponent(textNode: Text): iComponent {
    return {
      type: 'text',
      content: textNode.textContent as string
    }
  }

  handleDiv(node: HTMLElement): iComponent | null {
    const newComponent = this.handleParagraphComponent(node)
    return newComponent
  }

}

export default HTMLToComponents