import * as React from 'react'
import { iToolbarOptions } from '../../types/toolbar'
import ToolbarIcon from './ToolbarIcon.js'
import iconClickFuncs from './defaultToolbarIconClick.js'

interface iToolbarProps {
  toolbarOptions: iToolbarOptions
  setToolbarStatus: React.Dispatch<React.SetStateAction<any>>
  toolbarStatus: any
}

const Toolbar = ({ toolbarOptions, setToolbarStatus, toolbarStatus }: iToolbarProps) => {
 
  return (
    <>{toolbarOptions.icons.map((iconName: string, i: number) => {
      return (
        <ToolbarIcon 
          key={iconName + i}
          src={toolbarOptions.iconImages[iconName]} 
          style={toolbarOptions.iconStyle} 
          iconOnClick={() => {
            const onClickAction = iconClickFuncs[iconName]
            onClickAction(!toolbarStatus[iconName].selected)

            setToolbarStatus((prevStatus: any) => {
              return {
                ...prevStatus,
                [iconName]: {
                  selected: !prevStatus[iconName].selected,
                }
              }
            })
          }}
          isActivated={toolbarStatus[iconName].selected}
        /> 
      )
    })}</>
  )
}

export default Toolbar