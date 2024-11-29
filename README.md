Simple text editor component for content management system

To use:

Import TextEditor into your React project.

import React, { useState } from 'react'
import { TextEditor } from '@sulimantekalli/CMSTextEditor'

const MyComponent = () => {
  const [html, setHtml] = useState('')

  const textEditorStyle = {
    height: 500,
    width: 500,
    border: '1px solid black'
  }

  return (
    <>
      <TextEditor
        html={html}
        setHtml={setHtml}
        style={textEditorStyle}
      />
    </>
  )
}
HTMLTextParser

HTMLTextParser.parseToComponents() Turns html strings into normalized CMSTextEditor components where all line breaks and divs become paragraphs.

HTMLTextParser.parseToHtml() Turns CMSTextEditor components back into a single html string

Intended usage of the parser is storage of documents as JSON