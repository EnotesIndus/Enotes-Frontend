import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar2';

const NavbarWrapper = () => {
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem('token');

  const hideNavbarRoutes = ['/login', '/register'];

  if (!isLoggedIn) return null;
  if (hideNavbarRoutes.includes(location.pathname)) return null;

  return <Navbar />;
};

export default NavbarWrapper;
