/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
//@ts-ignore
import AlgoliaPlaces from 'algolia-places-react';
import { useFormik } from 'formik';
import axios from 'axios';
// import { CreateFighterValidation } from './validation';
import Toggle from '../../components/routing/ToggleTheme';
import { useNavigate, useParams } from 'react-router-dom';

type Props = {
  User: {
    date: string;
    email: string;
    name: string;
    password: string;
    resetPasswordExpire: string;
    resetPasswordToken: string;
    __v: number;
    _id: string;
  };
};

function UpdateFighterProfile() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState({
    lastModified: '',
    lastModifiedDate: '',
    name: '',
    size: 0,
    type: '',
    webkitRelativePath: ''
  });

  console.log(id);

  const [city, setCity] = useState<string | ''>('');
  const [postalCode, setPostalCode] = useState<string | ''>('');

  const [selectedImage, setSelectedImage] = useState();

  const initialValues = {
    firstName: '',
    lastName: '',
    avatar: '',
    city: '',
    postalCode: '',
    discipline: ''
  };

  const { errors, values, handleChange, handleSubmit } = useFormik({
    initialValues,
    // validationSchema: CreateFighterValidation,
    // validateOnBlur: true,
    // validateOnChange: true,
    onSubmit: () => {
      submitForm();
    }
  });

  const removeSelectedImage = () => {
    //@ts-ignore
    setSelectedImage();
  };

  const submitForm = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    const formaData = new FormData();
    //@ts-ignore
    formaData.append('avatar', item, item.name);
    console.log(item);
    formaData.append('firstName', values.firstName);
    formaData.append('lastName', values.lastName);
    formaData.append('city', city);
    formaData.append('postalCode', postalCode);
    //@ts-ignore
    formaData.append('userId', id);
    formaData.append('discipline', values.discipline);

    await axios
      .patch(`http://localhost:5000/api/fighter/${id}`, formaData)
      .then((res) => {
        const user = {
          //@ts-ignore
          ...JSON.parse(localStorage.getItem('user')),
          ...res.data
        };
        localStorage.setItem('user', JSON.stringify(user));
      })
      .catch((err) => console.log(err));

    navigate('/');
    // window.location.reload();
  };

  //@ts-ignore
  const onChangeHandler = (event) => {
    setItem(event.target.files[0]);

    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };
  return (
    <div className="h-screen md:flex">
      <div
        className="relative overflow-hidden md:flex w-1/2  justify-around items-center hidden"
        style={{
          backgroundImage:
            'url(' +
            'https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80' +
            ')',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat'
        }}>
        <div className="absolute bg-red-500 opacity-40 inset-0 z-0"></div>
      </div>
      <div className="flex md:w-1/2 justify-center py-10 items-center ">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
          className="">
          <h1 className=" text-center font-bold text-2xl mb-1">Update your profile</h1>
          <Toggle />
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
          <div className="mt-4 content-center">
            <label className="ml-3 text-sm font-bold  tracking-wide">First Name</label>
            <input
              className="w-full content-center text-red-600  my-2 text-base px-4 py-2 border  border-gray-300 focus:outline-none focus:border-indigo-500"
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
              className="w-full content-center text-red-600  my-2 text-base px-4 py-2 border  border-gray-300 focus:outline-none focus:border-indigo-500"
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
            <select
              className="w-full content-center text-gray-400  my-2 text-base px-4 py-2 border  border-gray-300 focus:outline-none focus:border-indigo-500"
              id="discipline"
              name="discipline"
              onChange={handleChange}>
              <option disabled selected value="">
                Select a discipline
              </option>
              <option>Jiujitsu brésilien</option>
              <option>MMA</option>
              <option>Boxe</option>
            </select>
            <span className="text-red-700  italic ml-3 mt-2"> {errors.discipline}</span>
          </div>

          <button
            type="submit"
            className="block w-full bg-red-600 hover:bg-red-400 my-4 py-2 rounded-2xl text-white font-semibold mb-2">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateFighterProfile;
