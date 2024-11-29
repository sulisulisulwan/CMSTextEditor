import * as React from 'react'

interface iToolbarIconProps {
  iconOnClick: React.MouseEventHandler<HTMLImageElement>
  src: string
  style: React.CSSProperties & { onHover: React.CSSProperties }
  isActivated: boolean
}

const ToolbarIcon = ({ src, style, iconOnClick, isActivated }: iToolbarIconProps) => {

  const [ isHovering, setIsHovering ] = React.useState(false)

  let computedStyle = {
    ...style,
  }

  if (isHovering || isActivated) {
    if (style.onHover) {
      computedStyle = {
        ...computedStyle,
        ...style.onHover
      }
    } else {
      computedStyle = {
        ...computedStyle,
        backgroundColor: 'aliceblue'
      }
    }

  }

  delete style.onHover

  return (
    <img 
      onClick={iconOnClick}
      onMouseEnter={() => { setIsHovering(true)} }
      onMouseLeave={() => { setIsHovering(false)} }
      src={src} 
      style={computedStyle}
    />
  )
}
export default ToolbarIcon