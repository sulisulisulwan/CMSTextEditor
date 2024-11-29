import * as React from 'react'
import { iToolbarOptions } from '../../types/toolbar'
import iconSrcs from './defaultToolbarIconMap'
import ToolbarIcon from './ToolbarIcon'

interface iToolbarProps {
  toolbarOptions: iToolbarOptions
  setToolbarStatus: React.Dispatch<React.SetStateAction<any>>
  toolbarStatus: any
}

const Toolbar = ({ toolbarOptions, setToolbarStatus, toolbarStatus }: iToolbarProps) => {
 
  return (
    <>{toolbarOptions.icons.map((iconName: string, i: number) => {
      return (
        iconSrcs[iconName] ? 
          <ToolbarIcon 
            key={iconName + i}
            src={iconSrcs[iconName]} 
            style={toolbarOptions.iconStyle} 
            iconOnClick={() => {
              setToolbarStatus((prevStatus: any) => ({
                ...prevStatus,
                [iconName]: {
                  selected: !prevStatus[iconName].selected,
                }
              }))
            }}
            isActivated={toolbarStatus[iconName].selected}
          /> 
          : null)
    })}</>
  )
}

export default Toolbar