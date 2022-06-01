/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect } from 'react';
import { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import moment from 'moment';
import {
  BellIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentReportIcon,
  HomeIcon,
  MenuAlt1Icon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XIcon
} from '@heroicons/react/outline';
import {
  CashIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  OfficeBuildingIcon,
  SearchIcon
} from '@heroicons/react/solid';
import { Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import GetFighterTypes from '../../types/CreateFighterTypes';

const navigation = [
  { name: 'Home', href: '/pro/home', icon: HomeIcon, current: true },
  { name: 'Paiements', href: '/pro/payment', icon: CreditCardIcon, current: false },
  { name: 'Balances', href: '/pro/balance', icon: ScaleIcon, current: false },
  { name: 'Cards', href: '/about', icon: CreditCardIcon, current: false },
  { name: 'Recipients', href: '#', icon: UserGroupIcon, current: false },
  { name: 'Reports', href: '#', icon: DocumentReportIcon, current: false }
];
const secondaryNavigation = [
  { name: 'Settings', href: '#', icon: CogIcon },
  { name: 'Help', href: '#', icon: QuestionMarkCircleIcon },
  { name: 'Privacy', href: '#', icon: ShieldCheckIcon }
];

const statusStyles = {
  success: 'bg-green-100 text-green-800',
  processing: 'bg-yellow-100 text-yellow-800',
  failed: 'bg-gray-100 text-gray-800'
};

//@ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example({ history }: any) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<GetFighterTypes>();
  const [account, setAccount] = useState([]);
  const [balance, setBalance] = useState({});

  useEffect(() => {
    // @ts-ignore
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  useEffect(() => {
    const getBalance = async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_DEV}/gym/balance/${user?.accountId}`
      );
      setBalance(data);
    };

    if (user?.accountId) {
      getBalance();
    }
  }, [user?.accountId]);

  useEffect(() => {
    const getAccountInfos = async () => {
      const { data } = await axios.get(`${process.env.REACT_APP_DEV}/account/${user?.accountId}`);
      setAccount(data);
    };

    if (user?.accountId) {
      getAccountInfos();
    }

    getAccountInfos();
  }, [user?.accountId]);

  return (
    <>
      <div className="min-h-full">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="fixed inset-0 flex z-40 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full">
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-90">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}>
                      <span className="sr-only">Close sidebar</span>
                      <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-shrink-0 flex items-center px-4">
                  <img className="h-8 w-auto" src={user?.avatar} alt="Easywire logo" />
                </div>
                <nav
                  className="mt-5 flex-shrink-0 h-full divide-y divide-red-800 overflow-y-auto"
                  aria-label="Sidebar">
                  <div className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-red-100 hover:text-white hover:bg-red-600',
                          'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                        )}
                        aria-current={item.current ? 'page' : undefined}>
                        <item.icon
                          className="mr-4 flex-shrink-0 h-6 w-6 text-red-200"
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="mt-6 pt-6">
                    <div className="px-2 space-y-1">
                      {secondaryNavigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-red-100 hover:text-white hover:bg-red-600">
                          <item.icon className="mr-4 h-6 w-6 text-red-200" aria-hidden="true" />
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </nav>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:flex lg:w-auto lg:flex-col lg:fixed lg:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-col flex-grow bg-black pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <Link to="/">
                <img
                  className="h-8 w-auto"
                  src="https://cdn.worldvectorlogo.com/logos/ucc-2.svg"
                  alt="Easywire logo"
                />
              </Link>
            </div>
            <nav
              className="mt-5 flex-1 flex flex-col divide-y divide-red-800 overflow-y-auto"
              aria-label="Sidebar">
              <div className="px-2 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-red-200 text-white' : ' text-white ',
                      'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                    )}
                    aria-current={item.current ? 'page' : undefined}>
                    <item.icon
                      className="mr-4 flex-shrink-0 h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="mt-6 pt-6">
                <div className="px-2 space-y-1">
                  {secondaryNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md hover:text-red-300 text-white ">
                      <item.icon className="mr-4 h-6 w-6 text-red-600" aria-hidden="true" />
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className="lg:pl-64 flex flex-col flex-1">
          <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200 lg:border-none">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500 lg:hidden"
              onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <MenuAlt1Icon className="h-6 w-6" aria-hidden="true" />
            </button>
            {/* Search bar */}
            <div className="flex-1 px-4 flex justify-between sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="flex-1 flex">
                <form className="w-full flex md:ml-0" action="#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <div className="relative w-full text-gray-400 focus-within:text-gray-600"></div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </>
  );
}
