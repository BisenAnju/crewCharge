import React from "react";

const NewVehicle = ({ addVehicle, inputVal, onInputChange, resetInput }) => (
  <div>
    <h4>New Todo</h4>
    <input value={inputVal} onChange={onInputChange} />
    <button onClick={addVehicle}>Add</button>
  </div>
);

export default NewVehicle;
