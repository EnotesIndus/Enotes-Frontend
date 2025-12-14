import { useState } from 'react';
import HomePage from './pages/HomePage';
import PasswordResetRequestPage from './pages/PasswordResetRequestPage';
import SuccessPage from './pages/SuccessPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  if (currentPage === 'home')
    return <HomePage setCurrentPage={setCurrentPage} />;

  if (currentPage === 'reset-request')
    return <PasswordResetRequestPage onBack={() => setCurrentPage('home')} />;

  if (currentPage === 'reset-success')
    return (
      <SuccessPage
        title="Password Reset Complete"
        message="You can now login."
        buttonText="Login"
        buttonAction={() => (window.location.href = '/login')}
      />
    );
};

export default App;
