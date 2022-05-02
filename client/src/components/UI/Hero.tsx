/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import LogoBand from './Logo-band';

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
                    alt="Fighting hero"
                  />
                </video>

                <div className="absolute inset-0 opacity-60 bg-red-600 mix-blend-multiply" />
              </div>
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h1 className="text-center text-4xl  font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block font-black  text-white">Tous vos clubs de</span>
                  <span className="block font-black text-black"> sports de combats</span>
                </h1>
                <p className="mt-6 max-w-lg mx-auto text-center text-xl text-white sm:max-w-3xl">
                  Retrouvez sur la plateforme les clubs de sport de combats qui sont dans votre zone
                  géographique afin de faire votre choix.
                </p>
                <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                  <span className="flex  justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm  bg-white  text-red-600  sm:px-8">
                    <Link className="text-red-600 hover:text-white " to="/teams">
                      Voir les clubs
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <LogoBand />
      </main>
    </div>
  );
}
