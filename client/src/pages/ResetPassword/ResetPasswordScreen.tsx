/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ResetValidation } from './validation';
import { useResetPassword } from '../../hooks/Api/useAuth';
import { useFormik } from 'formik';
import { FaArrowLeft } from 'react-icons/fa';

const ResetPasswordScreen = () => {
  const { resetToken } = useParams();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const initialValues = { password: '', passwordConfirmation: '' };

  const { errors, values, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: ResetValidation,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: () => {
      submitForm();
    }
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const resetPassword = useResetPassword(values.password, resetToken);

  const submitForm = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    resetPassword.mutate(values.password, resetToken);
  };

  useEffect(() => {
    if (resetPassword.isSuccess) {
      setSuccess('Un email vient de vous être envoyé');
      setError('');

      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  }, [resetPassword.isSuccess]);

  useEffect(() => {
    if (resetPassword.isError) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      setError(resetPassword?.error?.response?.data);
    }
  }, [resetPassword.isError]);

  return (
    <div className="h-screen  flex ">
      <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 ">
        <div
          className="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900  bg-no-repeat bg-cover relative"
          style={{
            backgroundImage:
              'url(' +
              'https://images.squarespace-cdn.com/content/v1/5bc0ca449d414932b7b7263c/1539441163308-VUWJASOM3XMOU8DCT5R6/Rafael-Lovato-jr-jiu-jitsu-martial-artist-black-belt-world-champion-mma-middleweight-undefeated-bellator-brazilian-fight-2.jpg' +
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
              <h2 className="mt-6 text-3xl font-bold "> Réinitialiser le mot de passe</h2>
              <div className="flex justify-between">
                <Link to="/login">
                  <FaArrowLeft className=" text-2xl cursor-pointer" />
                </Link>
              </div>

              <p className="my-4 text-sm ">Entrez un nouveau mot de passe sécurisé</p>
              {resetPassword.isError && (
                <span className="text-red-700 text-lg italic ml-3"> {error}</span>
              )}

              <span className="text-green-700 text-lg italic ml-3"> {success}</span>

              {resetPassword.isLoading && (
                <div className="flex items-center justify-center space-x-2 animate-bounce">
                  <div className="w-6 h-6 bg-red-600 rounded-full"></div>
                  <div className="w-6 h-6 bg-black dark:bg-white rounded-full"></div>
                  <div className="w-6 h-6 bg-red-600 rounded-full"></div>
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="mt-8 space-y-6">
              <div className="relative">
                <div className="absolute right-3 mt-4"></div>
                <label className="ml-3 text-sm font-bold  tracking-wide">Mot de passe</label>
                <input
                  className=" w-full my-2 text-base text-red-600 px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                  name="password"
                  id="password"
                  type="password"
                  onChange={handleChange}
                  placeholder="***********"
                />
                <span className="text-red-700  italic ml-3 mt-2"> {errors.password}</span>
              </div>
              <div className="mt-8 content-center">
                <label className="ml-3 text-sm font-bold  tracking-wide">
                  Confirmer le mot de passe
                </label>
                <input
                  className="w-full content-center text-red-600  my-2 text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                  id="passwordConfirmation"
                  name="passwordConfirmation"
                  type="password"
                  onChange={handleChange}
                  placeholder="***********"
                />
                <span className="text-red-700 italic ml-3 mt-2">{errors.passwordConfirmation}</span>
              </div>

              <div>
                <button
                  disabled={errors.password || errors.passwordConfirmation ? true : false}
                  type="submit"
                  className="w-full flex justify-center bg-red-600  hover:bg-red-400 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                  Confirmer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordScreen;
