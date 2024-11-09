# CMSTextEditor
Simple text editor component for content management system

To use:

Import TextEditor into your React project.

```
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
```
