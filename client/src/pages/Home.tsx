import React, { useEffect, useState } from 'react';
import Toggle from '../components/routing/ToggleTheme';
import Banner from '../components/UI/Banner';
import Hero from '../components/UI/Hero';
import { useGetFighter } from '../hooks/Api/useFighter';

type Props = {
  User: {
    avatar: string;
    city: string;
    date: string;
    discipline: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    postalCode: string;
    _id: string;
  };
};

function Home({ User }: Props) {
  //const [user, setUser] = useState({ _id: '', isComplete: false, avatar: '', fir: '' });
  console.log(User);

  // useEffect(() => {
  //   const loggedInUser = localStorage.getItem('user');
  //   if (loggedInUser) {
  //     const foundUser = JSON.parse(loggedInUser);
  //     setUser(foundUser);
  //   }
  // }, []);

  return (
    <div className="h-screen">
      <h1 className="text-xl">
        {' '}
        Hello, {User?.firstName} {User?.lastName}
      </h1>
      <Hero />
    </div>
  );
}

export default Home;
