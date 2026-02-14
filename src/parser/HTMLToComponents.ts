import { iComponent } from "../types/component"
import { iHTMLTextParserConfig } from "./HTMLTextParser.js"



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
      'BR': 'br',
      'OL': 'ol',
      'UL': 'ul',
      'LI': 'li'
    }
    
    this.nodeHandlers = {
      '#text': (node: HTMLElement): iComponent => this.handleTextComponent.bind(this)(node),
      'I': (node: HTMLElement): iComponent => this.handleItalicComponent.bind(this)(node),
      'B': (node: HTMLElement): iComponent => this.handleBoldComponent.bind(this)(node),
      'U': (node: HTMLElement): iComponent => this.handleUnderlineComponent.bind(this)(node),
      'DIV': (node: HTMLElement): iComponent | null => this.handleDiv.bind(this)(node),
      'P': (node: HTMLElement): iComponent | null => this.handleParagraphComponent.bind(this)(node),
      'BR': (): null => this.handleLineBreak.bind(this)(),
      'OL': (node: HTMLElement): iComponent => this.handleOrderedListComponent.bind(this)(node),
      'UL': (node: HTMLElement): iComponent => this.handleUnorderedListComponent.bind(this)(node),
      'LI': (node: HTMLElement): iComponent => this.handleListItemComponent.bind(this)(node)
    }
  }

  resetParser(): void {
    this.parsed = []
    this.currParagraph = null
  }

  parse(editorDiv: HTMLElement): iComponent[] {
    this.resetParser()
    const nodesArray = this.wrapFirstTextNodes(editorDiv)
    this.parseChildren(nodesArray)
    return this.parsed
  }
  
  wrapFirstTextNodes(editorDiv: HTMLElement): HTMLElement[] {
    let nodesArray = [].slice.call(editorDiv.childNodes)
    
    if (nodesArray.length) {
  
      if (!['P', 'DIV', 'OL', 'UL'].includes(nodesArray[0].nodeName)) {
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

  handleOrderedListComponent(htmlNode: HTMLElement): iComponent {
    const content: iComponent[] = []
    
    htmlNode.childNodes.forEach(child => {
      const childComponent = this.nodeHandlers[child.nodeName](child);
      if (childComponent)
          content.push(childComponent);
    });
    return {
      type: 'ol',
      content
    }
  }

  handleUnorderedListComponent(htmlNode: HTMLElement): iComponent {
    const content: iComponent[] = []

    htmlNode.childNodes.forEach(child => {
      const childComponent = this.nodeHandlers[child.nodeName](child);
      if (childComponent)
          content.push(childComponent);
    });
    return {
      type: 'ul',
      content
    }
  }

  handleListItemComponent(htmlNode: HTMLElement): iComponent {
    const content: iComponent[] = []

    htmlNode.childNodes.forEach(child => {
      const childComponent = this.nodeHandlers[child.nodeName](child);
      if (childComponent)
          content.push(childComponent);
    });
    return {
      type: 'li',
      content
    }
  }



}

export default HTMLToComponents