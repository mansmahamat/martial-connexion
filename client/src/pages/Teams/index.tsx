/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect } from 'react'
import { MailIcon, PhoneIcon } from '@heroicons/react/solid'
import { useGetTeams } from '../../hooks/Api/useTeams'
import { Link } from 'react-router-dom'




const people = [
  {
    name: 'Jane Cooper',
    title: 'Regional Paradigm Technician',
    role: 'Admin',
    email: 'janecooper@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
  {
    name: 'Jane Cooper',
    title: 'Regional Paradigm Technician',
    role: 'Admin',
    email: 'janecoopr@example.com',
    telephone: '+1-202-555-0170',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
  },
]





function Teams() {




  const { data, isLoading, isError } = useGetTeams()

  if (isLoading) {
    return (
      <p>looooad</p>
    )
  }

  if (isError) {
    return (
      <div data-testid="error">
        error
      </div>
    )
  }

  return (
    <div className=" container mt-14 h-full items-center ">
    <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {/* @ts-ignore */}
    {data?.map((team: any) => (
      <li key={team._id} className="col-span-1 bg-white rounded-lg shadow divide-y divide-gray-200">
        <div className="w-full flex items-center justify-between p-6 space-x-6">
          <div className="flex-1 truncate">
            <div className="flex items-center space-x-3">
              <Link to={`/team/${team._id}`}>
              <h3 className="text-gray-900 text-sm font-medium truncate">{team.clubName}</h3>
              </Link>
              
              <div className='flex flex-col'>
                 { team.discipline.map((item: string, i: any) => (
                <span className="flex-shrink-0 inline-block px-2 mb-1 py-0.5 text-green-800 text-xs font-medium bg-green-100 rounded-full" key={i}> {item}</span>
                ))}
              </div>
             
              

           
            </div>
            <p className="mt-4 text-gray-500 text-sm truncate">{team.city}</p>
            <p className="mt-1 text-gray-500 text-sm truncate">{team.postalCode}</p>
          </div>
          <img className="w-10 h-10 bg-gray-300 rounded-full flex-shrink-0" src={team.logo} alt="" />
        </div>
        <div>
          <div className="-mt-px flex divide-x divide-gray-200">
            <div className="w-0 flex-1 flex">
              <a
                href={`mailto:${team.emailContact}`}
                className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
              >
                <MailIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                <span className="ml-3">Email</span>
              </a>
            </div>
            <div className="-ml-px w-0 flex-1 flex">
              <a
                href={`tel:${team.number}`}
                className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
              >
                <PhoneIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                <span className="ml-3">Call</span>
              </a>
            </div>
          </div>
        </div>
      </li>
    ))}
  </ul>
  </div>
  )
}

export default Teams