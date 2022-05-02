/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col } from 'antd';
import TimeSlot from './TimeSlot';
import { row, timeCol, timeString } from '../styles';
import moment from 'moment';
import uuid from 'react-uuid';

function TimeSlotGroup(props) {
  const formattedTime = moment().set('hours', props.time).format('HH ');

  return (
    <Row type="flex" key={props.time} style={row}>
      <Col style={timeCol} span={3}>
        <span style={timeString}>{formattedTime}h</span>
      </Col>
      {props.weekDays.map((day, index) => (
        <>
          <TimeSlot
            key={uuid()}
            dateStamp={day.dateStamp}
            time={props.time}
            openAddEventModal={props.openAddEventModal}
          />
        </>
      ))}
      {props.children}
    </Row>
  );
}

export default TimeSlotGroup;
