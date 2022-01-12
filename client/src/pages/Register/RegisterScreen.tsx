/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Toggle from '../../components/routing/ToggleTheme';
import { RegisterValidation } from './validation';
import { usePostRegister } from '../../hooks/Api/useAuth';
import { useFormik } from 'formik';

const RegisterScreen = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const initialValues = { name: '', email: '', password: '', passwordConfirmation: '' };

  const { errors, values, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: RegisterValidation,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: () => {
      submitForm();
    }
  });
  const createUser = usePostRegister(values.name, values.email, values.password);

  const submitForm = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    createUser.mutate(values.name, values.email, values.password);
  };

  useEffect(() => {
    if (createUser.isSuccess) {
      navigate('/login');
    }
  }, [createUser.isSuccess]);

  useEffect(() => {
    if (createUser.isError) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      setError(createUser?.error?.response?.data);
    }
  }, [createUser.isError]);

  return (
    <div className="h-screen  flex ">
      <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 ">
        <div
          className="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900  bg-no-repeat bg-cover relative"
          style={{
            backgroundImage:
              'url(' +
              'https://images.pexels.com/photos/6296010/pexels-photo-6296010.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' +
              ')',
            backgroundPosition: 'left',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}>
          <div className="absolute bg-red-500 opacity-40 inset-0 z-0"></div>
          <div className="w-full  max-w-md z-10">
            <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">
              Reference site about Lorem Ipsum..
            </div>
            <div className="sm:text-sm xl:text-md  font-normal">
              What is Lorem Ipsum Lorem Ipsum is simply dummy text of the printing and typesetting
              industry Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
              when an unknown printer took a galley of type and scrambled it to make a type specimen
              book it has?
            </div>
          </div>
        </div>
        <div className="md:flex md:items-center md:justify-center  sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none ">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-bold ">Welcome !</h2>
              <Toggle />
              <p className="my-4 text-sm ">Please register</p>
              <span className="text-red-700 text-lg italic ml-3"> {error}</span>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="mt-8 space-y-6">
              <div className="relative">
                <div className="absolute right-3 mt-4"></div>
                <label className="ml-3 text-sm font-bold  tracking-wide">Name</label>
                <input
                  className=" w-full my-2 text-base text-red-600 px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  placeholder="Aaron Smith"
                />
                <span className="text-red-700  italic ml-3 mt-2"> {errors.name}</span>
              </div>
              <div className="relative">
                <div className="absolute right-3 mt-4"></div>
                <label className="ml-3 text-sm font-bold  tracking-wide">Email</label>
                <input
                  className=" w-full my-2 text-base text-red-600 px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                  name="email"
                  id="email"
                  type="email"
                  onChange={handleChange}
                  placeholder="mail@gmail.com"
                />
                <span className="text-red-700  italic ml-3 mt-2"> {errors.email}</span>
              </div>
              <div className="mt-8 content-center">
                <label className="ml-3 text-sm font-bold  tracking-wide">Mot de passe</label>
                <input
                  className="w-full content-center text-red-600  my-2 text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
                <span className="text-red-700 italic ml-3 mt-2"> {errors.password}</span>
              </div>
              <div className="mt-8 content-center">
                <label className="ml-3 text-sm font-bold  tracking-wide">
                  Confirm Mot de passe
                </label>
                <input
                  className="w-full content-center text-red-600  my-2 text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type="password"
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
                <span className="text-red-700 italic ml-3 mt-2">
                  {' '}
                  {errors.passwordConfirmation}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link
                    to="/forgotpassword"
                    className="dark:text-white text-black ml-3  hover:underline">
                    Mot de passe oublié ?
                  </Link>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center bg-red-600  hover:bg-red-400 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                  Se connecter
                </button>
              </div>
              <p className="flex flex-col items-center justify-center mt-10 text-center text-md ">
                <span>Vous n'avez pas de compte ?</span>
                <Link
                  to="/login"
                  className="text-red-600 no-underline hover:underline cursor-pointer transition ease-in duration-300">
                  Créer un compte
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
