import React, { useEffect, useState } from 'react';
import Toggle from '../components/routing/ToggleTheme';
import Banner from '../components/UI/Banner';
import Hero from '../components/UI/Hero';
import { useGetFighter } from '../hooks/Api/useFighter';

type Props = {
  User: {
    date: string;
    email: string;
    name: string;
    password: string;
    resetPasswordExpire: string;
    resetPasswordToken: string;
    __v: number;
    _id: string;
  };
};

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
      <h1>Hello {user.name}</h1>
      <img className="h-24 w-24" src={user?.avatar} />
      <Toggle />
      <Hero />
    </div>
  );
}

export default Home;
