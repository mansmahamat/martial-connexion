/* eslint-disable react/prop-types */
import { Modal, Button } from 'antd';
import React, { Component, useState } from 'react';
import AddEvent from './AddEvent';

function AddEventModal(props) {
  const [title, setTitle] = useState('');
  const [background, setBackground] = useState('#fff');

  /**
   * To show the title auto fill and
   * re-initialize the title on adding new event
   */

  /**
   * Sets the title in the state
   * @param {event} event - JS/React event
   */
  // handleTitleChange = (event) => {
  //   this.setState({
  //     title: event.target.value
  //   });

  //   console.log(event.target.value);
  // };

  const handleTitleChange = (value) => {
    setTitle(value);
    console.log(`selected ${value}`);
  };

  function onSearch(val) {
    console.log('search:', val);
  }

  const handleChangeColor = (color) => {
    setBackground(color.hex);
  };

  /**
   * Updates the event
   */
  const handleOk = () => {
    props.onOk(title, background);
    console.log('ok clikck');
  };

  const handleChangeComplete = (color) => {
    setBackground(color.hex);
  };

  return (
    <Modal
      visible={props.visible}
      onOk={handleOk}
      onCancel={props.onClose}
      footer={[
        <Button key="back" onClick={props.onCancel}>
          {props.editMode ? 'Delete' : 'Cancel'}
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          {props.editMode ? 'Update Event' : 'Add Event'}
        </Button>
      ]}>
      <div>{title}</div>
      <AddEvent
        title={title}
        onTitleChange={handleTitleChange}
        handleChangeColor={handleChangeColor}
        handleChangeComplete={handleChangeComplete}
        start={props.eventStart}
        background={background}
        onSearch={onSearch}
        end={props.eventEnd}
        onTimeChange={props.onTimeChange}
      />
    </Modal>
  );
}

export default AddEventModal;
