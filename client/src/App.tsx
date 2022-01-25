/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// Routing
import PrivateRoute from './components/routing/PrivateRoute';

import LoginScreen from './pages/Login/LoginScreen';
import RegisterScreen from './pages/Register/RegisterScreen';
import ForgotPasswordScreen from './pages/ForgotPassword/ForgotPasswordScreen';
import ResetPasswordScreen from './pages/ResetPassword/ResetPasswordScreen';
import Home from './pages/Home';
import CompleteFighterProfile from './pages/Complete-fighter-profile/CompleteFighterProfile';
import { useGetFighter } from './hooks/Api/useFighter';

type User = {
  date: string;
  email: string;
  name: string;
  password: string;
  resetPasswordExpire: string;
  resetPasswordToken: string;
  __v: number;
  _id: string;
};

const App = () => {
  const [user, setUser] = useState<User>({
    date: '',
    email: '',
    name: '',
    password: '',
    resetPasswordExpire: '',
    resetPasswordToken: '',
    __v: 0,
    _id: ''
  });

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, [window.localStorage.getItem('user')]);

  return (
    <div className="h-screen">
      <Routes>
        <Route
          path="/"
          element={
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            <PrivateRoute>
              <Home User={user} />
            </PrivateRoute>
          }
        />
        <Route
          path="/complete-fighter-profile/:id"
          element={
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            <PrivateRoute>
              <CompleteFighterProfile />
            </PrivateRoute>
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
