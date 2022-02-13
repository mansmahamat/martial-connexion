/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { Link, useNavigate } from 'react-router-dom';
import Toggle from '../../components/routing/ToggleTheme';
//@ts-ignore
import AlgoliaPlaces from 'algolia-places-react';
import { RegisterValidation } from './validation';
import { usePostRegister } from '../../hooks/Api/useAuth';
import { useFormik } from 'formik';
import { FaEye, FaEyeDropper, FaEyeSlash } from 'react-icons/fa';
import { sports } from '../../data/sport';

const RegisterScreen = () => {
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [city, setCity] = useState<string | ''>('');
  const [postalCode, setPostalCode] = useState<string | ''>('');
  const [discipline, setDiscipline] = useState<Array<string>>([]);
  const [selectedImage, setSelectedImage] = useState();
  const [item, setItem] = useState({
    lastModified: '',
    lastModifiedDate: '',
    name: '',
    size: 0,
    type: '',
    webkitRelativePath: ''
  });
  const navigate = useNavigate();

  const initialValues = {
    firstName: '',
    lastName: '',
    avatar: '',
    city: '',
    postalCode: '',
    discipline: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  };

  console.log(discipline);

  const Capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const OnHandleChange = (e: any) => {
    setDiscipline(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const { errors, values, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: RegisterValidation,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: () => {
      submitForm();
    }
  });

  const removeSelectedImage = () => {
    //@ts-ignore
    setSelectedImage();
  };

  //@ts-ignore
  const onChangeHandler = (event) => {
    setItem(event.target.files[0]);

    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const submitForm = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    const formaData = new FormData();
    //@ts-ignore
    formaData.append('avatar', item, item.name);
    formaData.append('firstName', Capitalize(values.firstName));
    formaData.append('lastName', Capitalize(values.lastName));
    formaData.append('city', Capitalize(city));
    formaData.append('postalCode', postalCode);
    formaData.append('email', values.email);
    formaData.append('password', values.password);

    for (let i = 0; i < discipline.length; i++) {
      formaData.append('discipline', discipline[i]);
    }

    await axios
      .post(`http://localhost:5000/api/user/register`, formaData)
      .then((res) => {
        const user = {
          //@ts-ignore
          ...JSON.parse(localStorage.getItem('user')),
          ...res.data
        };
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/login');
      })
      .catch((err) => setError(err?.response?.data));
  };

  return (
    <div className="flex justify-center mt-32 h-full items-center ">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}
        className="">
        <h1 className=" text-center font-bold text-2xl mb-1">Register</h1>

        <div className="max-w-2xl rounded-lg  ">
          <div className="m-4  text-center">
            {selectedImage && (
              <div className="flex  m-8 flex-col justify-center">
                <img
                  className="inline-block mx-20 h-24 w-24 rounded-full"
                  src={URL.createObjectURL(selectedImage)}
                  alt={item?.name}
                />
                <button
                  onClick={removeSelectedImage}
                  className="w-full mt-4 px-4 py-2 text-white bg-red-600 rounded shadow-xl">
                  Remove This Image
                </button>
              </div>
            )}
            {selectedImage && (
              <label className="inline-block  text-center mb-2 text-gray-500">
                <span>{item?.name}</span>
              </label>
            )}
            {!selectedImage && (
              <>
                <div className="flex items-center py-4 justify-center w-full">
                  <label className="flex flex-col w-full  border-4 border-red-600 border-dashed bg-gray-100 dark:bg-zinc-900  hover:border-gray-300">
                    <div className="flex flex-col items-center justify-center py-7">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-red-700 group-hover:text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="pt-1 text-sm tracking-wider text-red-700 group-hover:text-gray-600">
                        Attach a profile pic
                      </p>
                    </div>
                    <input
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      size={200000}
                      onChange={onChangeHandler}
                      id="avatar"
                      name="avatar"
                      className="opacity-0 text-red-700"
                    />
                  </label>
                </div>

                <button
                  onClick={removeSelectedImage}
                  className="w-full px-4 py-2 my-2 text-white bg-red-600 rounded shadow-xl">
                  Remove This Image
                </button>
              </>
            )}
          </div>
        </div>

        <span className="text-red-700 text-lg italic mt-8 ml-3"> {error}</span>

        <div>
          <label htmlFor="email" className="block text-sm font-medium ">
            Email address
          </label>
          <div className="mt-1">
            <input
              name="email"
              id="email"
              type="email"
              onChange={handleChange}
              placeholder="mail@gmail.com"
              className="appearance-none block w-full mb-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 text-black focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <span className="text-red-700  italic "> {errors.email}</span>
          </div>
        </div>

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

        <div className="space-y-1">
          <label htmlFor="password" className="block text-sm font-medium ">
            Confirm Password
          </label>
          <div className="mt-1">
            <input
              id="passwordConfirmation"
              name="passwordConfirmation"
              type={showPassword ? 'text' : 'password'}
              onChange={handleChange}
              placeholder="********"
              className="appearance-none relative text-gray-800 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />

            <span className="text-red-700  italic"> {errors.passwordConfirmation}</span>
          </div>
        </div>

        <div className="mt-4 content-center">
          <label className="ml-3 text-sm font-bold  tracking-wide">First Name</label>
          <input
            className="w-full content-center text-gray-800  my-2 text-base px-4 py-2 border  border-gray-300 focus:outline-none focus:border-indigo-500"
            id="firstName"
            type="text"
            name="firstName"
            onChange={handleChange}
            placeholder="First Name"
          />
          <span className="text-red-700  italic ml-3 mt-2"> {errors.firstName}</span>
        </div>

        <div className="mt-4 content-center">
          <label className="ml-3 text-sm font-bold  tracking-wide">Last Name</label>
          <input
            className="w-full content-center text-gray-800   my-2 text-base px-4 py-2 border  border-gray-300 focus:outline-none focus:border-indigo-500"
            id="lastName"
            type="text"
            name="lastName"
            onChange={handleChange}
            placeholder="Last Name"
          />
          <span className="text-red-700  italic ml-3 mt-2"> {errors.lastName}</span>
        </div>

        <div className="mt-4 content-center">
          <label className="ml-3 text-sm font-bold  tracking-wide">City</label>
          <AlgoliaPlaces
            placeholder="Write an address here"
            options={{
              appId: process.env.REACT_APP_ALGOLIA_ID,
              apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
              type: 'city',
              language: 'fr',
              countries: ['FR']
            }}
            //@ts-ignore
            onChange={(suggestion) => {
              setCity(suggestion.suggestion.name);
              setPostalCode(suggestion.suggestion.postcode);
            }}
          />
        </div>

        <div className="mt-2 content-center">
          <label className="ml-3 text-sm font-bold  tracking-wide">Discipline</label>

          <Select
            options={sports}
            isMulti
            className="basic-multi-select"
            classNamePrefix="select"
            name="sport"
            onChange={OnHandleChange}
          />
        </div>

        <div className="flex items-center mt-4 justify-between">
          <div className="text-sm">
            <Link to="/login" className="font-medium underline text-red-600 hover:text-red-500">
              Already an account ? Login
            </Link>
          </div>
        </div>

        <button
          disabled={errors.email || errors.password || errors.passwordConfirmation ? true : false}
          type="submit"
          className="w-full my-6 flex justify-center bg-red-600 disabled:bg-red-200 disabled:cursor-not-allowed  hover:bg-red-400 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
          S'inscrire
        </button>
      </form>
    </div>

    // <div className="min-h-screen flex">
    //   <div className="flex-1 overflow-hidden flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
    //     <div className="mx-auto w-full max-w-sm lg:w-96">
    //       <div>
    //         <h2 className="mt-6 text-3xl text-center font-extrabold ">Register</h2>
    //       </div>

    //       <div className="mt-8">
    //         <div className="mt-6">
    //           <form
    //             onSubmit={(e) => {
    //               e.preventDefault();
    //               handleSubmit();
    //             }}
    //             className="space-y-6">
    //             <div>
    //               <label htmlFor="email" className="block text-sm font-medium ">
    //                 Email address
    //               </label>
    //               <div className="mt-1">
    //                 <input
    //                   name="email"
    //                   id="email"
    //                   type="email"
    //                   onChange={handleChange}
    //                   placeholder="mail@gmail.com"
    //                   className="appearance-none block w-full mb-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //                 />
    //                 <span className="text-red-700  italic "> {errors.email}</span>
    //               </div>
    //             </div>

    //             <div className="space-y-1">
    //               <label htmlFor="password" className="block text-sm font-medium ">
    //                 Password
    //               </label>
    //               <div className="mt-1">
    //                 <input
    //                   id="password"
    //                   name="password"
    //                   type={showPassword ? 'text' : 'password'}
    //                   onChange={handleChange}
    //                   placeholder="********"
    //                   className="appearance-none relative text-gray-800 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //                 />
    //                 <span className="relative left-80 -top-8">
    //                   {showPassword ? (
    //                     <FaEyeSlash
    //                       onClick={() => setShowPassword(!showPassword)}
    //                       className="h-6 text-red-700 w-6"
    //                     />
    //                   ) : (
    //                     <FaEye
    //                       onClick={() => setShowPassword(!showPassword)}
    //                       className="h-6 text-red-700 w-6"
    //                     />
    //                   )}
    //                 </span>
    //                 <span className="text-red-700  italic"> {errors.password}</span>
    //               </div>
    //             </div>

    //             <div className="space-y-1">
    //               <label htmlFor="password" className="block text-sm font-medium ">
    //                 Confirm Password
    //               </label>
    //               <div className="mt-1">
    //                 <input
    //                   id="passwordConfirmation"
    //                   name="passwordConfirmation"
    //                   type={showPassword ? 'text' : 'password'}
    //                   onChange={handleChange}
    //                   placeholder="********"
    //                   className="appearance-none relative text-gray-800 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    //                 />

    //                 <span className="text-red-700  italic"> {errors.passwordConfirmation}</span>
    //               </div>
    //             </div>

    //             <div>
    //               <button
    //                 disabled={
    //                   errors.email || errors.password || errors.passwordConfirmation ? true : false
    //                 }
    //                 type="submit"
    //                 className="w-full mt-6 flex justify-center bg-red-600 disabled:bg-red-200 disabled:cursor-not-allowed  hover:bg-red-400 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
    //                 S'inscrire
    //               </button>
    //             </div>
    //           </form>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="hidden lg:block relative  bg-red-600 w-0 flex-1">
    //     <div
    //       className=" w-full  opacity-40 h-screen hidden lg:block relative"
    //       style={{
    //         backgroundImage:
    //           'url(' +
    //           'https://images.pexels.com/photos/6296010/pexels-photo-6296010.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' +
    //           ')',
    //         backgroundPosition: 'left',
    //         backgroundSize: 'cover',
    //         backgroundRepeat: 'no-repeat'
    //       }}
    //     />
    //   </div>
    // </div>
  );
};

export default RegisterScreen;
