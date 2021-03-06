/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ChevronRightIcon } from '@heroicons/react/outline';
import { CashIcon } from '@heroicons/react/solid';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import GetFighterTypes from '../../types/CreateFighterTypes';

const transactions = [
  {
    id: 1,
    name: 'Payment to Molly Sanders',
    href: '#',
    amount: '$20,000',
    currency: 'USD',
    status: 'success',
    date: 'July 11, 2020',
    datetime: '2020-07-11'
  }
  // More transactions...
];

//@ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const statusStyles = {
  success: 'bg-green-100 text-green-800',
  processing: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-gray-100 text-gray-800'
};

function Payment() {
  const [user, setUser] = useState<GetFighterTypes>();
  const [userSelected, setUserSelected] = useState<GetFighterTypes>();

  useEffect(() => {
    // @ts-ignore
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const getCustomerInfo = async (id: string) => {
    const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/customers/${id}`);
    setUserSelected(data);
  };

  console.log(transactions);
  return (
    <div className="ml-40">
      <div className="shadow sm:hidden">
        <ul role="list" className="mt-2 divide-y divide-gray-200 overflow-hidden shadow sm:hidden">
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              <a href={transaction.href} className="block px-4 py-4 bg-white hover:bg-gray-50">
                <span className="flex items-center space-x-4">
                  <span className="flex-1 flex space-x-2 truncate">
                    <CashIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                    <span className="flex flex-col text-gray-500 text-sm truncate">
                      <span className="truncate">{transaction.name}</span>
                      <span>
                        <span className="text-gray-900 font-medium">{transaction.amount}</span>{' '}
                        {transaction.currency}
                      </span>
                      <time dateTime={transaction.datetime}>{transaction.date}</time>
                    </span>
                  </span>
                  <ChevronRightIcon
                    className="flex-shrink-0 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </li>
          ))}
        </ul>

        <nav
          className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200"
          aria-label="Pagination">
          <div className="flex-1 flex justify-between">
            <a
              href="#"
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
              Previous
            </a>
            <a
              href="#"
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500">
              Next
            </a>
          </div>
        </nav>
      </div>

      {/* Activity table (small breakpoint and up) */}
      <div className="hidden sm:block">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col mt-2">
            <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Transaction
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider md:block">
                      Status
                    </th>
                    <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {user?.paymentReceived.map((sub: any) => (
                    <tr key={sub.paymentIntent.id} className="bg-white">
                      <td className="max-w-0 w-full px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className="flex">
                          <span
                            onClick={() => getCustomerInfo(sub.paymentIntent.receipt_email)}
                            className="group inline-flex space-x-2 truncate text-sm">
                            <CashIcon
                              className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                              aria-hidden="true"
                            />
                            <p className="text-gray-500 truncate group-hover:text-gray-900">
                              {sub.paymentIntent.receipt_email}
                            </p>
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                        <span className="text-gray-900 font-medium">
                          {sub.paymentIntent.amount / 100}
                        </span>
                        ???
                      </td>
                      <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 md:block">
                        <span
                          className={classNames(
                            //@ts-ignore
                            statusStyles[sub.paymentIntent.status],
                            'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize'
                          )}>
                          {sub.paymentIntent.status === 'succeeded' ? 'Pay??' : 'Non Pay??'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                        {moment.unix(sub.paymentIntent.created).format('DD/MM/YYYY')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Pagination */}
              <nav
                className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6"
                aria-label="Pagination">
                <div className="hidden sm:block">
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to{' '}
                    <span className="font-medium">10</span> of{' '}
                    <span className="font-medium">20</span> results
                  </p>
                </div>
                <div className="flex-1 flex justify-between sm:justify-end">
                  <a
                    href="#"
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Previous
                  </a>
                  <a
                    href="#"
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                    Next
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="flex mt-8 justify-center">
        <p
          // @ts-ignore
          onClick={() => setUserSelected({})}
          className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
          Fermer les details
        </p>{' '}
      </div>

      {/* @ts-ignore */}
      {userSelected?._id && (
        <div>
          <div className="container mt-14 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-end px-4 pt-4">
              <button
                id="dropdownButton"
                data-dropdown-toggle="dropdown"
                className="hidden sm:inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
                type="button">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
                </svg>
              </button>
              <div
                id="dropdown"
                className="hidden z-10 w-44 text-base list-none bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700"></div>
            </div>
            <div className="flex flex-col items-center pb-10">
              <img
                className="mb-3 w-24 h-24 rounded-full shadow-lg"
                src={userSelected.avatar}
                alt="Bonnie image"
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {userSelected.firstName} {userSelected.lastName}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {userSelected.city}, {userSelected.postalCode}
              </span>
              <div className="flex mt-4 space-x-3 lg:mt-6">
                <a
                  href={`mailto:${userSelected.email}`}
                  className="inline-flex items-center py-2 px-4 text-sm font-medium text-center text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700">
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Payment;
