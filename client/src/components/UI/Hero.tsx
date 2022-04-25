/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <div className="h-screen">
      <main className="py-12">
        {/* Hero card */}
        <div className="relative z-0">
          <div className="absolute  h-1/2  " />
          <div className="max-w-7xl mx-auto  sm:px-6 lg:px-8">
            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
              <div className="absolute inset-0">
                <video
                  className="h-full w-full object-cover"
                  preload="metadata"
                  loop
                  autoPlay
                  muted
                  poster="https://images.pexels.com/photos/6295987/pexels-photo-6295987.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                  src="/videoHero.mov">
                  <img
                    src="https://images.pexels.com/photos/6295987/pexels-photo-6295987.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                    alt="People working on laptops"
                  />
                </video>

                <div className="absolute inset-0 opacity-60 bg-red-600 mix-blend-multiply" />
              </div>
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h1 className="text-center text-4xl  font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block font-black  text-white">Tout vos clubs de</span>
                  <span className="block font-black text-black">sports de combats</span>
                </h1>
                <p className="mt-6 max-w-lg mx-auto text-center text-xl text-white sm:max-w-3xl">
                  Retrouvez sur la plateforme les clubs de sport de combats qui sont dans votre zone
                  géographique afin de faire votre choix.
                </p>
                <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                  <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                    <span className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm  bg-white  text-red-600  sm:px-8">
                      <Link className="text-red-600 " to="/teams">
                        Voir les clubs
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo cloud */}
        <div className="">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm font-semibold uppercase  tracking-wide">
              Trusted by over 5 very average small businesses
            </p>
            <div className="mt-6 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
              <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                <img
                  className="h-12"
                  src="https://cdn.worldvectorlogo.com/logos/ufc-gym-1.svg"
                  alt="Tuple"
                />
              </div>
              <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                <img
                  className="h-12"
                  src="https://cdn.worldvectorlogo.com/logos/qatar-airways-1.svg"
                  alt="Mirage"
                />
              </div>
              <div className="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                <img
                  className="h-12"
                  src="https://cdn.worldvectorlogo.com/logos/bread-token.svg"
                  alt="StaticKit"
                />
              </div>
              <div className="col-span-1 flex justify-center md:col-span-2 md:col-start-2 lg:col-span-1">
                <img
                  className="h-12"
                  src="https://cdn.worldvectorlogo.com/logos/food-lion.svg"
                  alt="Transistor"
                />
              </div>
              <div className="col-span-2 flex justify-center md:col-span-2 md:col-start-4 lg:col-span-1">
                <img
                  className="h-12"
                  src="https://cdn.worldvectorlogo.com/logos/logotipo-de-bbva.svg"
                  alt="Workcation"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
