interface Props {
  children: React.ReactNode;
  style?: React.CSSProperties
  
}
const Paper = ({children, style}: Props) => {
  return (
    <div className="paper" style={style}>
      {children}
    </div>
  )
}

export default Paper