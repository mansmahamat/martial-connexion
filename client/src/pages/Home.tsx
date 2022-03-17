/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react';
import Toggle from '../components/routing/ToggleTheme';
import Banner from '../components/UI/Banner';
import Hero from '../components/UI/Hero';
import { useGetFighter } from '../hooks/Api/useFighter';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  'pk_test_51KEwIMLXQl0DCJw6DnOm3mqbpIdTiVmUufFshoMeKzhzQ3KIADlARPLud5TKj7yjErn7qFdxGedkYPIcgw5Aq0kQ00ZwUioXcz'
);

type Props = {
  User: {
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
};



function Home({ User }: Props) {



  return (
    <div className="h-screen">
      <h1 className="text-xl">
        {' '}
        Hello, {User?.firstName} {User?.lastName}
      </h1>
      <Hero />

      <form action="/customer-portal" method="POST">
        <input type="hidden" id="customer" name="customer" value={User?.billingID} />
        <button className="bg-green-500" type="submit">
          Manage Billing {User?.billingID}
        </button>
      </form>
    </div>
  );
}

export default Home;
