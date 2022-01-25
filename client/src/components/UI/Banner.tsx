import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';

type Props = {
  id: string;
};

export default function Banner({ id }: Props) {
  console.log(id);

  return (
    <div className="bg-red-600 ">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span className="flex p-2 rounded-lg bg-red-800">
              <FiAlertCircle className="h-6 w-6 text-white" aria-hidden="true" />
            </span>
            <p className="ml-3 font-medium text-white truncate">
              <span className="md:hidden">Lorem ipsum dolo</span>
              <span className="hidden md:inline">Your profile is incomplete</span>
            </p>
          </div>
          <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
            <a
              href={`/complete-fighter-profile/${id}`}
              className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-red-600 bg-white hover:bg-red-50">
              Complete my profile
            </a>
          </div>
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              className="-mr-1 flex p-2 rounded-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2">
              <span className="sr-only">Dismiss</span>
              <MdClose className="h-6 w-6 text-white" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
