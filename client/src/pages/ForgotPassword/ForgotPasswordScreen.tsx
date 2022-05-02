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
  const [disabledB, setDisabledB] = useState(false);
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
    <div className="flex justify-center h-screen  antialiased">
      <div className=" sm:mt-40 mt-24 my-auto max-w-md  p-3 ">
        <div className="text-center m-6">
          <h1 className="text-3xl font-semibold ">Mot de passe oublié ?</h1>
          <p className="">
            Just enter your email address below and we'll send you a link to reset your password!
          </p>
          <span className="text-red-700 text-lg italic mt-8 ml-3"> {error}</span>
          <span className="text-green-700 text-lg mt-8 italic ml-3"> {success}</span>
        </div>
        <div className="m-6">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="mb-4">
            <div className="mb-6">
              <label className="block mb-2 text-sm  ">Email Address</label>
              <input
                name="email"
                id="email"
                type="email"
                onChange={handleChange}
                placeholder="mail@gmail.com"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mt-1 leading-tight focus:outline-none focus:shadow-outline  "
              />
            </div>
            <div className="mb-6">
              <button
                disabled={errors.email ? true : false}
                type="submit"
                className="w-full flex justify-center disabled:bg-red-200 disabled:cursor-not-allowed bg-red-600  hover:bg-red-400 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                Confirmer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;
