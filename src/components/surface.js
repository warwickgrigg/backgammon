import React from "react";

const insert = (a, i, v) => [...a.slice(0, i), v, ...a.slice(i)];

const columnClass = ["column even", "column odd"];

const surface = () => (
  <div className="columns">
    {insert(
      Array.from(new Array(12), (_, c) => (
        <div className={columnClass[c % 2]} key={`c${c}`} />
      )),
      6,
      <div className="bar" key="bar" />
    )}
  </div>
);

export default surface;
