import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import PasswordResetRequestPage from './pages/PasswordResetRequestPage';
import SuccessPage from './pages/SuccessPage';
import RegistrationPage from './pages/RegistrationPage';
import Category from './pages/Category';
import Notes from './pages/Notes';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/notes" element={<Notes/>} />

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
