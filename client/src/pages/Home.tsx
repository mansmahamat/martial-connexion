/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState, useContext } from 'react';
import Toggle from '../components/routing/ToggleTheme';
import Banner from '../components/UI/Banner';
import Hero from '../components/UI/Hero';
import { useGetFighter } from '../hooks/Api/useFighter';
import { loadStripe } from '@stripe/stripe-js';
import PricingTable from '../components/UI/Princing';
import axios from 'axios';
import { CheckIcon } from '@heroicons/react/outline'
import PricesTypes from '../types/PricesTypes';
import { UserContext } from '../context';
import { useNavigate } from "react-router-dom";



const stripePromise = loadStripe(
  'pk_test_51KEwIMLXQl0DCJw6DnOm3mqbpIdTiVmUufFshoMeKzhzQ3KIADlARPLud5TKj7yjErn7qFdxGedkYPIcgw5Aq0kQ00ZwUioXcz'
);

const tiers = [
  {
    name: 'Basic',
    href: '#',
    priceMonthly: 0,
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    features: [
      'Pariatur quod similique',
      'Sapiente libero doloribus modi nostrum',
      'Vel ipsa esse repudiandae excepturi',
      'Itaque cupiditate adipisci quibusdam',
    ],
  },
  {
    name: 'Pro',
    href: '#',
    priceMonthly: 0,
    description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit.',
    features: [
      'Pariatur quod similique',
      'Sapiente libero doloribus modi nostrum',
      'Vel ipsa esse repudiandae excepturi',
      'Itaque cupiditate adipisci quibusdam',
    ],
  },
]


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
};



function Home({ User }: Props) {
  //const [user, setUser] = useState({ _id: '', isComplete: false, avatar: '', fir: '' });
  const [prices, setPrices] = useState<PricesTypes[]>([]);
  const [state] = useContext(UserContext);
  const [authToken] = useContext(UserContext);
  const [userSubscriptions, setUserSubscriptions] = useState([]);

  const history = useNavigate();




useEffect(() => {
  fetchPrices();
}, []);

const fetchPrices = async () => {
  const { data } = await axios.get("http://localhost:8080/api/prices");
  setPrices(data.slice(2, 4));
};



const handleSubscription = async (price: any) => {



  //@ts-ignore
  if (userSubscriptions && userSubscriptions.includes(price.id)) {
  //@ts-ignore
    history(`/${price.nickname.toLowerCase()}`);
    return;
  }
  if (authToken) {
    console.log("plan clicked", price);

    const { data } = await axios.post("/create-subscription", {
      priceId: price.id,
      email: User?.email
    });
    window.open(data);
  } else {
 //   history.push("/register");
  }
};




  const buttonText = () => {
    return authToken ? "Buy the plan" : "Sign up";
  };

  useEffect(() => {
    //@ts-ignore
    const result = [];
    const check = () =>
      state &&
     
      state.subscriptions &&
      //@ts-ignore
      state.subscriptions.map((sub) => {
        result.push(sub.plan.id);
      });
    check();
    //@ts-ignore
    setUserSubscriptions(result);
  }, [state]);



  return (
    <div className="h-screen">
      <h1 className="text-xl">
        {' '}
        Hello, {User?.firstName} {User?.lastName}
      </h1>
      {buttonText()}
      <Hero />

      <div className="bg-gray-900">
    <div className=" sm:pt-16 lg:pt-24">
      <div className="max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-2 lg:max-w-none">
          <h2 className="text-lg leading-6 font-semibold text-gray-300 uppercase tracking-wider">Pricing</h2>
          <p className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
            The right price for you, whoever you are
          </p>
          <p className="text-xl text-gray-300">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum sequi unde repudiandae natus.
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
              <div key={tier.id}  className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                <div  className="px-6 py-8 bg-white sm:p-10 sm:pb-6">
                  <div>
                    <h3
                      className="inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase bg-red-100 text-red-600"
                      id="tier-standard"
                    >
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
                  <li  className="flex items-start">
                        <div className="flex-shrink-0">
                          <CheckIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
                        </div>
                        <p className="ml-3 text-base text-gray-700"> Pariatur quod similique</p>
                      </li> <li  className="flex items-start">
                        <div className="flex-shrink-0">
                          <CheckIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
                        </div>
                        <p className="ml-3 text-base text-gray-700"> Pariatur quod similique</p>
                      </li> <li  className="flex items-start">
                        <div className="flex-shrink-0">
                          <CheckIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
                        </div>
                        <p className="ml-3 text-base text-gray-700"> Pariatur quod similique</p>
                      </li> <li  className="flex items-start">
                        <div className="flex-shrink-0">
                          <CheckIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
                        </div>
                        <p className="ml-3 text-base text-gray-700"> Pariatur quod similique</p>
                      </li>
                  </ul>
                  <div className="rounded-md shadow">
                    <button
                     onClick={() => handleSubscription(tier)}
                    type='button'
                      className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 hover:bg-gray-900"
                      aria-describedby="tier-standard"
                    >
                      {/* @ts-ignore */}
                     {userSubscriptions && userSubscriptions.includes(tier.id)
              ? "Access plan"
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
        <div className="max-w-md mx-auto lg:max-w-5xl">
          
        </div>
      </div>
    </div>
  </div>

      {/* <form action="/customer-portal" method="POST">
        <input type="hidden" id="customer" name="customer" value={User?.billingID} />
        <button className="bg-green-500" type="submit">
          Manage Billing {User?.billingID}
        </button>
      </form> */}
    </div>
  );
}

export default Home;
