import { BrowserRouter } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import PasswordResetRequestPage from './pages/PasswordResetRequestPage';
import SuccessPage from './pages/SuccessPage';
import RegistrationPage from './pages/RegistrationPage';
import Category from './pages/Category';
import Notes from './pages/Notes';
import Todo from './pages/Todo';
import Navbar from './components/Navbar2';
import UserProfile from './pages/User';
import Gpt from './pages/Gpt';
import Products from './pages/Products';
import EmailVerificationPage from './pages/EmailVerificationPage';
import NavbarWrapper from './wrapper/NavbarWrapper';
import AppRoutes from './wrapper/AppRoutes';

const App = () => {


 
  return (
    <BrowserRouter>
      <NavbarWrapper />
      <AppRoutes />
      
    </BrowserRouter>
  );
};

export default App;
