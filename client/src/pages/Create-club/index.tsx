/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react';
import CreateClubForm from '../../components/UI/Forms/CreateClubForm/CreateClubForm';
import GoogleCalendar from '../../components/googleCalendar';
import InputPrice from '../../components/UI/Input-price-club';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import GetFighterTypes from '../../types/CreateFighterTypes';

const steps = [
  { id: 1, name: 'Club informations', href: '#', status: 'complete' },
  { id: 2, name: 'Planning', href: '#', status: 'current' },
  { id: 3, name: 'Create', href: '#', status: 'upcoming' }
];

export default function CreateClub() {
  const [user, setUser] = useState<GetFighterTypes>();
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
  const [address, setAddress] = useState<string | ''>('');
  const [postalCode, setPostalCode] = useState<string | ''>('');
  const [county, setCounty] = useState<string | ''>('');
  const [latitude, setLatitude] = useState<string | ''>('');
  const [longitude, setLongitude] = useState<string | ''>('');
  const [kids, setKids] = useState<boolean>(false);
  const [schedule, setSchedule] = useState<Array<object>>([]);
  const [price, setPrice] = useState<Array<object>>([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    // @ts-ignore
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  const Capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
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

  console.log(emailContact);

  const submitForm = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    const formaData = new FormData();
    //@ts-ignore
    formaData.append('logo', logo, logo.name);
    formaData.append('clubName', Capitalize(clubName));
    formaData.append('emailContact', Capitalize(emailContact));
    formaData.append('number', number.toString());
    formaData.append('description', Capitalize(description));
    formaData.append('city', Capitalize(city));
    formaData.append('address', Capitalize(address));
    formaData.append('postalCode', postalCode);
    formaData.append('latitude', latitude);
    formaData.append('longitude', longitude);
    //@ts-ignore
    formaData.append('userId', user?._id);
    formaData.append('county', Capitalize(county));
    formaData.append('slug', string_to_slug(clubName));
    //@ts-ignore
    formaData.append('kids', kids);

    for (let i = 0; i < discipline.length; i++) {
      formaData.append('discipline', discipline[i]);
    }

    formaData.append(`schedule`, JSON.stringify(schedule));

    formaData.append(`price`, JSON.stringify(price));

    await axios
      .post(`${process.env.REACT_APP_DEV}/team`, formaData)
      .then((res) => {
        const team = {
          //@ts-ignore
          ...JSON.parse(localStorage.getItem('team')),
          ...res.data
        };
        localStorage.setItem('team', JSON.stringify(team));
        toast.success('Success Team create', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        });
        navigate('/account');
      })
      .catch((err) => setError(err?.response?.data));
  };

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
            setAddress={setAddress}
            setPostalCode={setPostalCode}
            setCounty={setCounty}
            setNumber={setNumber}
            setKids={setKids}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
            kids={kids}
            city={city}
            postalCode={postalCode}
            county={county}
          />
        );
      case 2:
        return <GoogleCalendar setSchedule={setSchedule} setSelectSteps={setSelectSteps} />;
      // case 3:
      //   return <InputPrice setPrice={setPrice} setSelectSteps={setSelectSteps} />;
      case 3:
        return (
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            onClick={() => submitForm()}>
            SAVE TEAM
          </button>
        );

      default:
        return (
          <CreateClubForm
            setSelectSteps={setSelectSteps}
            setClubName={setClubName}
            setDiscipline={setDiscipline}
            setDescription={setDescription}
            setLogo={setLogo}
            setEmailContact={setEmailContact}
            setAddress={setAddress}
            setCity={setCity}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
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
    }
  };

  return (
    <div className="container mt-8 lg:w-full">
      <nav aria-label="Progress">
        <ol
          role="list"
          className="border border-gray-300 rounded-md divide-y divide-gray-300 md:flex md:divide-y-0">
          {steps.map((step, stepIdx) => (
            <li key={step.name} className="relative md:flex-1 md:flex">
              {
                <span
                  className="px-6 py-4 flex items-center text-sm font-medium"
                  aria-current="step">
                  <span
                    className={`flex-shrink-0 w-10  h-10 flex items-center justify-center border-2 border-indigo-600 rounded-full ${
                      selectSteps === step.id ? 'bg-red-300' : ''
                    }`}>
                    <span className="text-indigo-600">{step.id}</span>
                  </span>
                  <span className="ml-4 text-sm font-medium text-indigo-600">{step.name}</span>
                </span>
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
