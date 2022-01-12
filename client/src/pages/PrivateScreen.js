import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PrivateScreen = () => {
  const [error, setError] = useState('');
  const [privateData, setPrivateData] = useState('');

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      };

      try {
        const { data } = await axios.get('http://localhost:8081/private', config);
        setPrivateData(data.data || 'Helloooo');
      } catch (error) {
        setError('You are not authorized please login');
      }
    };

    fetchPrivateDate();
  }, []);
  return error ? (
    <span className="error-message">
      {error} <Link to="/login">CLICK</Link>
    </span>
  ) : (
    <div>{privateData} </div>
  );
};

export default PrivateScreen;
