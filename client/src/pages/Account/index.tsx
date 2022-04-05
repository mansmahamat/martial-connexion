/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react'
import { MailIcon, PhoneIcon } from '@heroicons/react/solid'
import axios from 'axios';
import { json } from 'stream/consumers';
import moment from 'moment';
import { useNavigate } from "react-router-dom";



const profile = {
  name: 'Ricardo Cooper',
  email: 'ricardo.cooper@example.com',
  avatar:
    'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  backgroundImage:
    'https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  fields: [
    ['Phone', '(555) 123-4567'],
    ['Email', 'ricardocooper@example.com'],
    ['Title', 'Senior Front-End Developer'],
    ['Team', 'Product Development'],
    ['Location', 'San Francisco'],
    ['Sits', 'Oasis, 4th floor'],
    ['Salary', '$145,000'],
    ['Birthday', 'June 8, 1990'],
  ],
}

function Account() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [user, setUser] = useState();
  const history = useNavigate();


  const manageSubscriptions = async () => {
    const { data } = await axios.post("/customer-portal", {
      //@ts-ignore
        user: user
    });
    window.open(data);
  };

//@ts-ignore
const oneSub = subscriptions.filter(item => item.customer === user?.billingID);


  useEffect(() => {
    // @ts-ignore
      setUser(JSON.parse(localStorage.getItem('user')));
    }, []);



  useEffect(() => {
    const getSubscriptions = async () => {
      const { data } = await axios.get("/subscriptions");
      console.log("subs => ", data);
      setSubscriptions(data.data);
    };

  //  if (state && state.token)
  getSubscriptions();
  }, [user]);

 

  return (
    <div>
    <div>
      <img className="h-32 mt-16 w-full object-cover lg:h-48" src={profile.backgroundImage} alt="" />
    </div>
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
        <div className="flex">
          <img className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32" src={profile.avatar} alt="" />
        </div>
        <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
          <div className="sm:hidden md:block mt-6 min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-gray-900 truncate">{profile.name}</h1>
          </div>
          <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              <MailIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
              <span>Message</span>
            </button>
            <button
              type="button"
              className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
            >
              <PhoneIcon className="-ml-1 mr-2 h-5 w-5 text-gray-400" aria-hidden="true" />
              <span>Call</span>
            </button>
          </div>
        </div>
      </div>
      <div className="hidden sm:block md:hidden mt-6 min-w-0 flex-1">
        <h1 className="text-2xl font-bold text-gray-900 truncate">{profile.name}</h1>
      </div>
    </div>
    <pre className='mx-12 my-12'>
    {subscriptions &&
          oneSub.slice(0,1).map((sub) => (
            // @ts-ignore
            <div key={sub.id}>
              <section>
                <hr />
            {/*  @ts-ignore */}

                <h4 className="fw-bold">Plan:  {sub.plan.nickname}</h4>
                <h5> 
                     {/*  @ts-ignore */}
                     Amount: {(sub.plan.amount / 100).toLocaleString("en-US", {
                    style: "currency",
                      // @ts-ignore */
                    currency: sub.plan.currency,
                  })}
                </h5>
                   {/*  @ts-ignore */}
                <p>Status: {sub.status}</p>
                <p>
                     {/*  @ts-ignore */}
                  Card last 4 digit: {sub?.default_payment_method?.card?.last4}
                </p>
                <p>
                  Current period end:{" "}
                     {/*  @ts-ignore */}
                  {moment(sub.current_period_end * 1000)
                    .format("dddd, D MMMM YYYY")
                    .toString()}
                </p>
                <button
                  onClick={() =>
                       // @ts-ignore */
                    history(`/${sub.plan.nickname.toLowerCase()}`)
                  }
                  className="bg-indigo-400 py-4 px-4 border border-black"
                >
                  Access
                </button>{" "}
                <button
                 onClick={manageSubscriptions}
                  className="bg-orange-400 py-4 px-4 border border-black"
                >
                  Manage Subscription
                </button>
              </section>
            </div>
          ))}
    </pre>
  </div>
  )
}

export default Account