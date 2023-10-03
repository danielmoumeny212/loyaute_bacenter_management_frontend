import { NavLink } from "react-router-dom";

interface Props {
  to: string; 
  faIcon: string; 
  text: string; 
  onClick?: () => void; 
}

export interface SidebarItemType {
  to: string; 
  faIcon: string; 
  text: string; 
}
const SidebarItem = ({to, faIcon, text, onClick}: Props) => {
  return (
    <NavLink to={to} onClick={onClick}>
     <i className={faIcon}></i>
      <span>{text}</span>
    </NavLink>
  )
}

export default SidebarItem