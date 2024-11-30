import * as React from 'react'
import * as ReactDom from 'react-dom/client'
// import TextEditor from '../../src/editor/TextEditor'
// import HTMLTextParser from '../../lib/parser/HTMLTextParser'
import { TextEditor, HTMLTextParser } from '../../lib'
console.log(TextEditor)

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
        style={{
          background: 'lightgray',
          border: '1px solid gray',
          height: 400,
          width: 400,
        }}
        toolbar={null}
      />
    </>
  )
}

const container = document.getElementById('app')

const root = ReactDom.createRoot(container as ReactDom.Container)
root.render(<App/>)