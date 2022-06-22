/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import HeroGymLanding from '../../components/UI/HeroGymLanding/HeroGymLanding';
import PricingTable from '../../components/UI/Princing';
import Testimonials from '../../components/UI/Testimonials/Testimonials';
import { UserContext } from '../../context';
//@ts-ignore
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
//@ts-ignore
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const localizer = momentLocalizer(moment);

const events = [
  {
    title: 'Big Meeting',
    allDay: true,
    start: new Date(2021, 6, 0),
    end: new Date(2021, 6, 0)
  },
  {
    title: 'Vacation',
    start: new Date(2021, 6, 7),
    end: new Date(2021, 6, 10)
  },
  {
    title: 'Conference',
    start: new Date(2021, 6, 20),
    end: new Date(2021, 6, 23)
  }
];

function LandingGym() {
  const context = useContext(UserContext);
  const [tablePrices, setTablePrices] = useState([]);
  const proPriceID = 'price_1KTRrDLXQl0DCJw65Yg1XV5R';
  const freePriceID = 'price_1KTRqULXQl0DCJw61tfhAiOv';

  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    //@ts-ignore
    setAllEvents([...allEvents, newEvent]);
  }

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
      <div className="myCustomHeight">
        <div>
          <input
            type="text"
            placeholder="Add Title"
            style={{ width: '20%', marginRight: '10px' }}
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          />
          <DatePicker
            placeholderText="Start Date"
            style={{ marginRight: '10px' }}
            selected={newEvent.start}
            onChange={(start: any) => setNewEvent({ ...newEvent, start })}
          />
          <DatePicker
            placeholderText="End Date"
            selected={newEvent.end}
            onChange={(end: any) => setNewEvent({ ...newEvent, end })}
          />
          <button style={{ marginTop: '10px' }} onClick={handleAddEvent}>
            Add Event
          </button>
        </div>
        <Calendar
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          events={allEvents}
          style={{ height: 500, margin: '50px' }}
        />
      </div>
    </div>
  );
}

export default LandingGym;
