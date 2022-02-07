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
    avatar: string;
    password: string;
    resetPasswordExpire: string;
    resetPasswordToken: string;
    __v: number;
    _id: string;
  };
};

function Home({ User }: Props) {
  const [user, setUser] = useState({ _id: '', isComplete: false, avatar: '', name: '' });
  console.log(User);

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
    </div>
  );
}

export default Home;
