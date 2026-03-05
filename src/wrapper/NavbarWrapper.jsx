import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar2';

const NavbarWrapper = () => {
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const hideNavbarRoutes = ['/login', '/register'];

  if (!user) return null;
  if (hideNavbarRoutes.includes(location.pathname)) return null;

  return <Navbar />;
};

export default NavbarWrapper;
