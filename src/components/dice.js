import React from "react";
const dice = ({ values }) => (
  <div className="dice">
    {values.map((v, i) => (
      <div className="die" key={i}>
        {v}
      </div>
    ))}
  </div>
);

export default dice;
