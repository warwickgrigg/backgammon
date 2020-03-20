import React from "react";
export default ({ values }) => (
  <div className="dice">
    {values.map((v, i) => (
      <div className="die" key={i}>
        {v}
      </div>
    ))}
  </div>
);
