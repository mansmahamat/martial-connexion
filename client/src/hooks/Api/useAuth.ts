import axios from 'axios';
import { useMutation } from 'react-query';
import ForgotPassword from '../../types/ForgotPasswordTypes';
import LoginTypes from '../../types/LoginTypes';
import RegisterTypes from '../../types/RegisterTypes';

const postLogin = async (email : string, password: string): Promise<LoginTypes> => {
  const { data } = await axios.post('http://localhost:5000/api/user/login', {
    email,
    password
  });

  localStorage.setItem('authToken', data.token);
  localStorage.setItem('user', JSON.stringify(data.user));

  return data;
};

export function usePostLogin(email: string, password: string) {
  return useMutation(() => postLogin(email, password));
}

const postRegister = async (name : string,email : string, password: string): Promise<RegisterTypes> => {
  const { data } = await axios.post('http://localhost:5000/api/user/register', {
    name,
    email,
    password
  });


  return data;
};

export function usePostRegister(name: string,email: string, password: string) {
  return useMutation(() => postRegister(name,email, password));
}


const forgotPassword = async (email : string): Promise<ForgotPassword> => {
  const { data } = await axios.post('http://localhost:5000/api/user/forgotpassword', {
    email,
  });



  return data;
};

export function useForgotPassword(email: string) {
  return useMutation(() => forgotPassword(email));
}