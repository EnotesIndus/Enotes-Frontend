import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
     

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />

        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/notes" element={<Notes/>} />
        <Route path="/todo" element={<Todo/>} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/gpt" element={<Gpt />} />
        <Route path="/products" element={<Products />} />
    
        {/* Password Reset */}
        <Route path="/reset-request" element={<PasswordResetRequestPage />} />
        <Route
          path="/reset-success"
          element={
            <SuccessPage
              title="Password Reset Complete"
              message="You can now login."
              buttonText="Login"
              buttonAction={() => window.location.href = '/login'}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
