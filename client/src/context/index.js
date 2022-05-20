import React from 'react';
import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
const UserProvider = ({ children }) => {
  const [state, setState] = useState({});

  // const [authToken, setAuthToken] = useState({
  //   token: ''
  // });

  useEffect(() => {
    setState(JSON.parse(localStorage.getItem('user')));
  }, []);

  console.log(state);

  // useEffect(() => {
  //   setAuthToken(localStorage.getItem('authToken'));
  // }, []);

  // axios config
  // const token = authToken && authToken ? authToken : '';
  axios.defaults.baseURL = 'http://localhost:8080/api';
  // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  return <UserContext.Provider value={[state, setState]}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
