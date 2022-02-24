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
    date: string;
    email: string;
    name: string;
    avatar: string;
    password: string;
    billingID: string;
    resetPasswordExpire: string;
    resetPasswordToken: string;
    __v: number;
    _id: string;
  };
};

// const handleClick = async (event) => {
//   // Call your backend to create the Checkout session.
//   const { sessionId } = await fetchCheckoutSession();
//   // When the customer clicks on the button, redirect them to Checkout.
//   const stripe = await stripePromise;
//   //@ts-ignore
//   const { error } = await stripe.redirectToCheckout({
//     sessionId
//   });
//   // If `redirectToCheckout` fails due to a browser or network
//   // error, display the localized error message to your customer
//   // using `error.message`.
// };

function Home({ User }: Props) {
  const [user, setUser] = useState({ _id: '', isComplete: false, avatar: '', name: '' });
  console.log(User?.name);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    console.log('e');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  return (
    <div className="h-screen">
      {!user?.isComplete && <Banner id={user?._id} />}
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
