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
    <div className="min-h-screen flex">
      <div className="flex-1 overflow-hidden flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl text-center font-extrabold ">Reset Password</h2>
          </div>

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

          <div className="mt-8">
            <div className="mt-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="space-y-6">
                <div className="space-y-1">
                  <label htmlFor="password" className="block text-sm font-medium ">
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      onChange={handleChange}
                      placeholder="********"
                      className="appearance-none relative text-gray-800 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <span className="relative left-80 -top-8">
                      {showPassword ? (
                        <FaEyeSlash
                          onClick={() => setShowPassword(!showPassword)}
                          className="h-6 text-red-700 w-6"
                        />
                      ) : (
                        <FaEye
                          onClick={() => setShowPassword(!showPassword)}
                          className="h-6 text-red-700 w-6"
                        />
                      )}
                    </span>
                    <span className="text-red-700  italic"> {errors.password}</span>
                  </div>
                </div>

                <div>
                  <button
                    disabled={errors.password ? true : false}
                    type="submit"
                    className="w-full mt-6 flex justify-center bg-red-600 hover:bg-re disabled:bg-red-200 disabled:cursor-not-allowed  hover:bg-red-400 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                    Modifier mon mot de passe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block relative  bg-red-600 w-0 flex-1">
        <div
          className=" w-full  opacity-40 h-screen hidden lg:block relative"
          style={{
            backgroundImage:
              'url(' +
              'https://images.squarespace-cdn.com/content/v1/5bc0ca449d414932b7b7263c/1539441163308-VUWJASOM3XMOU8DCT5R6/Rafael-Lovato-jr-jiu-jitsu-martial-artist-black-belt-world-champion-mma-middleweight-undefeated-bellator-brazilian-fight-2.jpg' +
              ')',
            backgroundPosition: 'left',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat'
          }}
        />
      </div>
    </div>
  );
};

export default ResetPasswordScreen;
