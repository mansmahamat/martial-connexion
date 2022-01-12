/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { ForgotPasswordValidation } from './validation';
import { useForgotPassword } from '../../hooks/Api/useAuth';
import Toggle from '../../components/routing/ToggleTheme';
import { FaArrowLeft } from 'react-icons/fa';

const ForgotPasswordScreen = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const initialValues = { email: '' };

  const { errors, values, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: ForgotPasswordValidation,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: () => {
      submitForm();
    }
  });
  const forgotPassword = useForgotPassword(values.email);

  const submitForm = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    forgotPassword.mutate(values.email);
  };

  useEffect(() => {
    if (forgotPassword.isSuccess) {
      setSuccess('Un email vient de vous être envoyé');
      setError('');
      setSuccess('');
    }
  }, [forgotPassword.isSuccess]);

  useEffect(() => {
    if (forgotPassword.isError) {
      setSuccess('');
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      setError(forgotPassword?.error?.response?.data);
    }
  }, [forgotPassword.isError]);

  return (
    <div className="h-screen  flex ">
      <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 ">
        <div
          className="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900  bg-no-repeat bg-cover relative"
          style={{
            backgroundImage:
              'url(' +
              'https://images.pexels.com/photos/5895867/pexels-photo-5895867.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' +
              ')',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}>
          <div className="absolute bg-red-500 opacity-40 inset-0 z-0"></div>
          <div className="w-full  max-w-md z-10">
            <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6"></div>
            <div className="sm:text-sm xl:text-md  font-normal"></div>
          </div>
        </div>
        <div className="md:flex md:items-center md:justify-center  sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none ">
          <div className="max-w-md w-full space-y-8">
            <div className="text-center">
              <div>
                <Link to="/login">
                  <FaArrowLeft className=" text-2xl cursor-pointer" />
                </Link>
                <h2 className="mt-4 text-3xl font-bold ">Mot de passe oublié ?</h2>
              </div>

              <p className="my-4 text-sm ">
                Entrez ladresse e-mail indiquée au moment de la création de votre compte. Vous
                recevrez un lien pour réinitialiser votre mot de passe.
              </p>
              <span className="text-red-700 text-lg italic ml-3"> {error}</span>
              <span className="text-green-700 text-lg italic ml-3"> {success}</span>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="mt-8 space-y-6">
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

              <div>
                <button
                  disabled={errors.email ? true : false}
                  type="submit"
                  className="w-full flex justify-center disabled:bg-red-200 disabled:cursor-not-allowed bg-red-600  hover:bg-red-400 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                  Se connecter
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
