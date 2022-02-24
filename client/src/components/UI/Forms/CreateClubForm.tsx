/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
//@ts-ignore
import AlgoliaPlaces from 'algolia-places-react';

function CreateClubForm() {
  const [files, setFiles] = useState('');
  const [fileObj, setfileObj] = useState([]);
  const [fileArray, setfileArray] = useState([]);
  const [city, setCity] = useState<string | ''>('');
  const [postalCode, setPostalCode] = useState<string | ''>('');
  const [county, setCounty] = useState<string | ''>('');

  //@ts-ignore
  const uploadMultipleFiles = (e) => {
    //@ts-ignore
    fileObj.push(e.target.files);
    //@ts-ignore

    for (let i = 0; i < fileObj[0].length; i++) {
      //@ts-ignore

      fileArray.push(URL.createObjectURL(fileObj[0][i]));
    }
    //@ts-ignore

    setFiles(fileArray);
  };

  return (
    <form className="space-y-8 divide-y divide-gray-200">
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
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Tigres"
                  className="appearance-none block w-full mb-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                Discipline
              </label>
              <div className="mt-1">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="shadow-sm focus:ring-indigo-500  px-3 py-2 border focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md">
                  <option>JJB</option>
                  <option>Boxe</option>
                  <option>MMA</option>
                </select>
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
                <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  <svg
                    className="h-full w-full text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <button
                  type="button"
                  className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Change
                </button>
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
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept=" image/jpeg, image/png"
                        onChange={uploadMultipleFiles}
                        multiple
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
          {(fileArray || []).map((url, index) => (
            <img key={index} src={url} alt="..." className="mr-4" />
          ))}
        </div>

        <div className="pt-8">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
            <p className="mt-1 text-sm text-gray-500">
              Use a permanent address where you can receive mail.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                First name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="shadow-sm focus:ring-indigo-500 px-3 py-2  focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                Last name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="last-name"
                  id="last-name"
                  autoComplete="family-name"
                  className="shadow-sm focus:ring-indigo-500 px-3 py-2 border focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
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

        <div className="pt-8">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">More infos</h3>
            <p className="mt-1 text-sm text-gray-500">
              Well always let you know about important changes, but you pick what else you want to
              hear about.
            </p>
          </div>
          <div className="mt-6">
            <fieldset>
              <legend className="text-base font-medium text-gray-900">By Email</legend>
              <div className="mt-4 space-y-4">
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="comments"
                      name="comments"
                      type="checkbox"
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="comments" className="font-medium text-gray-700">
                      Kids
                    </label>
                    <p className="text-gray-500">
                      Get notified when someones posts a comment on a posting.
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
            <fieldset className="mt-6">
              <div>
                <legend className="text-base font-medium text-gray-900">Push Notifications</legend>
                <p className="text-sm text-gray-500">
                  These are delivered via SMS to your mobile phone.
                </p>
              </div>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <input
                    id="push-everything"
                    name="push-notifications"
                    type="radio"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor="push-everything"
                    className="ml-3 block text-sm font-medium text-gray-700">
                    Everything
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="push-email"
                    name="push-notifications"
                    type="radio"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor="push-email"
                    className="ml-3 block text-sm font-medium text-gray-700">
                    Same as email
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="push-nothing"
                    name="push-notifications"
                    type="radio"
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <label
                    htmlFor="push-nothing"
                    className="ml-3 block text-sm font-medium text-gray-700">
                    No push notifications
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Cancel
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
