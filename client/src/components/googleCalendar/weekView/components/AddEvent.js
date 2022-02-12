/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { TimePicker, DatePicker, Select } from 'antd';
import { ChromePicker } from 'react-color';
import reactCSS from 'reactcss';

import moment from 'moment';
import { inputStyles } from '../styles';

const { RangePicker } = DatePicker;

const { Option } = Select;

function AddEvent(props) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const styles = reactCSS({
    default: {
      color: {
        width: '100%',
        height: '100%',
        marginTop: '8px',
        marginBottom: '8px',
        borderRadius: '2px',
        background: `${props.background} `
      }
    }
  });

  const popover = {
    position: 'absolute',
    zIndex: '2'
  };
  const cover = {
    position: 'fixed',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px'
  };

  console.log(props);
  return (
    <React.Fragment>
      {/* <Input
        type="text"
        placeholder="Add Title"
        value={props.title}
        style={inputStyles}
        size="large"
        autoFocus={true}
        onChange={props.onTitleChange}
      /> */}
      <Select
        defaultValue="JJB"
        style={{ width: 120 }}
        onChange={props.onTitleChange}
        onSearch={props.onSearch}
        optionFilterProp="children"
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }>
        <Option value="JJB">JJB</Option>
        <Option value="Grappling">Grappling</Option>
        <Option value="MMA">MMA</Option>
        <Option value="Boxe anglaise">Boxe anglaise</Option>
      </Select>
      <div>
        <button style={styles.color} onClick={handleClick}>
          Pick Color
        </button>
        {displayColorPicker ? (
          <div style={popover}>
            <div style={cover} onClick={handleClose} />
            <ChromePicker color={props.background} onChange={props.handleChangeComplete} />
          </div>
        ) : null}
      </div>

      <RangePicker
        style={{ width: '100%' }}
        value={[moment(props.start), moment(props.end)]}
        onChange={props.onTimeChange}
        showTime={{
          format: 'HH:mm',
          hourStep: 1,
          minuteStep: 30,
          defaultValue: [moment(props.start), moment(props.end)]
        }}
        format="hh:mm a"
      />

      {/* <TimePicker.RangePicker
        showTime={{
          format: 'HH:mm',
          hourStep: 1,
          minuteStep: 30
        }}
      /> */}
    </React.Fragment>
  );
}

export default AddEvent;
