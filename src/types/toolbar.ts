
export interface iToolbarOptions {
  disabled?: boolean
  orientation?: 'vertical' | 'horizontal'
  icons?: string[]
  iconStyle?: React.CSSProperties & { onHover: React.CSSProperties }
}