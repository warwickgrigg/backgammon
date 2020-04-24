import React, { useState } from "react";
//import { useStateValue } from "../state";
import { validFirstMoves } from "../engine/moves";
const jlog = o => console.log(JSON.stringify(o));

export default ({ points, player, dice, dispatch }) => {
  const [selectedPoint, selectPoint] = useState(-1);
  //const [_, dispatch] = useStateValue();
  const fm = validFirstMoves({ points, dice, player });
  jlog({ selectedPoint });

  const isPossibleFrom = point => {
    for (let i = 0; i < fm.length; i++) if (point === fm[i][0][0]) return true;
    return false;
  };

  const isPossibleTo = point => {
    for (let i = 0; i < fm.length; i++)
      if (point === fm[i][0][1] && selectedPoint === fm[i][0][0]) return true;
    return false;
  };

  const puckClick = point => {
    jlog({ selectedPoint, point });
    if (point === selectedPoint) {
      selectPoint(-1);
    } else if (selectedPoint === -1 && isPossibleFrom(point)) {
      selectPoint(point);
    }
  };
  jlog({ info: "rendering", points, player, dice });

  return points.map((stacks, c) =>
    stacks.map((count, point) => {
      let topClassSuffix;
      if (c) point = 25 - point;
      if (isPossibleTo(point) && !points[1 - c][25 - point]) {
        count += 1;
        topClassSuffix = " possible-to";
      } else
        topClassSuffix =
          point === selectedPoint
            ? " selected"
            : selectedPoint === -1 && isPossibleFrom(point)
            ? " possible-from"
            : "";
      if (count > 5) {
        var excess = `+${count - 5}`;
        count = 5;
      }

      const gridArea = `p${point}`;
      const stackClass = point > 12 ? "puck-stack near" : "puck-stack";
      const puckClass = ["puck", "puck dark"][c];
      //jlog({ point, selectedPoint, topClassSuffix });
      return (
        <div className={stackClass} key={gridArea} style={{ gridArea }}>
          {Array.from(new Array(count), (_, k) => (
            <div
              onClick={() => puckClick(point)}
              key={k}
              id={`p/${point}/${k}`}
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
