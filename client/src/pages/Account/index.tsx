/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useContext, useEffect, useState } from 'react';
import { MailIcon, PhoneIcon } from '@heroicons/react/solid';
import axios from 'axios';
import { json } from 'stream/consumers';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context';
import { useGetUser } from '../../hooks/Api/useAuth';

interface IUser {
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
  paymentStatus: Array<object>;
}

interface IPaymentStatus {
  paymentStatus: {
    checkoutcompleted: {
      amount_total: number;
      payment_status: string;
      id: number;
      payment_intent: string;
      expires_at: number;
    };
  }[];
}

function Account() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [subscriptionsIsLoading, setSubscriptionsIsLoading] = useState(false);
  const [customerBalance, setCustomerBalance] = useState([]);
  const [user, setUser] = useState<IUser>();
  const [userInfos, setUserInfos] = useState<IPaymentStatus>();
  const history = useNavigate();

  const context = useContext(UserContext);

  //@ts-ignore

  const manageSubscriptions = async () => {
    const { data } = await axios.post(`${process.env.REACT_APP_DEV}/customer-portal`, {
      //@ts-ignore
      user: user
    });
    window.open(data);
  };

  //@ts-ignore
  const oneSub = subscriptions.filter((item) => item.customer === user?.billingID);

  useEffect(() => {
    // @ts-ignore
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  useEffect(() => {
    const getSubscriptions = async () => {
      setSubscriptionsIsLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_DEV}/subscriptions`).finally(() => {
        setSubscriptionsIsLoading(false);
      });
      setSubscriptions(data.data);
    };

    //  if (state && state.token)
    getSubscriptions();
  }, [user]);

  useEffect(() => {
    const getCustomerBalance = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_DEV}/customer/balance/${user?.billingID}`
      );
      setCustomerBalance(data);
    };

    //  if (state && state.token)
    getCustomerBalance();
  }, [user]);

  useEffect(() => {
    const getUserInfos = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_DEV}/user/user/${user?._id}`);
      setUserInfos(data);
      localStorage.setItem('user', JSON.stringify(data));
    };

    //  if (state && state.token)
    getUserInfos();
  }, [user]);

  console.log(userInfos?.paymentStatus);

  return (
    <>
      <section className=" mt-72 block h-500-px">
        <div className=" top-0  w-full h-full bg-center bg-cover">
          <span id="blackOverlay" className="w-full h-full  opacity-50 bg-black"></span>
        </div>
      </section>
      <section className="  py-16 bg-blueGray-200">
        <div className="container mx-auto px-4">
          <div className=" flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-between">
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <button
                      className="bg-red-500 active:bg-red-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                      type="button">
                      Modifier le profil
                    </button>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <img
                    alt="..."
                    src={user?.avatar}
                    className="shadow-xl ml-12 mt-8 rounded-full h-24 align-middle border-none  -m-16 
                     max-w-150-px"
                  />
                </div>
              </div>
              <div className=" mt-24">
                <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                  {user?.firstName} {user?.lastName}
                </h3>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {user?.email}
                </div>
                <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                  <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                  {user?.city}, {user?.postalCode}
                </div>
                <div className="mb-2 text-blueGray-600 mt-10">
                  <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>Solution
                  Manager - Creative Tim Officer
                </div>
                <div className="mb-2 text-blueGray-600">
                  <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>University of
                  Computer Science
                </div>
              </div>
              <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <pre className="mx-12 my-12">
                      {subscriptionsIsLoading && <p>LOADING...</p>}
                      {subscriptions &&
                        oneSub.map((sub) => (
                          // @ts-ignore
                          <div key={sub.id}>
                            <section>
                              <hr />
                              {/*  @ts-ignore */}
                              <h4 className="fw-bold">Plan: {sub.plan.nickname}</h4>
                              <h5>
                                {/*  @ts-ignore */}
                                Amount: {/*  @ts-ignore */}
                                {(sub.plan.amount / 100).toLocaleString('en-US', {
                                  style: 'currency',
                                  // @ts-ignore */
                                  currency: sub.plan.currency
                                })}
                              </h5>
                              {/*  @ts-ignore */}
                              <p>Statut: {sub.status}</p>
                              <p>
                                {/*  @ts-ignore */}4 derniers chiffres de la carte:{' '}
                                {sub?.default_payment_method?.card?.last4}
                              </p>
                              <p>
                                Période: {/*  @ts-ignore */}
                                {moment(sub.current_period_end * 1000)
                                  .format(' D/MM/YYYY')
                                  .toString()}
                              </p>
                              {/*  @ts-ignore */}
                              {sub.plan.nickname === 'PRO' && (
                                <button
                                  onClick={() =>
                                    // @ts-ignore */
                                    history(`/${sub.plan.nickname.toLowerCase()}`)
                                  }
                                  className="bg-black text-white py-4 px-4 border border-black">
                                  Accéder
                                </button>
                              )}{' '}
                              <button
                                onClick={manageSubscriptions}
                                className="bg-red-400 py-4 px-4 border border-black">
                                Manage Subscription
                              </button>
                            </section>
                          </div>
                        ))}
                    </pre>

                    {userInfos?.paymentStatus && (
                      <pre className="mx-12 my-12">
                        {userInfos?.paymentStatus?.map((sub) => (
                          <div key={sub?.checkoutcompleted?.id}>
                            {sub?.checkoutcompleted?.amount_total && (
                              <section>
                                <hr />
                                <h5>
                                  Montant:
                                  {sub?.checkoutcompleted?.amount_total / 100} €
                                </h5>
                                <p>
                                  Statut:
                                  {sub?.checkoutcompleted?.payment_status === 'paid'
                                    ? 'Payé'
                                    : 'Impayé'}
                                </p>
                                <p>
                                  Date du paiement:
                                  {moment
                                    .unix(sub?.checkoutcompleted.expires_at)
                                    .format('DD/MM/YYYY')}
                                </p>
                                {/* {sub?.checkoutcompleted?.payment_intent} */}
                              </section>
                            )}
                          </div>
                        ))}
                      </pre>
                    )}
                  </div>

                  {context?.team?.disciplinePrices && (
                    <pre className="mx-12 my-12">
                      <h4 className="text-red-800">Discipline</h4>
                      {context?.team?.disciplinePrices?.map((sub: any) => (
                        <div key={sub?._id}>
                          <section>
                            <hr />
                            <h5>
                              {/*  @ts-ignore */}
                              Amount: {sub?.discipline}
                            </h5>
                            {/*  @ts-ignore */}
                            <p>Statut: {sub?.price} € </p>
                          </section>
                        </div>
                      ))}
                    </pre>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Account;
