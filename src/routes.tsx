import { Navigate , useRoutes} from 'react-router-dom';
import Login from './pages/utilities/Login/Login';
import SharedLayout from './pages/utilities/ShareLayout/SharedLayout';
import UserPage from './pages/admin/UsersPage';
import HomePage from './pages/admin/HomePage';
import { ProfilePage } from './pages/admin/ProfilePage';
import CreateUserPage from './pages/admin/CreateUserPage';
import AddBacenterPage from './pages/admin/AddBacenterPage';
import BacenterPage from './pages/admin/BacenterPage';
import ProtectedRoutes from './pages/utilities/ProtectedRoutes';
import DashboardLayout from './pages/utilities/DashboardLayout';
// import Page404 from './pages/Page404';



export default function Router(){
  const routes = useRoutes([
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/',
      element: <ProtectedRoutes>
        <DashboardLayout />
      </ProtectedRoutes>,
      children: [
        { path: '/', element: <HomePage /> },
        { path: 'users', element: <UserPage /> },
        { path: 'users/:userId', element: <ProfilePage /> },
        { path: 'users/update/:userId', element: <CreateUserPage /> },
        { path: 'users/create', element: <CreateUserPage /> },
        { path: 'bacenters', element: <BacenterPage /> },
        { path: 'bacenters/create', element: <AddBacenterPage /> },
        { path: 'cultes', element: <div>Cultes </div>}
      ],
    },
    // {
    //   path: '*',
    //   element: <Page404 />,
    // },
  ]); 
  
  return routes; 
}