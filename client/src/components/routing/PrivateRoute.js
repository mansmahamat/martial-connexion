/* eslint-disable react/prop-types */
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

function ProtectedRoute({ children }) {
  console.log('authenticated');

  return localStorage.getItem('authToken') ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
