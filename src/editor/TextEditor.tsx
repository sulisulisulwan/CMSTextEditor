import * as React from 'react'
import { iToolbarOptions } from '../types/toolbar'
import ContentEditable from './ContentEditable.js'
import Toolbar from './toolbar/Toolbar.js'
import { formatToNodeNameMap, getFormatFromCaretLocation, keyToFormatMap } from './helpers/helpers.js'
import defaultIconSrcs from './toolbar/defaultToolbarIconMap.js'

interface iTextEditorProps {
  html: string
  setHtml: React.Dispatch<React.SetStateAction<string>>
  style: React.CSSProperties
  toolbar?: iToolbarOptions
}

type iToolbarStatus = Record<string, { selected: boolean }>

const TextEditor = ({ html, setHtml, style, toolbar }: iTextEditorProps) => {

  const contentEditable = React.useRef()

  let toolbarOptions: iToolbarOptions = {
    disabled: false,
    orientation: 'vertical',
    icons: [
      'bold', 
      'italic', 
      'underline', 
      'justifyLeft', 
      'justifyCenter', 
      'justifyRight', 
      'orderedList', 
      'unorderedList'
    ],
    iconImages: defaultIconSrcs,
    iconStyle: {
      height: 15,
      width: 15,
      border: 'solid gray 1px',
      padding: 10,
      onHover: {
        backgroundColor: 'white'
      }
    }
  }

  if (toolbar) {
    toolbarOptions = {
      ...toolbar
    }
  }

  const [ toolbarStatus, setToolbarStatus ] = React.useState<iToolbarStatus>(toolbarOptions.icons.reduce((status: iToolbarStatus, iconName: string )=> {
    status[iconName] = {
      selected: false,
    }
    return status
  }, {}))

  
  return (
    <div id={'textEditor'}>      
      <Toolbar 
        toolbarOptions={toolbarOptions}
        toolbarStatus={toolbarStatus}
        setToolbarStatus={setToolbarStatus}
      />
      <ContentEditable
        style={style}
        innerref={contentEditable}
        html={html}
        disabled={false}
        onChange={(e) => { 
          setHtml(e.target.value) 
        }}
        afterChangeEmit={(e: any) => {
          //This scope WILL contain the most updated DOM data from contenteditable (window.getSelection, document, etc.)

          if (isValidMetaKeyCombo(e)) {
            return setToolbarStatus((prevStatus) => ({ ...prevStatus, [keyToFormatMap[e.key]]: { selected: !prevStatus[keyToFormatMap[e.key]].selected} }))
          }

          if (userMovedCaret(e)) {
            return updateToolbarStatusToCaretLocation(toolbarStatus, setToolbarStatus)
          }

        }}
      />
    </div>
  )
}

const userMovedCaret = (e: any) => {
  return ['keyup', 'keydown', 'click'].includes(e.type) 
    && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)
    || e.type === 'click'
}

const updateToolbarStatusToCaretLocation = (toolbarStatus: iToolbarStatus, setToolbarStatus: React.Dispatch<React.SetStateAction<iToolbarStatus>>) => {
  const currentFormatInCaret = getFormatFromCaretLocation(window.getSelection())
  const newToolbarStatus = { ...toolbarStatus}
  for(let format in toolbarStatus) {
    newToolbarStatus[format].selected = currentFormatInCaret.includes(formatToNodeNameMap[format]) 
  }
  setToolbarStatus(newToolbarStatus)
}

const isValidMetaKeyCombo = (e: any) => {
  return e.type === 'keydown' && ['b', 'i', 'u'].includes(e.key) && e.metaKey
}

export default TextEditor