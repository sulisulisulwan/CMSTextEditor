import * as React from 'react'
import * as ReactDom from 'react-dom/client'
import TextEditor from './editor/TextEditor'
import HTMLTextParser from './parser/HTMLTextParser'

const parser = new HTMLTextParser({
  groupParagraphsAsDiv: true
})

const App = () => {

  const [ html, setHtml ] = React.useState('')
  const onClickSave = () => {
    const components = parser.parseToComponents(html)
    const newHtml = parser.parseToHtml(components)
    setHtml(newHtml)
    console.log('saved!')
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
      />
    </>
  )
}

const container = document.getElementById('app')

const root = ReactDom.createRoot(container)
root.render(<App/>)