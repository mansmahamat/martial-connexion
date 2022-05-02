import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';

type Props = {
  goToPreviousPage: () => void;
  currentPage: number;
  getPaginationGroup: () => number[];
  changePage(event: any): void;
  goToNextPage(): void;
  pages: number;
};

export default function Pagination({
  goToPreviousPage,
  currentPage,
  getPaginationGroup,
  changePage,
  goToNextPage,
  pages
}: Props) {
  return (
    <div className=" px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
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
      <div className="hidden   sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <nav
            className="relative z-0  inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination">
            <button
              type="button"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`  relative inline-flex disabled:cursor-not-allowed items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50`}>
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>

            {getPaginationGroup().map((item, index) => (
              <button
                key={index}
                onClick={changePage}
                className={`${
                  currentPage === item ? ' bg-red-500 text-white ' : null
                }  z-10  border-red-500  text-black relative inline-flex items-center px-4 py-2 border text-sm font-medium`}>
                <span>{item}</span>
              </button>
            ))}

            <button
              type="button"
              onClick={goToNextPage}
              disabled={currentPage === pages}
              className="relative inline-flex disabled:cursor-not-allowed items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
