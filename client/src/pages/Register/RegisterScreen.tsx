/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Toggle from '../../components/routing/ToggleTheme';
import { RegisterValidation } from './validation';
import { usePostRegister } from '../../hooks/Api/useAuth';
import { useFormik } from 'formik';
import { FaEye, FaEyeDropper, FaEyeSlash } from 'react-icons/fa';

const RegisterScreen = () => {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="w-full h-screen flex flex-wrap">
      <div className="w-full lg:w-1/2 flex flex-col">
        <span className="text-red-700 text-lg italic ml-3"> {error}</span>

        <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <p className="text-center text-3xl">Register</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex flex-col pt-3 md:pt-8">
            <div className="flex flex-col pt-4">
              <label className="text-lg">Name</label>
              <input
                name="name"
                id="name"
                onChange={handleChange}
                placeholder="Aaron Smith"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
              <span className="text-red-700  italic ml-3 mt-2"> {errors.name}</span>
            </div>

            <div className="flex flex-col pt-4">
              <label className="text-lg">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                onChange={handleChange}
                placeholder="Aaron@email.fr"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
              <span className="text-red-700  italic ml-3 mt-2"> {errors.email}</span>
            </div>

            <div className="flex flex-col pt-4">
              <label className="text-lg">Password</label>
              <div className="flex space-x-4 items-center">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  onChange={handleChange}
                  placeholder="********"
                  className="shadow appearance-none border   rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
                <span onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <FaEye className="h-6 w-6" />
                  ) : (
                    <FaEyeSlash className="h-6 w-6" />
                  )}
                </span>
              </div>

              <span className="text-red-700  italic ml-3 mt-2"> {errors.password}</span>
            </div>

            <div className="flex flex-col pt-4">
              <label className="text-lg">Confirm Password</label>
              <div className="flex space-x-4 items-center">
                <input
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type={showPassword ? 'text' : 'password'}
                  onChange={handleChange}
                  placeholder="********"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <span className="text-red-700  italic ml-3 mt-2"> {errors.passwordConfirmation}</span>
            </div>

            <button
              disabled={
                errors.email || errors.password || errors.name || errors.passwordConfirmation
                  ? true
                  : false
              }
              type="submit"
              className="w-full mt-6 flex justify-center bg-red-600 disabled:bg-red-200 disabled:cursor-not-allowed  hover:bg-red-400 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
              S'inscrire
            </button>
          </form>
          <div className="text-center pt-12 pb-12">
            <p>
              Do you have an account?{' '}
              <Link to="/login" className="underline font-semibold">
                Login here.
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="w-1/2 bg-blend-screen hidden lg:block bg-red-500">
        <div
          className=" w-full  opacity-40 h-screen hidden lg:block relative"
          style={{
            backgroundImage:
              'url(' +
              'https://images.pexels.com/photos/6296010/pexels-photo-6296010.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' +
              ')',
            backgroundPosition: 'left',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundColor: 'blueviolet'
          }}
        />
      </div>
    </div>
  );
};

export default RegisterScreen;
