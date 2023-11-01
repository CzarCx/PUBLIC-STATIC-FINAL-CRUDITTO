import React from 'react';

const invisibleInputsStyle = {
  color: 'black',
  borderRadius: '0px',
  border: '10px',
  background: 'none',
};

function TableInput({ value, name, onChange }) {
  return (
    <div>
      <input
        type="text"
        style={invisibleInputsStyle}
        value={value}
        name={name}
        onChange={(e) => {
          const updatedValue = e.target.value;

          const parsedValue = !isNaN(updatedValue) ? parseInt(updatedValue, 10) : updatedValue;
          onChange(name, parsedValue);
        }}
      />
    </div>
  );
}

export default TableInput;
