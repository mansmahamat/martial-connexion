import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CheckIcon } from '@heroicons/react/solid';
import CreateClubForm from '../../components/UI/Forms/CreateClubForm';
import GoogleCalendar from '../../components/googleCalendar';

const steps = [
  { id: 1, name: 'Club informations', href: '#', status: 'complete' },
  { id: 2, name: 'Planning', href: '#', status: 'current' },
  { id: 3, name: 'Review', href: '#', status: 'upcoming' }
];

export default function CreateClub() {
  const [selectSteps, setSelectSteps] = useState(1);

  const getStep = () => {
    switch (selectSteps) {
      case 1:
        return <CreateClubForm />;
      case 2:
        return <GoogleCalendar />;
      case 3:
        return '<InvestmentProfile setStep={setStep} />';

      default:
        return <>error</>;
    }
  };

  console.log(selectSteps);
  return (
    <div className="container mt-8 lg:w-full">
      <nav aria-label="Progress">
        <ol
          role="list"
          className="border border-gray-300 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0">
          {steps.map((step, stepIdx) => (
            <li key={step.name} className="relative md:flex-1 md:flex">
              {
                <a
                  href={step.href}
                  className="px-6 py-4 flex items-center text-sm font-medium"
                  aria-current="step">
                  <span
                    className={`flex-shrink-0 w-10  h-10 flex items-center justify-center border-2 border-indigo-600 rounded-full ${
                      selectSteps === step.id ? 'bg-red-300' : ''
                    }`}>
                    <span className="text-indigo-600" onClick={() => setSelectSteps(step.id)}>
                      {step.id}
                    </span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-indigo-600">{step.name}</span>
                </a>
              }

              {stepIdx !== steps.length - 1 ? (
                <>
                  {/* Arrow separator for lg screens and up */}
                  <div
                    className="hidden md:block absolute top-0 right-0 h-full w-5"
                    aria-hidden="true">
                    <svg
                      className="h-full w-full text-gray-300"
                      viewBox="0 0 22 80"
                      fill="none"
                      preserveAspectRatio="none">
                      <path
                        d="M0 -2L20 40L0 82"
                        vectorEffect="non-scaling-stroke"
                        stroke="currentcolor"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </>
              ) : null}
            </li>
          ))}
        </ol>
      </nav>
      <div>{getStep()}</div>
    </div>
  );
}
