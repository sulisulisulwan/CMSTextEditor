import * as React from 'react'
import * as ReactDom from 'react-dom/client'
import { TextEditor, HTMLTextParser } from '../../lib/index.js'

const parser = new HTMLTextParser({
  groupParagraphsAsDiv: true
})

const App = () => {

  const [ html, setHtml ] = React.useState('')
  const onClickSave = () => {
    const components = parser.parseToComponents(html)
    const newHtml = parser.parseToHtml(components)
    setHtml(newHtml)
  }

  return (
    <>
      <button onClick={onClickSave}>SAVE</button>
      <TextEditor 
        html={html} 
        setHtml={setHtml} 
        wrapperStyle={{
          border: 'red 1px solid',
          height: '80vh'
        }}
        contentEditableStyle={{
          background: 'lightgray',
          border: '1px solid gray',
          height: '80%',
          minWidth: 300,
          width: '50%',
          overflow: 'scroll'
        }}
        toolbar={null}
      />
    </>
  )
}

const container = document.getElementById('app')

const root = ReactDom.createRoot(container)
root.render(<App/>)