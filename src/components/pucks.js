import React, { useState } from "react";
import { useStateValue } from "../state";

/*
export default () => {
  const [{ counter }, dispatch] = useStateValue(); //[{ counter: 1 }, () => 0]; //
  return (
    <button
      onClick={() =>
        dispatch({
          type: "inc",
          value: 1
        })
      }
    >
      {counter}
    </button>
  );
};
*/

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

export default ({ points, player }) => {
  const [{ dice }, dispatch] = useStateValue(); //[{ counter: 1 }, () => 0]; //
  const [selectedPoint, selectPoint] = useState(-1);
  const pointClick = point => {
    if (selectedPoint === -1) {
      selectPoint(point);
    } else if (point === selectedPoint) {
      selectPoint(-1);
    } else if (opp[25 - point] < 1) {
      dispatch({
        type: "inc",
        value: 1
      });
    }
  };
  return points.map((stacks, c) =>
    stacks.map((count, point) => {
      if (!count) return undefined;
      if (count > 5) {
        var excess = `+${count - 5}`;
        count = 5;
      }
      if (c) point = 25 - point;
      const gridArea = `p${point}`;
      const stackClass = point > 12 ? "puck-stack near" : "puck-stack";
      const puckClass = ["puck", "puck dark"][c];
      const topClassSuffix = point === selectedPoint ? " selected" : "";
      return (
        <div
          onClick={() => pointClick(point)}
          className={stackClass}
          key={gridArea}
          style={{ gridArea }}
        >
          {Array.from(new Array(count), (_, k) => (
            <div
              key={k}
              className={puckClass + (k === count - 1 ? topClassSuffix : "")}
            >
              {!k && excess}
            </div>
          ))}
        </div>
      );
    })
  );
};
