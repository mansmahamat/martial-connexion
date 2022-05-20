/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useParams } from 'react-router-dom';
import { useGetTeamByID } from '../../hooks/Api/useTeams';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import TeamCalendar from '../../components/TeamCalendar';
import TableDiscipline from '../../components/UI/Table-discipline';

//@ts-ignore
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function TeamPage() {
  const [user, setUser] = useState();

  useEffect(() => {
    // @ts-ignore
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);
  const { id } = useParams();

  //@ts-ignore
  const { data, isLoading, isError } = useGetTeamByID(id);

  if (isLoading) {
    return <p>looooad</p>;
  }

  if (isError) {
    return <div data-testid="error">error</div>;
  }

  //@ts-ignore
  const prices = data?.disciplinePrices;

  //@ts-ignore
  const events = JSON.parse(data?.schedule);

  console.log(user);

  return (
    <>
      <div className="min-h-full">
        <main className="py-10">
          {/* Page header */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <div className="flex items-center space-x-5">
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    className="h-16 w-16 rounded-full"
                    //@ts-ignore
                    src={data?.logo}
                    alt=""
                  />
                  <span className="absolute inset-0 shadow-inner rounded-full" aria-hidden="true" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{data?.clubName}</h1>
                <p className="text-sm font-medium text-gray-500">{data?.address}</p>
                <p className="text-sm font-medium text-gray-500">
                  {data?.city}, {data?.county}
                </p>
                <p className="text-sm font-medium text-gray-500">{data?.postalCode}</p>
              </div>
            </div>
            <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
              <button
                type="button"
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
                Disqualify
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500">
                Advance to offer
              </button>
            </div>
          </div>

          <div className="mx-auto container">
            <Map
              initialViewState={{
                longitude: Number(data?.longitude),
                latitude: Number(data?.latitude),
                zoom: 14
              }}
              style={{ width: '100%', height: 400 }}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}>
              <Marker
                longitude={Number(data?.longitude)}
                latitude={Number(data?.latitude)}
                color="red"
              />
            </Map>
          </div>

          <div className="mt-8 max-w-3xl mx-auto grid  sm:px-6 lg:max-w-7xl ">
            <div className="space-y-6 lg:col-start-1 lg:col-span-2">
              {/* Description list*/}
              <section aria-labelledby="applicant-information-title">
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h2
                      id="applicant-information-title"
                      className="text-lg leading-6 font-medium text-gray-900">
                      Information
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">{data?.description}</p>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">numero</dt>
                        <dd className="mt-1 text-sm text-gray-900"> {data?.number}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Email address</dt>
                        <dd className="mt-1 text-sm text-gray-900"> {data?.emailContact}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Enfant</dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {' '}
                          {data?.kids ? 'Oui' : 'Non'}
                        </dd>
                      </div>

                      <div className="sm:col-span-2">
                        {/* <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                          {data?.discipline.map((price: any, index: any) => (
                            <li key={index} className="text-gray-900 text-lg">
                              {' '}
                              {price}{' '}
                            </li>
                          ))}
                        </ul> */}

                        <TableDiscipline
                          // @ts-ignore
                          userEmail={user?.email}
                          // @ts-ignore
                          userName={user?.firstName + ' ' + user?.lastName}
                          // @ts-ignore
                          customerId={user.billingID}
                          // @ts-ignore
                          accountId={data?.userId[0]?.accountId}
                          prices={prices}
                        />
                      </div>
                      {/* <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">Attachments</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <ul role="list" className="border border-gray-200 rounded-md divide-y divide-gray-200">
                          {attachments.map((attachment) => (
                            <li
                              key={attachment.name}
                              className="pl-3 pr-4 py-3 flex items-center justify-between text-sm"
                            >
                              <div className="w-0 flex-1 flex items-center">
                                <PaperClipIcon className="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" />
                                <span className="ml-2 flex-1 w-0 truncate">{attachment.name}</span>
                              </div>
                              <div className="ml-4 flex-shrink-0">
                                <a href={attachment.href} className="font-medium text-blue-600 hover:text-blue-500">
                                  Download
                                </a>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div> */}
                    </dl>
                  </div>
                  {/* <div>
                  <a
                    href="#"
                    className="block bg-gray-50 text-sm font-medium text-gray-500 text-center px-4 py-4 hover:text-gray-700 sm:rounded-b-lg"
                  >
                    Read full application
                  </a>
                </div> */}
                </div>
              </section>

              {/* Comments*/}
              <section aria-labelledby="notes-title">
                <div className="bg-white shadow sm:rounded-lg sm:overflow-hidden">
                  <div className="divide-y divide-gray-200">
                    <div className="px-4 py-5 sm:px-6">
                      <h2 id="notes-title" className="text-lg font-medium text-gray-900">
                        Référent du club
                      </h2>
                    </div>
                    <div className="px-4 py-6 sm:px-6">
                      <ul role="list" className="space-y-8">
                        <li key={data?.userId[0]._id}>
                          <div className="flex space-x-3">
                            <div className="flex-shrink-0">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={data?.userId[0].avatar}
                                alt=""
                              />
                            </div>
                            <div>
                              <div className="text-sm">
                                <p className="font-medium text-gray-900">
                                  {data?.userId[0].firstName} {data?.userId[0].lastName}
                                </p>
                              </div>
                              <div className="mt-1 text-sm text-gray-700">
                                <a href={'mailto:' + data?.userId[0].email}>
                                  {data?.userId[0].email}
                                </a>
                              </div>
                              <div className="mt-2 text-sm space-x-2">
                                <span className="text-gray-500 font-medium">
                                  Inscrit depuis le{' '}
                                  {moment(data?.userId[0].date).format('DD/MM/YYYY')}
                                </span>{' '}
                                <span className="text-gray-500 font-medium">&middot;</span>{' '}
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            {/* <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
              <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                Timeline
              </h2>

             
              <div className="mt-6 flow-root">
                <ul role="list" className="-mb-8">
                  {timeline.map((item, itemIdx) => (
                    <li key={item.id}>
                      <div className="relative pb-8">
                        {itemIdx !== timeline.length - 1 ? (
                          <span
                            className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span
                              className={classNames(
                                item.type.bgColorClass,
                                'h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white'
                              )}
                            >
                              <item.type.icon className="w-5 h-5 text-white" aria-hidden="true" />
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className="text-sm text-gray-500">
                                {item.content}{' '}
                                <a href="#" className="font-medium text-gray-900">
                                  {item.target}
                                </a>
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              <time dateTime={item.datetime}>{item.date}</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex flex-col justify-stretch">
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Advance to offer
                </button>
              </div>
            </div>
          </section>  */}
            <div className=" w-full overflow-scroll">
              <TeamCalendar events={events} />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default TeamPage;
