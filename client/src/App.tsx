/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

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
import Pro from './pages/AccountPro/Pro';
import Teams from './pages/Teams';
import TeamPage from './pages/TeamPage';
import SetupAccount from './pages/Setup-account';
import CreateProduct from './pages/Create-product';
import Payment from './pages/AccountPro/Payment';
import Balance from './pages/AccountPro/Balance';
import HomePro from './pages/AccountPro/HomePro';
import LandingGym from './pages/LandingGym/LandingGym';

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

  const location = useLocation();

  return (
    <div className="h-screen">
      <Navbar User={user} />

      <Routes>
        <Route
          path="/"
          element={
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore

            <Home User={user} />
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
        <Route
          path="/create-club"
          element={
            //@ts-ignore
            <PrivateRoute>
              <CreateClub />
            </PrivateRoute>
          }
        />
        <Route path="/pricing" element={<Pricing User={user} />} />
        <Route path="/stripe/success" element={<StripeSuccess />} />
        <Route path="/stripe/cancel" element={<StripeCancel />} />
        <Route path="/pro" element={<Pro />}>
          <Route path="payment" element={<Payment />} />
          <Route path="home" element={<HomePro />} />
          <Route path="balance" element={<Balance />} />
        </Route>
        <Route path="/teams" element={<Teams />} />
        <Route path="/gym/pro" element={<LandingGym />} />
        <Route path="/setup-account" element={<SetupAccount />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/team/:id" element={<TeamPage />} />
        {/* @ts-ignore */}
        <Route path="/success" element={<SuccessDisplay />} />
        <Route path="/passwordreset/:resetToken" element={<ResetPasswordScreen />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
