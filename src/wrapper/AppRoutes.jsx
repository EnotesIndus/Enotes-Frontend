import React from 'react'
import Login from '../pages/Login'
import HomePage from '../pages/HomePage'
import RegistrationPage from '../pages/RegistrationPage'
import Category from '../pages/Category'
import Notes from '../pages/Notes'
import Todo from '../pages/Todo'
import UserProfile from '../pages/User'
import Gpt from '../pages/Gpt'
import Products from '../pages/Products'
import EmailVerificationPage from '../pages/EmailVerificationPage'
import PasswordResetRequestPage from '../pages/PasswordResetRequestPage'
import { Route, Routes } from 'react-router-dom'
import SuccessPage from '../pages/SuccessPage'

const AppRoutes = () => {
  return (
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
        <Route path="/verify" element={<EmailVerificationPage />} />
    
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
  )
}

export default AppRoutes
