
export interface iToolbarOptions {
  disabled?: boolean
  orientation?: 'vertical' | 'horizontal'
  icons?: string[]
  iconImages?: Record<string,string>
  iconStyle?: React.CSSProperties & { onHover: React.CSSProperties }
}