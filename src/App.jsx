import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Login from './pages/Login';
import PasswordResetRequestPage from './pages/PasswordResetRequestPage';
import SuccessPage from './pages/SuccessPage';
import RegistrationPage from './pages/RegistrationPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegistrationPage />} />

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
