/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import HeroGymLanding from '../../components/UI/HeroGymLanding/HeroGymLanding';
import PricingTable from '../../components/UI/Princing';
import Testimonials from '../../components/UI/Testimonials/Testimonials';
import { UserContext } from '../../context';

function LandingGym() {
  const context = useContext(UserContext);
  const [tablePrices, setTablePrices] = useState([]);
  const proPriceID = 'price_1KTRrDLXQl0DCJw65Yg1XV5R';
  const freePriceID = 'price_1KTRqULXQl0DCJw61tfhAiOv';

  useEffect(() => {
    fetchProPrices();
    fetchFreePrices();
  }, []);

  const fetchProPrices = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/price/${proPriceID}`);
    //@ts-ignore
    setTablePrices((tablePrices) => [...tablePrices, data]);
  };

  const fetchFreePrices = async () => {
    const { data } = await axios.get(`${process.env.REACT_APP_SERVER}/price/${freePriceID}`);
    //@ts-ignore
    setTablePrices((tablePrices) => [...tablePrices, data]);
  };

  return (
    <div className="flex-grow">
      <HeroGymLanding />
      <PricingTable User={context} prices={tablePrices} />
      <Testimonials />
    </div>
  );
}

export default LandingGym;
