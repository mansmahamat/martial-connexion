/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState } from 'react';
import { MailIcon, PhoneIcon } from '@heroicons/react/solid';
import { useGetTeams } from '../../hooks/Api/useTeams';
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { HiChevronDoubleRight } from 'react-icons/hi';
import MapHomeTeams from '../../components/UI/Map-home-teams';
import Pagination from '../../components/UI/Pagination';
import { ToastContainer } from 'react-toastify';

function Teams() {
  const { data, isLoading, isError } = useGetTeams();
  const [selectedLocation, setSelectedLocation] = useState({});
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  const dataLimit = 4;
  const pageLimit = 1;
  //@ts-ignore
  const [pages] = useState(Math.round(data?.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function changePage(event: any) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * dataLimit - dataLimit;
    const endIndex = startIndex + dataLimit;
    //@ts-ignore

    return data?.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    const start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    //@ts-ignore

    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

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
    <>
      <ToastContainer />
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
                      <div className="relative h-20 w-40 md:h-52 md:w-80 flex-shrink-0">
                        <img className="w-full h-full mb-4  " src={team.logo} alt="" />
                      </div>
                      <div className="flex flex-col flex-grow pl-5">
                        <div className="flex">
                          {team.discipline.map((item: string, i: any) => (
                            <span
                              className="flex-shrink-0 mr-1 inline-block px-2 mb-1 overflow-hidden py-0.5 text-red-800 text-xs font-medium bg-red-100 rounded-full"
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
                getPaginatedData()?.map((team: any) => (
                  <div
                    key={team._id}
                    //@ts-ign
                    onMouseEnter={() => setSelectedLocation(team)}
                    onMouseLeave={() => setSelectedLocation({})}
                    className="flex py-7  mb-2 first-line: px-2 border-b cursor-pointer hover:opacity-80 hover:shadow-lg transition duration-200 ease-out first:border-t">
                    <div className="relative h-20 w-40 md:h-20 md:w-24 flex-shrink-0">
                      <img className="w-full h-full mb-4  " src={team.logo} alt="" />
                    </div>
                    <div className="flex flex-col    flex-grow pl-5">
                      <div className="flex flex-wrap ">
                        {team.discipline.map((item: string, i: any) => (
                          <span
                            className="flex-shrink-0 mr-1 break-words mt-1  px-2  mb-1 py-0.5 text-red-800 text-xs font-medium bg-red-100 rounded-full"
                            key={i}>
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
                ))}
            <Pagination
              goToPreviousPage={goToPreviousPage}
              getPaginationGroup={getPaginationGroup}
              currentPage={currentPage}
              changePage={changePage}
              goToNextPage={goToNextPage}
              pages={pages}
            />
          </div>
        </section>
        <section className="hidden xl:h-full xl:flex-col   xl:inline-flex pt-24 xl:min-w-[600px]">
          <MapHomeTeams selectData={selectedLocation} isSelect={setSelectedLocation} data={data} />
        </section>
      </main>
    </>
  );
}

export default Teams;
