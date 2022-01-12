/* eslint-disable react/prop-types */
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

type Props = {
  children: undefined | React.ReactNode;
};

function ProtectedRoute({ children }: Props) {
  return localStorage.getItem('authToken') ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
