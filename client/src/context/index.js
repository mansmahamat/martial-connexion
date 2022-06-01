/* eslint-disable no-undef */
import React from 'react';
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { useGetTeamByID } from '../hooks/Api/useTeams';

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
  const [state, setState] = useState();
  const [team, setTeam] = useState();

  const [authToken, setAuthToken] = useState({
    token: ''
  });

  useEffect(() => {
    setState(JSON.parse(localStorage.getItem('user')));
  }, []);

  const getCustomerInfo = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_DEV}/team/${state?.teamId}`);
    localStorage.setItem('team', JSON.stringify(data));
    setTeam(JSON.parse(localStorage.getItem('team')));
  };

  useEffect(() => {
    async function fetchMyAPI() {
      const { data } = await axios.get(`${process.env.REACT_APP_DEV}/team/${state?.teamId}`);
      console.log(data);
      localStorage.setItem('team', JSON.stringify(data));
      setTeam(JSON.parse(localStorage.getItem('team')));
    }

    fetchMyAPI();
  }, [state]);

  //axios config
  const token = authToken && authToken ? authToken : '';
  // axios.defaults.baseURL = 'https://martial-connexion.herokuapp.com/api';
  // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  return <UserContext.Provider value={{ state, team, authToken }}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
