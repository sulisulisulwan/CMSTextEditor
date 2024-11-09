import * as React from 'react'
import ContentEditable from 'react-contenteditable'

interface iTextEditorProps {
  html: string
  setHtml: React.Dispatch<React.SetStateAction<string>>
  style: React.CSSProperties
}

const TextEditor = ({ html, setHtml, style }: iTextEditorProps) => {
  
  const contentEditable = React.useRef()

  return (
    <div id={'textEditor'}>      
      <ContentEditable
        style={style}
        innerRef={contentEditable}
        html={html}
        disabled={false}
        onChange={(e) => { setHtml(e.target.value) }}
      />
    </div>
  )
}

export default TextEditor