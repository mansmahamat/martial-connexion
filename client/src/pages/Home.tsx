/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useState, useContext } from 'react';
import Hero from '../components/UI/Hero';
import axios from 'axios';
import PricesTypes from '../types/PricesTypes';
import { UserContext } from '../context';
import SectionHomepage from '../components/UI/Section-Homepage';

type Props = {
  User: {
    avatar: string;
    city: string;
    date: string;
    discipline: string;
    email: string;
    firstName: string;
    lastName: string;
    billingID: string;
    password: string;
    postalCode: string;
    _id: string;
  };
};

function Home({ User }: Props) {
  return (
    <div className="">
      <Hero />
      {/* <PricingTable User={User} prices={prices} /> */}
      <SectionHomepage />
    </div>
  );
}

export default Home;
