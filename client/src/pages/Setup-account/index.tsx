/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GetFighterTypes from '../../types/CreateFighterTypes';

function SetupAccount() {
  const [user, setUser] = useState<GetFighterTypes>();
  const [link, setLink] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // @ts-ignore
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  useEffect(() => {
    const getSubscriptionStatus = async () => {
      const { data } = await axios.post(`${process.env.REACT_APP_DEV}/complete-profile`, {
        //@ts-ignore
        accountId: user?.accountId
      });
      setLink(data);
    };

    getSubscriptionStatus();
  }, [user]);

  console.log(link);

  return (
    <div className="flex justify-between">
      SetupAccounts
      <p> {user?.accountId}</p>
      {link && (
        <a
          href={link}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Complete
        </a>
      )}
    </div>
  );
}

export default SetupAccount;
