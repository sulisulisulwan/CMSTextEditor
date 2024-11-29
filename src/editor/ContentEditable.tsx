import * as React from 'react';
import { deepEqualStyles, normalizeHtml, replaceCaret } from './helpers/helpers.js';

/**
 * A simple component for an html element with editable contents.
 */

export type ContentEditableEvent = React.SyntheticEvent<any, Event> & { target: { value: string } };
type Modify<T, R> = Pick<T, Exclude<keyof T, keyof R>> & R;
type DivProps = Modify<JSX.IntrinsicElements["div"], { onChange: ((event: ContentEditableEvent) => void) }>;

export interface Props extends DivProps {
  html: string,
  disabled?: boolean,
  tagName?: string,
  className?: string,
  style?: Object,
  innerref?: React.RefObject<HTMLElement> | Function,
  placeholder?: string
  afterChangeEmit?: Function
  beforeChangeEmit?: Function
}


const shouldComponentUpdate = (props: Props, nextProps: Props) => {
  //Returning false in this function actually means YES the component should update
  //Why? because the return boolean here actually represents whether or not previous props equal current props.
  const { innerref } = props
  const element: HTMLElement = (innerref as React.MutableRefObject<HTMLElement>).current

  // We need not rerender if the change of props simply reflects the user's edits.
  // Rerendering in this case would make the cursor/caret jump

  // Rerender if there is no element yet... (somehow?)
  if (!element) return false;
  
  // ...or if html really changed... (programmatically, not by user edit)
  if (normalizeHtml(nextProps.html) !== normalizeHtml(element.innerHTML)) {
    return false;
  }

  // Handle additional properties
  return props.disabled === nextProps.disabled ||
    props.tagName === nextProps.tagName ||
    props.className === nextProps.className ||
    props.innerref === nextProps.innerref ||
    props.placeholder === nextProps.placeholder ||
    deepEqualStyles(props.style, nextProps.style);
}

const ContentEditableFunction = React.memo(
  (props: Props) => {
    const { html, innerref, tagName } = props
    let lastHtml = html

    // el will 
    let el: React.MutableRefObject<null | HTMLElement> = typeof innerref === 'function' ? { current : null } : React.createRef<HTMLElement | null>()
    
    const componentDidMount = React.useRef(false)
    React.useEffect(() => {
      if (!componentDidMount.current) {
        componentDidMount.current = true
        return
      } 

      
      //componentDidUpdate function here
      const element = (innerref && typeof innerref !== 'function' ? innerref : el).current
      if (!element) return;

      // Perhaps React (whose VDOM gets outdated because we often prevent
      // rerendering) did not update the DOM. So we update it manually now.
      if (props.html !== element.innerHTML) {
        element.innerHTML = props.html;
      }
      lastHtml = props.html;
      replaceCaret(element);
      
    }, [])

    const emitChange = (originalEvt: React.SyntheticEvent<any>) => {
      if (props.beforeChangeEmit) {
        props.beforeChangeEmit(originalEvt)
      }
      const element = (innerref && typeof innerref !== 'function' ? innerref : el).current
      
      if (!element) return;

      const currInnerHtml = element.innerHTML;

      if (props.onChange && currInnerHtml !== lastHtml) { 
        // Clone event with Object.assign to avoid "Cannot assign to read only property 'target' of object"
        const evt = Object.assign({}, originalEvt, { target: { value: currInnerHtml } });
        props.onChange(evt);
      }
      lastHtml = currInnerHtml;

      if (props.afterChangeEmit) {
        props.afterChangeEmit(originalEvt)
      }
    }

    const copiedProps = {
      ...props
    }

    delete copiedProps.afterChangeEmit
    delete copiedProps.beforeChangeEmit

    return React.createElement(
      tagName || 'div',
      {
        ...copiedProps,
        ref: typeof innerref === 'function' ? (current: HTMLElement): void => {
          innerref(current)
          el.current = current
        } : innerref || el,
        onInput: emitChange,
        onChange:emitChange,
        onClick: emitChange,
        onBlur: props.onBlur || emitChange,
        onKeyUp: props.onKeyUp || emitChange,
        onKeyDown: props.onKeyDown || emitChange,
        contentEditable: !props.disabled,
        dangerouslySetInnerHTML: { __html: html }
      },
      props.children);
  }, 
  shouldComponentUpdate
)



export default ContentEditableFunction