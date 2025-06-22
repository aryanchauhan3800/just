import React, { useState } from 'react';

const PartyTypeSwitch = () => {
  const [selected, setSelected] = useState('Business');

  return (
    <div className="flex items-center space-x-4">
      <label className="text-sm font-medium text-gray-700">
        <span className="text-red-500 mr-1">*</span>Party Type :
      </label>

      <div className="flex items-center space-x-5 pl-20 ">
        {['Business', 'Individual'].map((type) => (
          <label
            key={type}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full border text-sm cursor-pointer transition w-[224px] ${
              selected === type
                ? 'border-gray-300 text-blue-600 bg-white'
                : 'border-gray-200 text-gray-600 bg-white'
            }`}
          >
            <input
              type="radio"
              name="partyType"
              value={type}
              checked={selected === type}
              onChange={() => setSelected(type)}
              className="form-radio text-blue-600 focus:ring-0"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default PartyTypeSwitch;
