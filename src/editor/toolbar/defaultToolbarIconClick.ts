
const onClickBold = () => {
  console.log('clicked bold')
}

const onClickUnderline = () => {
  console.log('clicked underline')
}

const onClickItalic = () => {
  console.log('clicked italic')
}

const onClickJustifyLeft = () => {
  console.log('clicked justify left')
}

const onClickJustifyRight = () => {
  console.log('clicked justify right')
}

const onClickJustifyCenter = () => {
  console.log('clicked justify center')
}

const iconClickFuncs: Record<string, React.MouseEventHandler<HTMLImageElement>> = {
  'bold': onClickBold,
  'italic': onClickItalic,
  'underline': onClickUnderline,
  'justifyLeft': onClickJustifyLeft,
  'justifyRight': onClickJustifyRight,
  'justifyCenter': onClickJustifyCenter
}

export default iconClickFuncs