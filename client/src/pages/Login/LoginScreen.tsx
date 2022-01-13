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
      <div className="w-full  lg:w-1/2 flex flex-col">
        <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
          <p className="text-center text-3xl">Login</p>

          <span className="text-red-700 text-center mt-4 text-lg italic ml-3"> {error}</span>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="flex flex-col pt-3 md:pt-8">
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

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  to="/forgotpassword"
                  className="dark:text-white text-black ml-3  hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>

            <button
              disabled={errors.email || errors.password ? true : false}
              type="submit"
              className="w-full mt-6 flex justify-center bg-red-600 disabled:bg-red-200 disabled:cursor-not-allowed  hover:bg-red-400 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
              S'inscrire
            </button>
          </form>
          <div className="text-center pt-12 pb-12">
            <p>
              Don't have an account?{' '}
              <Link to="/register" className="underline font-semibold">
                Register here.
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="w-1/2 hidden lg:block bg-blend-screen bg-red-500">
        <div
          className=" w-full  opacity-40 h-screen hidden lg:block relative"
          style={{
            backgroundImage:
              'url(' +
              'https://images.unsplash.com/photo-1623517948841-ec5830154eff?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' +
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

export default LoginScreen;
