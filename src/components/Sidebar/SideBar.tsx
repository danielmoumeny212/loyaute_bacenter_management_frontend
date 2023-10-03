import { useContext } from "react";
import { useSelector } from "react-redux";
import NavigationContext from "../../context/NavigationContext";
import SidebarItem, { SidebarItemType } from "./SidebarItem";
import { UserInfo } from "../UserInfo";
import { loggedUser } from "../../features/userSlice";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

const sideBarItems: SidebarItemType[] = [
  {
    to: "",
    faIcon: "fas fa-home",
    text: "Accueil",
  },
  {
    to: "/users",
    faIcon: "fas fa-user",
    text: "Utilisateur",
  },
  {
    to: "/bacenters",
    faIcon: "fas fa-user",
    text: "Bacenter",
  },
];
const SideBar = () => {
  const currentUser = useSelector(loggedUser);
  const navigate = useNavigate()
  const { isSidebarActive, setIsSidebarActive } = useContext(NavigationContext);

  const handleClosed = () => {
    setIsSidebarActive(false);
    document.body.classList.remove("active");
  };
  return (
    <div className={"side-bar " + (isSidebarActive ? "active" : "")}>
       <div id="close-side-bar" onClick={handleClosed}>
        <i className="fas fa-times"></i>
      </div>
      { currentUser && 
      <UserInfo
        fullName={[currentUser.first_name, currentUser.last_name].join(" ")}
        role={currentUser?.profil?.statut!}
        img={currentUser?.profil?.image!}
      />
      
      }
      <div className="p-2">
        <Button variant="large" onClick={() => navigate(`/users/${currentUser?.id}`)}>Voir Profil</Button>
      </div>
     
      <nav className="nav_bar">
        {sideBarItems.map((item) => (
          <SidebarItem
            key={item.to}
            to={item.to}
            faIcon={item.faIcon}
            text={item.text}
            onClick={handleClosed}
          />
        ))}
      </nav>
    </div>
  );
};

export default SideBar;
