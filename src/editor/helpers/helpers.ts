export function normalizeHtml(str: string): string {
  return str && str.replace(/&nbsp;|\u202F|\u00A0/g, ' ').replace(/<br \/>/g, '<br>');
}

export function replaceCaret(el: HTMLElement) {
  // Place the caret at the end of the element
  const target = document.createTextNode('');
  el.appendChild(target);
  // do not move caret if element was not focused
  const isTargetFocused = document.activeElement === el;
  if (target !== null && target.nodeValue !== null && isTargetFocused) {
    var sel = window.getSelection();
    if (sel !== null) {
      var range = document.createRange();
      range.setStart(target, target.nodeValue.length);
      range.collapse(true);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    if (el instanceof HTMLElement) el.focus();
  }
}

export function getFormatFromCaretLocation(selection: Selection): string[] {
  
  const formats: string[] = []
  const validNodeNames = ['B', 'U', 'I']

  const getFormats = (node: Node) => {
    if (!node || node.nodeName === 'DIV') {
      return
    }

    if (validNodeNames.includes(node.nodeName)) formats.push(node.nodeName)
    
    getFormats(node.parentNode)
  }

  getFormats(selection.anchorNode)
  return formats
}

export function deepEqualStyles(objA: React.CSSProperties, objB: React.CSSProperties) {
  const objAKeys = Object.keys(objA)
  if (Object.keys(objB).length !== objAKeys.length) return false

  for (let key in objAKeys) {
    if (objA[key as keyof React.CSSProperties] !== objB[key as keyof React.CSSProperties]) return false
  }

  return true
}

export const keyToFormatMap: Record<string, string> = {
  b: 'bold',
  i: 'italic',
  u: 'underline'
}

export const formatToNodeNameMap: Record<string, string> = {
  bold: 'B',
  italic: 'I',
  underline: 'U'
}