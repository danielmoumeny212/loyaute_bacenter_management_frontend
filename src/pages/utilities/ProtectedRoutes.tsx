import { useSelector} from "react-redux"; 
import { isAuthenticated} from "../../features/authSlice";
import { isAdmin } from "../../features/userSlice";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

interface ProtectedRoutesProps {
  children: React.ReactNode; 
}
const ProtectedRoutes = ({children}: ProtectedRoutesProps) => {
  const isAuth = useSelector(isAuthenticated); 
  const isAd = useSelector(isAdmin); 
  if (!isAuth) return <Navigate to="/login" />
  if (isAuth && !isAd) {
    toast.error('You are not allowed to access this', {delay:.1, hideProgressBar: true});
    return <Navigate to="/login" />
  }

  return (
    <>{children}</>
  )
}

export default ProtectedRoutes