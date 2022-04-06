/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
//@ts-ignore
import AlgoliaPlaces from 'algolia-places-react';
import Select from 'react-select';
import { sports } from '../../../../data/sport';
import { CreateClubFormValidation } from './validation';
import { useFormik } from 'formik';

type Props = {
  setSelectSteps: React.Dispatch<React.SetStateAction<number>>;
  setClubName: React.Dispatch<React.SetStateAction<string>>;
  setDiscipline: React.Dispatch<React.SetStateAction<Array<string>>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setLogo: any;
  setEmailContact: React.Dispatch<React.SetStateAction<string>>;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  setPostalCode: React.Dispatch<React.SetStateAction<string>>;
  setCounty: React.Dispatch<React.SetStateAction<string>>;
  setNumber: React.Dispatch<React.SetStateAction<number>>;
  setKids: React.Dispatch<React.SetStateAction<boolean>>;
  city: string;
  postalCode: string;
  county: string;
  kids: boolean;
};

function CreateClubForm({
  setSelectSteps,
  setClubName,
  setDiscipline,
  setDescription,
  setLogo,
  setEmailContact,
  setCity,
  setPostalCode,
  setCounty,
  city,
  postalCode,
  county,
  setNumber,
  setKids,
  kids
}: Props) {
  const [fileArray, setfileArray] = useState([]);

  const [selectedImage, setSelectedImage] = useState();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submission prevented');
    setClubName(values.clubName);
    setEmailContact(values.email)
    setNumber(values.number)
    setDescription(values.about)
    setSelectSteps(2)
  };


  const removeSelectedImage = () => {
    //@ts-ignore
    setSelectedImage();
  };

  const removeSelectedCoverImage = () => {
    //@ts-ignore
    setSelecteCoverImage();
  };

  const handleNameClubChange = (e: React.FormEvent<HTMLInputElement>) => {
    setClubName(e.currentTarget.value);
    handleChange
  };

  const handleDisciplineChange = (e: any) => {
    setDiscipline(Array.isArray(e) ? e.map((x) => x.value) : []);
  };

  const handleDescriptionChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    setDescription(e.currentTarget.value);
  };

  const handleLogoChange = (e: any) => {
    setLogo(e.target.files[0]);

    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleEmailChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEmailContact(e.currentTarget.value);
  };


 

  const initialValues = {
    clubName: '',
    email: '',
    number: 0,
    discipline: '',
    about: '',
    
  };

  const { errors, values, handleChange, handleSubmit } = useFormik({
    initialValues,
    validationSchema: CreateClubFormValidation,
    validateOnBlur: true,
    validateOnChange: true,
    validateOnMount: true,
    onSubmit: () => {
      submitForm();
    }
  });



  const submitForm = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
   console.log("good")


    
  };


  return (
    <form onSubmit={onSubmit} className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg mt-6 leading-6 font-medium text-gray-900">Create Club</h3>
            <p className="mt-1 text-sm text-gray-500">
              This information will be displayed publicly so be careful what you share.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Club Name
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  id="clubName"
                  name="clubName"
                  type="text"
                  onChange={handleChange}
                  placeholder="Nom du club"
                  className="appearance-none block w-full mb-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <span className="text-red-700  italic "> {errors.clubName}</span>
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm  font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={handleChange}
                  placeholder="club@gmail.fr"
                  className="shadow-sm focus:ring-indigo-500 px-3 py-2 border focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <span className="text-red-700  italic "> {errors.email}</span>

            </div>

            <div className="sm:col-span-4">
              <label htmlFor="email" className="block text-sm  font-medium text-gray-700">
                Numéro de telephone
              </label>
              <div className="mt-1">
                <input
                  id="number"
                  name="number"
                  type="number"
                  onChange={handleChange}
                  placeholder="06xxxxxxxx"
                  className="shadow-sm focus:ring-indigo-500 px-3 py-2 border focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
              <span className="text-red-700  italic "> {errors.number}</span>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                Street address
              </label>
              <div className="mt-1">
                <AlgoliaPlaces
                  placeholder="Write an address here"
                  options={{
                    appId: process.env.REACT_APP_ALGOLIA_ID,
                    apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
                    type: 'address',
                    language: 'fr',
                    countries: ['FR']
                  }}
                  //@ts-ignore
                  onChange={(suggestion) => {
                    setCity(suggestion.suggestion.city);
                    setPostalCode(suggestion.suggestion.postcode);
                    setCounty(suggestion.suggestion.administrative);
                  }}
                  //@ts-ignore
                  onClear={() => {
                    setCity('');
                    setPostalCode('');
                    setCounty('');
                  }}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                City
              </label>
              <div className="mt-1">
                <input
                  readOnly
                  type="text"
                  name="city"
                  id="city"
                  value={city}
                  autoComplete="address-level2"
                  className="shadow-sm focus:ring-indigo-500 px-3 py-2 border focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>

            </div>

            <div className="sm:col-span-2">
              <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                State / Province
              </label>
              <div className="mt-1">
                <input
                  value={county}
                  readOnly
                  type="text"
                  name="region"
                  id="region"
                  autoComplete="address-level1"
                  className="shadow-sm focus:ring-indigo-500 px-3 py-2 border focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                ZIP / Postal code
              </label>
              <div className="mt-1">
                <input
                  value={postalCode}
                  readOnly
                  type="text"
                  name="postal-code"
                  id="postal-code"
                  autoComplete="postal-code"
                  className="shadow-sm focus:ring-indigo-500 px-3 py-2 border focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Discipline
            </label>
            <div className="mt-1">
              {/* @ts-ignore */}
              <Select options={sports} onChange={handleDisciplineChange} isMulti />
            </div>
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="about" className="block text-sm font-medium text-gray-700">
              About
            </label>
            <div className="mt-1">
              <textarea
                id="about"
                name="about"
                onChange={handleChange}
                rows={3}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                defaultValue={''}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p>
            <span className="text-red-700  italic "> {errors.about}</span>
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
              Logo
            </label>
            <div className="mt-1 flex items-center">
              {!selectedImage && (
                <>
                  <span className="h-12 w-12 mr-8 rounded-full overflow-hidden bg-gray-100">
                    <svg
                      className="h-full w-full text-gray-300"
                      fill="currentColor"
                      viewBox="0 0 24 24">
                      <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>

                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    size={200000}
                    id="avatar"
                    name="avatar"
                    className=" text-red-700"
                    onChange={handleLogoChange}
                  />
                </>
              )}

              {selectedImage && (
                <div className="flex  m-8 flex-col justify-center">
                  <img
                    className="inline-block mx-20 h-12 w-12 rounded-full"
                    src={URL.createObjectURL(selectedImage)}
                    alt="eee"
                  />
                  <button
                    onClick={removeSelectedImage}
                    className=" w-36 mt-4 px-4 py-2 text-white bg-red-600 rounded shadow-xl">
                    Remove
                  </button>
                </div>
              )}
            </div>
          </div>

          
        </div>
      </div>

     

      <div className="pt-8">
        <div className="pt-8">
          <div className="mt-6">
            <fieldset>
              <legend className="text-base font-medium text-gray-900">By Email</legend>
              <div className="mt-4 space-y-4">
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="kids"
                      name="kids"
                      type="checkbox"
                      onChange={() => setKids(!kids)}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="kids" className="font-medium text-gray-700">
                      Kids
                    </label>
                    <p className="text-gray-500">Cours enfants</p>
                  </div>
                </div>
                
                
      
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            onClick={() => setSelectSteps(2)}
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            next
          </button>
          <button
          disabled={errors.clubName || errors.number || errors.email || errors.about  ? true : false}
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 disabled:bg-red-700 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreateClubForm;
