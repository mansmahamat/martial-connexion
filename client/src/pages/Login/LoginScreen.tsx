/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { usePostLogin } from '../../hooks/Api/useAuth';
import { useFormik } from 'formik';
import { LoginValidation } from './validation';
import Toggle from '../../components/routing/ToggleTheme';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginScreen = () => {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const initialValues = { email: '', password: '' };

  const { errors, values, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: LoginValidation,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: () => {
      submitForm();
    }
  });
  const createUser = usePostLogin(values.email, values.password);

  const submitForm = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    createUser.mutate(values.email, values.password);
  };

  useEffect(() => {
    if (createUser.isSuccess) {
      navigate('/');
      window.location.reload();
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
    <div className="min-h-screen justify-center flex">
      <div className="flex-1 overflow-hidden flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h2 className="mt-6 text-3xl font-extrabold ">Se connecter</h2>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium ">
                    Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      onChange={handleChange}
                      placeholder="Aaron@email.fr"
                      className="appearance-none text-gray-800 block w-full mb-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <span className="text-red-700  italic "> {errors.email}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="password" className="block text-sm font-medium ">
                    Mot de passe
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
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <Link to="/forgotpassword" className="font-medium underline ">
                          Mot de passe oubli?? ?
                        </Link>
                      </div>
                    </div>
                    <span className="text-red-700  italic"> {errors.password}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <Link
                      to="/register"
                      className="font-medium underline text-red-600 hover:text-red-500">
                      Pas de compte ? Inscrivez-vous
                    </Link>
                  </div>
                </div>

                <div>
                  <button
                    disabled={errors.email || errors.password ? true : false}
                    type="submit"
                    className="w-full mt-6 flex justify-center bg-red-600 hover:bg-re disabled:bg-red-200 disabled:cursor-not-allowed  hover:bg-red-400 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                    Se connecter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
