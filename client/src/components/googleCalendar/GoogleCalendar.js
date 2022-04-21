/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import WeekView from './weekView';
import CalendarEventHandler from './calendarEventHandler';

class GoogleCalendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      events: JSON.parse(localStorage.getItem('events')) || {}
    };

    // saving data to the local storage
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('events', JSON.stringify(this.state.events));
    });
  }

  /**
   * Add new event in the event list in the state
   * @param {Object} event - Event object
   * {
   *  start: {timeStamp} - Time stamp for the start of the event,
   *  title: {string} - Title fo the new event,
   *  end: {timeStamp} - Time stamp for the end of the event,
   * }
   */
  addNewEvent = (event) => {
    event = {
      ...event,
      id: CalendarEventHandler.generateId(event)
    };
    this.setState((previousSate) => ({
      events: CalendarEventHandler.add(previousSate.events, event)
    }));
  };

  /**
   * Updates an already existing event in the state event list
   * @param {string} event eventID id of the event
   * @param {Object} updatedEvent updated details of the event
   * {
   *  start: {timeStamp} - Time stamp for the start of the event,
   *  title: {string} - Title fo the new event,
   *  end: {timeStamp} - Time stamp for the end of the event,
   * }
   */
  updateEvent = (eventId, updatedEvent) => {
    this.setState((previousState) => {
      return {
        events: CalendarEventHandler.update(eventId, updatedEvent, previousState.events)
      };
    });
  };

  /**
   * Deletes an event from the event list in the state
   * @param {String} eventId - Id of the event
   */
  deleteEvent = (eventId) => {
    this.setState((previousState) => {
      return {
        events: CalendarEventHandler.delete(eventId, previousState.events)
      };
    });
  };

  render() {
    const { events } = this.state;
    console.log(events);

    return (
      <>
        <WeekView
          events={events}
          showModal={true}
          onNewEvent={this.addNewEvent}
          onEventUpdate={this.updateEvent}
          onEventDelete={this.deleteEvent}
        />
        <button
          onClick={() => this.props.setSelectSteps(3)}
          type="button"
          className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          next
        </button>
        <button
          onClick={() => this.props.setSchedule(events)}
          type="button"
          className="bg-red-300 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          oooooooo
        </button>
      </>
    );
  }
}

export default GoogleCalendar;
