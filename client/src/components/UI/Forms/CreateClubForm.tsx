/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
//@ts-ignore
import AlgoliaPlaces from 'algolia-places-react';
import Select from 'react-select';
import { sports } from '../../../data/sport';

type Props = {
  setSelectSteps: React.Dispatch<React.SetStateAction<number>>;
  setClubName: React.Dispatch<React.SetStateAction<string>>;
  setDiscipline: React.Dispatch<React.SetStateAction<Array<string>>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setLogo: any;
  setCoverImage: any;
  setEmailContact: React.Dispatch<React.SetStateAction<string>>;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  setPostalCode: React.Dispatch<React.SetStateAction<string>>;
  setCounty: React.Dispatch<React.SetStateAction<string>>;
  setNumber: React.Dispatch<React.SetStateAction<string>>;
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
  setCoverImage,
  setNumber,
  setKids,
  kids
}: Props) {
  const [fileArray, setfileArray] = useState([]);

  const [selectedImage, setSelectedImage] = useState();
  const [selecteCoverImage, setSelecteCoverImage] = useState();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submission prevented');
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

  const handleNumberChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNumber(e.currentTarget.value);
  };

  const handleCoverImage = (e: any) => {
    setCoverImage(e.target.files[0]);

    if (e.target.files && e.target.files.length > 0) {
      setSelecteCoverImage(e.target.files[0]);
    }
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
                  onChange={handleNameClubChange}
                  placeholder="Nom du club"
                  className="appearance-none block w-full mb-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
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
                  onChange={handleEmailChange}
                  placeholder="club@gmail.fr"
                  className="shadow-sm focus:ring-indigo-500 px-3 py-2 border focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
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
                  onChange={handleNumberChange}
                  placeholder="06xxxxxxxx"
                  className="shadow-sm focus:ring-indigo-500 px-3 py-2 border focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
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
                onChange={handleDescriptionChange}
                rows={3}
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                defaultValue={''}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">Write a few sentences about yourself.</p>
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

          <div className="sm:col-span-6">
            <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-700">
              Cover photo
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true">
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    <span>Upload a file</span>
                    <input
                      type="file"
                      accept=".png, .jpg, .jpeg"
                      size={200000}
                      id="avatar"
                      name="avatar"
                      className=" text-red-700"
                      onChange={handleCoverImage}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-24">
        {selecteCoverImage && (
          <div className="flex  m-8 flex-col justify-center">
            <img
              className="inline-block mx-20  h-28 "
              src={URL.createObjectURL(selecteCoverImage)}
              alt="eee"
            />
            <button
              onClick={removeSelectedCoverImage}
              className=" w-36 mt-4 px-4 py-2 text-white bg-red-600 rounded shadow-xl">
              Remove
            </button>
          </div>
        )}
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
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="candidates" className="font-medium text-gray-700">
                      Pro
                    </label>
                    <p className="text-gray-500">
                      Get notified when a candidate applies for a job.
                    </p>
                  </div>
                </div>
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="candidates"
                      name="candidates"
                      type="checkbox"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="candidates" className="font-medium text-gray-700">
                      Womans
                    </label>
                    <p className="text-gray-500">
                      Get notified when a candidate applies for a job.
                    </p>
                  </div>
                </div>
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="offers"
                      name="offers"
                      type="checkbox"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="offers" className="font-medium text-gray-700">
                      Amateur
                    </label>
                    <p className="text-gray-500">
                      Get notified when a candidate accepts or rejects an offer.
                    </p>
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
            type="submit"
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Save
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreateClubForm;
