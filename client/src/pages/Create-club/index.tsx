import React, { useState } from 'react';
import CreateClubForm from '../../components/UI/Forms/CreateClubForm/CreateClubForm';
import GoogleCalendar from '../../components/googleCalendar';
import InputPrice from '../../components/UI/Input-price-club';

const steps = [
  { id: 1, name: 'Club informations', href: '#', status: 'complete' },
  { id: 2, name: 'Planning', href: '#', status: 'current' },
  { id: 3, name: 'Price', href: '#', status: 'upcoming' }
];

export default function CreateClub() {
  const [selectSteps, setSelectSteps] = useState<number>(1);
  const [clubName, setClubName] = useState<string>('');
  const [emailContact, setEmailContact] = useState<string>('');
  const [number, setNumber] = useState<number>(0);
  const [discipline, setDiscipline] = useState<Array<string>>([]);
  const [description, setDescription] = useState<string>('');
  const [logo, setLogo] = useState({
    lastModified: '',
    lastModifiedDate: '',
    name: '',
    size: 0,
    type: '',
    webkitRelativePath: ''
  });
  const [city, setCity] = useState<string | ''>('');
  const [postalCode, setPostalCode] = useState<string | ''>('');
  const [county, setCounty] = useState<string | ''>('');
  const [kids, setKids] = useState<boolean>(false)
  const [schedule, setSchedule] = useState<object>({})
  const [price, setPrice] = useState<Array<object>>([])

  console.log(price)



  const getStep = () => {
    switch (selectSteps) {
      case 1:
        return (
          <CreateClubForm
            setSelectSteps={setSelectSteps}
            setClubName={setClubName}
            setDiscipline={setDiscipline}
            setDescription={setDescription}
            setLogo={setLogo}
            setEmailContact={setEmailContact}
            setCity={setCity}
            setPostalCode={setPostalCode}
            setCounty={setCounty}
            setNumber={setNumber}
            setKids={setKids}
            kids={kids}
            city={city}
            postalCode={postalCode}
            county={county}
          />
        );
      case 2:
        return <GoogleCalendar setSchedule={setSchedule} setSelectSteps={setSelectSteps} />;
      case 3:
        return <InputPrice setPrice={setPrice} />;

      default:
        return <>error</>;
    }
  };

  function string_to_slug(str: string) {
    str = str.replace(/^\s+|\s+$/g, ''); // trim
    str = str.toLowerCase();

    str = str
      .replace(/[^a-z0-9 -]/g, '') // remove invalid chars
      .replace(/\s+/g, '-') // collapse whitespace and replace by -
      .replace(/-+/g, '-'); // collapse dashes

    return str;
  }

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
      <div>{county} {city}</div>
    </div>
  );
}
