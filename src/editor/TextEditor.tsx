import * as React from 'react'
import ContentEditable from './ContentEditable'
// import ContentEditable from './contentEditableClass'
import { iToolbarOptions } from '../types/toolbar'
import Toolbar from './toolbar/Toolbar'
import { formatToNodeNameMap, getFormatFromCaretLocation, keyToFormatMap } from './helpers/helpers'

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
    icons: ['bold', 'italic', 'underline'],
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

          if (e.type === 'keydown' && ['b', 'i', 'u'].includes(e.key) && e.metaKey) {
            setToolbarStatus((prevStatus) => ({ ...prevStatus, [keyToFormatMap[e.key]]: { selected: !prevStatus[keyToFormatMap[e.key]].selected} }))
            return
          }

          if (
            ['keyup', 'keydown', 'click'].includes(e.type) && ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)
            || e.type === 'click'
          ) {
            const currentFormatInCaret = getFormatFromCaretLocation(window.getSelection())
            const newToolbarStatus = { ...toolbarStatus}
            for(let format in toolbarStatus) {
              newToolbarStatus[format].selected = currentFormatInCaret.includes(formatToNodeNameMap[format]) 
            }
            setToolbarStatus(newToolbarStatus)
          }

        }}
      />
    </div>
  )
}

export default TextEditor