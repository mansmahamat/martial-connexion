/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ResetValidation } from './validation';
import { useResetPassword } from '../../hooks/Api/useAuth';
import { useFormik } from 'formik';
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import Toggle from '../../components/routing/ToggleTheme';

const ResetPasswordScreen = () => {
  const { resetToken } = useParams();
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="w-full flex flex-wrap">
      <div className="w-full md:w-1/2 flex flex-col">
        <div className="flex items-center justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
          <a href="#" className="bg-black text-white font-bold text-xl p-4">
            Logo
          </a>
          <Toggle />
        </div>

        <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <p className="text-center text-3xl">Welcome.</p>
          <div className="text-center mt-4">
            {resetPassword.isError && (
              <span className="text-red-700 text-center text-lg italic ml-3"> {error}</span>
            )}

            <span className="text-green-700 text-center text-lg italic ml-3"> {success}</span>

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
            className="flex flex-col pt-3 md:pt-8">
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
              <label className="text-lg">Confirmez mot de passe </label>
              <input
                id="passwordConfirmation"
                name="passwordConfirmation"
                type={showPassword ? 'text' : 'password'}
                onChange={handleChange}
                placeholder="***********"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline"
              />
              <span className="text-red-700 italic ml-3 mt-2">{errors.passwordConfirmation}</span>
            </div>

            <button
              disabled={errors.password || errors.passwordConfirmation ? true : false}
              type="submit"
              className="w-full mt-6 flex justify-center bg-red-600 disabled:bg-red-200 disabled:cursor-not-allowed  hover:bg-red-400 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
              Modifier mon mot de passe
            </button>
          </form>
        </div>
      </div>

      <div className="w-1/2 bg-blend-screen bg-red-500">
        <div
          className=" w-full  opacity-40 h-screen hidden md:block relative"
          style={{
            backgroundImage:
              'url(' +
              'https://images.squarespace-cdn.com/content/v1/5bc0ca449d414932b7b7263c/1539441163308-VUWJASOM3XMOU8DCT5R6/Rafael-Lovato-jr-jiu-jitsu-martial-artist-black-belt-world-champion-mma-middleweight-undefeated-bellator-brazilian-fight-2.jpg' +
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

export default ResetPasswordScreen;
