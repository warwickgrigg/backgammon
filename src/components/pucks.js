import React, { useState } from "react";
import { useStateValue } from "../state";
import { validMoves, validFirstMoves } from "../engine/moves";
const jlog = o => console.log(JSON.stringify(o));

export default ({ points, player, dice }) => {
  const [selectedPoint, selectPoint] = useState(-1);
  const [_, dispatch] = useStateValue();
  const fm = validFirstMoves({ points, dice, player });
  //jlog({ selectedPoint });
  const isPossibleTo = point => {
    for (let i = 0; i < fm.length; i++) if (point === fm[i][0][1]) return true;
    return false;
  };
  const isPossibleFrom = point => {
    for (let i = 0; i < fm.length; i++) if (point === fm[i][0][0]) return true;
    return false;
  };
  const puckClick = point => {
    jlog({ selectedPoint, point });
    if (selectedPoint === -1 && points[player][point] && isPossibleTo(point)) {
      selectPoint(point);
    } else if (point === selectedPoint) {
      selectPoint(-1);
    } else if (points[1][25 - point] < 1) {
      dispatch({
        type: "inc",
        value: 1
      });
    }
  };

  return points.map((stacks, c) =>
    stacks.map((count, point) => {
      let topClassSuffix;
      if (isPossibleTo(point)) {
        count = 1;
        topClassSuffix = " possible-to";
      } else
        topClassSuffix =
          point === selectedPoint
            ? " selected"
            : selectedPoint === -1 && isPossibleFrom(point)
            ? " possible-from"
            : "";
      if (!count) return undefined;
      if (count > 5) {
        var excess = `+${count - 5}`;
        count = 5;
      }
      if (c) point = 25 - point;
      const gridArea = `p${point}`;
      const stackClass = point > 12 ? "puck-stack near" : "puck-stack";
      const puckClass = ["puck", "puck dark"][c];
      //jlog({ point, selectedPoint, topClassSuffix });
      return (
        <div className={stackClass} key={gridArea} style={{ gridArea }}>
          {Array.from(new Array(count), (_, k) => (
            <div
              onClick={e => puckClick(point, e)}
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
