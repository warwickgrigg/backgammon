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

export default ({ points, player }) => {
  const [{ dice }, dispatch] = useStateValue(); //[{ counter: 1 }, () => 0]; //
  const [selectedPoint, selectPoint] = useState(-1);
  const doClick = point => {
    selectPoint(point === selectedPoint ? -1 : point);
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
          onClick={player === c ? () => doClick(point) : undefined}
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
