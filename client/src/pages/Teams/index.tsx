/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react';
import { MailIcon, PhoneIcon } from '@heroicons/react/solid';
import { useGetTeams } from '../../hooks/Api/useTeams';
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { HiChevronDoubleRight } from 'react-icons/hi';
import MapHomeTeams from '../../components/UI/Map-home-teams';

function Teams() {
  const { data, isLoading, isError } = useGetTeams();
  const [selectedLocation, setSelectedLocation] = useState({});
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const searchItems = (searchValue: any) => {
    setSearchInput(searchValue);
    if (searchInput !== '') {
      //@ts-ignore
      const filteredData = data.filter((item) => {
        console.log(Object.values(item.discipline).join(' ').toLowerCase());
        return (
          Object.values(item.discipline)
            .join(' ')
            .toLowerCase()
            .includes(searchInput.toLowerCase()) ||
          Object.values(item).join(' ').toLowerCase().includes(searchInput.toLowerCase())
        );
      });
      setFilteredResults(filteredData);
    } else {
      //@ts-ignore
      setFilteredResults(data);
    }
  };

  if (isLoading) {
    return <p>looooad</p>;
  }

  if (isError) {
    return <div data-testid="error">error</div>;
  }

  return (
    <main className="flex">
      <section className="flex-grow pt-14 px-6">
        <div className=" container mt-14 h-full flex flex-col  ">
          <div className="mb-3 pt-0">
            <input
              type="text"
              placeholder="Filtrer par discipline"
              onChange={(e) => searchItems(e.target.value)}
              className="px-3 py-3 placeholder-gray-700 text-slate-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
            />
          </div>
          {/* <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"> */}
          {/* @ts-ignore */}
          {searchInput.length > 1
            ? filteredResults.map((team: any) => {
                return (
                  <div
                    key={team._id}
                    //@ts-ignore
                    onMouseEnter={() => setSelectedLocation(team)}
                    onMouseLeave={() => setSelectedLocation({})}
                    className="flex py-7 mb-2 px-2 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t">
                    <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
                      <img className="w-full h-full mb-4  " src={team.logo} alt="" />
                    </div>
                    <div className="flex flex-col flex-grow pl-5">
                      <div className="flex">
                        {team.discipline.map((item: string, i: any) => (
                          <span
                            className="flex-shrink-0 mr-1 inline-block px-2 mb-1 py-0.5 text-red-800 text-xs font-medium bg-red-100 rounded-full"
                            key={i}>
                            {' '}
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between">
                        <h4 className="text-xl">{team.clubName}</h4>
                        <FiHeart className="h-12 cursor-pointer" />
                      </div>

                      <div className="border-b w-10 pt-2" />
                      <p className="text-sm  pt-2 flex-grow">{team.address}</p>
                      <p className="text-sm  flex-grow">{team.postalCode}</p>

                      <div>
                        <p className="flex items-center">
                          {/* <StarIcon className="h-5 text-red-400" /> */}
                          {team.city}
                        </p>
                        <div className="flex justify-between items-end">
                          <Link to={`/team/${team._id}`}>
                            <span className="text-lg flex  items-center text-gray-900 font-semibold lg:text-2xl pb-2">
                              Voir les informations <HiChevronDoubleRight className="ml-1" />
                            </span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : // @ts-ignore */
              data?.map((team: any) => (
                <div
                  key={team._id}
                  //@ts-ignore
                  onMouseEnter={() => setSelectedLocation(team)}
                  onMouseLeave={() => setSelectedLocation({})}
                  className="flex py-7 mb-2 px-2 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t">
                  <div className="relative h-24 w-40 md:h-52 md:w-80 flex-shrink-0">
                    <img className="w-full h-full mb-4  " src={team.logo} alt="" />
                  </div>
                  <div className="flex flex-col flex-grow pl-5">
                    <div className="flex">
                      {team.discipline.map((item: string, i: any) => (
                        <span
                          className="flex-shrink-0 mr-1 inline-block px-2 mb-1 py-0.5 text-red-800 text-xs font-medium bg-red-100 rounded-full"
                          key={i}>
                          {' '}
                          {item}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between">
                      <h4 className="text-xl">{team.clubName}</h4>
                      <FiHeart className="h-12 cursor-pointer" />
                    </div>

                    <div className="border-b w-10 pt-2" />
                    <p className="text-sm  pt-2 flex-grow">{team.address}</p>
                    <p className="text-sm  flex-grow">{team.postalCode}</p>

                    <div>
                      <p className="flex items-center">
                        {/* <StarIcon className="h-5 text-red-400" /> */}
                        {team.city}
                      </p>
                      <div className="flex justify-between items-end">
                        <Link to={`/team/${team._id}`}>
                          <span className="text-lg flex  items-center text-gray-900 font-semibold lg:text-2xl pb-2">
                            Voir les informations <HiChevronDoubleRight className="ml-1" />
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                // <li
                //   key={team._id}
                //   className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
                //   <div className="w-full flex items-center justify-between p-6 space-x-6">
                //     <div className="flex-1 truncate">
                //       <div className="flex justify-between space-x-3">
                //         <Link to={`/team/${team._id}`}>
                //           <h3 className="text-gray-900 text-sm font-medium truncate">{team.clubName}</h3>
                //         </Link>
                //         <img
                //           className="w-10 h-10 mb-4 bg-gray-300 rounded-full flex-shrink-0"
                //           src={team.logo}
                //           alt=""
                //         />
                //       </div>

                //       <div className="flex flex-col">
                //         {team.discipline.map((item: string, i: any) => (
                //           <span
                //             className="flex-shrink-0 inline-block px-2 mb-1 py-0.5 text-red-800 text-xs font-medium bg-red-100 rounded-full"
                //             key={i}>
                //             {' '}
                //             {item}
                //           </span>
                //         ))}
                //       </div>
                //       <p className="mt-4 text-sm truncate">{team.city}</p>
                //       <p className="mt-4  text-sm truncate">{team.address}</p>
                //       <p className="mt-1  text-sm truncate">{team.postalCode}</p>
                //     </div>
                //   </div>
                //   <div>
                //     <div className="-mt-px flex divide-x divide-gray-200">
                //       <div className="w-0 flex-1 flex">
                //         <div className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:">
                //           <Link to={`/team/${team._id}`}>
                //             <span className="ml-3 text-red-600 ">+ d informations</span>
                //           </Link>
                //         </div>
                //       </div>
                //     </div>
                //   </div>
                // </li>
              ))}
          {/* </ul> */}
        </div>
      </section>
      <section className="hidden xl:inline-flex pt-24 xl:min-w-[600px]">
        <MapHomeTeams selectData={selectedLocation} isSelect={setSelectedLocation} data={data} />
      </section>
    </main>
  );
}

export default Teams;
