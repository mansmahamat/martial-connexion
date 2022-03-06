/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';

function InputPrice() {
  const [inputList, setInputList] = useState([{ discipline: '', price: '' }]);

  // @ts-ignore
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    // @ts-ignore
    list[index][name] = value;
    setInputList(list);
  };

  // @ts-ignore
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { discipline: '', price: '' }]);
  };
  return (
    <div className="App">
      {inputList.map((x, i) => {
        return (
          <div key={i} className="box">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Discipline
            </label>
            <input
              className="appearance-none block w-full mb-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              name="discipline"
              value={x.discipline}
              required
              onChange={(e) => handleInputChange(e, i)}
            />
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Price
            </label>
            <input
              className="appearance-none block w-full mb-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              type="number"
              name="price"
              required
              value={x.price}
              onChange={(e) => handleInputChange(e, i)}
            />
            <div className="btn-box">
              {inputList.length !== 1 && (
                <button className="mr10" onClick={() => handleRemoveClick(i)}>
                  Remove
                </button>
              )}
              {inputList.length - 1 === i && <button onClick={handleAddClick}>Add</button>}
            </div>
          </div>
        );
      })}
      <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
    </div>
  );
}

export default InputPrice;
