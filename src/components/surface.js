import React from "react";

const columnClass = ["column even", "column odd"];

const surface = () => {
  const result = Array.from(new Array(12), (_, c) => {
    const gridArea = `p${c}`;
    return (
      <div
        className={columnClass[c % 2]}
        style={{ gridArea }}
        key={`c${c}`}
        id={`c/${c}`}
      />
    );
  });
  result.splice(6, 0, <div className="bar" key="bar" id="bar" />);
  result.push(<div className="off" key="off" id="off" />);
  return <div className="columns">{result}</div>;
};

export default surface;
