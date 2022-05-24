import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import ForgotPassword from '../../types/ForgotPasswordTypes';
import LoginTypes from '../../types/LoginTypes';
import RegisterTypes from '../../types/RegisterTypes';
import ResetPassword from '../../types/ResetPassword';

const postLogin = async (email : string, password: string): Promise<LoginTypes> => {
  const { data } = await axios.post('/user/login', {
    email,
    password
  });

  localStorage.setItem('authToken', data.token);
  localStorage.setItem('user', JSON.stringify(data.user),);

  return data;
};

export function usePostLogin(email: string, password: string) {
  return useMutation(() => postLogin(email, password));
}

const postRegister = async (email : string, password: string): Promise<RegisterTypes> => {
  const { data } = await axios.post('/api/user/register', {
    email,
    password
  });


  return data;
};

export function usePostRegister(email: string, password: string) {
  return useMutation(() => postRegister(email, password));
}


const forgotPassword = async (email : string): Promise<ForgotPassword> => {
  const { data } = await axios.post('/user/forgotpassword', {
    email,
  });



  return data;
};

export function useForgotPassword(email: string) {
  return useMutation(() => forgotPassword(email));
}

const resetPassword = async (password : string, resetToken: string): Promise<ResetPassword> => {
  const { data } = await axios.put(`/user/resetpassword/${resetToken}`, {
    password,
  });



  return data;
};

export function useResetPassword(password : string, resetToken: string) {
  return useMutation(() => resetPassword(password, resetToken));
}

const getUser = async (id: string) => {
  const { data } = await axios.get(`/user/user/${id}`)

  return data
}

export function useGetUser(id: string) {
  return useQuery(["getUser"], () => getUser(id), {
  })
}