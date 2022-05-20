/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context';
import GetFighterTypes from '../../types/CreateFighterTypes';
import getTeamsTypes from '../../types/getTeamsTypes';

function CreateProduct() {
  const [product, setProduct] = useState({ discipline: '', price: '' });
  const [team, setTeam] = useState();

  const context = useContext(UserContext);

  console.log(context);

  useEffect(() => {
    // @ts-ignore
    setTeam(JSON.parse(localStorage.getItem('team')));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let updatedValue = {};
    updatedValue = { discipline: e.target.value };
    setProduct((prod) => ({
      ...prod,
      ...updatedValue
    }));
  };

  const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    let updatedValue = {};
    updatedValue = { price: e.target.value };
    setProduct((prod) => ({
      ...prod,
      ...updatedValue
    }));
  };

  const submitForm = async () => {
    await axios
      .post(`/create-product`, {
        //@ts-ignore
        teamId: team?.data._id,
        disciplinePrices: product
      })
      .then((res) => {
        localStorage.setItem('product', JSON.stringify(product));
        setProduct({ discipline: '', price: '' });
      })
      .catch((err) => console.log(err?.response?.data));
  };

  //@ts-ignore
  console.log(team?.data._id);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submitForm();
        }}
        className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200">
          <div>
            <div>
              <h3 className="text-lg mt-6 leading-6 font-medium text-gray-900">
                {/* @ts-ignore */}
                Create Club {team?.data._id}{' '}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                This information will be displayed publicly so be careful what you share.
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Club Names
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    id="clubName"
                    name="clubName"
                    type="text"
                    onChange={(e) => handleChange(e)}
                    defaultValue={product.discipline}
                    placeholder="Nom du club"
                    className="appearance-none block w-full mb-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
                {/* <span className="text-red-700  italic "> {errors.clubName}</span> */}
              </div>

              <div className="sm:col-span-4">
                <label htmlFor="email" className="block text-sm  font-medium text-gray-700">
                  Prices
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="number"
                    autoComplete="email"
                    onChange={(e) => handleChangePrice(e)}
                    defaultValue={product.price}
                    placeholder="club@gmail.fr"
                    className="shadow-sm focus:ring-indigo-500 px-3 py-2 border focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
                {/* <span className="text-red-700  italic "> {errors.email}</span> */}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-red-50 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateProduct;
