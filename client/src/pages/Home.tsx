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
  const [prices, setPrices] = useState<PricesTypes[]>([]);
  const [state] = useContext(UserContext);
  const [userSubscriptions, setUserSubscriptions] = useState([]);

  useEffect(() => {
    fetchPrices();
  }, []);

  const fetchPrices = async () => {
    const { data } = await axios.get('http://localhost:8080/api/prices');
    setPrices(data.slice(2, 4));
  };

  useEffect(() => {
    //@ts-ignore
    const result = [];
    const check = () =>
      state &&
      state.subscriptions &&
      //@ts-ignore
      state.subscriptions.map((sub) => {
        result.push(sub.plan.id);
      });
    check();
    //@ts-ignore
    setUserSubscriptions(result);
  }, [state]);

  return (
    <div className="">
      <Hero />

      {/* <PricingTable User={User} prices={prices} /> */}

      <SectionHomepage />
    </div>
  );
}

export default Home;
