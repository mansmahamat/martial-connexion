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
  avatar: string;
  city: string;
  date: string;
  discipline: string;
  email: string;
  firstName: string;
  lastName: string;
  billingID: string;
  password: string;
  postalCode: string;
  _id: string;
};
import Navbar from './components/routing/Navbar';
import UpdateFighterProfile from './pages/UpdateFighterProfile';
import Calendar from './pages/Calendar';
import CreateClub from './pages/Create-club';
import Pricing from './pages/Pricing';
import { SuccessDisplay } from './pages/Success-stripe/Index';
import Footer from './components/UI/Footer';
import StripeSuccess from './pages/Stripe-Sucess';
import StripeCancel from './pages/Stripe-cancel';
import Account from './pages/Account';

const App = () => {
  const [user, setUser] = useState<User>({
    date: '',
    email: '',
    firstName: '',
    lastName: '',
    avatar: '',
    password: '',
    city: '',
    postalCode: '',
    discipline: '',
    billingID: '',
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
      <Navbar User={user} />

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
        <Route
          path="/update-fighter-profile/:id"
          element={
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            <PrivateRoute>
              <UpdateFighterProfile />
            </PrivateRoute>
          }
        />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/account" element={<Account />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/forgotpassword" element={<ForgotPasswordScreen />} />
        <Route path="/create-club" element={<CreateClub />} />
        <Route path="/pricing" element={<Pricing User={user} />} />
        <Route path="/stripe/success" element={<StripeSuccess />} />
        <Route path="/stripe/cancel" element={<StripeCancel />} />
        {/* @ts-ignore */}
        <Route path="/success" element={<SuccessDisplay />} />
        <Route path="/passwordreset/:resetToken" element={<ResetPasswordScreen />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
};

export default App;
