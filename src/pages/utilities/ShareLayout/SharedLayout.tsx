import { Outlet } from "react-router-dom";
import NavigationContext, {
  NavigationProvider,
} from "../../../context/NavigationContext";
import Header from "../../../components/Header";
import SideBar from "../../../components/Sidebar/SideBar";
import { useEffect } from "react";

const SharedLayout = () => {
  useEffect(() =>  {
    document.body.style.paddingLeft ="30rem";
  }, [])
  return (
    <NavigationProvider>
      <Header />
      <SideBar />
      <Outlet />
    </NavigationProvider>
  );
};

export default SharedLayout;
