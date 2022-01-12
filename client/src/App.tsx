import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Routing
import PrivateRoute from './components/routing/PrivateRoute';

import LoginScreen from './pages/Login/LoginScreen';
import RegisterScreen from './pages/Register/RegisterScreen';
import ForgotPasswordScreen from './pages/ForgotPassword/ForgotPasswordScreen';
import ResetPasswordScreen from './pages/ResetPassword/ResetPasswordScreen';
import Home from './pages/Home';

const App = () => {
  return (
    <div className="h-screen">
      <Routes>
        <Route
          path="/"
          element={
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            // <PrivateRoute>
            <Home />
            // </PrivateRoute>
          }
        />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/forgotpassword" element={<ForgotPasswordScreen />} />
        <Route path="/passwordreset/:resetToken" element={<ResetPasswordScreen />} />
      </Routes>
    </div>
  );
};

export default App;
