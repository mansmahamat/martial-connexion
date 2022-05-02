/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState, useContext } from 'react';
import { CheckIcon } from '@heroicons/react/outline';
import { UserContext } from '../../../context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

type Props = {
  User: {
    avatar: string;
    city: string;
    date: string;
    discipline: string;
    email: string;
    firstName: string;
    lastName: string;
    billingID: string;
    password: string;
    postalCode: string;
    _id: string;
  };

  prices: {
    active: boolean;
    billing_scheme: string;
    created: number;
    currency: string;
    id: string;
    livemode: boolean;
    lookup_key: any;
    metadata: any;
    nickname: string;
    object: string;
    product: string;
    recurring: any;
    tax_behavior: string;
    tiers_mode: any;
    transform_quantity: any;
    type: string;
    unit_amount: number;
    unit_amount_decimal: string;
  }[];
};

function PricingTable({ prices, User }: Props) {
  const [authToken] = useContext(UserContext);
  const [userSubscriptions, setUserSubscriptions] = useState([]);

  const history = useNavigate();

  const handleSubscription = async (price: any) => {
    //@ts-ignore
    if (userSubscriptions && userSubscriptions.includes(price.id)) {
      //@ts-ignore
      history(`/${price.nickname.toLowerCase()}`);
      return;
    }
    if (authToken) {
      console.log('plan clicked', price);

      const { data } = await axios.post('/create-subscription', {
        priceId: price.id,
        email: User?.email
      });
      window.open(data);
    } else {
      //   history.push("/register");
    }
  };

  const buttonText = () => {
    return authToken ? 'Buy the plan' : 'Sign up';
  };

  return (
    <div className="bg-gray-900">
      <div className=" sm:pt-16 lg:pt-24">
        <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-2 lg:max-w-none">
            <h2 className="text-lg leading-6 font-semibold text-gray-300 uppercase tracking-wider">
              Pricing
            </h2>
            <p className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              The right price for you, whoever you are
            </p>
            <p className="text-xl text-gray-300">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum sequi unde repudiandae
              natus.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-8 pb-12 bg-gray-50 sm:mt-12 sm:pb-16 lg:mt-16 lg:pb-24">
        <div className="relative">
          <div className="absolute inset-0 h-3/4 bg-gray-900" />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto space-y-4 lg:max-w-5xl lg:grid lg:grid-cols-2 lg:gap-5 lg:space-y-0">
              {prices.map((tier) => (
                <div key={tier.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                  <div className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                    <div>
                      <h3
                        className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-red-100 text-red-600"
                        id="tier-standard">
                        {tier.created}
                      </h3>
                    </div>
                    <div className="mt-4 flex items-baseline text-6xl font-extrabold">
                      ${tier.unit_amount / 100}
                      <span className="ml-1 text-2xl font-medium text-gray-500">/mo</span>
                    </div>
                    <p className="mt-5 text-lg text-gray-500">{tier.nickname}</p>
                  </div>
                  <div className="flex-1 flex flex-col justify-between px-6 pt-6 pb-8 bg-gray-50 space-y-6 sm:p-10 sm:pt-6">
                    <ul role="list" className="space-y-4">
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <CheckIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
                        </div>
                        <p className="ml-3 text-base text-gray-700"> Pariatur quod similique</p>
                      </li>{' '}
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <CheckIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
                        </div>
                        <p className="ml-3 text-base text-gray-700"> Pariatur quod similique</p>
                      </li>{' '}
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <CheckIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
                        </div>
                        <p className="ml-3 text-base text-gray-700"> Pariatur quod similique</p>
                      </li>{' '}
                      <li className="flex items-start">
                        <div className="flex-shrink-0">
                          <CheckIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
                        </div>
                        <p className="ml-3 text-base text-gray-700"> Pariatur quod similique</p>
                      </li>
                    </ul>
                    <div className="rounded-md shadow">
                      <button
                        onClick={() => handleSubscription(tier)}
                        type="button"
                        className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900"
                        aria-describedby="tier-standard">
                        {/* @ts-ignore */}
                        {userSubscriptions && userSubscriptions.includes(tier.id)
                          ? 'Access plan'
                          : buttonText()}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:mt-5">
          <div className="max-w-md mx-auto lg:max-w-5xl"></div>
        </div>
      </div>
    </div>
  );
}

export default PricingTable;
